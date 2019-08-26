import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Error from '@/views/error'
import Desktop from '@/views/desktop/desktop'
import Form from '@/views/form/form'
import Page from '@/views/form/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      name: '404',
      component: Error,
      hidden: true
    },
    {
      path: '/',
      name: '首页',
      component: Home,
      leaf: true,//只有一个节点
      children:[
        {
          path:'desktop',
          name:'桌面',
          component:Desktop
        },
        {
          path:'form',
          name:'测试',
          component:Form
        },
        {
          path:'page',
          name:'测试2',
          component:Page
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
