# webpack + react + typescript 项目搭建

## webpack 配置

1、安装 webpack，其中 webpack-dev-server 非必需，只是为了开发环境方便调试。

```
npm install webpack webpack-cli webpack-dev-server -D
```

2、新建 webpack 配置文件（任意目录下、任意文件名）。由于项目中不同的生产环境和开发环境的配置，使用单个的配置文件会影响到任务的可重用性，随着项目需求的增长，我们必须要找到更有效地管理配置文件的方法。所以把 webpack 公共配置抽离出来，然后用 webpack-merge 合并。

```
公共配置文件 webpack/commom.config.js
开发环境配置 webpack/dev.config.js
生产环境配置 webpack/pro.config.js
```

3、package.json 配置执行脚本。

```
"scripts": {
    "build:pro": "webpack --config ./webpack/pro.config.js",
    "build:dev": "webpack server --config ./webpack/dev.config.js"
},
```

4、项目目录（v1.0）结构如下，源码一般放在`src`目录下，目录结构随着工具的集成而变化。

```
|-- Project
    |-- src
        |-- style
        |   |-- index.css
        |   |-- rect.css
        |-- utils
            |-- index.js
        |-- index.js
    |-- public
        |-- index.html
```

4、打包 html、css、js，common.config.js 和 dev.config.js 基础配置如下：

```
// 安装 webpack 插件
npm install html-webpack-plugin mini-css-extract-plugin clean-webpack-plugin webpack-merge -D
// 安装css相关loader
npm install style-loader css-loader postcss-loader postcss -D
// common.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const config = {
    entry: path.resolve("src/index.js"),
    output: {
        filename: "js/[name].[contenthash:8].js",
        path: path.resolve("dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack 构建项目",
            template: path.resolve("public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[contenthash].[name].css",
        }),
        new CleanWebpackPlugin(),
    ],
    module:{
        rules:[
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            }
        ]
    }
}
module.exports = config;
// dev.config.js
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./common.config.js')

const config = merge(common, {
    mode: 'development',
    devtool: false,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        static: path.resolve('./dist'),
    },
})
module.exports = config
```

至此，当执行`npm run build:dev`即可看到对应页面。

## 集成 babel 和 typescript

## webpack 配置的坑

- resolve.extensions 配置

```
resolve: {
    extensions: [".ts", ".tsx", "..."],
}
// 最后必须加上"..."或者".js",否则报错如下：
ERROR in ./node_modules/html-entities/lib/index.js 14:25-54
Module not found: Error: Can't resolve './named-references' in '/Users/wangdog/Desktop/Web/HTML5/node_modules/html-entities/lib'
...more
```
