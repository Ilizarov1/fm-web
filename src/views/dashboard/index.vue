<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adminDashboard from './admin'
import scoutDashboard from './scout'
import doctorDashboard from './doctor'
import playerDashboard from './player'
export default {
  name: 'Dashboard',
  components: {
    adminDashboard,
    scoutDashboard,
    doctorDashboard,
    playerDashboard
  },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapState(['group', 'position'])
  },
  created() {
    switch (this.group) {
      case '教练组':
        this.currentRole = 'adminDashboard'
        break
      case '球探组':
        this.currentRole = 'scoutDashboard'
        break
      case '医疗组':
        this.currentRole = 'doctorDashboard'
        break
      case 'player':
        this.currentRole = 'playerDashboard'
        break
    }
  }
}
</script>
