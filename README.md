# toch

通过命令行将各国语包含（英，德，法，日等主流语言）翻译成中文

## 安装命令

```bash
npm i toch -g
```

## 使用命令

```bash
toch No swap file, use memory only
```

## 对命令的英文说明作出翻译

这个是对多行翻译，要小心如果翻译的条数太多，第三方接口会调用失败
例如对 rsync 帮助进行翻译

```bash
rsync -h|xargs  -0   toch
```

## 对配置文件说明作出翻译

由于 redis 的配置文件太大无法直接调用第三方，这里取 100 到 200 行翻译

```bash
sed -n '100,200p' redis.conf|xargs -0 toch
```

## 配置翻译接口源

默认使用 google 翻译，可选百度翻译。翻译配置在环境变量中
建议使用 google 翻译，排版会更好些

```bash
export TOCH_SOURCE=baidu  #可用参数 ['google','baidu']
```

## 注意

- 单次无法翻译太长的文字，否则第三方会报错。
- 不能短时间调用多次，否则会被第三方禁用一段时间
- 对多行翻译还存在翻译行和原行对不上的情况需要处理，需要后面优化
- 为了方便，默认是允许翻译的句子不加引号的，但包含特殊符号时会报错，需要加引号，例如<>:

```bash
toch 'Execute <command> before loading any vimrc file'
```
