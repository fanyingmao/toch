#!/usr/bin/env node
const chalk = require('chalk');
const ora = require('ora');
const { youdao, baidu, google } = require('../lib/translation-jsapi');
const { getPast } = require('../lib/cmd');

const splitFlag = '\n';
let en = '';
for (let i = 2; i < process.argv.length; i++) {
  en += process.argv[i] + ' ';
}

let formName = 'google';
let startTime = Date.now();
let spanTime = 0;
let source;
switch (process.env.TOCH_SOURCE) {
  case 'youdao':
    formName = 'youdao';
    source = youdao;
    break;
  case 'baidu':
    formName = 'baidu';
    source = baidu;
    break;
  default:
    source = google;
    break;
}

const spinner = ora(chalk.cyan(`Waiting from:${formName}`)).start();
en = en.replace(/\s{2,}/g, "\n");
en = en.replace(/\n/g, splitFlag);

if (!en || en === '') {
  spinner.fail(`Fail from:${formName} time:${spanTime}`);
  console.log(chalk.red('参数错误'));
  return;
}


source.translate(en).then(res => {
  let result = res.result;
  spanTime = (Date.now() - startTime) / 1000;
  if (result) {
    spinner.succeed(chalk.cyan(`Succeed from:${formName} time:${spanTime}s`));
    let enArr = en.split(splitFlag);
    let resultArr;
    if (typeof result === 'string') {
      resultArr = result.split(splitFlag);
    }
    else {
      resultArr = result;
    }

    for (let i = 0; i < enArr.length; i++) {
      if (enArr[i] && resultArr[i]) {
        console.log(enArr[i]);
        console.log(chalk.green(resultArr[i]));
      }
    }
  }
  else {
    spinner.fail(chalk.cyan(`Fail from:${formName} time:${spanTime}s`));
    console.log(chalk.red('调用异常'));
    console.error(result);
  }
})
  .catch(err => {
    spinner.fail(chalk.cyan(`Fail from:${formName} time:${spanTime}s`));
    console.log(chalk.red('执行报错'));
    console.error(err.stack);
  });