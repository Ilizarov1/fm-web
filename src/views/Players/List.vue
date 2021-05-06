<template>
  <el-row :gutter="8">
    <el-row style="margin-bottom: 10px">
      <el-button-group>
        <el-button type="primary" size="mini" @click="fstTeam(1)"
          >加入一线队</el-button
        >
        <el-button type="danger" size="mini" @click="fstTeam(0)"
          >移出一线队</el-button
        >
        <el-button type="success" size="mini" @click="vacation(0)"
          >休假</el-button
        >
        <el-button type="danger" size="mini" @click="vacation(1)"
          >召回</el-button
        >
      </el-button-group>

      <el-input
        placeholder="请输入内容"
        v-model="search"
        style="width: 300px;margin-left: 10px"
        size="small"
      >
        <el-select
          v-model="searchType"
          slot="prepend"
          placeholder="请选择"
          style="width: 80px"
        >
          <el-option label="姓名" value="name"></el-option>
          <el-option label="位置" value="pos"></el-option>
          <el-option label="评分" value="rate"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
    <el-row type="flex" :gutter="8">
      <el-table
        :data="players"
        ref="playerTable"
        style="width: 1060px"
        max-height="550"
        @selection-change="selectionHandler"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="一线队" width="80">
          <template slot-scope="scope">
            {{ getIsFstTeam(scope.row.isFstTeam) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="skilledRole" label="位置"></el-table-column>
        <el-table-column
          prop="rate"
          label="综合评分"
          width="100"
        ></el-table-column>
        <el-table-column label="工作/休假/伤停" width="120">
          <template slot-scope="scope">
            {{ getIsWork(scope.row.isWork) }}
          </template>
        </el-table-column>
        <el-table-column label="健康状态" width="100">
          <template slot-scope="scope">
            {{ getIsHealthy(scope.row.isHealthy) }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--    <el-row type="flex" justify="end">-->
    <!--      <div class="pager-box">-->
    <!--        <el-pagination-->
    <!--          layout="prev, pager, next"-->
    <!--          :total="50"-->
    <!--          class="pagination"-->
    <!--        >-->
    <!--        </el-pagination>-->
    <!--      </div>-->
    <!--    </el-row>-->
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import qs from 'qs'
export default {
  name: 'List',
  data() {
    return {
      search: '',
      searchType: 'name',
      selected: []
    }
  },
  computed: {
    ...mapState(['players'])
  },
  methods: {
    ...mapActions(['getPlayers']),
    // 表格
    getIsWork(isWork) {
      switch (isWork) {
        case 0:
          return '休假中'
        case 1:
          return '工作中'
        case 2:
          return '伤病中'
      }
    },
    getIsHealthy(isHealthy) {
      switch (isHealthy) {
        case 1:
          return '状态良好'
        case 0:
          return '存在伤病'
      }
    },
    getIsFstTeam(isFstTeam) {
      switch (isFstTeam) {
        case 0:
          return '待定'
        case 1:
          return '一线队'
      }
    },
    // 处理表格选择
    selectionHandler(e) {
      this.selected = e
    },
    // 加入一线队
    async fstTeam(mod) {
      if (this.selected.length === 0) {
        return this.$message.error('请选择')
      }
      for (const player of this.selected) {
        await this.$http.put(
          'player/fstTeam',
          qs.stringify({
            id: player.id,
            mod
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
      }
      await this.getPlayers()
    },
    // 休假
    async vacation(mod) {
      if (this.selected.length === 0) {
        return this.$message.error('请选择')
      }
      for (const player of this.selected) {
        await this.$http.put(
          'player/vacation',
          qs.stringify({
            id: player.id,
            mod
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
      }
      await this.getPlayers()
    }
  },
  mounted() {
    this.getPlayers()
    this.players = this.$store.state.players
  }
}
</script>

<style scoped>
.pagination {
  margin-right: -10px;
}
.pager-box >>> button,
.pager-box >>> .el-pager li {
  background-color: transparent !important;
}

.pager-box >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgb(228, 245, 239) !important;
}
</style>
<style></style>
