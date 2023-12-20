<template>
    <div class="header">
        <div class="header_top">
            <el-button type="primary" class="button" @click="addlist">添加服务列表</el-button>
            <div class="mt-4">
                <el-input v-model="input3" placeholder="搜索服务列表" class="input-with-select" @input="search">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
            </div>
        </div>
        <div class="header_center">
            <el-table :data="tableData" border style="width: 100%" align="center">
                <el-table-column prop="name" label="服务名称" width="180" align="center" />
                <el-table-column prop="url" label="图片" width="180" align="center">
                    <template v-slot="{ row }">
                        <img :src="row.url" alt="" class="custom-image" style="width: 100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column prop="details" label="服务详情描述" width="180" align="center"></el-table-column>
                <el-table-column prop="price" label="单价" width="180" align="center"></el-table-column>
                <el-table-column prop="mark" label="备注" width="180" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" width="180" align="center"></el-table-column>
                <el-table-column prop="remen" label="热门服务" width="180" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="warning" size="small" @click="handleView(scope.row.id)">查看</el-button>
                        <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handledelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[5, 10, 20, 30, 40, 50]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <div class="header_footer">
            <el-dialog v-model="dialogFormVisible" title="添加服务列表" style="width: 600px;">
                <el-form :model="form" ref="ruleFormRef" :rules="rules" status-icon :size="formSize">
                    <el-form-item label="服务名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" placeholder="请输入你的服务名称" />
                    </el-form-item>
                    <el-form-item label="服务的图片" :label-width="formLabelWidth" prop="url">
                        <el-input v-model="form.url" placeholder="请输入服务图片" />
                    </el-form-item>
                    <el-form-item label="服务详情描述" :label-width="formLabelWidth" prop="details">
                        <el-input v-model="form.details" placeholder="请输入详情信息" />
                    </el-form-item>
                    <el-form-item label="服务单价" :label-width="formLabelWidth" prop="price">
                        <el-input v-model="form.price" placeholder="请输入单价" />
                    </el-form-item>
                    <el-form-item label="服务备注" :label-width="formLabelWidth" prop="mark">
                        <el-input v-model="form.mark" placeholder="请输入服务备注" />
                    </el-form-item>
                    <el-form-item label="服务类型" :label-width="formLabelWidth" prop="type">
                        <el-radio-group v-model="form.type">
                            <el-radio :label="1">代购</el-radio>
                            <el-radio :label="2">代排队</el-radio>
                            <el-radio :label="3">代送</el-radio>
                            <el-radio :label="4">租赁</el-radio>
                            <el-radio :label="5">快递代取</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="服务类型" :label-width="formLabelWidth" prop="remen">
                        <el-radio-group v-model="form.remen">
                            <el-radio :label="1">代购</el-radio>
                            <el-radio :label="2">代排队</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" :plain="true">立即创建</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form>

            </el-dialog>
        </div>

    </div>
    <div class="center">
        <el-dialog v-model="dialogTableVisible" title="个人详情信息">
            <el-table :data="gridData" align="center">
                <el-table-column prop="name" label="服务名称" width="150" align="center" />
                <el-table-column prop="url" label="图片" width="150" align="center">
                    <template v-slot="{ row }">
                        <img :src="row.url" alt="" class="custom-image" style="width: 100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column prop="details" label="服务详情描述" width="150" align="center"></el-table-column>
                <el-table-column prop="price" label="单价" width="150" align="center"></el-table-column>
                <el-table-column prop="mark" label="备注" width="150" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" width="150" align="center"></el-table-column>
                <el-table-column prop="remen" label="热门服务" width="150" align="center"></el-table-column>
            </el-table>
        </el-dialog>

        <div class="edit">
            <el-dialog v-model="dialogForm" title="添加服务列表" style="width: 600px;">
                <el-form :model="formdata" ref="ruleFormRef" :rules="ruled" status-icon :size="formSize">
                    <el-form-item label="服务名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="formdata.name" placeholder="请输入你的服务名称" />
                    </el-form-item>
                    <el-form-item label="服务的图片" :label-width="formLabelWidth" prop="url">
                        <el-input v-model="formdata.url" placeholder="请输入服务图片" />
                    </el-form-item>
                    <el-form-item label="服务详情描述" :label-width="formLabelWidth" prop="details">
                        <el-input v-model="formdata.details" placeholder="请输入详情信息" />
                    </el-form-item>
                    <el-form-item label="服务单价" :label-width="formLabelWidth" prop="price">
                        <el-input v-model="formdata.price" placeholder="请输入单价" />
                    </el-form-item>
                    <el-form-item label="服务备注" :label-width="formLabelWidth" prop="mark">
                        <el-input v-model="formdata.mark" placeholder="请输入服务备注" />
                    </el-form-item>
                    <el-form-item label="服务类型" :label-width="formLabelWidth" prop="type">
                        <el-radio-group v-model="formdata.type">
                            <el-radio :label="1">代购</el-radio>
                            <el-radio :label="2">代排队</el-radio>
                            <el-radio :label="3">代送</el-radio>
                            <el-radio :label="4">租赁</el-radio>
                            <el-radio :label="5">快递代取</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="服务类型" :label-width="formLabelWidth" prop="remen">
                        <el-radio-group v-model="formdata.remen">
                            <el-radio :label="1">代购</el-radio>
                            <el-radio :label="2">代排队</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button type="primary" @click="editForm(ruleFormRef)" :plain="true">立即修改</el-button>
                    <el-button @click="editcancel">取消修改</el-button>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { Search } from '@element-plus/icons-vue'
