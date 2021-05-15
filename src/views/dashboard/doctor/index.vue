<template>
  <div>
    <el-row>
      <el-card>
        <div>
          <i class="el-icon-user-solid"></i>
          欢迎您，{{ group === 'player' ? '球员' : position }} - {{ name }}
        </div>
      </el-card>
    </el-row>
    <panel-group></panel-group>
  </div>
</template>

<script>
import Tactics from '@/views/dashboard/admin/components/Tactics'
import { mapState } from 'vuex'
import PanelGroup from '@/views/dashboard/scout/components/PanelGroup'
import ScoutPanel from '@/views/dashboard/scout/components/scoutPanel'
export default {
  name: 'index',
  components: { PanelGroup },
  data() {
    return {}
  },
  computed: {
    ...mapState(['position', 'group', 'name'])
  }
}
</script>

<style scoped></style>
