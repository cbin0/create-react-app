import _ from 'lodash'
const languageType = localStorage.getItem('locale') || 'zh'
const language = require('../../../bin/translate.json')

export let t = (str) => {
  if (!(str && str.trim)) return str
  let strs = str.trim()
  let typeJson = language[languageType]
  let languageStr = str
  _.map(typeJson, (val, key) => {
    if (strs === key) {
      languageStr = val
    }
  })
  return languageStr
}
