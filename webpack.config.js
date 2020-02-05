/*
 * @Author: your name
 * @Date: 2020-02-04 14:46:56
 * @LastEditTime : 2020-02-05 12:08:16
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiyi-rem/webpack.config.js
 */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackConfig = {
  mode: 'production',
  context: __dirname, // to automatically find tsconfig.json
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'rem',
    libraryTarget: 'umd',
    libraryExport: 'default' // 使直接暴露出 rem 对象本身，而不是 { default: rem } 对象，解决 require('@weiyi/rem').default 的用法问题
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  optimization: {
    // runtimeChunk: true,
    minimize: false
  }
};

module.exports = webpackConfig;
