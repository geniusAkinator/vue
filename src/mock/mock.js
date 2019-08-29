import Mock from 'mockjs'
import moment from 'moment'

Mock.setup({
  timeout: '200-600'
})

const Random = Mock.Random

let mdata = [];
mdata = Mock.mock({
  'code': 0,
  'data|10': [
    {
      'id|+1': 1,
      'info': {
        'mid': '@id',
        'lng|100-120.5': 100.00000, //经度
        'lat|22-40.5': 22.22222,   //纬度
        'name': '@ctitle',
        'image': Random.image('200x100'),
        'area|0-400': 0,
        'createTime': '@datetime',
        'director': '@cword(5, 7)',
        'phone': /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
        'equipment': '@cword(3, 7)',
        'address': '@cword(5, 15)',
        'equipment|0-100': 0,
        'detector|0-100': 0,
        'online|0-100': 0,
        'outline|0-100': 0,
        'outline|0-100': 0,
      },
      'show': false
    },
  ],
  'msg': '请求成功'
})
Mock.mock('/factory/map', 'get', mdata)


let cdata = [];
cdata = Mock.mock({
  'code': 0,
  'data|10-100': [
    {
      'id|+1': 1,
      'cid': '@id',
      'reportCount|0-1':0,
      'errorCount|0-1':0,
      'outlineCount|0-1':0,
      'createTime': function () {
        return moment().subtract(this.id, 'days').format('YYYY-MM-DD')
      }
    }
  ],
  'msg': '请求成功'
})
Mock.mock('/factory/calendar', 'get', cdata)

let fdata = [];
fdata = Mock.mock({
  'code':0,
  'data|10-20':[
    {
      'id':'@increment',   //工厂ID
      'name':'@cword(3, 5)',       //工厂名称
      'address':'@cword(3, 5)',    //工厂地址
      'type|0-3':0,        // 工厂类型
      'images':Random.image('200x100'), //图片
      'tel':/^((\+86|\+86\-)|(86|86\-)|(0086|0086\-))?1[3|5|7|8]\d{9}$/, //工厂电话
      'introduction':'@sentence',     //公司简介
      'lng|100-120.5': 100.00000, //经度
      'lat|22-40.5': 22.22222,   //纬度
    }
  ]
})
Mock.mock('/factory/data', 'get', fdata)

let sdata = [];
sdata = Mock.mock({
  'code':0,
  'data|10-30':[
    {
      'id':'@increment',   //传感器ID
      'name':'@cword(3, 5)',       //传感器名称
      'type|0-5':0,             //类型
      'lng|100-120.5': 100.00000, //经度
      'lat|22-40.5': 22.22222,   //纬度
      'battery|0-100':0, //电量
      'expires':'@date("yyyy-MM-dd")'
    }
  ],
  'msg': '请求成功'
})

Mock.mock('/sensor/data', 'get', sdata)


let rdata = [];
rdata = Mock.mock({
  'code':0,
  'data|10-30':[
    {
      'id':'@increment',   //传感器ID
      'name':'@cword(3, 5)',       //传感器名称
      'type|0-5':0,             //类型
      'lng|100-120.5': 100.00000, //经度
      'lat|22-40.5': 22.22222,   //纬度
      'battery|0-100':0, //电量
      'expires':'@date("yyyy-MM-dd")',
      'status|0-3':0   //状态
    }
  ],
  'msg': '请求成功'
})
Mock.mock('/realtime/data', 'get', rdata)


let stdata = [];
stdata = Mock.mock({
  'code':0,
  'data|18':[
    {
      'id':'@increment', 
      
    }
  ],
  'msg': '请求成功'
})
Mock.mock('/realtime/status', 'get', stdata)
