import { request } from './request';


export function register(data) {
    return request({
        url: '/register/',
        method: 'post',
        data
    })

}
export function login(data) {
    return request({
        url: '/login/',
        method: 'post',
        data
    })
}
export function logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post',

    })
}
export function getUser(userid) {
    return request({
        url: '/users/'+userid,
        method: 'get'
    })
}

export function getWarehouse(userid) {
    return request({
        url: '/users/warehouse/'+userid,
        method: 'get'
    })
}

export function getBalanceLog(userid) {
    return request({
        url: '/users/'+userid+'/balanceLog',
        method: 'get'
    })
}

export function putUserinfo(data) {
    return request({
        url: '/api/user' + '?name=' + data,
        method: 'put'
    })
}

export function friendID(user) {
    return request({
        url: '/users/'+ user+'/friends' ,
        method: 'get'
    })
}

export function addfriend(user, data) {
    return request({
        url: '/users/'+ user+'/newFriend' ,
        method: 'post',
        data
    })
}

export function changeFriendinfo(user, data) {
    return request({
        url: '/users/'+ user+'/change' ,
        method: 'put',
        data
    })
}

