<template>
    <div class="login maxWH flex-center">
        <el-form ref="loginForm" :model="loginForm" label-color="#fff" label-width="80px" :rules="rules" class="login-form"
            hide-required-asterisk @keyup.native.enter="login('loginForm')">
            <el-form-item prop="username" class="login-item">
                <span slot="label"><i class="el-icon-user"></i>账号</span>
                <el-input v-model.trim="loginForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-item">
                <span slot="label"><i class="el-icon-unlock"></i>密码</span>
                <el-input type="password" v-model.trim="loginForm.password" autocomplete="off"
                    placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item align="center" style="box-sizing: border-box;padding-right: 80px;">
                <el-button type="primary" @click.native.prevent.stop="login('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getAccount } from '@/utils/account'
export default {
    name: 'Login',
    data() {
        const validataAccount = (rule, value, callback) => {
            // const reg = /^[0-9]{6,12}$/
            // if (value.trim().length <= 0) {
            //     callback(new Error('请输入账号'))
            // } else if (!reg.test(value.trim())) {
            //     callback(new Error('账号格式错误'))
            // } else {
            //     callback()
            // }
            if (value.trim().length <= 0) {
                callback(new Error('请输入账号'))
            } else {
                callback()
            }
        }
        const validataPassword = (rule, value, callback) => {
            const reg = /^[a-zA-Z0-9_]{8,12}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入密码'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('密码格式错误'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                username: [{ required: true, trigger: 'blur', validator: validataAccount }],
                password: [{ required: true, trigger: 'blur', validator: validataPassword }]
            },
            loginForm: {
                username: getAccount() || '',
                password: ''
            },
        }
    },
    methods: {
        // 重置表单
        resetForm(formname) {
            this.$refs[formname].resetFields()
        },
        // 用户登录
        async login(formname) { //关键字async放到函数前面，用于表示函数是一个异步函数
            await this.$refs[formname].validate(async vaild => { //预验证
                if (vaild) {
                    try {
                        await this.$store.dispatch('userLogin', JSON.stringify(this.loginForm))
                            .then(res => {
                                this.resetForm(formname)
                                console.log("没跳")
                                // this.$message({ type: 'success', message: res })
                                this.$router.push('/')
                                console.log("跳了")
                            }).catch(err => this.$message({ type: 'warning', message: err.message }))
                    } catch (e) {
                        this.$message({ type: 'warning', message: e.message })
                    }
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.login {
    background: url('../../assets/bg.png') no-repeat;
    background-size: cover;

    .login-form {
        width: 330px;
        height: 230px;
        background-color: rgba(255, 255, 255);
        box-sizing: border-box;
        padding-top: 30px;
        border-radius: 10px;
    }
}
</style>