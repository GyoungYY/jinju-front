<template>
    <div class="user-container">
        <el-form label-width="100px" class="info-form">
            <el-upload
                class="avatar-uploader"
                action="http://upload-z0.qiniup.com"
                :show-file-list="false"
                :data="postData"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item class="join-time">
                <h4 style="color: #f90;margin-right: 100px;">{{joinTime}}入网，在网时长{{diffDay || '0小时'}}</h4>
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
            <el-form-item label="所在地：">
                <el-select v-model="selectedProvId" placeholder="请选择省" class="select-address" @change="provChange">
                    <el-option
                        v-for="item in provinces"
                        :key="item.areaCode"
                        :label="item.areaName"
                        :value="item.areaCode">
                    </el-option>
                </el-select>
                <el-select v-model="selectedCityId" placeholder="请选择市" class="select-address" @change="cityChange">
                    <el-option
                        v-for="item in citys"
                        :key="item.areaCode"
                        :label="item.areaName"
                        :value="item.areaCode">
                    </el-option>
                </el-select>
                <el-select v-model="selectedAreaId" placeholder="请选择区" class="select-address">
                    <el-option
                        v-for="item in areas"
                        :key="item.areaCode"
                        :label="item.areaName"
                        :value="item.areaCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="infoDetail.addrDetail" placeholder="请输入详细地址" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateInfo()">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import UserInterface from "@/interface/UserInterface";
    import QiniuInterface from "@/interface/QiniuInterface";
    import formatTime from "@/common/js/formatTime";

    export default {
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
                infoDetail: {},
                joinTime: "",
                diffDay: "",

                imageUrl: "",
                postData: {
                    token:
                        "aI9GR6VbK_5gu3kwDj-eTFny-1Hi4sucXf5mQkeg:28x3c--LOhWr6E_R2qP9k_njr9I=:eyJzY29wZSI6Imppbmp1bWFvIiwiZGVhZGxpbmUiOjE1MTU4NTc3NTJ9"
                },

                provinces: [],
                citys: [],
                areas: [],
                selectedProvId: "",
                selectedCityId: "",
                selectedAreaId: ""
            };
        },
        mounted() {
            if (!this.userInfo) {
                this.$message.error("亲，先登陆吧～");
                return;
            }
            this.getUserInfo();
            this.getUploadToken();
            this.getProvList();
        },
        methods: {
            //获取upload token
            getUploadToken() {
                QiniuInterface.getUploadToken()
                    .then(data => {
                        this.postData.token = data;
                    })
                    .catch(reason => {
                        this.$message.error(reason);
                    });
            },

            //获取用户信息
            getUserInfo() {
                UserInterface.getUserInfo(this.userInfo.userId)
                    .then(data => {
                        this.infoDetail = data;
                        this.selectedProvId = data.provinceCode;
                        this.selectedCityId = data.cityCode;
                        this.selectedAreaId = data.countyCode;
                        this.joinTime = formatTime.getLocalTime(this.infoDetail.createTime);
                        this.diffDay = formatTime.getDiffDay(this.infoDetail.createTime);
                        this.imageUrl = this.infoDetail.photoUrl;
                        if (this.selectedAreaId) {
                            this.getCityList(this.selectedProvId);
                            this.getAreaList(this.selectedCityId);
                        }
                        let bar = {};
                        Object.assign(bar, this.infoDetail);
                        this.$store.commit('updateUserInfo', bar);
                    })
                    .catch(reason => {
                        this.$message.error(reason);
                    });
            },

            //修改
            updateInfo() {
                if (!this.userInfo) {
                    this.$message.error("亲，先登陆吧～");
                    return;
                }
                if (this.selectedAreaId) {
                    this.infoDetail.addrCode = this.selectedAreaId;
                }
                UserInterface.updateUser(this.infoDetail)
                    .then(data => {
                        this.$message.success(data);
                        this.getUserInfo();
                    })
                    .catch(reason => {
                        this.$message.error(reason);
                    });
            },

            //头像上传成功回调
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                UserInterface.uploadUserPhoto({photoUrl: res.key})
                    .then(data => {
                        this.$message.success(data);
                        this.getUserInfo();
                    })
                    .catch(reason => {
                        this.$message.error(reason);
                    });
            },

            //图片上传之前校验
            beforeAvatarUpload(file) {
                const isLogined = !!this.userInfo;
                const isJPG =
                    file.type === "image/jpeg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif";
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLogined) {
                    this.$message.error("亲，先登陆吧～");
                }
                if (!isJPG) {
                    this.$message.error("头像只能上传图片!");
                }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return isLogined && isJPG && isLt2M;
            },

            //获取省列表
            getProvList: function () {
                UserInterface.getAreaList()
                    .then(data => {
                        this.provinces = data;
                    })
                    .catch(reason => this.$message.error(String(reason)));
            },

            //改变省
            provChange: function () {
                this.selectedCityId = "";
                this.selectedAreaId = "";
                this.getCityList(this.selectedProvId);
            },

            //获取市列表
            getCityList: function (provId) {
                let params = {
                    parentCode: provId
                };
                UserInterface.getAreaList(params)
                    .then(data => {
                        this.citys = data;
                    })
                    .catch(reason => this.$message.error(String(reason)));
            },

            //改变市
            cityChange: function () {
                this.selectedAreaId = "";
                this.getAreaList(this.selectedCityId);
            },

            //获取区列表
            getAreaList: function (cityId) {
                let params = {
                    parentCode: cityId
                };
                UserInterface.getAreaList(params)
                    .then(data => {
                        this.areas = data;
                    })
                    .catch(reason => this.$message.error(String(reason)));
            }
        }
    };
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
        max-width: 700px;
        margin: auto;
    }

    .avatar-uploader {
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
        border-color: #409eff;
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

    .join-time {
        text-align: center;
    }

    .select-address {
        width: 197px;
    }
</style>
