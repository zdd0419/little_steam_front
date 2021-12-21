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
