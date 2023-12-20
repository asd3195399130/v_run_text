<template>
    <div class="header">
        <div class="header_top">
            <el-button type="primary" class="button" @click="addentry">添加列表</el-button>
            <div class="mt-4">
                <el-input v-model="input3" placeholder="请输入你的订单名称" class="input-with-select" @input="search">
                    <template #append>
                        <el-button :icon="Search" type="primary" @click="search" />
                    </template>
                </el-input>
            </div>
        </div>
        <!-- 渲染页面 -->
        <div class="header_center ">
            <el-table :data="tableData" border fit style="width: 98%" min-width="98%" align="center" resizable="true">
                <el-table-column prop="name" label="姓名" width="130" align="center"></el-table-column>
                <el-table-column prop="num" label="数量" width="130" align="center"></el-table-column>
                <el-table-column prop="iphone" label="手机号" width="130" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" width="130" align="center"></el-table-column>
                <el-table-column prop="userid" label="用户的id" width="130" align="center"></el-table-column>
                <el-table-column prop="remark" label="特殊要求" width="130" align="center"></el-table-column>
                <el-table-column prop="price" label="单价" width="130" align="center"></el-table-column>
                <el-table-column prop="status" label="支付状态" width="130" align="center"></el-table-column>
                <el-table-column prop="allprice" label="总价" width="130" align="center"></el-table-column>
                <el-table-column prop="ordercode" label="订单号" width="200" align="center"></el-table-column>
                <el-table-column prop="liuyan" label="买家留言" width="200" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="warning" size="small" @click="handleView(scope.row.id)">查看</el-button>
                        <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handledelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加 -->
        <div class="header_footer">
            <el-dialog v-model="dialogFormVisible" title="添加订单列表" style="width: 900px;">
                <el-form :model="form" :rules="rules" :size="formSize" ref="ruleFormRef">
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="iphone">
                        <el-input v-model="form.iphone" placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                        <el-input v-model="form.address" placeholder="请输入地址" />
                    </el-form-item>
                    <el-form-item label="特殊要求" :label-width="formLabelWidth" prop="remark">
                        <el-input v-model="form.remark" placeholder="请输入你的特殊要求" />
                    </el-form-item>
                    <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
                        <el-input v-model="form.num" placeholder="请输入数量" />
                    </el-form-item>
                    <el-form-item label="订单号" :label-width="formLabelWidth" prop="ordercode">
                        <el-input v-model="form.ordercode" placeholder="请输入订单号" />
                    </el-form-item>
                    <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
                        <el-input v-model="form.price" placeholder="请输入单价" />
                    </el-form-item>
                    <el-form-item label="支付状态" :label-width="formLabelWidth" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="0">成功</el-radio>
                            <el-radio :label="1">失败</el-radio>
                            <el-radio :label="2">待支付</el-radio>
                            <el-radio :label="3">已取消</el-radio>
                            <el-radio :label="4">售后中</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="买家留言" :label-width="formLabelWidth" prop="liuyan">
                        <el-input v-model="form.liuyan" maxlength="10" placeholder="请输入您的留言" show-word-limit type="text" />
                    </el-form-item>
                    <el-form-item label="总价" :label-width="formLabelWidth" prop="allprice">
                        <el-input v-model="form.allprice" placeholder="请输入总价" />
                    </el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" :plain="true">立即创建</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form>
            </el-dialog>
        </div>
        <!-- 分页 -->
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[5, 10, 20, 30, 40, 50]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>


    <!-- 查看详情信息 -->
    <div class="center">
        <div class="center_top">
            <el-dialog v-model="dialogTableVisible" title="查看详情信息" style="width: 90%;border:none" align="center">
                <el-table :data="gridData" border="1">
                    <el-table-column prop="name" label="姓名" width="130" align="center" />
                    <el-table-column prop="num" label="数量" width="130" align="center" />
                    <el-table-column prop="iphone" label="手机号" width="130" align="center" />
                    <el-table-column prop="address" label="地址" width="130" align="center" />
                    <el-table-column prop="userid" label="用户的id" width="130" align="center" />
                    <el-table-column prop="remark" label="特殊要求" width="130" align="center" />
                    <el-table-column prop="price" label="单价" width="130" align="center" />
                    <el-table-column prop="status" label="支付状态" width="130" align="center" />
                    <el-table-column prop="allprice" label="总价" width="130" align="center" />
                    <el-table-column prop="ordercode" label="订单号" width="200" align="center" />
                    <el-table-column prop="liuyan" label="买家留言" width="200" align="center" />
                </el-table>
            </el-dialog>
        </div>
    </div>
    <!-- 修改页面信息 -->
    <div class="pageinfo">
        <el-dialog v-model="dialogForm" title="修改订单列表" style="width: 900px;">
            <el-form :model="formdata" :rules="ruled" :size="formSize" ref="dialogFormdat">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="formdata.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="iphone">
                    <el-input v-model="formdata.iphone" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="formdata.address" placeholder="请输入地址" />
                </el-form-item>
                <el-form-item label="特殊要求" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="formdata.remark" placeholder="请输入你的特殊要求" />
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
                    <el-input v-model="formdata.num" placeholder="请输入数量" />
                </el-form-item>
                <el-form-item label="订单号" :label-width="formLabelWidth" prop="ordercode">
                    <el-input v-model="formdata.ordercode" placeholder="请输入订单号" />
                </el-form-item>
                <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="formdata.price" placeholder="请输入单价" />
                </el-form-item>
                <el-form-item label="支付状态" :label-width="formLabelWidth" prop="status">
                    <el-radio-group v-model="formdata.status">
                        <el-radio :label="0">成功</el-radio>
                        <el-radio :label="1">失败</el-radio>
                        <el-radio :label="2">待支付</el-radio>
                        <el-radio :label="3">已取消</el-radio>
                        <el-radio :label="4">售后中</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="买家留言" :label-width="formLabelWidth" prop="liuyan">
                    <el-input v-model="formdata.liuyan" maxlength="10" placeholder="请输入您的留言" show-word-limit type="text" />
                </el-form-item>
                <el-form-item label="总价" :label-width="formLabelWidth" prop="allprice">
                    <el-input v-model="formdata.allprice" placeholder="请输入总价" />
                </el-form-item>
                <el-button type="primary" @click="ementForm(dialogFormdat)" :plain="true">立即修改</el-button>
                <el-button @click="resetForm(dialogFormdat)">重置</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, proxyRefs } from "vue"
