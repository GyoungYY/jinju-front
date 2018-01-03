<template>
    <div class="public-container">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">

            <el-tab-pane label="发表金句" name="jinju">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="金句类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
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
                谢谢您的访问，该功能程序员正在努力设计中～～
            </el-tab-pane>
        </el-tabs>
        <router-view/>
    </div>
</template>

<script>
    import JinjuInterface from "@/interface/JinjuInterface";

    export default {
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                activeName: 'jinju',
                ruleForm: {
                    type: '',
                    content: '',
                },
                rules: {
                    type: [
                        {required: true, message: '请选择金句类型', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请填写金句内容', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            if (!this.userInfo) {
                this.$message.error('亲，先登陆吧～');
                return;
            }
        },
        methods: {
            handleClick(tab) {
                if (tab.name === 'jinju') {
                }
            },

            //立即创建
            submitForm(formName) {
                if (!this.userInfo) {
                    this.$message.error('亲，先登陆吧～');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            user_id: this.userInfo.user_id,
                            type: this.ruleForm.type,
                            content: this.ruleForm.content,
                        }
                        JinjuInterface.createJinju(params).then(data => {
                            this.$message.success('发表成功，还要创建一条吗，加鸡腿哦～');
                            this.resetForm('ruleForm');
                        }).catch(reason => {
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
        }
    }
</script>

<style scoped>
    .public-container {
        max-width: 1000px;
        min-height: 750px;
        margin: 30px auto;
    }
</style>
