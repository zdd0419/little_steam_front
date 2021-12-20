import { request } from './request';

export function getHomeAllData() {
    return request({
        url: '/api/index',

    })
}
export function getBanner() {

}

export function getHomeGoods(id = 1, type = 'category_id') {
    return request({
        url: '/api/goods?' + type + '=' + id,
    })
}