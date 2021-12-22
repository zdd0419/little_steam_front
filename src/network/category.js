import { request } from './request';

export function getCategory() {
    return request({
        url: '/api/index',

    })
}

export function getCategoryGoods(order = 'sales', cid = 0) {
    return request({
        url: '/mall/',
    })
}
export function searchGoods(title) {
    return request({
        url: '/mall/search?search=' + title,
    })
}