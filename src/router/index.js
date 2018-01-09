import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/pages/Login'
import MainNav from '@/pages/MainNav'
import UserInfo from '@/pages/UserInfo'
import JinjuList from '@/pages/JinjuList'
import JinjuDetail from '@/pages/JinjuDetail'
import PublishMain from '@/pages/PublishMain'

import AboutUsNav from '@/pages/about/AboutUsNav'
import AboutUsPage from '@/pages/about/AboutUsPage'
import ContactUs from '@/pages/about/ContactUs'
import FeedBack from '@/pages/about/FeedBack'
import FriendLink from '@/pages/about/FriendLink'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            redirect: '/index/jinjuList'
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
                },
                {
                    path: 'JinjuDetail/:id',
                    name: 'JinjuDetail',
                    component: JinjuDetail
                },
                {
                    path: 'publishMain',
                    name: 'PublishMain',
                    component: PublishMain,
                    children: [

                    ]
                },
                {
                    path:'AboutUsNav',
                    name: 'AboutUsNav',
                    component: AboutUsNav,
                    children: [
                        {
                            path: 'AboutUsPage',
                            name: 'AboutUsPage',
                            component: AboutUsPage
                        },
                        {
                            path: 'ContactUs',
                            name: 'ContactUs',
                            component: ContactUs
                        },
                        {
                            path: 'FeedBack',
                            name: 'FeedBack',
                            component: FeedBack
                        },
                        {
                            path: 'FriendLink',
                            name: 'FriendLink',
                            component: FriendLink
                        },
                    ]
                },
            ]
        },
    ]
})
