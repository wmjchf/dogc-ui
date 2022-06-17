import path from "path";

import { merge } from "webpack-merge";

import common from "./common.config.js";

const config = merge(common, {
  mode: "production",
  devtool: false,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    static: path.resolve("./dist"),
  },
});

module.exports = config;
