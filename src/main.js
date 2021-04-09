import './theme/theme/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'nprogress/nprogress.css'
import './assets/css/global.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
