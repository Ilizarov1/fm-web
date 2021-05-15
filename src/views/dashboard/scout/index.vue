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
    <scout-panel></scout-panel>
  </div>
</template>

<script>
import Tactics from '@/views/dashboard/admin/components/Tactics'
import { mapState } from 'vuex'
import PanelGroup from '@/views/dashboard/scout/components/PanelGroup'
import ScoutPanel from '@/views/dashboard/scout/components/scoutPanel'
export default {
  name: 'index',
  components: { ScoutPanel, PanelGroup },
  data() {
    return {}
  },
  computed: {
    ...mapState(['position', 'group', 'name'])
  }
}
</script>

<style scoped></style>
