<template>
  <el-container>
    <el-aside width="200px">
      <component :is="currentRole"></component>
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
import AdminMenu from 'components/Main/components/AdminMenu'
import ScoutMenu from 'components/Main/components/ScoutMenu'
import DoctorMenu from 'components/Main/components/DoctorMenu'
import PlayerMenu from 'components/Main/components/PlayerMenu'
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: { AdminMenu, ScoutMenu, DoctorMenu, PlayerMenu },
  data() {
    return {
      currentRole: 'AdminMenu'
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$message.success('退出成功')
      this.$router.push('/').then()
    }
  },
  computed: {
    ...mapState(['group', 'position'])
  },
  mounted() {
    switch (this.group) {
      case '教练组':
        this.currentRole = 'AdminMenu'
        break
      case '球探组':
        this.currentRole = 'ScoutMenu'
        break
      case '医疗组':
        this.currentRole = 'DoctorMenu'
        break
      case 'player':
        this.currentRole = 'PlayerMenu'
        break
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
