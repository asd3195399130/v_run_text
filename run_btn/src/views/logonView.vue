<template>
    <div class="header">
        <transition name="" enter-active-class="animate__animated animate__lightSpeedInRight"
            leave-active-class="animate__animated animate__rotateOutDownRight">
            <div class="login  ">
                <div class="left"></div>
                <div class="right">
                    <div class="right_text">
                        <h2>易米服务登录</h2>
                        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
                            class="demo-ruleForm" :size="formSize" status-icon>
                            <el-form-item label="手机号码" prop="iphone">
                                <el-input v-model="ruleForm.iphone" placeholder="请输入你的手机号" />
                            </el-form-item>
                            <el-form-item label="登录密码" prop="pwd">
                                <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入密码" show-password />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm(ruleFormRef)">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <div class="register-tip">没有账户？请先<a href="#">注册</a></div>
                    </div>
                </div>
                <div style="clear: both"></div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { logon } from '@/api/http';
import router from '@/router';
interface RuleForm {
    iphone: string;
    pwd: string;
}

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
    iphone: '',
    pwd: '',
});

const rules = reactive<FormRules<RuleForm>>({
    iphone: [
        { required: true, message: '请输入你的手机号', trigger: 'blur' },
        {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入11位的手机号码',
            trigger: 'blur',
        },
    ],
    pwd: [
        { required: true, message: '请输入你的密码', trigger: 'change' }
    ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            let data = {
                iphone: ruleForm.iphone.valueOf(),
                pwd: ruleForm.pwd.valueOf()
            }
            localStorage.setItem("data", JSON.stringify(data));
            logon(data).then((res) => {
                router.replace("/Page")
                localStorage.setItem("userid", res.data.data.id)
            })

        } else {
            console.log('error submit!', fields);
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 100vh;
    background: url(https://img2.baidu.com/it/u=1199182007,3892747860&fm=253&fmt=auto&app=138&f=JPEG?w=780&h=363) no-repeat;
    background-size: cover;
    background-position: center center;

    .login {
        width: 900px;
        height: 500px;
        background: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .left {
            width: 50%;
            height: 100%;
            float: left;
            background: url(https://tse3-mm.cn.bing.net/th/id/OIP-C.y_8ybzvVuFp5jDAySdbHdAHaEo?w=265&h=180&c=7&r=0&o=5&pid=1.7) no-repeat;
            background-size: cover;
            background-position: center center;
        }

        .right {
            width: 50%;
            height: 100%;
            background: #ffffff;
            float: right;
            line-height: 30px;

            .register-tip {
                margin-top: 20px;
                text-align: center;
            }

            .right_text {
                margin-top: 120px;

            }

            .el-form {
                margin-top: 30px;

                //  padding-right: 10px;
                .el-input {
                    margin-right: 20px;
                }

                .el-button {
                    width: 250px;
                    height: 50px;
                    // margin-left: 20px;
                }
            }
        }
    }
}
</style>