import { request } from './request';


export function register(data) {
    return request({
        url: '/api/auth/register',
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
        url: '/users/warehouse'+userid,
        method: 'get'
    })
}

export function putUserinfo(data) {
    return request({
        url: '/api/user' + '?name=' + data,
        method: 'put'
    })
}