import { Search } from '@element-plus/icons-vue'
import { addlist, dellist, addentred, lookup, searched, revise } from "../../api/list"
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
const input3 = ref("")
const tableData = ref([])
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
// 分页
const currentPage4 = ref(1)
const pageSize4 = ref(5)
const small = ref(true)
const background = ref(true)
const disabled = ref(false)
const total = ref()
// 修改
const dialogForm = ref(false)
// 查看
const gridData = ref([{}])
const formSize = ref('default')
// 修改回显
const dialogFormdat = ref<FormInstance>()
interface formData {
    id: string,
    name: string,
    iphone: string,
    num: string,
    address: string,
    status: string,
    remark: string,
    ordercode: string,
    liuyan: string,
    price: string,
    allprice: string,
    userid: string,
}

const formdata = reactive<formData>({
    id: "",
    name: "",
    iphone: "",
    num: "",
    address: "",
    status: "",
    remark: "",
    ordercode: "",
    liuyan: "",
    price: "",
    allprice: "",
    userid: "",
})
const ruled = reactive<FormRules<formData>>({
    name: [
        { required: true, message: "请输入您的名字", trigger: 'blur' },
        { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: "请输入2-16个字符的中文名" }
    ],
    iphone: [
        { required: true, message: "请输入手机号", trigger: 'blur' },
        { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '只要是13,14.15,16,17,18,19开头即可', trigger: 'blur' }
    ],
    address: [
        { required: true, message: "请输入地址", trigger: 'blur' },
    ],
    status: [
        { required: true, message: "请输入购物状态", trigger: 'blur' },
    ],
    remark: [
        { required: true, message: "请输入特殊要求", trigger: 'blur' },
    ],
    ordercode: [
        { required: true, message: "请输入订单号", trigger: 'blur' },
    ],
    liuyan: [
        { required: true, message: "请输入买家留言", trigger: 'blur' },
    ],
    num: [
        { required: true, message: "请输入商品数量", trigger: 'blur' },
    ],
    price: [
        { required: true, message: "请输入商品单价", trigger: 'blur' },
    ],
    allprice: [
        { required: true, message: "请输入商品总价", trigger: 'blur' },
    ],
})
const ementForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(formdata);
            revise(formdata).then(() => {
                reading()
            })
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            dialogForm.value = !dialogForm.value
        } else {
            console.log('error submit!', fields)
        }
    })
}
// 添加
const ruleFormRef = ref<FormInstance>()

interface Form {
    name: string,
    iphone: string,
    num: string,
    address: string,
    status: string,
    remark: string,
    ordercode: string,
    liuyan: string,
    price: string,
    allprice: string,
}
const form = reactive<Form>({
    name: '',
    iphone: "",
    num: "",
    address: "",
    status: '',
    remark: "",
    ordercode: "",
    liuyan: "",
    price: "",
    allprice: "",
})

