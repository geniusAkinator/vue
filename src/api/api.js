
import http from '@/utils/http'

export const getFactoryGeo = params => {
    return http.getRequest({
        url: '/factory/map',
        data: params
    }).then(res => res);
};

export const getFactoryCal = params => {
    return http.getRequest({
        url: '/factory/calendar',
        data: params
    }).then(res => res);
};

export const getFactoyData = params => {
    return http.getRequest({
        url: '/factory/data',
        data: params
    }).then(res => res);
};

export const getSensorData = params => {
    return http.getRequest({
        url: '/sensor/data',
        data: params
    }).then(res => res);
};

export const getRealtimeData = params => {
    return http.getRequest({
        url: '/realtime/data',
        data: params
    }).then(res => res);
};

export const getRealtimeStatus = params => {
    return http.getRequest({
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
    return http.getRequest({
        url: '/proute/data',
        data: params
    }).then(res => res);
};

export const getTypeData = params => {
    return http.getRequest({
        url: '/proute/typeData',
        data: params
    }).then(res => res);
};


/**
 * 栏目菜单
 */
export const getMenuData = params => { //获取菜单列表
    return http.getRequest({
        url: '/Menu/menuList',
        data: params,
    }).then(res => res);
};

export const addMenuData = params => { //添加菜单
    return http.getRequest({
        url: '/Menu/addMenu',
        data: params,
        method: "POST"
    })
}

export const delMenuData = params => { //删除菜单
    return http.getRequest({
        url: '/Menu/deleteMenu',
        data: params,
        method: "DELETE"
    })
}

export const getMenuDetail = params => { //获取菜单列表
    return http.getRequest({
        url: '/Menu/menuListDetail',
        data: params,
    }).then(res => res);
};

export const updateMenuData = params => { //更新菜单信息
    return http.getRequest({
        url: '/Menu/updateMenu',
        data: params,
        method: "PUT"
    }).then(res => res);
}