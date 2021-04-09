<template>
  <div class="login-container">
    <!--    登陆卡片-->
    <el-card class="login-card">
      <div slot="header" class="clearfix" style="text-align: center">
        <span>Fm</span>
      </div>
      <el-form label-position="left" label-width="80px" :model="loginForm">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <el-button type="primary" class="login-button" @click="login"
          >登录</el-button
        >
        <el-button class="login-button" @click="signVisible = true"
          >注册</el-button
        >
      </div>
    </el-card>

    <!--    注册窗-->
    <el-dialog title="注册" :visible.sync="signVisible" width="30%">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <el-button type="primary" class="login-button">注册</el-button>
        <el-button class="login-button" @click="signVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'login',
  data() {
    return {
      // 登录表单
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 注册
      signVisible: false
    }
  },
  methods: {
    async login() {
      const { status, data } = await this.$http.post(
        'login/in',
        qs.stringify(this.loginForm),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (status !== 200) {
        this.$message.error('登录失败')
      } else {
        switch (data.msg) {
          case 'success': {
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', data.token)
            window.sessionStorage.setItem('tokenName', data.tokenName)
            this.$router.push('/index').then()
            break
          }
          default:
            this.$message.error('账号密码错误')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: rgb(187, 230, 214);
  height: 100%;
  position: relative;
  .login-card {
    width: 480px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .login-footer {
    display: flex;
    justify-content: flex-end;
    .login-button {
      flex: 1;
    }
  }
}
</style>