const rules = reactive<FormRules<Form>>({
    name: [
        { required: true, message: "请输入您的名字", trigger: 'blur' },
        { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: "请输入2-16个字符的中文名" }
    ],
    iphone: [
        { required: true, message: "请输入手机号", trigger: 'blur' },
        { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '只要是13,14.15,16,17,18,19开头即可', trigger: 'blur' }
    ],
    address: [
        { required: true, message: "请输入地址", trigger: 'blur' },
    ],
    status: [
        { required: true, message: "请输入购物状态", trigger: 'blur' },
    ],
    remark: [
        { required: true, message: "请输入特殊要求", trigger: 'blur' },
    ],
    ordercode: [
        { required: true, message: "请输入订单号", trigger: 'blur' },
    ],
    liuyan: [
        { required: true, message: "请输入买家留言", trigger: 'blur' },
    ],
    num: [
        { required: true, message: "请输入商品数量", trigger: 'blur' },
    ],
    price: [
        { required: true, message: "请输入商品单价", trigger: 'blur' },
    ],
    allprice: [
        { required: true, message: "请输入商品总价", trigger: 'blur' },
    ],
})
const formLabelWidth = '130px'
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(666);
            let data = {
                name: form.name.valueOf(),
                iphone: form.iphone.valueOf(),
                num: form.num.valueOf(),
                address: form.address.valueOf(),
                status: form.status.valueOf(),
                remark: form.remark.valueOf(),
                ordercode: form.ordercode.valueOf(),
                liuyan: form.liuyan.valueOf(),
                price: form.price.valueOf(),
                allprice: form.allprice.valueOf(),
                userid: localStorage.getItem("userid")
            }
            addentred(data).then(() => {
                reading()
            })
            form.name = "",
                form.iphone = "",
                form.num = "",
                form.status = "",
                form.address = "",
                form.remark = "",
                form.ordercode = "",
                form.liuyan = "",
                form.price = "",
                form.allprice = ""
            ElMessage({
                message: '添加成功',
                type: 'success',
            })
            dialogFormVisible.value = !dialogFormVisible.value
        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
// 删除
const handledelete = (id: any) => {
    console.log(id);
    ElMessageBox.confirm(
        '此操作将永久删除该文件, 是否继续?',
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
                message: '删除成功!',
            })
            dellist(id).then(() => {
                reading()
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除',
            })
        })

}
// 编辑修改
const handleEdit = (row: any) => {
    //  console.log(row.id);
    formdata.id = row.id.valueOf()
    console.log(formdata.id);
    formdata.name = row.name.valueOf(),
        formdata.iphone = row.iphone.valueOf(),
        formdata.num = row.num.valueOf(),
        formdata.address = row.address.valueOf(),
        formdata.status = row.status.valueOf(),
        formdata.remark = row.remark.valueOf(),
        formdata.ordercode = row.ordercode.valueOf(),
        formdata.liuyan = row.liuyan.valueOf(),
        formdata.price = row.price.valueOf(),
        formdata.allprice = row.allprice.valueOf(),
        formdata.userid = row.userid.valueOf(),
        dialogForm.value = !dialogForm.value
}
// 搜索
const search = () => {
    let obj = {
        name: input3.value
    }
    console.log(obj);
    searched(obj).then((res) => {
        tableData.value = res.data.data.data
        total.value = 1
    })
}
// 添加订单列表
const addentry = () => {
    dialogFormVisible.value = true
}

// 查看列表
const handleView = (id: any) => {
    console.log(id);
    dialogTableVisible.value = !dialogTableVisible.value
    lookup(id).then(res => {
        // console.log(res.data.data);
        gridData.value = [res.data.data]
        console.log(gridData.value);
    })
}
// 分页
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    pageSize4.value = val
    currentPage4.value = 1
    reading()
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    currentPage4.value = val
    reading()
}
// 渲染页面
function reading() {
    let data = {
        page: currentPage4.value,
        pagelimit: pageSize4.value
    }
    addlist(data).then(res => {
        // console.log(res.data);

        tableData.value = res.data.data.data
        total.value = res.data.data.pagecount
        console.log(total.value);
        console.log(res.data.data.pagecount);

    })

}
reading()





</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 90vh;
    background: #aa4b6b;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #3b8d99, #6b6b83, #aa4b6b);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #3b8d99, #6b6b83, #aa4b6b);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    overflow: hidden;

    .header_top {
        width: 100%;
        background: #D3CCE3;
        text-align: left;
        display: flex;
        align-items: center;

        .button {
            position: relative;
            top: 0;
            left: 15px;
        }
    }

    .header_center {
        text-align: center;
        margin: auto;

        .el-table {
            margin: auto;
        }
    }

    .mt-4 {
        width: 350px;
        margin-left: 25px;
    }

    .header_footer {
        .el-dialog {
            text-align: center;

            .el-form {
                width: 500px;
                margin: auto;
            }

        }

    }

    ::v-deep {
        .el-pagination.is-background .el-pager li:not(.disabled) {
            background-color: green; // 进行修改未选中背景和字体
            color: #fff;
        }

        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: red; // 进行修改选中项背景和字体
            color: gold;
        }
    }

}
</style>