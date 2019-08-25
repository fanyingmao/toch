#!/usr/bin/env node
const chalk = require('chalk');
const ora = require('ora');
const { youdao, baidu, google } = require('../lib/translation-jsapi')
const splitFlag = '\n';
let en = '';
for(let i = 2; i < process.argv.length;i++){
  en+=process.argv[i] + ' ';
}


const spinner = ora('toch starting').start();
en = en.replace(/\s{2,}/g,"\n");
en = en.replace(/\n/g,splitFlag);
let source;
if(!en || en === ''){
  spinner.fail('toch fail');
  console.log(chalk.red('参数错误'));
  return;
}

switch (process.env.TOCH_SOURCE) {
  case 'youdao':
    source = youdao;
    break;
  case 'baidu':
    source = baidu;
    break;
  default:
    source = google;
    break;
}

source.translate(en).then(res => {
  let result = res.result;
  if (result) {
    spinner.succeed('toch succeed');
    let enArr = en.split(splitFlag);
    let resultArr;
    if(typeof result === 'string'){
      resultArr = result.split(splitFlag);
    }
    else{
      resultArr = result;
    }

    for(let i = 0;i<enArr.length;i++){
      if(enArr[i] && resultArr[i]){
        console.log(enArr[i]);
        console.log(chalk.green(resultArr[i]));
      }
    }
  }
  else {
    spinner.fail('toch fail');
    console.log(chalk.red('调用异常'));
    console.error(result);
  }
})
  .catch(err => {
    spinner.fail('toch fail');
    console.log(chalk.red('执行报错'));
    console.error(err.stack);
  });