// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuerouter from 'vue-router'
import Layout from './components/Layout.vue'
// import VueResource  from 'vue-resource'
import routes from './router/index'
import store from './store/store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//VUE-Beauty
// import 'vue-beauty/package/style/vue-beauty.min.css'
// import vueBeauty from 'vue-beauty'
import filters from './filters'

import axios from 'axios'
import VueAxios from 'Vue-axios'
//引入图标库
import VueIconFont from 'vue-icon-font'
import './common/css/fonts/iconfont.css'
import './common/css/fonts/iconfont.js'
//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


Vue.use(ElementUI)
// Vue.use(vueBeauty)
//过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
import $ from 'jquery'

import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(VueIconFont)
Vue.use(VueAxios,axios)//注册
// Vue.use(VueResource)
Vue.use(Vuerouter)

axios.interceptors.request.use(function (config) {  //配置发送请求的信息,添加access_token信息

  store.dispatch('showLoading')
  const temp_token=JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['access_token']:""
  if (temp_token!="") {
      config.url +="?access_token="+temp_token ;
  }
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

// Vue.prototype.$http=axios;

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
