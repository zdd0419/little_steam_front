import { request } from './request';

export function getDetail(id) {
    return request({
        url: '/mall/games/' + id,

    })
}

export function getTags(id) {
    return request({
        url: '/mall/games/' + id + '/hot-tags',

    })
}

export function buyGame(gameid, data) {
    return request({
        url: '/mall/games/' + gameid + '/buy',
        method: 'post',
        data
    })
}
export function getComments(id){
    return request({
        url: '/mall/games/' + id + '/comments',
        method:'get',
    })
}
export function getFriendWishlist(user_id, game_id){
    return request({
        url:'/mall/games/' + game_id + '/friends_wishlist?uid=' + user_id,
        method:'get',
    })
}
export function getFriendWarehouse(user_id, game_id){
    return request({
        url:'/mall/games/' + game_id + '/friends_havegame?uid=' + user_id,
        method:'get',
    })
}

export function gameComment(game_id,data){
    return request({
        url:'/mall/games/' + game_id + '/user_comment',
        method:'post',
        data
    })
}
export function gameTag(data){
    return request({
        url: '/mall/category/',
        method:'post',
        data
    })
}
