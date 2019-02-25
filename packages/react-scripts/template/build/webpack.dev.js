const merge = require('webpack-merge')
const common = require('./webpack.base')
const config = require('./config')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: config.dev.env.NODE_ENV,
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'PUBLIC_PATH': JSON.stringify(config.dev.assetsPublicPath)
    })
  ]
})
