
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