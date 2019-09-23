
import http from '@/utils/http'

let base = '';

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