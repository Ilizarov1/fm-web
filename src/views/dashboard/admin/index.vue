<template>
  <div>
    <el-row>
      <el-card>
        <div>
          <i class="el-icon-user-solid"></i>
          欢迎您，{{ position }} - {{ name }}
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
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: { PanelGroup, Tactics },
  computed: {
    ...mapState(['group', 'position', 'name'])
  }
}
</script>

<style scoped></style>
