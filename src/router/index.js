import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/pages/Login'
import MainNav from '@/pages/MainNav'
import UserInfo from '@/pages/UserInfo'
import JinjuList from '@/pages/JinjuList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'MainNav',
            component: MainNav,
            redirect: '/index/jinjuList',
            children: [
                {
                    path: 'userInfo',
                    name: 'userInfo',
                    component: UserInfo
                },
                {
                    path: 'jinjuList',
                    name: 'JinjuList',
                    component: JinjuList
                }
            ]
        },
    ]
})
