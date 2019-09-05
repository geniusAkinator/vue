import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Error from '@/views/error'
import Desktop from '@/views/desktop/index'
import Realtime from '@/views/realtime/index'
import Factory from '@/views/factory/index'
import Sensor from '@/views/sensor/index'
import Statistic from '@/views/statistic/index'
import FactoryAdd from '@/views/factory/add'
import SensorAdd from '@/views/sensor/add'
import SensorType from '@/views/sensor/type'
import SensorTypeAdd from '@/views/sensor/typeAdd'
import RealtimeDetail from '@/views/realtime/detail'
import Role from '@/views/role/index'
import User from '@/views/user/index'
import Syslog from '@/views/syslog/index'
import Sysset from '@/views/sysset/index'
import Update from '@/views/update/index'
import Help from '@/views/help/index'
import Worker from '@/views/worker/index'
import Member from '@/views/member/index'
import Bind from '@/views/bind/index'
import Platform from '@/views/platform/index'
import RoleAdd from '@/views/role/add'

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
      path: '/platform',
      name: '平台',
      component: Platform,
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
        {
          path: 'realtimeDetail',
          name: '实时监控详情',
          component: RealtimeDetail,
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
      name: '成员管理',
      component: Home,
      children: [
        {
          path: 'member',
          name: '工厂成员管理',
          component: Member,
        },
        {
          path: 'bind',
          name: '绑定管理',
          component: Bind,
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
          name: '统计报表',
          component: Statistic
        },
      ]
    },
    {
      path: '/',
      name: '系统管理',
      component: Home,
      leaf: true,//只有一个节点
      children: [
        {
          path: 'role',
          name: '角色管理',
          component: Role
        },
        {
          path: 'roleAdd',
          name: '新增角色',
          component: RoleAdd
        },
        {
          path: 'user',
          name: '用户管理',
          component: User
        },
        {
          path: 'syslog',
          name: '系统日志',
          component: Syslog
        },
        {
          path: 'sysset',
          name: '系统配置',
          component: Sysset
        },
        {
          path: 'worker',
          name: '计划任务',
          component: Worker
        },
        {
          path: 'update',
          name: '系统维护',
          component: Update
        },
        {
          path: 'help',
          name: '系统帮助',
          component: Help
        },
      ]
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
