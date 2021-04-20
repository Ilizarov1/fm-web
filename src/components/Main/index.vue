<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="2" unique-opened router>
        <el-menu-item index="/login">首页</el-menu-item>
        <el-menu-item index="/player">球员信息</el-menu-item>
        <el-menu-item index="/playerList">球员列表</el-menu-item>
        <el-menu-item index="/employees">教练团队</el-menu-item>
        <el-menu-item index="/competition">赛程安排</el-menu-item>
        <el-menu-item index="/training">训练安排</el-menu-item>
        <el-menu-item index="/scout">球探报告</el-menu-item>
        <el-menu-item index="/medi">伤情报告</el-menu-item>
        <el-menu-item index="/tactics">战术</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">左边</div>
        <div class="header-right">
          <el-button
            round
            type="primary"
            @click="logout"
            style="vertical-align: middle"
            >退出登录</el-button
          >
        </div>
      </el-header>
      <el-main>
        <el-card class="menu-card">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$message.success('退出成功')
      this.$router.push('/').then()
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background-color: rgb(187, 230, 214);
  .el-menu {
    height: 100%;
  }
  .menu-card {
    margin-left: 35px;
    margin-right: 35px;
    background-color: rgb(228, 245, 239);
  }
}
.header-left {
  display: inline-block;
  float: left;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
}
.header-right {
  display: inline-block;
  float: right;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
}
</style>
