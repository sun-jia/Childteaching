// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuerouter from 'vue-router'
import Layout from './components/Layout.vue'
import VueResource  from 'vue-resource'
import routes from './router'

import store from './store/store'

Vue.use(VueResource)
Vue.use(Vuerouter)



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
