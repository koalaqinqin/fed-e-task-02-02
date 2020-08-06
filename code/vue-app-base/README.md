# vue-app-base

主要的思路：开发环境和生产环境最大的不同是在于开发环境需要使用watch的功能，生产环境需要使用更多的代码压缩优化功能，所以对于一般的功能我们可以在webpack.common.js 配置（入口，出口，资源文件loader处理，plugin处理）。然后分别在dev和prod里配置他们各自必须的功能。这里没有用dll处理，其实我们还可以用dll把较大的不经常改变的静态库单独打包，这样不需要每次都去打包这些库，节约时间和资源。


## 一、安装必要的模块

### webpack

- webpack
- webpack-cli

### Loader
- css-loader
- style-loader
- less-loader
- url-loader
- file-loader
- @babel/core、@babel/preset-env、babel-loader

### Plugins

- html-webpack-plugin

### vue 模块相关的包

- vue-loader
- vue-template-compiler

## 二、配置文件

1. webpack.common.js
2. webpack.dev.js
3. webpack.prod.js

dev 和 prod 通过 webpack-merge 来进行合并，所以我们需要安装 webpack-merge 模块

### babel 配置

在 babel的配置文件中，我們使用了 @vue/cli-plugin-babel/preset，所以需要安裝 @vue/cli-plugin-babel

### package.json
1. --open 可以自动打开浏览器
2. --progress 看进度
3. cross-env 用于设置命令行传递的参数

```json
"scripts": {
    "serve": "cross-env ENV=development webpack-dev-server --config webpack.common.js  --progress --open",
    "build": "cross-env ENV=production webpack --config webpack.common.js  --progress",
    "lint": "eslint ."
}
```

### ESLint 代码检测规范

安装一下模块到开发依赖:

eslint、eslint-loader、eslint-plugin-vue

1. 配置rule

```js
// webpack.common.js
module: {
  rules: [
    ...
    {
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      use: [
        'eslint-loader'
      ],
      enforce: 'pre' // 最先执行的
    }
    ...
  ]
}
```
2. package.json 或者也可以使用 .eslintrc.js

```json
// package.json
"scripts": {
    "lint": "eslint ."
},
...
"eslintConfig": {
    ...
    "ignorePatterns": [
      "/dist",
      "/node_modules"
    ]
},
```

### stylelint 

安装模块：

stylelint、stylelint-webpack-plugin、stylelint-config-standard

```js
// webpack.common.js
new StylelintPlugin({
    files: ['src/**.{vue,html,css,less}'],
    cache: false,
    emitError: true,
}),
```
添加 .stylelintrc.json
```json
// .stylelintrc.json
"stylelint": {
  "extends": "stylelint-config-standard"
},
```

### 打包优化

- mini-css-extract-plugin 提取 css 成为一个单独的文件，这个我们只在生产环境用
- optimize-css-assets-webpack-plugin 压缩 css 文件，因为单独提取了css，所以这里需要单独打包，生产环境默认只压缩js
- terser-webpack-plugin 压缩 JS 文件
- clean-webpack-plugin 删除之前生产的文件
- copy-webpack-plugin 直接复制不需要打包的文件