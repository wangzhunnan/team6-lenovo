// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import request from './ajax'//引入ajax对象
import ElementUI from "element-ui"//引入elementUI
import 'element-ui/lib/theme-chalk/index.css'//引入elementUI的css样式 
import router from "./router/index"//引入路由对象
import moment from "moment"

Vue.config.productionTip = false
// 为vue对象添加继承属性
Vue.prototype.$http = request;//将request对象赋值给vue原型对象的一个属性
Vue.use(ElementUI) //在vue项目中使用elementUI
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
