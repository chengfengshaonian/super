import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "components/common/toast";

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//定义一个$bus 事件总线，各个组件可以监听
Vue.prototype.$bus = new Vue()

Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
