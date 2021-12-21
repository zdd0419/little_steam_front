import {getCart, getWish} from '../network/cart'
const actions = {
    updateCart({ commit }) {
        getCart().then(res => {
            commit('addCart', { count: res.data.length || 0 })
        })
    },
    updateWish({ commit }) {
        getWish().then(res => {
        commit('addWish', { count: res.data.length || 0 })
        })
}
}

export default actions;