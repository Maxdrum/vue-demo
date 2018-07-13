// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

// 引用API文件
import api from './api/index.js'
// 引用工具文件
import {goodTime, getQueryString} from './utils/index.js'

// 将API方法绑定到全局
Vue.prototype.$api = api

// 将工具方法绑定到全局
Vue.prototype.$utils = goodTime
Vue.prototype.$getQueryString = getQueryString

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
