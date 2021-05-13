<template>
  <div>
    <el-row>
      <el-card>
        <div>
          <i class="el-icon-user-solid"></i>
          欢迎您，主教练 - jnz
        </div>
      </el-card>
    </el-row>
    <panel-group></panel-group>
    <tactics></tactics>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import Tactics from '@/views/dashboard/admin/components/Tactics'

export default {
  name: 'index',
  components: { PanelGroup, Tactics }
}
</script>

<style scoped></style>
