<template>
    <div class="container-list maxWH clearfix">
        <!-- 搜索 -->
        <div class="search">
            <el-form ref="searchcontainerForm" class="flex maxWH search-form" :model="searchForm" label-width="80px">
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
        <el-button type="primary" @click.native.prevent.stop="containerAddDialog = true"
            style="margin: 15px 0;">添加容器</el-button>
        <!-- 列表显示容器 -->
        <el-table :data="containerlist" border style="width: 100%" max-height="250">
            <el-table-column prop="name" label="容器名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="port" label="端口" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="username" label="用户名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <div class="handler">
                        <el-button @click.native.prevent="startContainer(scope.$index, containerlist)"
                            @click.native.prevent.stop="containerDialog = true" type="info">
                            启动
                        </el-button>
                        <el-button @click.native.prevent="delcontainer(scope.$index, containerlist)" type="danger">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="page_sizes" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
            :total="container_count" style="padding: 10px 0;">
        </el-pagination>
        <!-- 添加容器 -->
        <el-dialog title="添加容器" :visible.sync="containerAddDialog">
            <el-form ref="containerAddForm" :model="containerAddForm" label-width="120px" :rules="rules">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="containerAddForm.name" autocomplete="off" placeholder="请输入容器名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="选择添加的用户" prop="user">
                    <el-select v-model="containerAddForm.userid" clearable placeholder="用户名">
                        <el-option v-for="item in userlist" :key="item.id" :label="item.username" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="选择镜像" prop="image">
                    <el-select v-model="containerAddForm.imageid" clearable placeholder="镜像">
                        <el-option v-for="item in images" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号" prop="versionid">
                    <el-input v-model.trim="containerAddForm.versionid" autocomplete="off" placeholder="请输入版本号">
                    </el-input>
                </el-form-item>
                <el-form-item label="端口号" prop="ports">
                    <el-input v-model.number="port" placeholder="输入端口号" type="number"></el-input>
                    <span class="add-button">
                        <el-button @click="addPort" type="primary">添加</el-button>
                    </span>
                </el-form-item>
                <el-form-item label="已添加的端口号" v-for="(port, index) in containerAddForm.ports" :key="index">
                    {{ port }}
                    <el-button @click="removePort(index)" type="primary">删除</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click.native.prevent.stop="addcontainer('containerAddForm')">确 定</el-button>
                <el-button @click.native.prevent.stop="resetForm('containerAddForm')">重 置</el-button>
            </div>
        </el-dialog>
        <!--容器界面-->
        <el-dialog title="容器界面" :visible.sync="containerDialog" width="80%" height="100%" :before-close="handleClose">
            <iframe src="http://127.0.0.1:8080" frameborder="0" width="100%" height="600px"></iframe>
            <span slot="footer" class="dialog-footer">
                <el-button @click="containerDialog = false">关 闭</el-button>
                <el-button type="primary" @click.native.prevent.stop="UploadFile">上传文件</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Upload } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
    name: 'containerList',
    data() {
        const port = ''

        const images = [
            {
                value: '1',
                label: 'novnc',
            },
            {
                value: '2',
                label: 'vscode',
            },
            {
                value: '3',
                label: 'roslab',
            }
        ]
        const options = [
            {
                value: 'name',
                label: '容器名',
            },
            {
                value: 'status',
                label: '容器状态',
            },
            {
                value: 'version_id',
                label: '版本',
            },
            {
                value: 'user_id',
                label: '用户id',
            },
        ]
        const validataTitle = (rule, value, callback) => {
            const reg = /^[0-9A-Za-z\u4e00-\u9fa5,!.*&^%#+=-_:;。，！「」——~、@]{2,12}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入容器名称'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('容器名称由2到12位的数字、字母、汉字或部分符号组成'))
            } else {
                callback()
            }
        }

        const validataPort = (rule, value, callback) => {
            const reg = /^[0-9]{4,5}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入端口号'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('端口号由4到5位的数字组成'))
            } else {
                callback()
            }
        }

        // const validataDetail = (rule, value, callback) => {
        //     const reg = /^[0-9A-Za-z\u4e00-\u9fa5,!.*&^%#+=-_:;。，！…. ：；，「」——~、\s@]{15,100}$/
        //     if (value.trim().length <= 0) {
        //         callback(new Error('请输入容器详情'))
        //     } else if (!reg.test(value.trim())) {
        //         callback(new Error('容器详情由15到100位的数字、字母、汉字或部分符号组成'))
        //     } else {
        //         callback()
        //     }
        // }
        return {
            options,
            images,
            port,
            // 表单验证规则
            rules: {
                name: [{ required: true, trigger: ['blur', 'change'], validator: validataTitle }],
                // container_detail: [{ required: true, trigger: 'blur', validator: validataDetail }],
                // ports: [{ required: true, trigger: 'blur', validator: validataPort }],
            },
            // 搜索容器列表的表单
            searchForm: {
                querySearch: '',
                key: '',
            },
            containerAddDialog: false, // 添加新容器的表单
            containerDialog: false, // 容器的表单
            page: 1, // 当前页
            limit: 8, // 初始化每页条目数
            page_sizes: [8, 16, 30, 50, 100], // 个数选择器
            // 添加容器的表单
            containerAddForm: {
                name: '',
                userid: '',
                imageid: '',
                versionid: '',
                ports: [],
            },
        }
    },
    computed: {
        ...mapGetters(['user_id', 'userlist', 'containerlist', 'container_count'])
    },
    mounted() {
        this.getcontainerList()
    },
    methods: {
        // 重置表单
        resetForm(formname) {
            this.$refs[formname].resetFields()
        },
        // 启动容器
        startContainer(index, rows) {
            const params = { id: rows[index].id, cmd: 'start' }
            try {
                this.$store.dispatch('startcontainer', JSON.stringify(params))
                    .then(res => {
                        this.resetForm(formname)
                        this.$message({ type: 'success', message: res })
                        // 重新获取容器列表
                        // this.getcontainerList()
                    }).catch(err => this.$message({ type: 'warning', message: err.message }))
            } catch (e) {
                this.$message({ type: 'warning', message: e.message })
            }
        },
        // 搜索
        search() {
            this.page = 1
            this.limit = this.page_sizes[0]
            this.getcontainerList()
        },
        // 每页多少条目
        handleSizeChange(val) {
            this.limit = val
            this.page = 1
            this.getcontainerList()
        },
        // 当前第几页
        handleCurrentChange(val) {
            this.page = val
            this.getcontainerList()
        },
        addPort() {
            if (this.port) {
                this.containerAddForm.ports.push(this.port);
                this.port = '';
            }
        },
        removePort(index) {
            this.containerAddForm.ports.splice(index, 1);
        },
        // 添加容器
        async addcontainer(formname) {
            await this.$refs[formname].validate(async vaild => {
                if (vaild) {

                    console.log("start")
                    try {
                        await this.$store.dispatch('addcontainer', JSON.stringify(this.containerAddForm))
                            .then(res => {
                                this.resetForm(formname)
                                this.containerAddDialog = false
                                this.$message({ type: 'success', message: res })
                                // 重新获取容器列表
                                this.getcontainerList()
                            }).catch(err => this.$message({ type: 'warning', message: err.message }))
                    } catch (e) {
                        this.$message({ type: 'warning', message: e.message })
                    }
                }
            })
        },
        // 获取容器列表
        async getcontainerList() {
            try {
                const { page, limit } = this
                let querySearch = this.searchForm.querySearch
                let value = this.searchForm.key

                await this.$store.dispatch('getcontainerList', JSON.stringify({ querySearch, value, page, limit }))
            } catch (e) {
                this.$message({ type: 'warning', message: e.message })
            }
        },
        // 删除容器
        async delcontainer(index, rows) {
            const title = rows[index].name
            const params = { id: rows[index].id }
            await this.$confirm(`是否删除容器 [ ${title} ] ?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await this.$store.dispatch('delcontainer', JSON.stringify(params))
                        .then(res => {
                            this.$message({ type: 'success', message: res })
                            // 重新获取容器列表
                            this.getcontainerList()
                        }).catch(err => this.$message({ type: 'warning', message: err.message }))
                } catch (e) {
                    this.$message({ type: 'warning', message: e.message })
                }
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消' })
            })
        },
    },
}
</script>

<style lang="less" scoped>
.container-list {

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