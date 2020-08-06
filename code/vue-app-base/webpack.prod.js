const common = require('./webpack.common')(process.env.ENV);
const path = require('path');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css 代码插件
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 压缩 JS 代码插件

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[contenthash:8].js'
  },
  optimization: { // 集中配置webpack内部优化功能
    usedExports: true, // 仅导出外部使用了的成员（枯树叶）
    // splitChunks: { // 处理多入口的公共模块，这里我们只有一个入口，不需要
    //   chunks: 'all'
    // },
    minimize: true, // 压缩掉未被引用的代码（摇掉树叶）
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin() // 压缩 css
    ]
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(), // 删除目录
    new CopyWebpackPlugin({ // 静态资源直接复制
      patterns: [
        'public/favicon.ico',
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    })
  ]
})