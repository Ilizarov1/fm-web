<template>
  <el-row :gutter="8">
    <el-row style="margin-bottom: 10px">
      <el-button type="primary" size="mini">加入一线队</el-button>
      <el-button type="danger" size="mini">移出一线队</el-button>
      <el-button type="success" size="mini">休假</el-button>
      <el-button type="danger" size="mini">召回</el-button>
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
      <el-table :data="playerList" ref="playerTable" style="width: 1060px">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="isFstTeam" label="一线队" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="position" label="位置"></el-table-column>
        <el-table-column
          prop="rate"
          label="综合评分"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="isWork"
          label="工作/休假/伤停"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="isHealthy"
          label="健康状态"
          width="100"
        ></el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="end">
      <div class="pager-box">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          class="pagination"
        >
        </el-pagination>
      </div>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      playerList: [
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        },
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        },
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        },
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        },
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        },
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        },
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        },
        {
          name: 'L.Messi',
          position: 'RW/ST/CF',
          rate: 93,
          potential: 93,
          isWork: '工作中',
          isHealthy: '状态良好',
          isFstTeam: '首发'
        }
      ],
      search: '',
      searchType: 'name'
    }
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
