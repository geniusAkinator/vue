
import http from '@/utils/http'

let base = '';

export const getFactoryGeo = params => { return http.getRequest({ url: '/factory/map', data: params }).then(res => res.data); };

export const getFactoryCal = params => { return http.getRequest({ url: '/factory/calendar', data: params }).then(res => res.data); };

export const getFactoyData = params => {return http.getRequest({ url: '/factory/data', data: params }).then(res => res.data); };

export const getSensorData = params => {return http.getRequest({ url: '/sensor/data', data: params }).then(res => res.data); };

export const getRealtimeData = params => {return http.getRequest({ url: '/realtime/data', data: params }).then(res => res.data); };

export const getRealtimeStatus = params => {return http.getRequest({ url: '/realtime/status', data: params }).then(res => res.data); };
