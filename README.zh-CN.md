# webpack-demo
几个关于 Webpack 使用的 demo。

在开始尝试之前，需要先安装依赖模块。

```bash
$ npm i
```

[English Documentation](README.md)

## demo0
Webpack 的基础配置和使用

#### 使用

```bash
$ cd demo0
$ webpack
```

## demo1
Webpack 的一些更复杂的配置和使用，实现了以下功能。

1. 支持 ES2015 和 SASS
1. 支持代码校验压缩混淆
1. 合并公用模块
1. 文件名添加 MD5 戳
1. 支持长缓存

#### 使用

```bash
$ cd demo1
$ webpack
```

![demo1_bundle](docs/demo1_bundle.png)

![demo1_bundle_link](docs/demo1_bundle_link.jpg)

## bootstrap
启动一个简单的开发服务器，基于 webpack-dev-server，支持 HMR。

#### 使用

```bash
$ cd bootstrap
$ node server.js
```

访问 [http://127.0.0.1/3000](http://127.0.0.1/3000)
