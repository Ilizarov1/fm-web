<template>
  <div>
    <el-row>
      <el-button type="primary" size="mini" @click="modVisible = true"
        >修改比赛安排</el-button
      >
    </el-row>
    <el-row>
      <el-calendar>
        <template slot="dateCell" slot-scope="{ date, data }">
          <p class="date-text">
            {{
              data.day
                .split('-')
                .slice(1)
                .join('-')
            }}
          </p>
          <p>{{ getCompetitor(data.day) }}</p>
        </template>
      </el-calendar>
    </el-row>
    <el-dialog :visible.sync="modVisible" title="修改赛程" width="30%">
      <el-form>
        <el-form-item>
          <el-date-picker
            v-model="modForm.date"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="modForm.competitor"
            style="width: 100%"
            placeholder="请输入比赛对手"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end"
        ><el-button type="primary" @click="modifyPlan">提交</el-button></el-row
      >
    </el-dialog>
  </div>
</template>

<script>
import schedule from '@/assets/competition.schedule.json'
export default {
  name: 'Competition',
  data() {
    return {
      competition: [],
      modVisible: false,
      modForm: {
        date: '',
        competitor: ''
      }
    }
  },
  methods: {
    getCompetitor(date) {
      let res = ''
      this.competition.find(x => {
        if (x.date === date) {
          console.log(x.competitor)
          res = 'VS' + x.competitor
        }
      })
      return res
    },
    modifyPlan() {
      const res = this.competition.find(x => {
        if (x.date === this.modForm.date) {
          x.competitor = this.modForm.competitor
          return true
        }
        return false
      })
      if (res === undefined) {
        // 不存在就追加
        this.competition.push(this.modForm)
      }
      this.modVisible = false
    }
  },
  computed: {},
  mounted() {
    this.competition = schedule
  }
}
</script>

<style lang="less" scoped>
.date-text {
  margin: 0;
  font-size: 10px;
}
</style>
