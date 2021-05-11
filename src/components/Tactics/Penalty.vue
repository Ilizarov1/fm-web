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
              @click="handleAdd(scope.row)"
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
            {{ player.name }}
            <i
              class="el-icon-remove click-icon"
              @click="handleRemove(player.name)"
            ></i>
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
      infoLst: [],
      penatly: {
        shooter: []
      }
    }
  },
  methods: {
    // 处理添加
    handleAdd(player) {
      if (!this.isExist(player.name)) {
        const item = {
          name: player.name,
          playerId: player.playerId,
          isPenalty: 1,
          penaltySeq: this.penatly.shooter.length + 1
        }
        this.penatly.shooter.push(item)
      } else {
        this.$message.error('已经加入')
      }
    },
    // 判断存在
    isExist(player) {
      const res = this.penatly.shooter.find(x => x.name === player)
      return !(res == null)
    },
    // 处理删除
    handleRemove(player) {
      const arr = this.penatly.shooter
      const idx = arr.indexOf(arr.find(x => x.name === player))
      this.penatly.shooter.splice(idx, 1)
      for (const [index, player] of Object.entries(this.penatly.shooter)) {
        player.penaltySeq = parseInt(index) + 1
      }
    },
    // 加载数据
    async load() {
      const { data } = await this.$http.get('placeKick/getData')
      for (const player of data.players) {
        const fstrecord = data.fstTeam.find(x => x.playerId === player.id)
        const placerecord = data.placeKick.find(x => x.playerId === player.id)
        const repo = data.reports.find(x => x.playerId === player.id)
        const item = {
          ...player,
          ...repo,
          ...fstrecord,
          ...placerecord
        }
        this.infoLst.push(item)
      }
      const penaltyLst = this.infoLst.filter(x => x.isPenalty === 1)
      for (let i = 1; i < penaltyLst.length + 1; i++) {
        this.penatly.shooter.push(penaltyLst.find(x => x.penaltySeq === i))
      }
    },
    // 保存点球数据
    async save() {
      if (this.penatly.shooter.length < 5 || this.penatly.shooter.length > 11) {
        return this.$message.error('请安排5到11位点球手')
      }
      const { data } = await this.$http.post(
        'placeKick/savePenalty',
        this.penatly.shooter
      )
      if (data.msg === 'success') {
        this.$message.success('保存成功')
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
