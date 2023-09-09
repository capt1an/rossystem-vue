<template>
    <div class="image-list maxWH clearfix">
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
        <el-button type="primary" @click.native.prevent.stop="delAllimage" style="margin: 15px 0;">添加镜像</el-button>
        <!-- 列表显示预约信息 -->
        <el-table :data="imagelist" border style="width: 100%" max-height="250">
            <el-table-column prop="id" label="序号">
            </el-table-column>
            <el-table-column prop="image_name" label="实验项目">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="content" label="说明">
            </el-table-column>
            <el-table-column label="操作" header-align="center">
                <template slot-scope="scope">
                    <div class="handler flex-center">
                        <el-button :disabled="scope.row.image_status === '正常'"
                            @click.native.prevent="delimage(scope.$index, imagelist)" type="danger">
                            移除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="page_sizes" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
            :total="image_count" style="padding: 10px 0;">
        </el-pagination>
        <!-- 添加镜像 -->
        <!-- <el-dialog title="添加镜像" :visible.sync="imageAddDialog">
            <el-form ref="iamgeAddForm" :model="iamgeAddForm" label-width="120px" :rules="rules">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="iamgeAddForm.name" autocomplete="off" placeholder="请输入容器名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="版本" prop="versionid">
                    <el-input v-model.trim="containerAddForm.version" autocomplete="off" placeholder="请输入版本号">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click.native.prevent.stop="addcontainer('containerAddForm')">确 定</el-button>
                <el-button @click.native.prevent.stop="resetForm('containerAddForm')">重 置</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'imageList',
    data() {
        const options = [
            {
                value: 'id',
                label: '镜像',
            },
            {
                value: 'version',
                label: '镜像版本',
            },
            {
                value: 'content',
                label: '内容',
            },

        ]
        const validataTitle = (rule, value, callback) => {
            const reg = /^[0-9A-Za-z\u4e00-\u9fa5,!.*&^%#+=-_:;。，！「」——~、@]{3,12}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入标题'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('标题由3到12位的数字、字母、汉字或部分符号组成'))
            } else {
                callback()
            }
        }
        const validataDetail = (rule, value, callback) => {
            const reg = /^[0-9A-Za-z\u4e00-\u9fa5,!.*&^%#+=-_:;。，！…. ：；，「」——~、\s@]{15,100}$/
            if (value.trim().length <= 0) {
                callback(new Error('请输入容器详情'))
            } else if (!reg.test(value.trim())) {
                callback(new Error('容器详情由15到100位的数字、字母、汉字或部分符号组成'))
            } else {
                callback()
            }
        }
        return {
            options,
            page: 1, // 当前页
            limit: 8, // 初始化每页条目数
            page_sizes: [8, 16, 30, 50, 100], // 个数选择器

            imageAddDialog: false,
            image_status: [
                { label: '全部', value: '0' },
                { label: '正常', value: '1' },
                { label: '超时', value: '2' },
            ],
            // 表单验证规则
            rules: {
                container_title: [{ required: true, trigger: ['blur', 'change'], validator: validataTitle }],
                container_detail: [{ required: true, trigger: 'blur', validator: validataDetail }],
            },
            // 搜索容器列表的表单
            searchForm: {
                querySearch: '',
                key: '',
            },
        }
    },
    computed: {
        ...mapGetters(['imagelist', 'image_count'])
    },
    mounted() {
        this.searchForm.image_status = this.image_status[0].value
        // 获取预约列表
        this.getimageList()
    },
    methods: {
        // 重置表单
        resetForm(formname) {
            this.$refs[formname].resetFields()
        },
        // 重置搜索表单
        resetSearchForm(formname) {
            this.resetForm(formname)
            this.searchForm.image_status = this.image_status[0].value
        },
        // 每页多少条目
        handleSizeChange(val) {
            this.limit = val
            this.page = 1
            this.getimageList()
        },
        // 当前第几页
        handleCurrentChange(val) {
            this.page = val
            this.getimageList()
        },
        // 搜索
        search() {
            this.page = 1
            this.limit = this.page_sizes[0]
            this.getimageList()
        },
        // 获取镜像列表
        async getimageList() {
            try {
                const { page, limit } = this
                let querySearch = this.searchForm.querySearch
                let value = this.searchForm.key
                await this.$store.dispatch('getimageList', JSON.stringify({ querySearch, value, page, limit }))
            } catch (e) {
                this.$message({ type: 'warning', message: e.message })
            }
        },
        // 移除超时的预约信息
        // async delimage(index, rows) {
        //     await this.$confirm('确认移除该预约信息?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(async () => {
        //         try {
        //             const { image_id, seat_id } = rows[index]
        //             await this.$store.dispatch('delimage', { image_id, seat_id })
        //                 .then(async res => {
        //                     this.$message({ type: 'success', message: res })
        //                     // 重新获取预约信息列表
        //                     await this.getimageList()
        //                 }).catch(err => this.$message({ type: 'warning', message: err.message }))
        //         } catch (e) {
        //             console.warn(e.message)
        //         }
        //     }).catch(() => { this.$message({ type: 'info', message: '已取消' }) })
        // },

        //添加镜像
        async addimage(formname) {
            await this.$refs[formname].validate(async vaild => {
                if (vaild) {
                    try {
                        await this.$store.dispatch('addcontainer', JSON.stringify(this.containerAddForm))
                            .then(res => {
                                this.resetForm(formname)
                                this.imageAddDialog = false
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
        // 移除所有超时的预约记录
        // async delAllimage() {
        //     await this.$confirm('此操作将清空超时的预约记录, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(async () => {
        //         try {
        //             await this.$store.dispatch('clearTimeoutimage')
        //                 .then(async res => {
        //                     this.$message({ type: 'success', message: res })
        //                     // 重新获取预约信息列表
        //                     await this.getimageList()
        //                 }).catch(err => this.$message({ type: 'warning', message: err.message }))
        //         } catch (e) {
        //             console.warn(e.message)
        //         }
        //     }).catch(() => { this.$message({ type: 'info', message: '已取消' }) })
        // },
    },
}
</script>

<style lang="less" scoped>
.image-list {
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