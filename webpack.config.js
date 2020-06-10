const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map', // 开启调试的

  stats: 'errors-only',
  entry: __dirname + '/app/main.js', // 入口
  output: { // 出口
    path: path.join(__dirname, '/build'),
    filename: 'bundle[hash].js'
  },
  // 模块解析时的精细化配置
  resolve: {
    alias: { // 路径别名
      '@': path.resolve(__dirname, 'app'),
      'main': path.resolve(__dirname, 'app/main/'),
      'greeter': path.resolve(__dirname, 'app/greeter/')
    },
    modules: ['node_modules'], // 解析时需要搜索的目录；目录优先于 node_modules 的写法，[path.resolve(__dirname, 'src'), 'node_modules']
    extensions: ['.wasm', '.mjs', '.js', '.json'] // 拓展名省略
  },
  // 本地服务器相关配置
  devServer: {
    port: '60',
    contentBase: './build', // 本地服务器加载的页面所在文件夹相对路径，告诉服务器从哪里提供内容。只有在您想要提供静态文件时才需要这样做
    historyApiFallback: true, // H5 history 模式下，所有都跳转指向 index.html
    inline: true, // 实时刷新
    hot: true, // 热更新开启
    open: true,
    overlay: true,
    // proxy: { // 代理
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {'^/api' : ''}
    //   }
    // }
  },
  // loaders相关配置项
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          // 这里的三个loader书写有严谨的顺序，从下往上执行（从右往左执行）
          "style-loader", // 将 JS 字符串生成为 style 节点——将模块的导出作为样式添加到 DOM 中
          "css-loader", // 将 CSS 转化成 CommonJS 模块——解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
          "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass，加载和转译 SASS/SCSS 文件
        ]
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: __dirname + 'node_modules'
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "postcss-loader" // 这里的三个loader书写有严谨的顺序
          }
        ],
        exclude: __dirname + 'node_modules'
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240
          }
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10240,
              name: '[name].[ext]',
              outputPath: '',
              publicPath: ''
            },
          },
        ],
      }
    ]
  },
  // 插件相关配置项
  plugins: [
    new webpack.ProvidePlugin({ // 全局自动加载模块
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: ['lodash', 'map'],
      Vue: ['vue/dist/vue.esm.js', 'default']
    }),
    new webpack.DefinePlugin({ // 自定义全局变量
      'SERVICE_URL': JSON.stringify('演示地址：http://localhost:9090/')
    }),
    new webpack.BannerPlugin('版权所有，翻版必究----开发环境-----'),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: 'icon.ico',
      template: __dirname + "/app/index.temp.html"
    }),
    new webpack.HotModuleReplacementPlugin() //热重载插件（webpack 内置插件）
  ]
}

