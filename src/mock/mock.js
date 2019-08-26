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
  'data|10-20': [
    {
      'id|+1': 1,
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

// let edata = [];
// edata = Mock.mock({
//   'code':0,
//   'data|10-20':{
//     'id':'@increasement',
//     'region':'@cword',
//     'position':'@cword',
//     'status|0-3':0
//   }
// })
// Mock.mock()