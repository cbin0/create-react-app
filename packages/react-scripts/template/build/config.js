var path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: 'production'
    },
    index: path.resolve(__dirname, '..', 'dist', 'index.html'),
    assetsRoot: path.resolve(__dirname, '..', 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: {
      NODE_ENV: 'development'
    },
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/graphql': {
        target: 'http://localhost:8888',
        changeOrigin: false
      },
      // for static image
      '/2019[\d]+/': {
        target: 'http://localhost:8888',
        filter: function(pathname, req) {
          return pathname.match('^/2019') && req.method === 'GET'
        },
        changeOrigin: true
      }
    }
  }
}
