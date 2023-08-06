<template>
  <div class="contanier">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="loginForm">
          <h1>Hello</h1>
          <h2>欢迎来到管理系统!</h2>
          <el-form-item>
            <el-input v-model="userForm.username" :prefix-icon="User" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="userForm.password"
              type="password"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="isLoading"
              type="primary"
              class="login_btn"
              @click="loginHandler"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { getTime } from '@/utils/getTime'

let userForm = reactive({
  username: 'admin',
  password: '123456',
})

let isLoading = ref(false)

let userStore = useUserStore()
let $router = useRouter()

const loginHandler = async () => {
  isLoading.value = true
  try {
    await userStore.user_login(userForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功!',
      title: `HI,${getTime()}好`,
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
  isLoading.value = false
}
</script>

<style lang="scss" scoped>
.contanier {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .loginForm {
    position: relative;
    width: 55%;
    top: 25vh;
    left: 10vw;
    padding: 10px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
