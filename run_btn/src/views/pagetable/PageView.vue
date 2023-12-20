<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="300px">
                <el-col :span="24">
                    <div class="mb-2">
                        <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.udU3AH8zgQReMh06uASTxgAAAA?w=181&h=116&c=7&r=0&o=5&pid=1.7"
                            alt="">
                        <h2>易米服务中心</h2>
                    </div>
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"  default-active="/Page/source"
                        class="el-menu-vertical-demo"  router>
                         <el-menu-item index="/Page/source">
                                <template #title>
                                    <el-icon>
                                        <Picture />
                                    </el-icon>
                                    <span>图片列表</span>
                                </template>
                            </el-menu-item>
                        <el-menu-item index="/Page/order">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>订单列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/Page/serve">
                            <el-icon><icon-menu /></el-icon>
                            <span>服务列表</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="logo">
                        <img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.SQmqQt18WUcWYyuX8fGGGAHaE8?w=277&h=185&c=7&r=0&o=5&pid=1.7"
                            alt="">
                        <el-button type="primary" @click="exit">
                           退出登录
                        </el-button>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { ref } from "vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import router from '@/router'
// const handleOpen = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
// 退出登录
let exit = () => {
    ElMessageBox.confirm(
        '确定要退出吗?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '退出成功',
            })
            localStorage.clear()
            router.replace("/")
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消退出',
            })
        })
}
</script>

<style scoped lang="less">
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    overflow: hidden;
    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 15px;
        }
    }
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    // line-height: 50vh;
    height: 100vh;
    overflow: hidden;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 67px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.mb-2 {
    // height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f0c29;
    overflow: hidden;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #24243e, #302b63, #0f0c29);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    h2 {
        color: #E9EEF3;
    }

    img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        margin-right: 15px;
    }
}

.el-menu-vertical-demo {
    height: 100vh;
}
</style>