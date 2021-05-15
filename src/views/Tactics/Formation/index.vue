<template>
  <div>
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adminFormation from './admin'
import playerFormation from './player'
export default {
  name: 'index',
  components: { adminFormation, playerFormation },
  data() {
    return {
      currentRole: ''
    }
  },
  computed: {
    ...mapState(['position', 'group'])
  },

  mounted() {
    switch (this.group) {
      case '教练组':
        this.currentRole = 'adminFormation'
        break
      case 'player':
        this.currentRole = 'playerFormation'
        break
    }
  }
}
</script>

<style scoped></style>
