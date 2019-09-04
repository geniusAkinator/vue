// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import ElementUI from 'element-ui' //新添加
import 'element-ui/lib/theme-chalk/index.css' //新添加，避免后期打包样式不同，要放在import App from './App';之前
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'
import 'element-ui/lib/theme-chalk/base.css'      // fade/zoom 等
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import Router from 'vue-router'
import Directives from '@/directives/globalDirective'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from "axios"
import vueJsonp from 'vue-jsonp'

require('@/mock/mock')
require('moment')

Vue.prototype.$layer = layer(Vue)
Vue.prototype.$axios = axios;
Vue.config.devtools = true;
Vue.use(ElementUI)  
Vue.use(VueQuillEditor)
Vue.use(vueJsonp)
Vue.config.productionTip = false
Vue.component(CollapseTransition.name, CollapseTransition)

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
  if (user && to.path == '/') {
    next({ path: '/desktop' })
  } else {
    next()
  }
})

Vue.prototype.globalClick = function (callback) {
  document.body.onclick = function (e) {
    callback(e);
  };
};

Object.keys(Directives).forEach(key => {   //全局指令
  Vue.directive(key, Directives[key])
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
