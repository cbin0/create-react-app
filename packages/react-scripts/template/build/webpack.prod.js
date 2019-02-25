const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const common = require('./webpack.base')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const webpackConfig = merge(common, {
  mode: config.build.env.NODE_ENV,
  output: {
    publicPath: config.build.assetsPublicPath
  },
  plugins: [
    new UglifyjsPlugin({
      uglifyOptions: { // 为了防止className Contructor.name 被转为t
        keep_classnames: true,
        keep_fnames: true
      }
    }),
    // copy custom static assets
    new CopyPlugin([
      {
        from: path.resolve(__dirname, '..', 'static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'PUBLIC_PATH': JSON.stringify(config.build.assetsPublicPath)
    })
  ]
})

if (config.build.productionGzip) {
  webpackConfig.plugins.push(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
