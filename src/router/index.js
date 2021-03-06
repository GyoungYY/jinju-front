// import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//
// import Login from '@/pages/Login'
// import MainNav from '@/pages/MainNav'
// import UserInfo from '@/pages/UserInfo'
// import JinjuList from '@/pages/JinjuList'
// import JinjuDetail from '@/pages/JinjuDetail'
// import PublishMain from '@/pages/PublishMain'
//
// import AboutUsNav from '@/pages/about/AboutUsNav'
// import AboutUsPage from '@/pages/about/AboutUsPage'
// import ContactUs from '@/pages/about/ContactUs'
// import FeedBack from '@/pages/about/FeedBack'
// import FriendLink from '@/pages/about/FriendLink'
//
// import ArticleList from '@/pages/article/ArticleList'
// import ArticleDetail from '@/pages/article/ArticleDetail'
//
// import UserPage from '@/pages/user/UserPage'
//
// import ChatRoom from '@/pages/chat/ChatRoom'

const Login = () => import('@/pages/Login')
const MainNav = () => import('@/pages/MainNav')
const UserInfo = () => import('@/pages/UserInfo')
const JinjuList = () => import('@/pages/JinjuList')
const JinjuDetail = () => import('@/pages/JinjuDetail')
const PublishMain = () => import('@/pages/PublishMain')
const AboutUsNav = () => import('@/pages/about/AboutUsNav')
const AboutUsPage = () => import('@/pages/about/AboutUsPage')
const ContactUs = () => import('@/pages/about/ContactUs')
const FeedBack = () => import('@/pages/about/FeedBack')
const FriendLink = () => import('@/pages/about/FriendLink')
const ArticleList = () => import('@/pages/article/ArticleList')
const ArticleDetail = () => import('@/pages/article/ArticleDetail')
const UserPage = () => import('@/pages/user/UserPage')
const ChatRoom = () => import('@/pages/chat/ChatRoom')

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

                {
                    path:'articleList',
                    name: 'ArticleList',
                    component: ArticleList
                },
                {
                    path:'articleDetail/:id',
                    name: 'ArticleDetail',
                    component: ArticleDetail
                },

                {
                    path: 'userPage/:id',
                    name: 'UserPage',
                    component: UserPage
                },

                {
                    path: 'chatroom',
                    name: 'ChatRoom',
                    component: ChatRoom
                },
            ]
        },
    ]
})
