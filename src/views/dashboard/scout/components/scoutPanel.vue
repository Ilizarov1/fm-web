<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-star-off"></i> 当前球探重点</span>
          </div>
          <div class="com-competitor">
            <i class="el-icon-star-on"></i>
            {{ settings.point }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-star-off"></i> 当前球探报告任务</span>
          </div>
          <div
            v-for="(item, index) in tasksReport"
            :key="index"
            class="clearfix"
          >
            <div class="com-competitor">
              <i class="el-icon-s-order"></i>
              {{ getPlayerName(item.playerId) }}
            </div>
            <div class="com-date">
              {{ getPlayerRate(item.playerId) }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-star-off"></i> 当前球探持续考察任务</span>
          </div>
          <div
            v-for="(item, index) in tasksContinue"
            :key="index"
            class="clearfix"
          >
            <div class="com-competitor">
              <i class="el-icon-s-order"></i>
              {{ getPlayerName(item.playerId) }}
            </div>
            <div class="com-date">
              {{ getPlayerRate(item.playerId) }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'scoutPanel',
  data() {
    return {
      settings: {
        point: '全部'
      },
      tasksReport: [],
      tasksContinue: []
    }
  },
  methods: {
    getPlayerName(id) {
      return this.players.find(x => x.id === id).name
    },
    getPlayerRate(id) {
      return this.players.find(x => x.id === id).rate
    }
  },
  mounted() {
    const settings = JSON.parse(window.localStorage.getItem('settings'))
    const tasks = JSON.parse(window.localStorage.getItem('tasks'))
    if (settings != null) {
      this.settings = settings
    }
    if (tasks != null) {
      this.tasksReport = tasks.find(x => {
        if (x.scout === this.name && x.type === 'scoutReport') return true
      }).playerlst
      console.log(tasks)
      console.log(this.name)
      console.log(this.tasksReport)
      this.tasksContinue = tasks.find(x => {
        if (x.scout === this.name && x.type === 'scoutContinue') return true
      }).playerlst
      console.log(this.tasksContinue)
    }
  },
  computed: {
    ...mapState(['name', 'players'])
  }
}
</script>

<style scoped>
.com-date {
  display: inline-block;
  margin: 5px;
  float: right;
}
.com-competitor {
  display: inline-block;
  margin: 5px;
}
</style>
