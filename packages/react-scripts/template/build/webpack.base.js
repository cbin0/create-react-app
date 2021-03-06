const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const version = require('../package.json').version;

const isProduction = process.env.NODE_ENV === 'production';
const moment = require('moment');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const revision = new GitRevisionPlugin();

module.exports = {
  entry: './src/main.jsx',

  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(__dirname, '..', 'dist')
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@app': path.resolve(__dirname, '..', 'src', 'app'),
      '@lib': path.resolve(__dirname, '..', 'src', 'app', 'lib'),
      '@stores': path.resolve(__dirname, '..', 'src', 'app', 'stores'),
      '@styles': path.resolve(__dirname, '..', 'src', 'app', 'styles'),
      '@models': path.resolve(__dirname, '..', 'src', 'app', 'models'),
      '@comps': path.resolve(__dirname, '..', 'src', 'app', 'components'),
      '@components': path.resolve(__dirname, '..', 'src', 'app', 'components'),
      '@configs': path.resolve(__dirname, '..', 'src', 'app', 'configs'),
      '@routes': path.resolve(__dirname, '..', 'src', 'app', 'routes'),
      '@static': path.resolve(__dirname, '..', 'static')
    }
  },

  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              ['@babel/plugin-syntax-dynamic-import'],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-proposal-optional-chaining', { loose: false }]
            ]
          }
        }
      }, {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
              sourceMap: !isProduction,
              localIdentName: '[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('autoprefixer'),
                require('postcss-reporter')(),
                require('postcss-browser-reporter')({ disabled: isProduction })
              ]
            }
          },
          'less-loader'
        ]
      }, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          // 'url-loader?limit=10000',
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash:7].css',
      chunkFilename: '[id].[hash:7].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      NODE_ENV: `"${process.env.NODE_ENV}"`,
      __VERSION__: JSON.stringify(version),
      VERSION: `"${revision.version()}"`,
      COMMITHASH: `"${revision.commithash()}"`,
      BRANCH: `"${revision.branch()}"`,
      UPTIME: `"${moment().format('YYYY-MM-DD HH:mm:ss')}"`
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};
