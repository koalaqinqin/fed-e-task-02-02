const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = (env) => { // 要传参数，所以我们这里用一个函数
    console.log('ENV===', env);
    const config = {
        entry: './src/main.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].bundle.js',
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }, {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }, {
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                use: [
                    'eslint-loader'
                ],
                enforce: 'pre' // 最先执行的
            }, {
                test: /\.(woff|svg|eot|ttf)$/,
                use: ['url-loader']
            }, {
                test: /\.(png|jpg|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024, // 超出后自动使用 file-loader
                        esModule: false, // 不使用 ESM 的异步加载
                    }
                }
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                BASE_URL: '"./"' // 不能直接使用字符串
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html', // 模板html
                title: 'vue-cli'
            }),
            new VueLoaderPlugin(),
            new StylelintPlugin({
                files: ['src/**.{vue,html,css,less}'],
                cache: false,
                emitError: true,
            }),
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json'] // 扩展自动解析
        }
    };
    return config;
}