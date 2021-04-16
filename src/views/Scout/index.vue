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
            <el-link :underline="false" href="/player">{{
              scope.row.name
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="当前俱乐部" prop="club"></el-table-column>
        <el-table-column label="位置" prop="position"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="来源" prop="source"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      scoutRepoList: [
        {
          name: 'J.Lingard',
          club: '曼联',
          position: 'CAM',
          age: 28,
          source: '球探小组'
        }
      ]
    }
  },
  methods: {
    toRepo() {
      this.$router.push('/scoutRepo')
    }
  }
}
</script>

<style scoped></style>
