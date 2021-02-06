import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

//定义一个$bus 事件总线，各个组件可以监听
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
