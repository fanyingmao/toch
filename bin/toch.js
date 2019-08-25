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

  [ '用法：svn<subcommand>[options][args]$subversion命令行客户端。$键入“svn help<subcommand>”以获取有关特定子命令的帮助。$键入“svn--version”以查看程序版本和RA模块，$“svn--version--verbose”以查看依赖项版本，$“svn--version--quie”t\'只查看版本号。$大多数子命令采用文件和/或目录参数，在目录上递归$。如果没有为此类$命令提供任何参数，则默认情况下，它会在当前目录（包括）上重复出现。$$可用子命令：$添加$验证$责备（赞扬、注释、ann）$更改列表（cl）$签出（co）$清理$提交（ci）$复制（cp）$删除（del、删除，rm）$差异（di）$导出$帮助（？，h） import info 35; list（ls）$ lock \\ lock \\\\ log 合并\\ mergeinfo \\35; mkdir \\35; mo移动（mv，重命名，任）移动（mv，重命名，任）移动（mv，重命名，任）移动（pdel，pdel（pdel，pd）属性（pedit（pedit，pedit，pe）\\35\\ pro获取（pget，pget，pg）道具（pget，pget，ppset，ps）$重新定位$解析$解析$还原$#状态（stat，st）$开关（sw）$解锁$更新（up）$升级$x-shelve（shelve）$x-unshelve（unshelve）$x-shelves（shelves）$subversion是版本控制的工具。$有关更多信息，请参阅http://subversion.apache.org。/$#' ]