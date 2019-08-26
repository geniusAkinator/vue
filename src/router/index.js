import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Error from '@/views/error'
import Desktop from '@/views/desktop/desktop'
import Realtime from '@/views/realtime/index'
import Page from '@/views/realtime/page'
import Factory from '@/views/factory/index'
import Sensor from '@/views/sensor/index'
import Statistic from '@/views/statistic/index'

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
          path:'realtime',
          name:'测试',
          component:Realtime
        },
        {
          path:'page',
          name:'测试2',
          component:Page
        },
        {
          path:'factory',
          name:'工厂首页',
          component:Factory
        },
        {
          path:'sensor',
          name:'传感器首页',
          component:Sensor
        },
        {
          path:'statistic',
          name:'统计首页',
          component:Statistic
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
