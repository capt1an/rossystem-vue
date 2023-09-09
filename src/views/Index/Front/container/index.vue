<template>
    <div class="container maxWH">
        <!-- 头部 -->
        <div class="header flex">
            <span class="title">消息容器</span>
        </div>
        <!-- 主体 -->
        <main class="main">
            <!-- 已读按钮 -->
            <div class="read flex-center">
                <el-button
                    type="text"
                    :disabled="(readlist.length < 1)"
                    @click.native.prevent.stop="setAllRead">全部已读</el-button>
            </div>
            <!-- 显示容器 -->
            <el-table :data="front_container_list" height="350" style="width: 100%">
                <el-table-column prop="container_title">
                    <span slot-scope="scope" style="position: relative;">
                        <p>{{ scope.row.container_title }}</p>
                        <span>{{ friendlyDate(scope.row.create_time) }}</span>
                        <i v-if="(scope.row.is_read === '未读')" class="el-icon-warning"
                            style="position: absolute;top: 60%;transform: translateY(-50%);color: tomato;"></i>
                    </span>
                </el-table-column>
                <el-table-column header-align="center" align="right">
                    <template slot-scope="scope">
                        <div class="handler">
                            <el-button @click.native.prevent="showcontainerDetail(scope.$index, front_container_list)"
                                type="info" round>
                                查看
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import friendlyDate from '@/utils/friendlyDate'
export default {
    name: 'container',
    data() {
        return {
            // 获取时间差
            friendlyDate,
        }
    },
    computed: {
        ...mapGetters(['front_container_list', 'readlist', 'userinfo'])
    },
    mounted() {
        this.getcontainerList()
    },
    methods: {
        // 获取用户信息
        async getUserInfo(user_id) {
            try {
                await this.$store.dispatch('getUserInfo', { user_id })
            } catch (e) {
                console.warn(e.message)
            }
        },
        // 获取容器列表
        async getcontainerList() {
            try {
                await this.$store.dispatch('frontGetcontainerList', { user_id: this.userinfo.user_id })
            } catch (e) {
                this.$message({ type: 'warning', message: e.message })
            }
        },
        // 查看详情
        async showcontainerDetail(index, rows) {
            const { container_title, container_detail, container_id, is_read, user_id } = rows[index]
            // console.log(rows[index])
            await this.$alert(container_detail, container_title, {
                confirmButtonText: '确定',
                callback: async action => {
                    if (is_read !== '已读') {
                        // 设置阅读状态为已读
                        await this.setRead(user_id, container_id)
                        // 重新获取用户信息
                        await this.getUserInfo(user_id)
                        // 重新获取容器列表
                        await this.getcontainerList()
                    }
                    return 'ok'
                }
            })
        },
        // 设置容器状态为已读
        async setRead(user_id, container_id) {
            try {
                await this.$store.dispatch('frontSetRead', { user_id, container_id })
            } catch (e) {
                console.warn(e.message)
            }
        },
        // 全部已读
        async setAllRead() {
            try {
                const user_id = this.userinfo.user_id
                await this.$store.dispatch('frontAllSetRead', { user_id })
                    .then(async res => {
                        // 重新获取用户信息
                        await this.getUserInfo(user_id)
                        // 重新获取容器列表
                        await this.getcontainerList()
                        // 
                        this.$notify({ title: '成功', type: 'success', message: '已清空未读容器' })
                    })
            } catch (e) {
                console.warn(e.message)
            }
        },
    }

}
</script>

<style lang="less" scoped>
.container {
    .header {
        width: 100%;
        height: 100px;
        background-color: #324057;
        box-sizing: border-box;
        padding: 50px 20% 10px;
        overflow: hidden;

        .title {
            font-size: 25px;
            color: #fff;
        }
    }

    .main {
        width: 100%;
        height: calc(100% - 100px);
        box-sizing: border-box;
        padding: 20px 20%;

        .read {
            width: 100%;
            justify-content: flex-end;
        }
    }
}
</style>