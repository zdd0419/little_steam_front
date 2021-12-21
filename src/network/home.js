import { request } from './request';

// 获得所有的商品信息
export function getHomeAllData() {
    return request({
        url: '/mall/',
    })
}
export function getBanner() {

}

export function getHomeGoods(type) {
    console.log('/mall/category?cname' + type)
    return request({
        url: '/mall/category?cname=' + type,
    })
}