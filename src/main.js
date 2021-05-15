import './theme/theme/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/css/global.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
axios.interceptors.request.use(config => {
  NProgress.start()
  const tokenName = window.sessionStorage.getItem('tokenName')
  const token = window.sessionStorage.getItem('tokenValue')
  if (tokenName != null && tokenName !== '') {
    config.headers[tokenName] = token
  }
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
