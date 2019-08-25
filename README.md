# toch

通过命令行将各国语言翻译成中文

## 安装命令

```bash
npm i toch -g
```

## 使用命令

```bash
toch 'No swap file, use memory only'
```

## 配置翻译接口源

默认使用 google 翻译，可选百度翻译。翻译配置在环境变量中

```bash
export TOCH_SOURCE=baidu #可用参数 ['google','baidu']
```
