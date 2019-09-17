const merge = require('webpack-merge');
const common = require('./webpack.base');
const config = require('./config');
const webpack = require('webpack');
const Jarvis = require('webpack-jarvis');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

opts = {
  entry: [
    './src/main.jsx',
    'webpack-hot-middleware/client'
  ],
  mode: config.dev.env.NODE_ENV,
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      PUBLIC_PATH: JSON.stringify(config.dev.assetsPublicPath)
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

if (process.env.JA) {
  opts.plugins.push(new Jarvis({
    port: 1337 // optional: set a port
  }));
}

if (process.env.BA) {
  opts.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 1338
  }));
}

module.exports = merge(common, opts);
