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

export const getFactoyData = params => {
    return request({
        url: '/factory/data',
        data: params
    }).then(res => res);
};

export const getSensorData = params => {
    return request({
        url: '/sensor/data',
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
        url: '/Menu/menuListDetail',
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
        url: '/role/roleListDetail',
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
        method: "PUT"
    }).then(res => res);
}

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