import { playup, delserve, getaddlist, getchecked, getsecher, getedit } from "../../api/service"
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const input3 = ref("")
const tableData = ref([])
const gridData = ref([{}])
const dialogFormVisible = ref(false)
const dialogTableVisible = ref(false)
// 修改编辑
const dialogForm = ref(false)
interface formData {
    id: string,
    name: string,
    url: string,
    details: string,
    price: string,
    type: string,
    mark: string,
    remen: string
}
const formdata = reactive<formData>({
    id: "",
    name: '',
    url: "",
    details: "",
    price: "",
    type: "",
    mark: "",
    remen: ''
})
const ruled = reactive<FormRules<Form>>({
    name: [
        { required: true, message: "请输入服务名称", trigger: "blur" },
        { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: "请输入2-16个字符的中文", trigger: "blur" }
    ],
    url: [{ required: true, message: "请输入你的图片", trigger: "blur" }],
    details: [{ required: true, message: "请输入服务详情描述", trigger: "blur" }],
    price: [{ required: true, message: "请输入商品单价", trigger: "blur" }],
    mark: [{ required: true, message: "请输入你的备注", trigger: 'blur' }],
    type: [{ required: true, message: "请选择你所需的服务类型", trigger: "blur" }],
})
const editForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(666);
           getedit(formdata).then(()=>{
            reading()
           })
           ElMessage({
                message: '修改成功',
                type: 'success',
            })
           dialogForm.value = ! dialogForm.value
        } else {
            console.log('error submit!', fields)
        }
    })
}
// 分页
const currentPage4 = ref(1)
const pageSize4 = ref(5)
const small = ref(true)
const background = ref(true)
const disabled = ref(false)
const total = ref()
const formLabelWidth = '140px'
interface Form {
    name: string,
    url: string,
    details: string,
    price: string,
    type: string,
    mark: string,
    remen: string
}
const formSize = ref("default")
const ruleFormRef = ref<FormInstance>()
// 添加
const form = reactive<Form>({
    name: '',
    url: "",
    details: "",
    price: "",
    type: "",
    mark: "",
    remen: ''
})
const rules = reactive<FormRules<Form>>({
    name: [
        { required: true, message: "请输入服务名称", trigger: "blur" },
        { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: "请输入2-16个字符的中文", trigger: "blur" }
    ],
    url: [{ required: true, message: "请输入你的图片", trigger: "blur" }],
    details: [{ required: true, message: "请输入服务详情描述", trigger: "blur" }],
    price: [{ required: true, message: "请输入商品单价", trigger: "blur" }],
    mark: [{ required: true, message: "请输入你的备注", trigger: 'blur' }],
    type: [{ required: true, message: "请选择你所需的服务类型", trigger: "blur" }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            let data = {
                name: form.name.valueOf(),
                url: form.url.valueOf(),
                details: form.details.valueOf(),
                price: form.price.valueOf(),
                mark: form.mark.valueOf(),
                type: form.type.valueOf(),
                remen: form.remen.valueOf(),
            }
            getaddlist(data).then(() => {
                reading()
            })
            console.log('submit!')
            form.name = ""
            form.url = ""
            form.details = ""
            form.price = ""
            form.mark = ""
            form.type = ""
            form.remen = ""
            dialogFormVisible.value = false
            ElMessage({
                message: '添加成功',
                type: 'success',
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const addlist = () => {
    dialogFormVisible.value = true
}
// 搜索
const search = () => {
    let data = {
        name: input3.value,
        page: currentPage4.value,
        pagelimit: pageSize4.value
    }
    getsecher(data).then(res => {
        tableData.value = res.data.data.data
        total.value = 1
    })
}
// 修改
const handleEdit = (row: any) => {
    console.log(row);
    formdata.id = row.id.valueOf()
     formdata.name = row.name.valueOf()
    formdata.url = row.url.valueOf()
    formdata.details = row.details.valueOf()
    formdata.price = row.price.valueOf()
    formdata.mark = row.mark.valueOf()
    formdata.type = row.type.valueOf()
    formdata.remen = row.remen.valueOf()
    dialogForm.value = !dialogForm.value
}
// 取消修改
const editcancel = () => {
    dialogForm.value = !dialogForm.value
}
// 删除
const handledelete = (id: any) => {
    console.log(id);
    ElMessageBox.confirm(
        '此操作将永久删除该文件, 是否继续?', '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功!'
            })
            delserve(id).then(() => {
                reading()
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除'
            })
        })

}
// 查看
const handleView = (id: any) => {
    console.log(id);
    dialogTableVisible.value = !dialogTableVisible.value
    getchecked(id).then(res => {
        gridData.value = [res.data.data]

    })
}

const handleSizeChange = (val: number) => {
    console.log(`每页 ${val} 条`)
    pageSize4.value = val
    currentPage4.value = 1
    reading()
}
const handleCurrentChange = (val: number) => {
    console.log(`当前页: ${val}`)
    currentPage4.value = val
    reading()
}
// 渲染列表
function reading() {
    let data = {
        page: currentPage4.value,
        pagelimit: pageSize4.value
    }
    playup(data).then(res => {
        console.log(res.data.data.data);
        tableData.value = res.data.data.data
        total.value = res.data.data.pagecount
    })
}
reading()
</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 90vh;
    background: #b92b27;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #1565C0, #b92b27);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #1565C0, #b92b27);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    .header_top {
        width: 100%;
        height: 65px;
        background: #1565C0;
        text-align: left;
        display: flex;
        align-items: center;

        .button {
            margin-left: 55px;
        }

        .mt-4 {
            width: 350px;
            margin-left: 25px;
        }

        .header_center {
            text-align: center;
            margin: auto;

            .custom-image {
                width: 100px;
                height: 100px;
            }
        }
    }

    .header_footer {
        .el-button--text {
            margin-right: 15px;
        }


        .el-input {
            width: 300px;
        }


    }

    .demo-pagination-block+.demo-pagination-block {
        margin-top: 10px;
    }

    .demo-pagination-block .demonstration {
        margin-left: 16px;
    }

    ::v-deep {
        .el-pagination.is-background .el-pager li:not(.disabled) {
            background-color: #1565C0; // 进行修改未选中背景和字体
            // color: #fff;
        }

        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: red; // 进行修改选中项背景和字体
            color: gold;
        }
    }
}
</style>