let ora = require('ora');
let rm = require('rimraf');
let chalk = require('chalk');
let webpack = require('webpack');
let config = require('./config');
let webpackConfig = require('./webpack.prod');

process.env.NODE_ENV = config.build.env.NODE_ENV;

let spinner = ora('building for production...');
spinner.start();

rm(config.build.assetsRoot, err => {
  if (err) throw err;
  webpack(webpackConfig, (err1, stats) => {
    spinner.stop();
    if (err1) throw err1;
    process.stdout.write(`${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    })}\n\n`);

    console.log(chalk.cyan('  Build complete.\n'));
  });
});
