<template>
    <div>
        <header>
            <ul>
                <li @click="handleSelect('index')">
                    <img src="../assets/favicon.jpg" alt="" class="logo">
                    <span style="padding: 0 10px; font-size: 20px;">金句猫</span>
                </li>
                <li class="active-tag" @click="handleSelect('index')">首页</li>
                <li style="float: right">
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
            </ul>
        </header>
        <router-view/>
        <footer class="toTop">
            <div>
                <span>关于我们</span>
                <span>联系方式</span>
            </div>
            <div>
                <span>©2017 Design & Development by aguang</span>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: sessionStorage.getItem('tabActive') || 'index',
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
            handleCommand(command){
                if(command === 'userInfo'){
                    this.$router.push({path: '/index/userInfo'});
                } else if(command === 'logout'){
                    this.logout();
                }
            },

            //退出登录
            logout(){
                localStorage.removeItem('userInfo');
                this.$message.success('退出成功');
                this.$router.push({path: '/login'});
            }
        }
    }
</script>

<style scoped>
    header {
        line-height: 60px;
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
        text-align: center;
        font-size: 14px;
    }
    footer > div{
        line-height: 40px;
    }
    .toTop {
        background-image: -webkit-linear-gradient(to top, rgb(84, 92, 100), #cf9);
        background-image: linear-gradient(to top,rgb(84, 92, 100), #cf9);
    }
</style>
