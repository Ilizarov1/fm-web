<template>
  <div>
    <!--    信息栏-->
    <el-row :gutter="20">
      <el-col :span="8">
        <h4>评估人</h4>
        <span>小李</span><br />
        <span>首席医生</span>
      </el-col>
      <el-col :span="5">
        <h4>赛程</h4>
        <span>最近14天1场比赛</span><br />
        <span>休息4天</span>
      </el-col>
      <el-col :span="5">
        <h4>训练负荷</h4>
        <span>训练负荷低</span><br />
        <span>球员对训练强度表示满意</span>
      </el-col>
      <el-col span="6">
        <h4>医生操作</h4>
        <el-button type="primary">更新伤情报告</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-table :data="mdRepo">
        <el-table-column label="球员" prop="name"></el-table-column>
        <el-table-column label="比赛负荷">
          <template slot-scope="scope">
            <span>最近14天中参与{{ scope.row.competition }}次比赛</span>
          </template>
        </el-table-column>
        <el-table-column label="训练负荷" prop="training"></el-table-column>
        <el-table-column label="身体状况">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="伤病情况"
              width="200"
              trigger="hover"
              :content="scope.row.injury"
            >
              <div
                :class="
                  scope.row.injury === '无伤病' ? 'body-img' : 'body-injury'
                "
                slot="reference"
              ></div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="伤病风险">
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.risk }}</el-tag
            ><br />
            <span v-if="scope.row.recurrence === 1" style="color: #E6A23C"
              >存在复发性伤病</span
            >
            <span v-else style="color: #3ba776">无复发性伤病</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      mdRepo: [
        {
          name: 'J.Lingard',
          competition: 1,
          training: '低',
          possibility: '低',
          risk: '低',
          recurrence: 0,
          injury: '无伤病'
        },
        {
          name: '尤素福 波尔森',
          competition: 1,
          training: '低',
          possibility: '低',
          risk: '高',
          recurrence: 1,
          injury: '十字韧带撕裂'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.body-img {
  height: 150px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -50px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/肌肉骨骼.png') no-repeat center center;
    background-size: 60%;
  }
}
.body-injury {
  height: 150px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -50px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/十字韧带.png') no-repeat center center;
    background-size: 60%;
  }
}
</style>
