import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import wishcar from "@/views/wishlist/wishcar";
import myOrder from "@/views/order/myOrder";
import buy from "@/views/detail/buy";
import pay from "@/views/detail/pay";
import denote from "@/views/detail/denote";
const index = () =>
    import ('../views/home/index.vue')
const category = () =>
    import ('../views/category/category.vue')
const detail = () =>
    import ('../views/detail/detail.vue')
const profile = () =>
    import ('../views/profile/profile.vue')
const shopcart = () =>
    import ('../views/shopcart/shopcart.vue')
const register = () =>
    import ('../views/profile/register.vue')
const login = () =>
    import ( /* webpackChunkName: "about" */ '../views/profile/login.vue')
const sane = () =>
    import ( /* webpackChunkName: "about" */ '../views/profile/sane.vue')
const routes = [{
        path: '',
        name: 'index',
        component: index,
        meta: {
            title: 'SANE GAME-轮播',
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            title: 'SANE GAME-首页',
            keepAlive: true
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue'),
        meta: {
            title: 'SANE GAME-浏览',

        }
    }, {
        path: '/category',
        name: 'category',
        component: category,
        meta: {
            title: 'SANE GAME-分类',

        }
    }, {
        path: '/detail',
        name: 'detail',
        component: detail,
        meta: {
            title: 'SANE GAME-商品详情',

        }
    }, {
        path: '/profile',
        name: 'profile',
        component: profile,
        meta: {
            title: 'SANE GAME-个人中心',
            isAuthRequired: true
        }
    }, {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: 'SANE GAME-注册'
        }
    }, {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: 'SANE GAME-登录'
        }
    }, {
        path: '/login/sane',
        name: 'sane',
        component: sane,
        meta: {
            title: 'SANE GAME-SANE账号登录'
        }
    }, {
        path: '/shopcart',
        name: 'shopcart',
        component: shopcart,
        meta: {
            title: 'SANE GAME-购物车',
            isAuthRequired: true,
            // keepAlive: true
        }
    },
    {
        path: '/wishcar',
        name: 'wishcar',
        component: wishcar,
        meta: {
            title: 'SANE GAME-心愿单',
            isAuthRequired: true,
            // keepAlive: true
        }
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        component: myOrder,
        meta: {
            title: 'SANE GAME-订单',
            isAuthRequired: true,
            // keepAlive: true
        }
    },
    {
        path: '/buy',
        name: 'buy',
        component: buy,
        meta: {
            title: 'SANE GAME-购买',
            isAuthRequired: true,
            // keepAlive: true
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: pay,
        meta: {
            title: 'SANE GAME-支付',
            isAuthRequired: true,
            // keepAlive: true
        }
    },
    {
        path: '/denote',
        name: 'denote',
        component: denote,
        meta: {
            title: 'SANE GAME-赠送好友',
            isAuthRequired: true,
            // keepAlive: true
        }
    },
    {
        path: '/friends',
        name: 'friends',
        component: denote,
        meta: {
            title: 'SANE GAME-好友圈',
            isAuthRequired: true,
            // keepAlive: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router