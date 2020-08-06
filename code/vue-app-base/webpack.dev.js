const common = require('./webpack.common')(process.env.ENV);
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development', // 直接development工作模式
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 9000, // 端口
        hot: true, // 热更新开启
        contentBase: './public'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ],
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
            ]
        }]
    }
})