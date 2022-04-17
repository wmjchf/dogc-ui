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

5、打包 html、css、js，common.config.js 和 dev.config.js 基础配置如下：

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
    // 入口文件
    entry: path.resolve("src/index.js"),
    // 输出文件目录
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
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                    // 分离node_modules公共代码
                    vendors: {
                        name: `vendors`,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        filename: "js/common/[name].[contenthash].js",
                    },
            },
        },
    },
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

## 集成 babel 和 typescript、react

1、安装 babel 相关环境和 typescript

```
// babel相关（如果不用typescript，可以不用装@babel/preset-typescript）
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
// webpack相关
npm install --save-dev bable-loader

```

2、配置.babelrc

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

4、修改 webpack 配置中的 module.rules

```
{
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
        {
            loader: "babel-loader",
        },
    ],
},
```

5、修改 weback 配置中的 resolve.extensions。（不是必须的，import { App } from "./App"不用写后缀名）

```
resolve: {
    extensions: [".ts", ".tsx", "..."], // 如果不用typescript,则是jsx
},
```

6、配置 tsconfig.json，如果不配置编辑器会报错。

```
{
  "compilerOptions": {
    "jsx": "preserve"
  },
  "include": ["src/**/*"]
}

```

7、polyfill 相关说明

```
{
    "useBuiltIns": "usage",
    "corejs": 3
}
```

因为 babel 只负责语法转换，比如将 ES6 的语法转换成 ES5。但如果有些对象、方法，浏览器本身不支持，比如：

- 全局对象：Promise、WeakMap 等。
- 全局静态函数：Array.from、Object.assign 等。
- 实例方法：比如 Array.prototype.includes 等。
  此时，需要引入 babel-polyfill 来模拟实现这些对象、方法。

但是从 Babel 7.4.0 开始，@babel/polyfill 这个包已经被弃用，取而代之的是直接包含 core-js/stable（以填充 ECMAScript 特性）和 regenerator-runtime/runtime
当使用 usage or entry 选项时，@babel/preset-env 会将对 core-js 模块的直接引用添加为导入，所以需要我们手动安装 core-js。

```
npm install core-js@3 --save
or
npm install core-js@2 --save

useBuiltIns: 'entry' // 在每个文件中使用 polyfill 时为它们添加特定的导入。按需引入。

useBuiltIns: 'usage' // 仅在整个应用程序中使用import "core-js"。不管有没有用到某个api，全部导入。

corejs: 3 // 根据您安装的版本去配置即可。
```

8、避免 polyfill 污染全局。

如果只按照步骤`3`配置的话，会有一个问题——污染全局变量。为了解决这个问题，我们需要引入@babel/plugin-transform-runtime。

```
[
    "@babel/plugin-transform-runtime",
    {
        "corejs": 3
    }
]
当corejs=2时，npm install --save @babel/runtime-corejs2
当corejs=3时，npm install --save @babel/runtime-corejs3
```

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
