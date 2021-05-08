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
            v-model="modForm.comDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            @change="selectDate"
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Competition',
  data() {
    return {
      modVisible: false,
      modForm: {
        id: -1,
        comDate: '',
        competitor: ''
      }
    }
  },
  methods: {
    ...mapActions(['getCompetition']),
    getCompetitor(date) {
      let res = ''
      this.competition.find(x => {
        if (x.comDate === date) {
          console.log(x.competitor)
          res = 'VS' + x.competitor
        }
      })
      return res
    },
    modifyPlan() {
      this.competition.find(x => {
        if (x.comDate === this.modForm.comDate) {
          this.modForm.id = x.id
          return true
        } else return false
      })
      this.submit()

      this.modVisible = false
    },
    // 提交
    async submit() {
      const { status, data } = await this.$http.post(
        'schedule/postCompetition',
        this.modForm
      )
      this.modForm = {
        id: -1,
        comDate: '',
        competitor: ''
      }
      await this.getCompetition()
      console.log(data)
    },
    // 选择日期以后
    selectDate() {
      this.competition.find(x => {
        if (x.comDate === this.modForm.comDate) {
          this.modForm.competitor = x.competitor
          return true
        } else return false
      })
    }
  },
  computed: {
    ...mapState(['competition'])
  },
  mounted() {
    this.getCompetition()
  }
}
</script>

<style lang="less" scoped>
.date-text {
  margin: 0;
  font-size: 10px;
}
</style>
