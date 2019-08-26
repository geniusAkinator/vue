
import http from '@/utils/http'

let base = '';

export const getFactoryGeo = params => { return http.getRequest({ url: '/factory/map', data: params }).then(res => res.data); };

export const getFactoryCal = params => { return http.getRequest({ url: '/factory/calendar', data: params }).then(res => res.data); };