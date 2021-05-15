<template>
  <div>
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adminAnime from './admin'
import playerAnime from './player'
export default {
  name: 'index',
  components: { adminAnime, playerAnime },
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
        this.currentRole = 'adminAnime'
        break
      case 'player':
        this.currentRole = 'playerAnime'
        break
    }
  }
}
</script>

<style scoped></style>
