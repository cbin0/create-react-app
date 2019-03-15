# Title

description

## 运行

```bash
npm i && npm start
```

## 目录结构

```js
|- bin
  |- translate.js     生成最新的./src/app/locales/locales.js
|- static             静态资源 例如icon image等
|- src
  |- app
    |- components         公用模块
      |- layout           布局
        |- content.jsx    内容相关 展示每个routes中的内容
        |- header.jsx     右侧顶栏 展示用户、语言等信息
        |- footer.jsx     右侧底栏 展示copy right之类的信息
        |- index.jsx      整理布局，生成左侧边栏的目录
      |- base.jsx         component基础类
    |- configs            配置目录
      |- menus.js         左侧栏菜单配置
    |- e2e                端到端测试 使用cypress
    |- lib                通用function库
      |- decorators.js    装饰类 管理单个store和root的状态
    |- routes             路由内容 按功能模块分目录
      |- index.js         整理路由
    |- stores             所有Mobx Store
    |- styles             样式
      |- app.less         布局样式
      |- constant.less    布局使用到的变量
    |- test               unit test 使用mocha
      |- mocha.opts       mocha使用到的配置
    |- errorBoundary.jsx  前端报错使用
    |- main.jsx           webpack入口
```

## lint

* 使用eslint

```bash
npm run lint
```

* 使用eslint并修复

```bash
npm run lint:fix
```

## 开发流程

```js
master <-> develop <- feature/xxx
    |       |<--------bugfix/xxx
    |<---- hotfix/xxx
```