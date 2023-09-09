<template>
    <div class="user-list maxWH clearfix">
        <!-- 搜索 -->
        <div class="search">
            <el-form ref="searchForm" class="flex maxWH search-form" :model="searchForm" label-width="80px">

                <el-select v-model="searchForm.querySearch" clearable placeholder="请选择搜索类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-form-item label="" prop="key">
                    <el-input v-model.trim="searchForm.key" placeholder="请输入关键字"></el-input>
                </el-form-item>

                <el-form-item class="flex" style="margin-left: -70px;overflow: hidden;">
                    <el-button type="primary" @click.native.prevent.stop="search">搜索</el-button>
                    <el-button @click.native.prevent.stop="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 添加 -->
        <el-button type="primary" @click.native.prevent.stop="userAddDialog = true" style="margin: 15px 0;">添加用户</el-button>
        <!-- 列表显示用户 -->
        <el-table :data="userlist" border style="width: 100%" max-height="250">
            <el-table-column prop="nickName" label="昵称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="role" label="用户类型">
            </el-table-column>
            <el-table-column prop="containerCount" label="容器数量">
            </el-table-column>
            <el-table-column prop="registerTime" label="创建时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" header-align="center">
                <template slot-scope="scope">
                    <div class="handler flex-center">
                        <el-button type="warning" @click.native.prevent.stop="openUpdateUser(scope.$index, userlist)">
                            修改
                        </el-button>
                        <el-button @click.native.prevent="delUser(scope.$index, userlist)" type="danger">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="page_sizes" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="user_count"
            style="padding: 10px 0;">
        </el-pagination>
        <!-- dialog -->
        <!-- 添加用户 -->
        <el-dialog title="添加用户" :visible.sync="userAddDialog">
            <el-form ref="userAddForm" :model="userAddForm" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.trim="userAddForm.username" autocomplete="off" placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input v-model.trim="userAddForm.nickName" autocomplete="off" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="userAddForm.password" autocomplete="off"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="adduserpwd1">
                    <el-input type="password" v-model.trim="userAddForm.adduserpwd1" autocomplete="off"
                        placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="role">
                    <el-radio-group v-model="userAddForm.role">
                        <el-radio :label="2">管理员</el-radio>
                        <el-radio :label="1">普通用户</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click.native.prevent.stop="addUser('userAddForm')">确 定</el-button>
                <el-button @click.native.prevent.stop="resetForm('userAddForm')">重 置</el-button>
            </div>
        </el-dialog>
        <!-- 修改用户信息 -->
        <el-dialog title="修改用户信息" :visible.sync="userUpdateDialog">
            <el-form ref="userUpdateForm" :model="userUpdateForm" label-width="80px" :rules="rules" hide-required-asterisk>
                <el-form-item label="昵称">
                    <el-input v-model.trim="userUpdateForm.nickName" disabled autocomplete="off"
                        placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model.trim="userUpdateForm.username" disabled autocomplete="off"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="修改密码" prop="update_pwd">
                    <el-switch v-model.trim="userUpdateForm.update_pwd"></el-switch>
                </el-form-item>
                <el-form-item v-if="userUpdateForm.update_pwd" label="密码" prop="password">
                    <el-input type="password" v-model.trim="userUpdateForm.password" :disabled="!userUpdateForm.update_pwd"
                        autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item v-if="userUpdateForm.update_pwd" label="确认密码" prop="updateuserpwd1">
                    <el-input type="password" v-model.trim="userUpdateForm.updateuserpwd1"
                        :disabled="!userUpdateForm.update_pwd" autocomplete="off" placeholder="请确认密码"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click.native.prevent.stop="updateUser('userUpdateForm')">确 定</el-button>
                <el-button @click.native.prevent.stop="resetForm('userUpdateForm')">重 置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'UserList',
    data() {
        const options = [
            {
                value: 'username',
                label: '用户名',
            },
            {
                value: 'nick_name',
                label: '昵称',
            },
            {
                value: 'role',
                label: '用户类型',
            },
        ]
        const validataNickName = (rule, value, callback) => {
            const reg = /^[\u4e00-\u9fa5]{2,6}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入昵称'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('昵称由2到6位的汉字组成'))
            } else {
                callback()
            }
        }
        const validataUsername = (rule, value, callback) => {
            const reg = /^[a-zA-Z0-9]{2,6}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入用户名'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('用户名由2到6位的字母、数字组成'))
            } else {
                callback()
            }
        }
        const validataPassword = (rule, value, callback) => {
            const reg = /^[a-zA-Z0-9_]{8,12}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入密码'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('密码由8到12位的字母、数字或下划线组成'))
            } else {
                callback()
            }
        }
        const validataAddUserPassword1 = (rule, value, callback) => {
            if (this.userAddForm.password.trim() === '') {
                callback(new Error('请先输入密码'))
            } else if (value.trim().length <= 0) {
                callback(new Error('确认密码不得为空'))
            } else if (value.trim() !== this.userAddForm.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        const validataUpdateUserPassword1 = (rule, value, callback) => {
            if (this.userUpdateForm.password.trim() === '') {
                callback(new Error('请先输入密码'))
            } else if (value.trim().length <= 0) {
                callback(new Error('确认密码不得为空'))
            } else if (value.trim() !== this.userUpdateForm.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        return {
            options,

            // 表单验证规则
            rules: {
                nickName: [{ required: true, trigger: ['blur', 'change'], validator: validataNickName }],
                username: [{ required: true, trigger: ['blur', 'change'], validator: validataUsername }],
                password: [{ required: true, trigger: ['blur', 'change'], validator: validataPassword }],
                adduserpwd1: [{ required: true, trigger: ['blur', 'change'], validator: validataAddUserPassword1 }],
                updateuserpwd1: [{ required: true, trigger: ['blur', 'change'], validator: validataUpdateUserPassword1 }],
                role: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
            },

            // 搜索用户列表的表单
            searchForm: {
                querySearch: '',
                key: '',
            },
            // 当前页
            page: 1,
            // 初始化每页条目数
            limit: 8,
            // 个数选择器
            page_sizes: [8, 16, 30, 50, 100],
            // 添加用户信息的表单
            userAddDialog: false,
            // 修改用户信息的表单
            userUpdateDialog: false,
            // 添加用户信息表单
            userAddForm: {
                nickName: '',
                username: '',
                password: '',
                adduserpwd1: '',
                role: '',
            },
            // 修改用户信息表单
            userUpdateForm: {
                user_id: 0, // 用户id
                nickName: '', // 昵称
                username: '', // 用户名
                update_pwd: false, // 是否修改密码
                password: '', // 密码
                updateuserpwd1: '', // 确认密码
            }

        }
    },
    watch: {
        // 修改用户信息时监听是否需要修改密码
        'userUpdateForm.update_pwd': {
            deep: true,
            handler(val) {
                if (!val) {
                    this.userUpdateForm.password = ''
                    this.userUpdateForm.updateuserpwd1 = ''
                }
            },
        },
    },
    computed: {
        ...mapGetters(['user_id', 'userlist', 'user_count'])
    },
    mounted() {
        // 获取用户列表
        this.getUserList()
    },
    methods: {
        // 重置表单
        resetForm(formname) {
            this.$refs[formname].resetFields();
        },
        // 添加用户信息
        async addUser(formname) {
            await this.$refs[formname].validate(async vaild => {
                if (vaild) {
                    try {
                        await this.$store.dispatch('addUser', JSON.stringify(this.userAddForm))
                            .then(res => {
                                this.resetForm(formname)
                                this.userAddDialog = false
                                this.$message({ type: 'success', message: res })
                                // 重新获取用户列表
                                this.getUserList()
                            }).catch(err => this.$message({ type: 'warning', message: err.message }))
                    } catch (e) {
                        this.$message({ type: 'warning', message: e.message })
                    }
                }
            })
        },
        // 打开修改用户信息的遮罩页
        openUpdateUser(index, rows) {
            this.userUpdateDialog = true
            const userinfo = rows[index]
            // 获取当前用户的信息
            this.userUpdateForm = {
                user_id: userinfo.id,
                nickName: userinfo.nickName,
                username: userinfo.username,
                update_pwd: false,
                password: '',
                updateuserpwd1: '',
            }
            // console.log(this.userUpdateForm)
        },
        // 修改用户信息
        async updateUser(formname) {
            await this.$refs[formname].validate(async vaild => {
                if (vaild) {
                    try {
                        const params = {
                            id: this.userUpdateForm.user_id,
                            password: this.userUpdateForm.password,
                        }
                        await this.$store.dispatch('backUpdateUserInfo', JSON.stringify(params))
                            .then(res => {
                                this.resetForm(formname)
                                this.userUpdateDialog = false
                                this.$message({ type: 'success', message: res })
                                // 重新获取用户列表
                                this.getUserList()
                            }).catch(err => this.$message({ type: 'warning', message: err.message }))
                    } catch (e) {
                        this.$message({ type: 'warning', message: e.message })
                    }
                }
            })
        },
        // 删除用户
        async delUser(index, rows) {
            const username = rows[index].username
            const params = {id : rows[index].id}
            await this.$confirm(`是否删除用户 [ ${username} ] ?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                try {
                    await this.$store.dispatch('delUser', JSON.stringify(params))
                        .then(res => {
                            this.$message({ type: 'success', message: res })
                            // 重新获取用户列表
                            this.getUserList()
                        }).catch(err => this.$message({ type: 'warning', message: err.message }))
                } catch (e) {
                    this.$message({ type: 'warning', message: e.message })
                }
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消' })
            })
        },
        // 每页多少条目
        handleSizeChange(val) {
            this.limit = val
            this.page = 1
            this.getUserList()
        },
        // 当前第几页
        handleCurrentChange(val) {
            this.page = val
            this.getUserList()
        },
        // 获取用户列表
        async getUserList() {
            try {
                const { page, limit } = this
                let querySearch = this.searchForm.querySearch
                let value = this.searchForm.key

                await this.$store.dispatch('getUserList', JSON.stringify({ querySearch, value, page, limit }))
            } catch (e) {
                this.$message({ type: 'warning', message: e.message })
            }
        },
        // 重置搜索表单
        resetSearchForm(formname) {
            this.resetForm(formname)
        },
        // 搜索
        search() {
            this.page = 1
            this.limit = this.page_sizes[0]
            this.getUserList()
        },
    },
}
</script>

<style lang="less" scoped>
.user-list {
    .search {
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        border: 1px solid rgb(220, 220, 220);
        padding-top: 15px;
        overflow: hidden;

        .search-form {
            min-width: 400px;
            justify-content: center;
        }
    }
}
</style>