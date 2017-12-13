<template>
    <div class="login-form">
        <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="params.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="params.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                <el-button @click="register('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import UserInterface from "@/interface/UserInterface";

    export default {
        data() {
            return {
                params: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}]
                }
            };
        },
        methods: {

            //登录接口
            login() {
                UserInterface.login(this.params).then(data => {
                    this.$message.success('报告主人，您已成功登陆～');
                    console.log(data);
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    this.$router.push({path: '/index/jinjuList'});
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            //注册接口
            createUser() {
                UserInterface.register(this.params).then(data => {
                    this.$message.success('注册成功，请登录');
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            //点击登录按钮
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.login();
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },

            //点击注册按钮
            register(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.createUser();
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .login-form {
        width: 500px;
        margin: 150px auto;
    }
</style>


