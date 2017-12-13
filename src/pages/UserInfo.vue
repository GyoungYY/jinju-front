<template>
    <div style="min-height: 750px;">
        <el-form label-width="100px" class="info-form">
            <el-form-item>
                <h3 style="color: #f90;margin: 0;">{{joinTime}}入网，在网时长{{diffDay}}</h3>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="infoDetail.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="infoDetail.tel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="infoDetail.email"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="infoDetail.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateInfo()">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import UserInterface from "@/interface/UserInterface";
    import formatTime from "@/common/js/formatTime"
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";

    export default {
        components: {ElForm},
        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem('userInfo')),
                infoDetail: {},
                joinTime: '',
                diffDay: '',
            }
        },
        mounted() {
            if(!this.userInfo){
                this.$message.error('亲，先登陆吧～');
                return;
            }
            this.getUserInfo();
        },
        methods: {

            //获取用户信息
            getUserInfo() {
                UserInterface.getUserInfo(this.userInfo.user_id).then(data => {
                    this.infoDetail = data;
                    this.joinTime = formatTime.getLocalTime(this.infoDetail.create_time);
                    this.diffDay = formatTime.getDiffDay(this.infoDetail.create_time);
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            updateInfo() {

            },
        }
    }
</script>

<style scoped>
    .info-form > label {
        color: #f90;
    }

    .info-form {
        max-width: 600px;
        margin: 50px auto;
    }
</style>
