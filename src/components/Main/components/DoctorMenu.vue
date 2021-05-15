<template>
  <el-menu default-active="2" unique-opened router>
    <el-menu-item index="/dashboard">首页</el-menu-item>
    <el-menu-item index="/medi">伤情报告</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'DoctorMenu'
}
</script>

<style scoped></style>
