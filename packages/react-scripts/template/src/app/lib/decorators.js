import * as _ from 'lodash'
import { action, toJS } from 'mobx'
import { getStorePropState } from '@stores/root'
import stores from '@stores'
import RouterStore from '@stores/route'
import { t } from '@lib/i18n'
import {obj2QlOpts} from '@lib/utils'
let setterDebounceVals = {}

const listQueryParams = ['limit', 'pageSize', 'pageNum', 'where', 'order']
/**
 * request装饰器
 * 使用这个装饰器装饰的方法代表是个异步方法
 * store的状态会被保存到RootStore中
 * 通过继承stores/base就可以读取fetching属性拿到状态
 * 注意：被装饰方法需要返回一个Promise
 */
export function request(mainToast) {
  return (target, propertyKey, descriptor) => {
    // target.debug('decorator request init')
    let method = descriptor.value
    let name = target.constructor.name
    let state = getStorePropState(name, {
      name: propertyKey, mainToast
    })
    target.debug('decorator request init', method, name, descriptor)
    descriptor.value = function() {
      target.debug(`decorator request for '${propertyKey}()' called`)
      let rootStore = stores.root
      let promise = method.apply(this, arguments)
      target.debug(`decorator request for '${propertyKey}()' get promise:`, promise)
      rootStore.startFetching(name, state)
      if (promise && promise.then) {
        return promise.then((res) => {
          target.debug(`decorator request for '${propertyKey}()' promise done`, res)
          rootStore.stopFetching(name, state)
          return res
        }).catch((e) => {
          // Notification('error', t('警告'), t('网络请求好像出错了～'))
          target.debug(`request for '${propertyKey}()' promise error:`, e)
          rootStore.stopFetching(name, state)
          return Promise.reject(e)
        })
      }
      return promise
    }
  }
}

/**
 * routeParam装饰器
 * 使用这个装饰器装饰的属性代表是个需要在route体现的param
 * 直接读取目标属性就能得到当前路由的param
 * 直接修改目标属性就会触发route修改
 * 注意：这个装饰器不能和 @observable 一起使用
 * @param def 默认值
 */
export function routeParam(def) {
  return function(target, propertyKey) {
    target.debug(`decorator routeParam for ${propertyKey} init`)
    let descriptor = arguments[2]
    let setter = _.debounce(() => {
      stores.route.goto({
        search: setterDebounceVals,
        replace: false
      })
      setterDebounceVals = {}
    }, 10, { maxWait: 500 })
    if (descriptor && (descriptor.get || descriptor.set)) {
      throw new Error('decorator routeParam can not used at getter or setter')
    }
    return {
      get() {
        let value = stores.route.getSearch(propertyKey, def)
        if (typeof def === 'number') {
          return parseInt(value, 10)
        } else return value
      },
      set(value) {
        setterDebounceVals[propertyKey] = value
        setter()
      }
    }
  }
}

/**
 * 列表装饰器 用来确定pageSize和pageNum 同时整理成query需要的格式
 * {pageNum: int, pageSize: int, where: {...}}
 * @param {number} listName 名称用来确定在pageConf中的key
 * @param {bool} isScroll 下拉滚动的话就是pageNum++
 */
export function list(listName, isScroll = false) {
  return (target, propertyKey, descriptor) => {
    // target.debug('decorator scroll init')
    let method = descriptor.value
    let name = target.constructor.name
    target.debug('decorator list init', method, name, descriptor)
    descriptor.value = function(...args) {
      target.debug('in decorator list', args)
      const pageConfKey = `pageConf.${listName}`;
      const pageConf = _.pick(toJS(_.get(this, pageConfKey, {
        pageSize: 1,
        pageNum: 0,
      })), listQueryParams); // 为了剔除不需要参数 比如total
      const [page, filter, sort] = args
      // target.debug(`decorator list, pageConf1 ${JSON.stringify(pageConf)}`, page, filter, sort)
      const pageNum = _.get(page, "pageNum", 0);
      pageConf.pageSize = _.get(page, "pageSize", pageConf.pageSize);
      if (!isScroll) {
        pageConf.pageNum = pageNum
      } else {
        pageNum ? pageConf.pageNum = pageNum : pageConf.pageNum++
        _.set(this, `${pageConfKey}.pageNum`, pageConf.pageNum)
      }
      // target.debug(`decorator list, pageConf2 ${JSON.stringify(pageConf)}`)
      if (!_.isEmpty(filter)) {
        pageConf.where = {...pageConf.where, ...filter}
      }
      pageConf.where = _.mapValues(pageConf.where, (i) => {
        if (_.isFunction(i)) {
          i = i.apply(target) // TODO 不知道还需要什么参数
        }
        return i
      })
      if (!_.isEmpty(sort)) {
        pageConf.order = `${_sort.order === "descend" ? "reverse: " : ""}${_.snakeCase(_sort.columnKey)}`;
      }
      target.debug(`decorator list, pageConf3 ${JSON.stringify(pageConf)}`)
      let promise = method.apply(this, [obj2QlOpts(pageConf), ...args])
      // target.debug(`decorator list, method`, method)
      if (promise && promise.then) {
        return promise.then((res) => {
          if (res.total) {
            _.set(this, `${pageConfKey}.total`, res.total)
          }
          target.debug(`decorator list for '${propertyKey}()' promise done`, res)
        })
      }
      return promise
    }
  }
}