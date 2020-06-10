const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 分离 css 和 js
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 体积分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 构建速度分析
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// 多进程压缩插件
const TerserPlugin = require('terser-webpack-plugin')

console.log('argv=---', process.execArgv, '\n', process.argv)
module.exports =
  // smp.wrap(
  {
    mode: 'production',
    entry: __dirname + '/app/main.js', //已多次提及的唯一入口文件
    output: {
      path: path.resolve(__dirname, 'prod'), // 所有输出文件的目标路径
      filename: 'js/bundle-[chunkhash].js',
      chunkFilename: 'js/[name][chunkhash].chunk.js',
      publicPath: '' // 服务器读取时的路径
    },
    devtool: 'null', //注意修改了这里，这能大大减少我们的打包代码量（不是压缩）
    // A、模块匹配规则
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // 将 JS 字符串生成为 style 节点
            'css-loader', // 将 CSS 转化成 CommonJS 模块
            'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            // 'style-loader' 在未提取CSS时,使用的加载程序
            fallback: 'style-loader',
            // 将资源转换为CSS导出模块的加载程序 （必需）
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              {
                loader: 'postcss-loader' // css预处理器的loader
              }
            ]
          })
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/
          ],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.(woff|svg|eot|ttf)\??.*$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        }
      ]
    },
    // B、插件配置项
    plugins: [
      new webpack.ProvidePlugin({
        // 全局自动加载模块
        _: ['lodash'],
        Vue: ['vue/dist/vue.esm.js', 'default']
      }),
      new webpack.DefinePlugin({
        // 自定义全局变量
        SERVICE_URL: JSON.stringify('演示地址：http://localhost:9090/')
      }),
      new webpack.BannerPlugin('版权所有，翻版必究---生产环境---'),
      new HtmlWebpackPlugin({
        inject: true,
        template: __dirname + '/app/index.temp.html' //new 一个这个插件的实例，并传入相关的参数
      }),
      new webpack.optimize.OccurrenceOrderPlugin(), // 分配 id
      new ExtractTextPlugin('style.css'), // 分离 css/js
      new CleanWebpackPlugin(), // 清除prod文件中的残余文件
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true
      }),
      new HappyPack({
        loaders: ['babel-loader?presets[]=es2015']
      })
    ],
    // C、优化构建配置项
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: 4
        })
      ],
      splitChunks: {
        // 切割代码
        chunks: 'all', // 表示将选择哪些块进行优化 all/async/initial 集合 HtmlWebpackPlugin 使用
        minSize: 3000,
        maxSize: 0,
        minChunks: 1, // 分割前必须共享模块的最小块数
        maxAsyncRequests: 3, // 按需加载时的最大并行请求数
        maxInitialRequests: 3, // 入口处的最大并行请求数
        automaticNameDelimiter: '~', // 用于生成的名称的分隔符
        automaticNameMaxLength: 30, // 块名称最大字符数
        name: true, // 拆分块的名称。提供true将根据块和缓存组密钥自动生成名称
        cacheGroups: {
          // 缓存组
          vue: {
            // 自定义缓存组 vue 框架分离
            test: /[\\/]node_modules[\\/](vue)[\\/]/,
            chunks: 'all'
          },
          lodash: {
            // 自定义缓存组 lodash 包分离
            test: /[\\/]node_modules[\\/](lodash)[\\/]/,
            chunks: 'all'
          },
          default: {
            // 默认缓存组
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  } // )
