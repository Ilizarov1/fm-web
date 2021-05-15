<template>
  <el-menu default-active="2" unique-opened router>
    <el-menu-item index="/dashboard">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">日程安排</template>
      <el-menu-item index="/competition">赛程安排</el-menu-item>
      <el-menu-item index="/training">训练安排</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">战术阵型</template>
      <el-menu-item index="/tactics">战术</el-menu-item>
      <el-menu-item index="/anime">动态战术</el-menu-item>
      <el-menu-item index="/freekick">定位球</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'PlayerMenu'
}
</script>

<style scoped></style>
