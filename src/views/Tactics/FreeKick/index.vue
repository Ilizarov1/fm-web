<template>
  <div>
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adminFree from './admin'
import playerFree from './player'
export default {
  name: 'index',
  components: { adminFree, playerFree },
  data() {
    return {
      currentRole: 'playerFree'
    }
  },
  computed: {
    ...mapState(['position', 'group'])
  },
  mounted() {
    switch (this.group) {
      case '教练组':
        this.currentRole = 'adminFree'
        break
      case 'player':
        this.currentRole = 'playerFree'
        break
    }
  }
}
</script>

<style scoped></style>
