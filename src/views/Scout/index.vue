<template>
  <div>
    <el-row>
      <el-col :span="18">
        <scout-panel></scout-panel>
      </el-col>
      <el-col :span="6">
        <div>
          <h5>球探操作</h5>
          <el-button type="primary" @click="toRepo">提交球探报告</el-button
          ><br />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-button-group>
        <el-button type="primary" size="mini" @click="read">确认</el-button>
        <el-button type="info" size="mini" @click="getDialog('needReport')"
          >要求球探分析报告</el-button
        >
        <el-button type="info" size="mini" @click="getDialog('needContinue')"
          >要求持续考察</el-button
        >
      </el-button-group>
    </el-row>
    <el-row>
      <el-table
        width="100%"
        :data="scoutRepoList"
        :row-class-name="tableRowClass"
        @selection-change="handleMutiSelect"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-link :underline="false" @click="toPlayer(scope.row.playerId)">{{
              scope.row.name
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="位置" prop="skilledRole"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="来源" prop="source"></el-table-column>
        <el-table-column label="阅读状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isRead !== 0" type="primary" size="mini"
              >最近更新已读</el-tag
            >
            <el-tag v-else type="warning" size="mini">最近更新未读</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <el-select v-model="scoutSelect">
        <el-option
          v-for="(item, index) in members"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="snd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import ScoutPanel from '@/views/Scout/components/ScoutPanel'
export default {
  name: 'index',
  components: { ScoutPanel },
  data() {
    return {
      scoutRepoList: [],
      mutiSelection: [],
      dialogVisible: false,
      members: [],
      scoutSelect: '',
      type: ''
    }
  },
  computed: {
    ...mapState(['players']),
    ...mapState(['reports'])
  },
  methods: {
    ...mapActions(['getReport']),
    getDialog(type) {
      this.dialogVisible = true
      this.type = type
    },
    snd() {
      if (this.type === 'needReport') {
        this.needReports()
      } else {
        this.needContinue()
      }
      this.dialogVisible = false
    },
    // 跳转到报告
    toRepo() {
      this.$router.push('/scoutRepo')
    },
    // 跳转到球员具体信息
    toPlayer(playerId) {
      this.$router.push({ path: `/player/${playerId}` })
    },
    // 初始化列表
    initTable() {
      const reports = _.cloneDeep(this.reports)
      const players = _.cloneDeep(this.players)
      for (const player of players) {
        const item = {}
        Object.assign(item, player)
        Object.assign(
          item,
          reports.find(x => {
            return x.playerId === player.id
          })
        )
        Object.defineProperty(item, 'source', { value: '球探小组' })
        this.scoutRepoList.push(item)
      }
      console.log('初始化完成', this.scoutRepoList)
    },
    // 更改table颜色
    tableRowClass({ row, rowIndex }) {
      if (row.isRead === 0) {
        return 'table-row-1'
      }
      return ''
    },
    // 阅读
    async read() {
      const snd = []
      for (const report of this.mutiSelection) {
        report.isRead = 1
        snd.push({
          playerId: report.playerId
        })
      }
      await this.$http.post('scout/read', snd)
    },
    // 获得多选行
    handleMutiSelect(val) {
      this.mutiSelection = val
    },
    // 发送邮件
    async needReports() {
      const snd = []
      for (const repo of this.mutiSelection) {
        snd.push({
          playerId: repo.playerId
        })
      }
      const rcv = await this.$http.post('mail/needReport', snd)
      if (rcv.data.msg === 'success') {
        this.$message.success('已向球探发送请求')
      } else {
        this.$message.error('发送出错')
      }
      const task = {
        scout: this.scoutSelect,
        playerlst: snd,
        type: 'scoutReport'
      }
      let tasks = JSON.parse(window.localStorage.getItem('tasks'))
      if (tasks != null) {
        tasks.push(task)
      } else {
        tasks = []
        tasks.push(task)
      }
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    },
    async needContinue() {
      const snd = []
      for (const repo of this.mutiSelection) {
        snd.push({
          playerId: repo.playerId
        })
      }
      const rcv = await this.$http.post('mail/needContinue', snd)
      if (rcv.data.msg === 'success') {
        this.$message.success('已向球探发送请求')
      } else {
        this.$message.error('发送出错')
      }
      const task = {
        scout: this.scoutSelect,
        playerlst: snd,
        type: 'scoutContinue'
      }
      let tasks = JSON.parse(window.localStorage.getItem('tasks'))
      if (tasks != null) {
        tasks.push(task)
      } else {
        tasks = []
        tasks.push(task)
      }
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    },
    async load() {
      const rcv = await this.$http.get('employee/getScouts')
      this.members = rcv.data
    }
  },
  async created() {
    await this.getReport()
    await this.load()
    this.initTable()
  },
  mounted() {}
}
</script>

<style scoped>
/deep/ .el-table .table-row-1 {
  background: rgba(76, 175, 80, 0.3);
}
</style>
