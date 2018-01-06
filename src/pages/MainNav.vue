<template>
    <div class="main-nav">
        <header>
            <ul>
                <li @click="handleSelect('index')">
                    <img src="../assets/favicon.jpg" alt="" class="logo">
                    <span style="padding: 0 10px; font-size: 20px;">金句猫</span>
                </li>
                <li class="active-tag" @click="handleSelect('index')">首页</li>


                <li style="float: right" v-if="isLogined">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link" style="color: #f90">
                            头像
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li style="float: right;padding-left:0;" v-if="!isLogined">
                    <el-button type="success" round @click="gotoLogin()">登录/注册</el-button>
                </li>
                <li style="float: right" v-if="isLogined">
                    <el-button type="danger" round icon="el-icon-edit" @click="publishClick()">发表</el-button>
                </li>
            </ul>
        </header>
        <router-view/>
        <footer>
            <div class="footer-container">
                <div class="footer-info">
                    <div style="font-size: 20px;margin-bottom:10px;">金句猫 - 最专业、最内涵的短句子平台</div>
                    <div>
                        微信：www_jinjumao_club
                        <el-button type="primary" size="small">关注</el-button>
                    </div>
                    <div>
                        微博：金句猫
                        <el-button type="primary" size="small" @click="concernWeibo()">关注</el-button>
                    </div>
                </div>

                <div class="footer-link">
                    <div>
                        <span @click="gotoAboutPage()" style="cursor:pointer;padding-right: 6px;">关于我们</span>
                        <span style="cursor:pointer;padding-right: 6px;">联系方式</span>
                        <span style="cursor:pointer;padding-right: 6px;">意见反馈</span>
                        <span style="cursor:pointer;padding-right: 6px;">友情链接</span>
                    </div>
                    <div>
                        <span>金句猫 ©2017 Designed & Developed by aguang & likai</span>
                    </div>
                </div>

                <div style="clear:both;"></div> 
            </div>

        </footer>
    </div>
</template>

<script>
    import UserInterface from "@/interface/UserInterface";

    export default {
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                activeIndex: sessionStorage.getItem('tabActive') || 'index',
                isLogined: false,
            }
        },
        mounted() {
            if (this.userInfo) {
                this.isLogined = true;
            }
        },
        methods: {

            //选择顶部tab
            handleSelect(key) {
                sessionStorage.setItem('tabActive', key);
                if (key === 'index') {
                    this.$router.push({path: '/index/jinjuList'});
                }
            },

            //点击头像下拉
            handleCommand(command) {
                if (command === 'userInfo') {
                    this.$router.push({path: '/index/userInfo'});
                } else if (command === 'logout') {
                    this.logout();
                }
            },

            //退出登录
            logout() {
                sessionStorage.removeItem('userInfo');
                UserInterface.logout(this.userInfo.userId).then(data => {
                    this.$message.success('退出成功');
                this.$router.push({path: '/login'});
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            //发表
            publishClick() {
                this.$router.push({path: '/index/publishMain'});
            },

            //进入关于页面
            gotoAboutPage(index){
                this.$router.push({path: '/index/AboutUsNav/AboutUsPage'});
            },

            //登录/注册
            gotoLogin(){
                this.$router.push({path: '/login'});
            },

            concernWeibo(){
                window.open('https://weibo.com/6432902837');
            }
        }
    }
</script>

<style scoped>

    .main-nav {

    }

    header {
        line-height: 60px;
        color: #F7F8FA;
        background-color: rgb(84, 92, 100);
    }

    header ul {
        margin: 0;
        padding: 0;
    }

    header li {
        list-style: none;
        line-height: 60px;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
    }

    header .logo {
        height: 60px;
        vertical-align: middle;
    }

    .active-tag {
        color: #f90;
        border-bottom: 2px solid #f90;
    }

    footer {
        color: #F7F8FA;
        background-color: rgb(84, 92, 100);
        /* background-image: -webkit-linear-gradient(to top, rgb(84, 92, 100), #cf9);
        background-image: linear-gradient(to top, rgb(84, 92, 100), #cf9); */
    }

    .footer-container {
        width: 1000px;
        margin: auto;
        padding: 16px 0;
        line-height: 40px;
    }

    .footer-info{
        width: 400px;
        margin: 0 20px 0 60px;
        float:left;
        border-right: 1px solid #ddd;
    }

    .footer-link{
        width: 400px;
        margin: 0 20px;
        float:left;
    }
</style>
