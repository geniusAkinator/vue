/**
 * http请求
 */
import http from '@/utils/http'
import request from '@/utils/service'

export const getFactoryGeo = params => {
    return request({
        url: '/factory/map',
        data: params
    }).then(res => res);
};

export const getFactoryCal = params => {
    return request({
        url: '/factory/calendar',
        data: params
    }).then(res => res);
};

export const getRealtimeData = params => {
    return request({
        url: '/realtime/data',
        data: params
    }).then(res => res);
};

export const getRealtimeStatus = params => {
    return request({
        url: '/realtime/status',
        data: params
    }).then(res => res);
};

export const getCoo = params => {
    return http.getRequestJsonp({  //jsonp获取数据
        url: 'http://api.map.baidu.com/place/v2/suggestion',
        data: params,
    }).then(res => res);
};

export const getRouteData = params => {
    return request({
        url: '/proute/data',
        data: params
    }).then(res => res);
};

export const getTypeData = params => {
    return request({
        url: '/proute/typeData',
        data: params
    }).then(res => res);
};


/**
 * 栏目菜单
 */
export const getMenuData = params => { //获取菜单列表
    return request({
        url: '/Menu/menuList',
        params: params,
        method: 'GET',
    })
};

export const addMenuData = params => { //添加菜单
    return request({
        url: '/Menu/addMenu',
        data: params,
        method: "POST"
    })
}

export const delMenuData = params => { //删除菜单
    return request({
        url: '/Menu/deleteMenu',
        params: params,
        method: "DELETE"
    })
}

export const getMenuDetail = params => { //获取菜单列表
    return request({
        url: '/Menu/menuDetail',
        params: params,
        method: 'GET',
    }).then(res => res);
};

export const updateMenuData = params => { //更新菜单信息
    return request({
        url: '/Menu/updateMenu',
        data: params,
        method: "PUT"
    }).then(res => res);
}

/**
 * 角色管理
 */

export const addRoleData = params => { //添加角色
    return request({
        url: '/role/addRole',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const getRoleData = params => { //获取角色列表
    return request({
        url: '/role/roleList',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const delRoleData = params => {  //删除角色
    return request({
        url: '/role/deleteRole',
        params: params,
        method: "DELETE"
    }).then(res => res);
}

export const getRoleDetail = params => { //获取菜单列表
    return request({
        url: '/role/roleDetail',
        params: params,
        method: 'GET',
    }).then(res => res);
};

export const updateRoleData = params => { //更新菜单信息
    return request({
        url: '/role/updateRole',
        data: params,
        method: "PUT"
    }).then(res => res);
}

export const getCheckedMenuData = params => { //获取
    return request({
        url: '/role/getCheckedMenuData',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const getAllMenuData = params => {
    return request({
        url: '/Menu/allMenuList',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const updateCheckedMenuData = params => { //修改角色菜单
    return request({
        url: '/role/updateMenu',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const getAllRoleData = params => { //获取所有角色信息（不分页）
    return request({
        url: '/role/allRole',
        params: params,
        method: 'GET',
    }).then(res => res);
};


/**
 * 用户管理
 */


export const getUserData = params => { //获取用户列表
    return request({
        url: '/user/userList',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const delUserData = params => {  //删除用户
    return request({
        url: '/user/deleteUser',
        params: params,
        method: "DELETE"
    }).then(res => res);
}

export const addUserData = params => { //添加用户
    return request({
        url: '/user/addUser',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const updateUserData = params => { //更新用户
    return request({
        url: '/user/updateUser',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const updateUserPwd = params => {//修改用户密码
    return request({
        url: '/user/setPwd',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const getUserDetail = params => { //获取用户信息
    return request({
        url: '/user/userDetail',
        params: params,
        method: "GET"
    }).then(res => res);
};

export const getAccountIsExist = params => { //根据account name查询是否存在
    return request({
        url: '/user/isFound',
        params: params,
        method: "GET"
    }).then(res => res);
}

/**
 *我的桌面 
 */
export const getAllData = params => { //获取所有统计数据
    return request({
        url: '/index/allData',
        params: params,
        method: "GET"
    }).then(res => res);
}

/**
 * 信息管理-工厂管理 
 */
export const getFactoryData = params => { //获取工厂信息
    return request({
        url: '/factory/findAllFactory',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const delFactoryData = params => {  //删除工厂信息
    return request({
        url: '/factory/deleteFactory',
        params: params,
        method: "DELETE"
    }).then(res => res);
}

export const updateFactoryData = params => { //修改工厂信息
    return request({
        url: '/factory/updateFactory',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const addFactoryData = params => { //添加工厂
    return request({
        url: '/factory/addFactory',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const getFactoryDetail = params => { //获取工厂详情
    return request({
        url: '/factory/factoryDetail',
        params: params,
        method: "GET"
    }).then(res => res);
}


/**
 *信息管理-传感器管理 
 */
export const getSensorData = params => { //获取传感器信息
    return request({
        url: '/transducer/transducerList',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const getSensorDetail = params => { //获取传感器详情
    return request({
        url: '/transducer/transducerDetail',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const updateSensorData = params => { //修改传感器信息
    return request({
        url: '/transducer/updateTransducer',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const delSensorData = params => {  //删除传感器
    return request({
        url: '/transducer/deleteTransducer',
        params: params,
        method: "DELETE"
    }).then(res => res);
}

export const addSensorData = params => { //添加传感器
    return request({
        url: '/transducer/addTransducer',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const getPCD = params => { //获取城市级联
    return request({
        url: '/pcd/address',
        params: params,
        method: "GET"
    }).then(res => res);
}

/**
 * 传感器类型 
 */
export const addSensorTypeData = params => { //添加传感器类型 
    return request({
        url: '/transducerType/addTransducerType',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const getSensorTypeData = params => { //获取传感器类型信息
    return request({
        url: '/transducerType/transducerTypeList',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const getAllSensorTypeData = params => { //获取传感器类型信息（不分页）
    return request({
        url: '/transducerType/transducerTypeAll',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const delSensorTypeData = params => {  //删除传感器类型信息
    return request({
        url: '/transducerType/deleteTransducerType',
        params: params,
        method: "DELETE"
    }).then(res => res);
}

export const getSensorTypeDetail = params => { //获取传感器类型详情
    return request({
        url: '/transducerType/transducerTypeDetail',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const updateSensorTypeData = params => { //修改传感器类型信息
    return request({
        url: '/transducerType/updateTransducerType',
        data: params,
        method: "POST"
    }).then(res => res);
}

/**
 *报警标准
 */

export const getStandardDetail = params => {
    return request({
        url: '/standard/transducerTypeListByTtId',
        params: params,
        method: "GET"
    }).then(res => res);
}

export const updateStandardData = params => { //修改传感器类型预警标准
    return request({
        url: '/standard/updateStandard',
        data: params,
        method: "POST"
    }).then(res => res);
}

export const delStandardData = params => {  //删除传感器类型预警标准
    return request({
        url: '/standard/deleteStandard',
        params: params,
        method: "DELETE"
    }).then(res => res);
}
