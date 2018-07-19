// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuerouter from 'vue-router'
import Layout from './components/Layout.vue'
// import VueResource  from 'vue-resource'
import routes from './router'
import store from './store/store'

import axios from 'axios'

// Vue.use(VueResource)
Vue.use(Vuerouter)

axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  store.dispatch('showLoading')
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  store.dispatch('hideLoading')
  return response;
}, function (error) {

  return Promise.reject(error);
});

Vue.prototype.$http=axios;

const router=new Vuerouter({
  mode:'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template:"<Layout/>",
  components: { Layout }
})
