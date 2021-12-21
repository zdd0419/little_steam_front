import { request } from './request';


//添加购物车
export function addCart(data) {
    return request({
        url: '/users/cart',
        method: 'post',
        data
    })
}
//修改购物车
export function modifyCart(id, data) {
    return request({
        url: `/api/carts/${id}`,
        method: 'put',
        data
    })
}
//选择商品状态 checked
export function checkedCart(data) {
    return request({
        url: '/api/carts/checked',
        method: 'patch',
        data
    })
}
//获取购物车列表
export function getCart(uid) {
    return request({
        url: '/users/cart/' + uid,

    })
}
//删除购物车
export function deleteCartItem(id) {
    return request({
        url: `/api/carts/${id}`,
        method: 'delete',
    })
}
export  function getWish(uid){
    return request({
        url: '/users/wishlist/' + uid,
        method:'get',

    })
}
export  function  addWish(data){
    return request({
        url: '/users/wishlist',
        method: 'post',
        data
    })
}

export  function getOrder(uid){
    return request({
        url: '/users/' + uid + '/orderlist',
        method:'get',

    })
}