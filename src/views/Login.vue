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
      <el-form label-position="left" label-width="80px" :model="signForm">
        <el-tabs v-model="activeName">
          <el-tab-pane label="球员" name="player"></el-tab-pane>
          <el-tab-pane label="员工" name="employee"></el-tab-pane>
        </el-tabs>
        <el-form-item label="用户名">
          <el-input v-model="signForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="signForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-if="activeName !== 'player'"
            v-model="signForm.name"
            auto-complete="off"
            type="text"
          ></el-input>
          <el-select
            v-else
            v-model="signForm.name"
            placeholder="请输入/选择姓名"
            filterable
            allow-create
            style="width: 100%"
            auto-complete="off"
            autocomplete="off"
          >
            <el-option
              v-for="(item, index) in this.players.filter(x => x.userId === 0)"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email" v-model="signForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色选择" v-if="activeName !== 'player'">
          <el-select v-model="signForm.role" style="width: 100%">
            <el-option label="教练" value="coach"></el-option>
            <el-option label="队医" value="doctor"></el-option>
            <el-option label="球探" value="scout"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <el-button type="primary" class="login-button" @click="submit"
          >注册</el-button
        >
        <el-button class="login-button" @click="signVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState, mapActions } from 'vuex'
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
      signVisible: false,
      signForm: {
        username: '',
        password: '',
        name: '',
        email: '',
        role: ''
      },
      activeName: 'player'
    }
  },
  computed: {
    ...mapState(['players'])
  },
  methods: {
    ...mapActions(['getPlayers']),
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
            window.sessionStorage.setItem('tokenValue', data.token)
            window.sessionStorage.setItem('tokenName', data.tokenName)
            window.localStorage.setItem('group', data.group)
            if (data.group !== 'player') {
              window.localStorage.setItem('position', data.position)
            }
            console.log(data)
            this.$store.commit('setGroupPosition', {
              group: data.group,
              position: data.position,
              name: data.name
            })
            this.$router.push('/dashboard').then()
            break
          }
          default:
            this.$message.error('账号密码错误')
        }
      }
    },
    async submit() {
      if (this.activeName === 'player') {
        this.signForm.role = 'player'
      }
      const { status, data } = await this.$http.post(
        'login/sign',
        qs.stringify(this.signForm),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (status === 200) {
        window.sessionStorage.setItem('tokenValue', data.token)
        window.sessionStorage.setItem('tokenName', data.tokenName)
        window.localStorage.setItem('group', data.group)
        if (data.group !== 'player') {
          window.localStorage.setItem('position', data.position)
        }
        this.$store.commit('setGroupPosition', {
          group: data.group,
          position: data.position,
          name: data.name
        })
        this.$message.success('注册成功')
        this.signVisible = false
        this.$router.push('/dashboard').then()
      }
    }
  },
  mounted() {
    this.getPlayers()
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
