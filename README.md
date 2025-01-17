### 一、简答题

1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

答：

构建流程主要环节：

1. entry: entry决定了我们项目开始的入口文件，是最后项目文件依赖关系树的根节点。一个项目可以有多个入口文件
2. output：output定义我们打包输出的bundles，以及输出的文件名称和路径。
3. loader：提供了资源转化的功能，比如把es6+z转化为es6，webpack提倡所有的文件以js的方式加载，loader可以帮助我们把非js的资源文件转换为js去实现。
4. plugin：提供webpack的feiloader的自动化能力，比如删除目录、自动生成html、复制目录等。Plugin 通过钩子实现，在webpack打包过程中，通过生命周期的钩子中去挂载函数来实现扩展。
5. optimization：提供webpack内部优化的功能，比如压缩代码、tree-shaking、提取公共代码等能力。

打包过程：

我们的项目有很多代码和资源文件，webpack 根据配置文件找到入口文件，一般是js文件，然后顺着入口文件中的代码，根据import或者require等语句，去解析这个文件依赖的资源模块，分别去解析每个资源模块对应的依赖，最后形成整个项目的文件依赖关系树。webpack递归依赖树，找到每个节点对应的资源文件，根据rules属性去找到这个模块对应的加载器，然后交给对应的加载器去加载这个模块。最后将加载的结果放到bundle.js 中。loader实现资源文件加载。

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

答：Loader 我们是webpack来进行代码转化的。webpack 默认只能识别js资源，loader可以让webpack处理其他非js资源，比如图片资源和css资源。同时loader还可以帮助我们完成js新特性转化。而plugin提供更强大的自动化能力。

- 开发一个 Loader：loader主要思路是输入到输出的转化。输入资源文件的内容，文件编译转化后，输出加载结果，最后一个loader返回的必须是js代码。

- 开发一个 Plugin：它通过钩子实现，在webpack打包过程中，通过在生命周期的钩子中去挂载函数来实现扩展。自定义插件必须是一个函数或者是一个包含apply方法的对象