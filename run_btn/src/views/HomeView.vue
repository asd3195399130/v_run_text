<template>
  <div class="header">
    <div class="login">
      <div class="left"></div>
      <div class="right">
        <div class="right_text">
          <h2>易米服务注册</h2>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="手机号码" prop="iphone">
              <el-input v-model="ruleForm.iphone" placeholder="请输入你的手机号" />
            </el-form-item>
            <el-form-item label="注册密码" prop="pwd">
              <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)" :plain="true">
                提交
              </el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="register-tip">已有账户？请<a href="#/">登录</a></div>
        </div>

      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import { login } from '@/api/http';
import router from '@/router';
interface RuleForm {
  iphone: string;
  pwd: string;
  checked:""
}

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  iphone: '',
  pwd: '',
  checked:""
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
      console.log('submit!');
      let data = {
        iphone:ruleForm.iphone.valueOf(),
        pwd:ruleForm.pwd.valueOf()
      }
      console.log(data);    
      login(data).then((res => {
        console.log(res.data);
        localStorage.setItem("data", JSON.stringify(data));
        router.replace("/"),
          ElMessage({
            message: '恭喜注册成功',
            type: 'success',
          })
      }))

    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }))
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
          margin-left: 20px;
        }
      }
    }
  }
}
</style>