<template>
  <el-row>
    <el-col :span="12">
      <div
        v-for="(item, index) in fstLst.slice(0, 6)"
        :key="index"
        class="clearfix"
      >
        <div class="player">
          <div class="player-position">
            {{ item.status === 2 ? '替补' : item.position }}
          </div>
          <div class="player-role">
            {{ item.role }}
          </div>
          <div class="player-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div
        v-for="(item, index) in fstLst.slice(6)"
        :key="index"
        class="clearfix"
      >
        <div class="player">
          <div class="player-position">
            {{ item.status === 2 ? '替补' : item.position }}
          </div>
          <div class="player-role">
            {{ item.role }}
          </div>
          <div class="player-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'FstTeam',
  data() {
    return {
      fstLst: []
    }
  },
  methods: {
    async load() {
      const { status, data } = await this.$http.get('fstTeam/getFstPlayers')
      for (const player of data.players) {
        const item = {
          ...player,
          ...data.fstTeam.find(x => x.playerId === player.id)
        }
        this.fstLst.push(item)
      }
    },
    // 获得球员状态
    getStatusStr(status) {
      if (status === 0) {
        return '未入选'
      } else if (status === 1) {
        return '首发'
      } else {
        return '替补'
      }
    }
  },
  async mounted() {
    await this.load()
  }
}
</script>

<style lang="less" scoped>
.player {
  position: relative;
  margin: 5px;
  .player-name {
    position: absolute;
    left: 150px;
  }
  .player-role {
    position: absolute;
    left: 50px;
  }
  .player-position {
    float: left;
  }
}
</style>
