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
