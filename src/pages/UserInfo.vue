<template>
    <div class="user-container">
        <el-form label-width="100px" class="info-form">
            <el-upload
                class="avatar-uploader"
                action="http://upload.qiniup.com"
                :show-file-list="false"
                :data="postData"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item>
                <h4 style="color: #f90;margin: 0;">{{joinTime}}入网，在网时长{{diffDay || '0小时'}}</h4>
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

    export default {
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                infoDetail: {},
                joinTime: '',
                diffDay: '',

                imageUrl: '',
                postData:{
                    token: 'aI9GR6VbK_5gu3kwDj-eTFny-1Hi4sucXf5mQkeg:28x3c--LOhWr6E_R2qP9k_njr9I=:eyJzY29wZSI6Imppbmp1bWFvIiwiZGVhZGxpbmUiOjE1MTU4NTc3NTJ9'
                }
            }
        },
        mounted() {
            if (!this.userInfo) {
                this.$message.error('亲，先登陆吧～');
                return;
            }
            this.getUserInfo();
        },
        methods: {

            //获取用户信息
            getUserInfo() {
                UserInterface.getUserInfo(this.userInfo.userId).then(data => {
                    this.infoDetail = data;
                    this.joinTime = formatTime.getLocalTime(this.infoDetail.createTime);
                    this.diffDay = formatTime.getDiffDay(this.infoDetail.createTime);
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            //修改
            updateInfo() {
                if (!this.userInfo) {
                    this.$message.error('亲，先登陆吧～');
                    return;
                }
                UserInterface.updateUser(this.infoDetail).then(data => {
                    this.$message.success(data);
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

//                if (!isJPG) {
//                    this.$message.error('上传头像图片只能是 JPG 格式!');
//                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>

    .user-container {
        min-height: 750px;
        max-width: 1000px;
        margin: 20px auto;
        padding: 50px 0;
        background-color: #fff;
    }

    .info-form > label {
        color: #f90;
    }

    .info-form {
        max-width: 600px;
        margin: auto;
    }

    .avatar-uploader{
        width: 100px;
        margin: 20px auto;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
        border-radius: 50px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
        border-radius: 50px;
        display: block;
    }
</style>
