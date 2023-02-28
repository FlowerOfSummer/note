### 是什么？ 

  loader用于对模块的源代码进行解析，在import/和加载模块的时候预处理文件。
  webpack是分析各个模块的依赖关系，形成依赖列表，最后打包生成到指定的文件。webpack默认只能解析.js结尾的文件，像图片/css/scss/less等就不能解析。这时候就需要配置loader
#### loader 

* style-loader: 动态生成style标签，将生成得css文件引入head中
* css-loader: 处理@import等模块文件
* postcss-loader和autoprefixer: 自动生成浏览器兼容性前缀
* less-loader: 负责处理.less文件，预编译成.css文件
* url-loader和file-loader: 负责处理本地资源文件（图片），不同的是，url-loader可以配置大小限制

```js
//webpack.config.js
module.exports = {
  //...
  modules: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 文件小于10k是，会被转换成base64;大于10k,将图片拷贝到 dist 目录。Object] />
              limit: 10240, //10K   文件小于10k是，会被转换成base64，有利于减少网络请求。但是大于10k会使base文件加载过慢，因此设置limit二者兼容
              // esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
              esModule: false 
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}
```

#### plugin
