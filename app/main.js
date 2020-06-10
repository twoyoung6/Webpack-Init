
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont.css'
import router from './router'
import customComp from './views/customComp.vue'

// 引入抠图
// import MattingEditor from 'matting-editor'
// Vue.use(MattingEditor);

Vue.use(ElementUI)
// require('!style-loader!css-loader!./main.css')
// import {greet} from './Greeter'
// document.querySelector('.root').appendChild(greet())
// console.log('SERVICE_URL', SERVICE_URL) // 编译时的全局变量
// console.log('NODE_ENV----', process.env.NODE_ENV, process.env.DEBUG) // 环境变量
// console.dir(Vue)
// console.dir(_)
Vue.component('customComp', customComp)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
