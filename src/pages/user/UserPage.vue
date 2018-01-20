<template>
    <div class="user-container">
        <el-form label-width="100px" class="info-form">
            <img :src="imageUrl" class="avatar">
            <div class="user-name">{{infoDetail.username}}</div>
            <el-form-item class="join-time">
                <h4 style="color: #999;margin-right: 100px;">{{joinTime}}入网，在网时长{{diffDay || '0小时'}}</h4>
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
      userId: this.$route.params.id,
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
      UserInterface.getUserInfo(this.userId)
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
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //头像上传成功回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      UserInterface.uploadUserPhoto({ photoUrl: res.key })
        .then(data => {
          this.$message.success(data);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    //获取省列表
    getProvList: function() {
      UserInterface.getAreaList()
        .then(data => {
          this.provinces = data;
        })
        .catch(reason => this.$message.error(String(reason)));
    },

    //改变省
    provChange: function() {
      this.selectedCityId = "";
      this.selectedAreaId = "";
      this.getCityList(this.selectedProvId);
    },

    //获取市列表
    getCityList: function(provId) {
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
    cityChange: function() {
      this.selectedAreaId = "";
      this.getAreaList(this.selectedCityId);
    },

    //获取区列表
    getAreaList: function(cityId) {
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
  padding: 30px 0;
  background-color: #fff;
}

.info-form > label {
  color: #f90;
}

.info-form {
  max-width: 700px;
  margin: auto;
}

.avatar {
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 50px;
  display: block;
  margin: 10px auto;
}

.join-time {
  text-align: center;
}
.user-name {
  text-align: center;
  font-size: 20px;
  color: #f90;
}
</style>
