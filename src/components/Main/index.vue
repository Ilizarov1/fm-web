<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="2" unique-opened router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
        <el-menu-item index="/login">首页</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">左边</div>
        <div class="header-right">
          <el-button round type="primary" @click="logout">退出登录</el-button>
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
