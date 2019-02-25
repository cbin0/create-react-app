const fs = require('fs')
const { spawn } = require('child_process')
const _ = require('lodash')
const json = require('./translate.json')
const oder = spawn('find', ['src/app/components/','-name','*.jsx',]);

oder.stdout.on('data', (data) => {
  //将找到的文件分割成数组
  let files = data.toString().split('\n')
  let arrs = []
  let reg =/\.t\(['"]([^)]+)['"]\)/g
  // 找到需要翻译的文字部分
  files.map((item,index)=>{
    let res
    if(item !== ''){
      let text = (fs.readFileSync(item)).toString().trim()
      while(res = reg.exec(text)){
        arrs.push(res)
      }
    }
  })
  let zhArr = {
    zh: {}, en: {}
  }
  // 去除各种标点符号
  _.each(arrs, (item) => _.each(_.keys(zhArr), (name) => zhArr[name][item[1]] = _.get(json, `${name}.${item[1]}`) || item[1]))

  fs.writeFileSync(`${__dirname}/translate.json`,JSON.stringify(zhArr,null,2),{encoding:'utf8'})
  console.log('write json ok.........')
});

oder.stderr.on('data', (data) => {
  console.log(`error: ${data}`);
});

oder.on('close', (code) => {
  console.log(`exit_code: ${code}`);
});
