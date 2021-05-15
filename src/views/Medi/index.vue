<template>
  <div>
    <!--    信息栏-->
    <el-row :gutter="20">
      <el-col :span="8">
        <h4>评估人</h4>
        <span>1-doctor</span><br />
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
      <el-col :span="6" v-if="group === '医疗组'">
        <h4>医生操作</h4>
        <el-button type="primary" @click="dialogVisible = true"
          >更新伤情报告</el-button
        >
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-table :data="mdRepo">
        <el-table-column label="球员">
          <template slot-scope="scope">
            {{ getName(scope.row.playerId) }}
          </template>
        </el-table-column>
        <el-table-column label="伤病" prop="injury"></el-table-column>
        <el-table-column label="伤病情况">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="伤病情况"
              width="200"
              trigger="hover"
              :content="scope.row.injury"
            >
              <div :class="getImage(scope.row.injury)" slot="reference"></div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="受伤原因" prop="reason"> </el-table-column>
        <el-table-column label="严重性">
          <template slot-scope="scope">
            <el-tag :type="getSerious(scope.row.serious)">{{
              scope.row.serious
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="预计康复时间">
          <template slot-scope="scope">
            {{ scope.row.recoverTime + ' 天' }}
          </template>
        </el-table-column>
        <el-table-column label="再复发伤病" prop="isRe"> </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="伤情报告" :visible.sync="dialogVisible" width="30%">
      <el-form :model="reportForm" ref="reportFormRef" label-width="100px">
        <el-form-item label="球员">
          <el-select
            v-model="reportForm.playerId"
            filterable
            @change="getReport"
          >
            <el-option
              v-for="(item, index) in players"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="伤病">
          <el-input v-model="reportForm.injury"> </el-input>
        </el-form-item>
        <el-form-item label="伤病部位">
          <el-select v-model="reportForm.bodyPart">
            <el-option
              v-for="(item, index) in bdPartOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受伤原因">
          <el-select v-model="reportForm.reason">
            <el-option
              v-for="(item, index) in reasonOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="严重性">
          <el-select v-model="reportForm.serious">
            <el-option
              v-for="(item, index) in seriousOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="再复发性">
          <el-select v-model="reportForm.isRe">
            <el-option
              v-for="(item, index) in isReOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="康复时间">
          <el-input-number v-model="reportForm.recoverTime"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button-group>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="warning" @click="recover">康复</el-button>
          <el-button type="primary" @click="post">确 定</el-button>
        </el-button-group>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      mdRepo: [
        {
          name: '1-player',
          reason: '比赛',
          risk: '低',
          serious: '轻微',
          isRe: '否',
          injury: '胫骨挫伤',
          bodyPart: '',
          recoverTime: 3,
          isHistory: 0
        },
        {
          name: '2-player',
          reason: '比赛',
          serious: '严重',
          isRe: '否',
          injury: '十字韧带撕裂',
          recoverTime: 3,
          isHistory: 0
        }
      ],
      dialogVisible: false,
      reportForm: {
        playerId: '',
        reason: '',
        serious: '',
        isRe: '',
        injury: '',
        recoverTime: 0
      },
      players: [{ name: '' }],
      bdPartOptions: ['大腿', '小腿', '膝盖', '脚踝', '脚', '手腕', '其他部位'],
      reasonOptions: ['比赛', '训练'],
      seriousOptions: ['严重', '轻微', '微小'],
      isReOptions: ['是', '否']
    }
  },
  methods: {
    getImage(injury) {
      switch (injury) {
        case '十字韧带撕裂':
          return 'body-injury-1'
        case '胫骨挫伤':
          return 'body-injury-2'
        case '脚踝挫伤':
          return 'body-injury-3'
        case '腘绳肌酸痛':
          return 'body-injury-4'
        case '膝盖瘀伤':
          return 'body-injury-5'
      }
    },
    async loadPlayers() {
      const rcv = await this.$http.get('player/getAll')
      this.players = rcv.data
    },
    async getReport(val) {
      const rcv = await this.$http.post('medical/getByPlayerId', {
        playerId: val
      })
      const reportLst = rcv.data.reports
      let newHistory = null
      if (reportLst != null) {
        newHistory = reportLst.find(x => x.isHistory === 0)
      }
      if (newHistory != null) {
        Object.assign(this.reportForm, newHistory)
      } else {
        for (const name in this.$data.reportForm) {
          if (name !== 'playerId') {
            this.$data.reportForm[name] = ''
          }
        }
      }
    },
    post() {
      this.postReport()
      for (const name in this.$data.reportForm) {
        this.$data.reportForm[name] = ''
      }
    },
    async postReport() {
      const rcv = await this.$http.post('medical/postReport', this.reportForm)
      if (rcv.data.msg === 'success') {
        this.$message.success('新增报告成功')
        this.dialogVisible = false
      } else {
        this.$message.error('失败')
      }
      await this.loadReport()
    },
    async recover() {
      const rcv = await this.$http.post('medical/recover', this.reportForm)
      if (rcv.data.msg === 'success') {
        this.$message.success('康复成功')
        this.dialogVisible = false
      }
      for (const name in this.$data.reportForm) {
        this.$data.reportForm[name] = ''
      }
    },
    getSerious(serious) {
      if (serious === '严重') {
        return 'danger'
      } else if (serious === '轻微') {
        return 'success'
      }

      return 'info'
    },
    async loadReport() {
      const rcv = await this.$http.get('medical/getNewHistory')
      this.mdRepo = rcv.data
    },
    getName(id) {
      return this.players.find(x => x.id === id).name
    }
  },
  mounted() {
    this.loadPlayers()
    this.loadReport()
  },
  computed: {
    ...mapState(['name', 'group', 'position'])
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
    left: -40px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/肌肉骨骼.png') no-repeat center center;
    background-size: 60%;
  }
}
.body-injury-1 {
  height: 150px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -40px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/十字韧带.png') no-repeat center center;
    background-size: 60%;
  }
}
.body-injury-2 {
  height: 150px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -40px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/胫骨挫伤.png') no-repeat center center;
    background-size: 60%;
  }
}
.body-injury-3 {
  height: 150px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -40px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/脚踝挫伤.png') no-repeat center center;
    background-size: 60%;
  }
}
.body-injury-4 {
  height: 150px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -40px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/腘绳肌酸痛.png') no-repeat center
      center;
    background-size: 60%;
  }
}
.body-injury-5 {
  height: 150px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -40px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/膝盖瘀伤.png') no-repeat center center;
    background-size: 60%;
  }
}
</style>
