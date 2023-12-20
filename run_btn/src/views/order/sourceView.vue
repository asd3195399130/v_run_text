<template>
    <div class="header">
        <div class="header-top">
            <el-button type="primary" class="button" @click="addlist">添加图片</el-button>
        </div>
        <div class="header-center">
            <el-table :data="tableData" border style="width: 100%" align="center">
                <el-table-column prop="id" label="ID" width="180" align="center" />
                <el-table-column prop="imgurl" label="图片" width="180" align="center">
                    <template v-slot="{ row }">
                        <img :src="row.imgurl" alt="" class="custom-image" style="width: 100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="图片类型" width="180" align="center" />
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click="handledelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加图片素材 -->
        <div class="header-footer">
            <el-dialog v-model="dialogFormVisible" title="Shipping address" :size="formSize" label-width="120px">
                <el-form :model="form" ref="ruleFormRef" :rules="rules" status-icon>
                    <el-form-item label="新增图片" :label-width="formLabelWidth" prop="imgurl">
                        <el-input v-model="form.imgurl" autocomplete="off" placeholder="添加图片" />
                    </el-form-item>
                    <el-form-item label="图片类型" :label-width="formLabelWidth" prop="type">
                        <el-radio-group v-model="form.type">
                            <el-radio :label="1">首页</el-radio>
                            <el-radio :label="2">分类</el-radio>
                            <el-radio :label="3">服务</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" :plain="true">立即创建</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { getreading, getdelimage, getaddimages } from "../../api/source"
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
const tableData = ref([])
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const formSize = ref('default')
interface Form {
    imgurl: string,
    type: string,
}
const form = reactive<Form>({
    imgurl: "",
    type: "",
})
const rules = reactive<FormRules<Form>>({
    imgurl: [{ required: true, message: "请输入你的图片链接", trigger: "blur" }],
    type: [{ required: true, message: "请选择你图片的类型", trigger: "blur" }]
})

// 添加
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log('submit!')
            let data = {
                imgurl: form.imgurl.valueOf(),
                type: form.type.valueOf()
            }
            getaddimages(data).then(() => {
                reading()
            })
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
const addlist = () => {
    dialogFormVisible.value = !dialogFormVisible.value
}
// 删除
const handledelete = (id: any) => {
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
            getdelimage(id).then(() => {
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
function reading() {
    getreading().then(res => {
        tableData.value = res.data.data.data
    })
}
reading()
</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 90vh;
    background: #1a2a6c;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #fdbb2d, #b21f1f, #1a2a6c);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #fdbb2d, #b21f1f, #1a2a6c);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    .header-top {
        width: 100%;
        height: 75px;
        background: #1565C0;
        text-align: left;
        display: flex;
        align-items: center;

        .button {
            margin-left: 15px;
        }
    }
}
</style>