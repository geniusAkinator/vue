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
import FactoryDetail from '@/views/factory/detail'
import SensorType from '@/views/sensor/type'
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
import Check from '@/views/check/index'
import Patrol from '@/views/patrol/index'
import Proute from '@/views/route/index'
import Ptype from '@/views/ptype/index'
import Plan from '@/views/plan/index'
import Project from '@/views/project/index'
import ProjectFirm from '@/views/project/firm'
import Menu from '@/views/menu/index'
import MenuSub from '@/views/menu/mindex'
import Record from '@/views/record/index'
import Nav from '@/views/nav/index'
import Teamer from '@/views/teamer/index'
import Employee from '@/views/employee/index'
import Post from '@/views/post/index'
import Building from '@/views/building/index'
import Floor from '@/views/floor/index'
import SensorDetail from '@/views/sensor/detail'
import Display from '@/views/display/index'
import DisplayInfo from '@/views/display/detail'
import Main from '@/views/main/index'
import Alarm from '@/views/alarm/index'
import AlarmDetail from '@/views/alarm/detail'
import Message from '@/views/message/index'
import Hazard from '@/views/hazard/index'
import HazardDetail from '@/views/hazard/detail'
import Notice from '@/views/notice/index'

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
      name: '主体管理',
      component: Home,
      children: [
        {
          path: 'factory',
          name: '工厂管理',
          component: Factory,
        },
        {
          path: 'factoryDetail/:fId',
          name: '工厂详情',
          component: FactoryDetail,
        },
        {
          path: 'factoryBuilding/:fId/:fName',
          name: '楼宇管理',
          component: Building,
        },
        {
          path: 'floor/:bId/:bName',
          name: '楼层管理',
          component: Floor
        },
        {
          path: 'main',
          name: '平台主体',
          component: Main,
        }
      ]
    },
    {
      path: '/',
      name: '设备管理',
      component: Home,
      children: [
        {
          path: 'sensor',
          name: '传感器管理',
          component: Sensor
        },
        {
          path: 'sensorType',
          name: '传感器型号管理',
          component: SensorType
        },
        {
          path: 'sensorDetail/:sId',
          name: '传感器详情',
          component: SensorDetail
        },
        {
          path: 'display',
          name: '传感器信息',
          component: Display
        },
        {
          path: 'displayInfo/:sId/:sName',
          name: '传感器展示',
          component: DisplayInfo
        }
      ]
    },
    {
      path: '/',
      name: '单位管理',
      component: Home,
      children: [
        {
          path: 'teamer',
          name: '团队管理',
          component: Teamer,
        },
        {
          path: 'teamerMember/:dId/:dName',
          name: '团队成员管理',
          component: Employee
        },
      ]
    },
    {
      path: '/',
      name: '火警管理',
      component: Home,
      children: [
        {
          path: 'alarm',
          name: '火警预览',
          component: Alarm,
        },
        {
          path: 'alarmDetail',
          name: '火警详情',
          component: AlarmDetail,
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
      name: '安全管理',
      component: Home,
      children: [
        {
          path: 'patrol',
          name: '巡更分布管理',
          component: Patrol,
        },
        {
          path: 'proute',
          name: '巡更路线管理',
          component: Proute,
        },
        {
          path: 'ptype',
          name: '巡更类别管理',
          component: Ptype,
        },
        {
          path: 'plan',
          name: '巡更计划管理',
          component: Plan,
        },
        {
          path: 'project',
          name: '巡更项目',
          component: Project
        },
        {
          path: 'projectFirm',
          name: '维保厂商',
          component: ProjectFirm
        },
        {
          path: 'record',
          name: '巡检记录',
          component: Record
        },
      ]
    },
    {
      path: '/',
      name: '隐患管理',
      component: Home,
      children: [
        {
          path: 'hazard',
          name: '隐患总览',
          component: Hazard
        },
        {
          path: 'hazardDetail',
          name: '隐患详情',
          component: HazardDetail
        },
      ]
    },
    {
      path: '/',
      name: '信息管理',
      component: Home,
      children: [
        {
          path: 'post',
          name: '公告管理',
          component: Post
        },
      ]
    },
    {
      path: '/',
      name: '页面管理',
      component: Home,
      children: [
        {
          path: 'nav',
          name: '默认导航',
          component: Nav
        },
      ]
    },
    {
      path: '/',
      name: '信息管理',
      component: Home,
      children: [
        {
          path: 'message',
          name: '消息中心',
          component: Message
        },
      ]
    },
    {
      path: '/',
      name: '统计管理',
      component: Home,
      children: [
        {
          path: 'check',
          name: '系统体检',
          component: Check
        },
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
      children: [
        {
          path: 'menu',
          name: '栏目管理',
          component: Menu
        },
        {
          path: 'menuSub/:pId/:pName',
          name: '菜单管理',
          component: MenuSub
        },
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
        {
          path: 'notice',
          name: '通知管理',
          component: Notice
        },
      ]
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
