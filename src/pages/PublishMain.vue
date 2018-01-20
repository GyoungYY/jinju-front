<template>
    <div class="public-container">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">

            <el-tab-pane label="发表金句" name="jinju">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="金句类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择金句类型">
                            <el-option label="搞笑" :value="1"></el-option>
                            <el-option label="情感" :value="2"></el-option>
                            <el-option label="热点" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="金句内容" prop="content">
                        <el-input type="textarea" v-model="ruleForm.content" :rows="4" placeholder="请输入内容"
                                  :maxlength="500"></el-input>
                    </el-form-item>
                    <el-form-item style="margin: 0;">{{ruleForm.content.length}}/500</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="发表美文" name="meiwen">
                <el-form :model="article" ref="article" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="美文标题">
                        <el-input v-model="article.title" style="width:600px;"></el-input>
                    </el-form-item>
                    <el-form-item label="美文概述">
                        <el-input type="textarea" v-model="article.desc" :rows="3" placeholder="请输入内容"
                                  :maxlength="150" style="width:600px;"></el-input>
                    </el-form-item>
                    <el-form-item label="美文类型" prop="type">
                        <el-select v-model="article.type" placeholder="请选择美文类型">
                            <el-option label="搞笑" :value="1"></el-option>
                            <el-option label="情感" :value="2"></el-option>
                            <el-option label="热点" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="美文封面">
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
                    </el-form-item>
                </el-form>
                <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="options">
                </quill-editor>

                <el-row style="margin: 10px 0;float:right;">
                        <el-button type="primary" @click="submitArticle()">立即创建</el-button>
                        <el-button @click="resetArticle()">重置</el-button>
                </el-row>
                <div style="clear:both;"></div>

                <div class="ql-container ql-snow">
                    <div class="ql-editor">
                        <div v-html="content" style=""></div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <router-view/>
    </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
import QiniuInterface from "@/interface/QiniuInterface";

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      activeName: "jinju",
      ruleForm: {
        type: "",
        content: ""
      },
      rules: {
        type: [
          { required: true, message: "请选择金句类型", trigger: "change" }
        ],
        content: [
          { required: true, message: "请填写金句内容", trigger: "blur" }
        ]
      },

      article: {},
      content: "<h2>I am Example</h2>",
      options: {},
      imageUrl: "",
      postData: {
        token:
          "aI9GR6VbK_5gu3kwDj-eTFny-1Hi4sucXf5mQkeg:28x3c--LOhWr6E_R2qP9k_njr9I=:eyJzY29wZSI6Imppbmp1bWFvIiwiZGVhZGxpbmUiOjE1MTU4NTc3NTJ9"
      }
    };
  },
  mounted() {
    if (!this.userInfo) {
      this.$message.error("亲，先登陆吧～");
      return;
    }
    this.getUploadToken();
  },
  methods: {
    handleClick(tab) {
      if (tab.name === "jinju") {
      }
    },

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

    //立即创建
    submitForm(formName) {
      if (!this.userInfo) {
        this.$message.error("亲，先登陆吧～");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            user_id: this.userInfo.user_id,
            type: this.ruleForm.type,
            content: this.ruleForm.content
          };
          JinjuInterface.createJinju(params)
            .then(data => {
              this.$message.success("发表成功，还要创建一条吗，加鸡腿哦～");
              this.resetForm("ruleForm");
            })
            .catch(reason => {
              this.$message.error(reason);
            });
        } else {
          return false;
        }
      });
    },

    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //头像上传成功回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    //创建文章
    submitArticle() {
      console.log(this.content);
    },

    resetArticle() {
      this.content = "";
    }
  }
};
</script>

<style scoped>
.public-container {
  max-width: 1200px;
  min-height: 750px;
  margin: 30px auto;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
