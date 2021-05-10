<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-table :data="infoLst" max-height="450">
        <el-table-column label="球员" prop="name"></el-table-column>
        <el-table-column label="射术" prop="shotSkill"></el-table-column>
        <el-table-column label="点球" prop="penalty"></el-table-column>
        <el-table-column label="沉着" prop="composure"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              v-if="!isExist(scope.row.name)"
              class="el-icon-circle-plus click-icon"
              @click="handleAdd(scope.row.name)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12">
      <el-card>
        <div slot="header">
          <span>罚球手及次序</span>
          <el-button size="mini" style="margin-left: 20px" @click="save"
            >保存</el-button
          >
        </div>
        <ul>
          <li
            v-for="(player, index) in penatly.shooter"
            :key="index"
            class="player-lst"
          >
            <el-tag effect="plain">{{ index + 1 }}</el-tag>
            {{ player }}
            <i class="el-icon-remove click-icon" @click="handleRemove"></i>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Penalty',
  data() {
    return {
      // players: [
      //   {
      //     name: '1-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '2-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '3-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '4-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '5-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '6-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '7-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '8-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '9-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '左',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '10-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '11-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '12-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '13-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '14-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '15-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '16-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '17-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   },
      //   {
      //     name: '18-player',
      //     position: 'ST/RW/CF',
      //     status: '未入选',
      //     title: '',
      //     role: '',
      //     foot: '右',
      //     corner: '强',
      //     free: '中',
      //     out: '弱',
      //     shoSkill: Math.ceil(Math.random() * 100),
      //     penalty: Math.ceil(Math.random() * 100),
      //     composure: Math.ceil(Math.random() * 100)
      //   }
      // ],
      infoLst: [],
      penatly: {
        shooter: []
      }
    }
  },
  methods: {
    // 处理添加
    handleAdd(player) {
      if (!this.isExist(player)) {
        this.penatly.shooter.push(player)
      } else {
        this.$message.error('已经加入')
      }
    },
    // 判断存在
    isExist(player) {
      const res = this.penatly.shooter.indexOf(player)
      return !(res === -1)
    },
    // 处理删除
    handleRemove(player) {
      const idx = this.penatly.shooter.indexOf(player)
      this.penatly.shooter.splice(idx, 1)
    },
    // 加载数据
    async load() {
      const { data } = await this.$http.get('placeKick/getData')
      for (const player of data.players) {
        const fstrecord = data.fstTeam.find(x => x.playerId === player.id)
        const placerecord = data.placeKick.find(x => x.playerId === player.id)
        const repo = data.reports.find(x => x.playerId === player.id)
        console.log(fstrecord, placerecord)
        const item = {
          ...player,
          ...repo,
          ...fstrecord,
          ...placerecord
        }
        this.infoLst.push(item)
      }
      console.log(this.infoLst)
    },
    // 保存点球数据
    save() {
      if (this.penatly.shooter.length < 5) {
        return this.$message.error('请至少安排5位点球手')
      }
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style lang="less" scoped>
.click-icon {
  cursor: pointer;
}
.player-lst {
  position: relative;
  margin: 10px 0;
  i {
    position: absolute;
    right: 0;
  }
}
</style>
