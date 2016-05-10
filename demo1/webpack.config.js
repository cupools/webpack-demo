'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 基本目录(绝对路径)，entry 配置项会基于 context 定位文件
    context: __dirname + '/app',
    // 入口文件的配置，这里每个 page 配置一个入口 js
    entry: {
        page0: './page0/page0.js',
        page1: './page1/page1.js',
        // 这里配合 commonPlugin 实现JS库的独立打包，实现长缓存
        vendor: ['./lib/webpack-zepto']
    },
    // 输出配置
    output: {
        // 输出路径，默认是 process.cwd()
        path: 'build/',
        // 输出的文件名，name 对应 `entry` 配置的键名
        filename: 'assets/[name].entry.[chunkhash:6].js',
        // 发布地址
        publicPath: '/'
    },
    module: {
        // 在 loader 处理之前处理匹配模块
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'jshint-loader',
                exclude: /node_modules|lib/
            }
        ],
        loaders: [{
            // babel-loader 的配置，排除 node_modules
            test: /\.js$/,
            loader: 'babel?presets=es2015',
            exclude: /node_modules/
        }, {
            // css-loader 和 sass-loader，同时配置 extract-text-plugin 输出独立的样式文件
            test: /\.(css|scss)$/,
            loader: ExtractTextPlugin.extract(['css', 'sass'])
        }, {
            // url-loader，配置图片输出命名和内联大小限制
            test: /\.(png|jpg)$/,
            loader: 'url',
            query: {
                name: 'assets/images/[name].[hash:6].[ext]',
                limit: 8192
            }
        }, {
            // html-loader，解决 img 标签的图片资源定位
            test: /\.html$/,
            loader: 'html?-minimize'
        }]
    },
    plugins: [
        // html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'page0.html',
            template: 'page0/page0.html',
            excludeChunks: ['page1']
        }),
        new HtmlWebpackPlugin({
            filename: 'page1.html',
            template: 'page1/page1.html',
            excludeChunks: ['page0']
        }),
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin('commons', 'assets/common.[hash:6].js', ['page0', 'page1']),
        // 提取公共库，vendor 见 `entry` 配置
        new webpack.optimize.CommonsChunkPlugin('vendor', 'assets/vendor.[chunkhash:6].js'),
        // 输出独立样式文件，配置文件命名
        new ExtractTextPlugin('assets/[name].[chunkhash:6].css', {
            allChunks: true
        }),
        // 代码混淆压缩
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        // 增加解析根路径，可直接 require 到 lib 里面的模块
        root: [process.cwd() + '/app/lib'],
        alias: {
            zepto: 'webpack-zepto'
        }
    },
    // jshint 配置
    jshint: {
        esnext: true
    }
};