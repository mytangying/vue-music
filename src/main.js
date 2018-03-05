import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'
import VueJsonp from 'vue-jsonp'
import 'common/stylus/index.styl'
fastclick.attach(document.body)
Vue.use(VueResource)
Vue.use(VueJsonp)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: '',
  loading: 'static/img/logo.png',
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
