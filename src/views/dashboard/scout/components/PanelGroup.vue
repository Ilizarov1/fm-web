<template>
  <el-row :gutter="30">
    <el-col :span="8">
      <el-card>
        <div slot="header" class="clearfix">
          <span><i class="el-icon-s-flag"></i> 近期比赛</span>
        </div>
        <div v-for="(item, index) in competition" :key="index" class="clearfix">
          <i class="el-icon-position"></i>
          <div class="com-date">{{ item.comDate }}</div>
          <div class="com-competitor">{{ item.competitor }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <div slot="header" class="clearfix">
          <i class="el-icon-date"></i>
          <span> 今日训练 - {{ today }}</span>
        </div>
        <div v-for="(item, index) in training" :key="index" class="clearfix">
          <i class="el-icon-tickets"></i>
          <div class="com-date">{{ item.trainTime }}</div>
          <div class="com-competitor">{{ item.trainType }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <div slot="header" class="clearfix">
          <i class="el-icon-document-add"></i>
          <span> 新增信息</span>
        </div>
        <div class="clearfix">
          <i class="el-icon-user"></i>
          <div class="com-date">新增{{ getType(newItem.user.role) }}</div>
          <div class="com-competitor">{{ newItem.user.name }}</div>
        </div>
        <div class="clearfix">
          <i class="el-icon-document"></i>
          <div class="com-date">报告更新</div>
          <div class="com-competitor">{{ newItem.report.name }}</div>
        </div>
        <div class="clearfix">
          <i class="el-icon-time"></i>
          <div class="com-date">赛程更新</div>
          <div class="com-competitor">{{ newItem.com.competitor }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'PanelGroup',
  data() {
    return {
      competition: [],
      training: [],
      today: '',
      newItem: {
        user: {
          role: '',
          name: ''
        },
        report: {
          name: ''
        },
        com: {
          competitor: ''
        }
      }
    }
  },
  methods: {
    // 加载数据,
    async load() {
      const rcvCom = await this.$http.get('schedule/getCompetition')
      this.competition = rcvCom.data.slice(-3)
      const rcvTrain = await this.$http.get('schedule/getTrainLst')
      this.training = this.getTodayTraining(rcvTrain.data)
      const user = await this.$http.get('login/getAll')
      const scout = await this.$http.get('scout/getAll')
      const lastscout = scout.data.reports[scout.data.reports.length - 1]
      const lastplayer = scout.data.players.find(
        x => x.id === lastscout.playerId
      )
      const lastreport = {
        ...lastplayer,
        ...lastscout
      }

      this.newItem = this.getNewLst(
        user.data[user.data.length - 1],
        lastreport,
        rcvCom.data[rcvCom.data.length - 1]
      )
    },
    // 获得今天的训练
    getTodayTraining(trainingLst = []) {
      this.today = dayjs().format('YYYY-MM-DD')
      for (const t of trainingLst) {
        if (t.trainDate === this.today) {
          return t.item
        }
      }
    },
    // 获得最新
    getNewLst(user, report, com) {
      return {
        user,
        report,
        com
      }
    },
    // 获得类型
    getType(type) {
      switch (type) {
        case 'player':
          return '球员'
        case 'scout':
          return '球探'
        case 'doctor':
          return '队医'
      }
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style lang="less" scoped>
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
