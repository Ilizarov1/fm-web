<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div>
          <h5>球探职责</h5>
          <p>小王</p>
          <p>首席球探</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <h5>球探重点</h5>
          <p>总体</p>
          <p>全部</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <h5>球探团队</h5>
          <p>5名成员</p>
          <p>2名未分配</p>
        </div>
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
        <el-button type="primary" size="mini">确认</el-button>
        <el-button type="danger" size="mini">放弃</el-button>
        <el-button type="info" size="mini">要求球探分析报告</el-button>
        <el-button type="info" size="mini">要求持续考察</el-button>
      </el-button-group>
    </el-row>
    <el-row>
      <el-table width="100%" :data="scoutRepoList">
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
      </el-table>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      scoutRepoList: [
        {
          name: 'J.Lingard',
          skilledRole: 'CAM',
          age: 28,
          source: '球探小组'
        }
      ]
    }
  },
  computed: {
    ...mapState(['players']),
    ...mapState(['reports'])
  },
  methods: {
    ...mapActions(['getReport']),
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
    }
  },
  async created() {
    await this.getReport()
    this.initTable()
  },
  mounted() {}
}
</script>

<style scoped></style>
