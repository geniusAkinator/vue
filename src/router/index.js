import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Error from '@/views/error'
import Desktop from '@/views/desktop/desktop'
import Realtime from '@/views/realtime/index'
import Factory from '@/views/factory/index'
import Sensor from '@/views/sensor/index'
import Statistic from '@/views/statistic/index'
import FactoryAdd from '@/views/factory/add'
import SensorAdd from '@/views/sensor/add'
import SensorType from '@/views/sensor/type'
import SensorTypeAdd from '@/views/sensor/typeAdd'

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
      children: [
        {
          path: 'desktop',
          name: '桌面',
          component: Desktop
        },
      ]
    },
    {
      path: '/',
      name: '监控管理',
      component: Home,
      children: [
        {
          path: 'realtime',
          name: '实时监控',
          component: Realtime,
        },
      ]
    },
    {
      path: '/',
      name: '信息管理',
      component: Home,
      children: [
        {
          path: 'factory',
          name: '工厂首页',
          component: Factory,
        },
        {
          path: 'sensor',
          name: '传感器首页',
          component: Sensor
        },
        {
          path: 'factoryAdd',
          name: '工厂添加',
          component: FactoryAdd
        },
        {
          path: 'sensorAdd',
          name: '传感器添加',
          component: SensorAdd
        },
        {
          path: 'sensorType',
          name: '传感器类别',
          component: SensorType
        },
        {
          path: 'sensorTypeAdd',
          name: '传感器类别添加',
          component: SensorTypeAdd
        },
      ]
    },
    {
      path: '/',
      name: '统计管理',
      component: Home,
      leaf: true,//只有一个节点
      children: [
        {
          path: 'statistic',
          name: '统计首页',
          component: Statistic
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
