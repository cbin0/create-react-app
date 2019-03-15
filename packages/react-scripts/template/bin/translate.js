#! /usr/bin/env node
const _ = require('lodash');
const fs = require('fs');
const { spawn } = require('child_process');
// const json = require('./translate.json');
const json = {
  zh: require('../src/app/locales/zh.json'),
  en: require('../src/app/locales/en.json')
};

const oder = spawn('find', ['src/app/', '-name', '*.js*']);

oder.stdout.on('data', (data) => {
  // 将找到的文件分割成数组
  let files = data.toString().split('\n');
  let arrs = [];
  let reg = /[.\s]t\(['"]([^)]+)['"]\)/g;
  // 找到需要翻译的文字部分
  _.each(files, (item) => {
    let res;
    if (item !== '') {
      let text = (fs.readFileSync(item, { encoding: 'utf8' })).trim();
      res = reg.exec(text);
      while (res) {
        console.log(item, res[1]);
        arrs.push(res);
        res = reg.exec(text);
      }
    }
  });
  let zhArr = {
    zh: {}, en: {}
  };
  // 去除各种标点符号
  _.each(arrs, (item) => _.each(_.keys(zhArr), (name) => {
    const key = item[1];
    zhArr[name][key] = _.get(json[name], key) || key;
  }));

  _.each(zhArr, (values, langType) => {
    fs.writeFileSync(`${__dirname}/../src/app/locales/${langType}.json`, JSON.stringify(values, null, 2), { encoding: 'utf8' });
    console.log(`write locale: ${langType} JSON ok`);
  });
  console.log('write all locale DONE');
});

oder.stderr.on('data', (data) => {
  console.log(`error: ${data}`);
});

oder.on('close', (code) => {
  console.log(`exit_code: ${code}`);
});
