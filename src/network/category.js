import { request } from './request';

export function getCategory() {
    return request({
        url: '/api/index',

    })
}

export function getCategoryGoods(order = 'sales', cid = 0, page = 1) {
    return request({
        url: '/api/goods?category_id=' + cid + '&page=' + page + '&' + order + '=1',

    })
}
export function searchGoods(title) {
    return request({
        url: '/api/goods?title=' + title,
    })
}