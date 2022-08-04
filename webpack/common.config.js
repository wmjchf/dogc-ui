/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/** @type {import('webpack').Configuration} */
const config = {
  entry: path.resolve("src/index.tsx"),
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve("dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    alias: {
      "@": path.resolve("src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.less/,
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
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack构建项目",
      template: path.resolve("public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: `vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "js/common/[name].[contenthash].js",
        },
      },
    },
  },
};

module.exports = config;
