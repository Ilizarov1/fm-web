<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-table :data="infoLst" width="100%" max-height="540">
        <el-table-column label="球员" prop="name"></el-table-column>
        <el-table-column label="惯用脚">
          <template slot-scope="scope">
            {{ getfoot(scope.row.foot) }}
          </template>
        </el-table-column>
        <el-table-column label="角球">
          <template slot-scope="scope">
            {{ scope.row.cornerSkill + '  ' }}
            <el-popconfirm
              v-if="!isExistBoth(corner.left, corner.right, scope.row)"
              title="左边或者右边"
              confirm-button-text="右边"
              cancel-button-text="左边"
              v-on:confirm="handleAdd(scope.row, 'corner', 'right')"
              v-on:cancel="handleAdd(scope.row, 'corner', 'left')"
            >
              <i slot="reference" class="el-icon-circle-plus click-icon"></i>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column label="任意球">
          <template slot-scope="scope">
            {{ scope.row.freeKick + '  ' }}
            <el-popconfirm
              v-if="!isExistBoth(free.left, free.right, scope.row)"
              title="左边或者右边"
              confirm-button-text="右边"
              cancel-button-text="左边"
              v-on:confirm="handleAdd(scope.row, 'free', 'right')"
              v-on:cancel="handleAdd(scope.row, 'free', 'left')"
            >
              <i slot="reference" class="el-icon-circle-plus click-icon"></i>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column label="界外球">
          <template slot-scope="scope">
            {{ scope.row.throwInSkill + '  ' }}
            <el-popconfirm
              v-if="!isExistBoth(out.left, out.right, scope.row)"
              title="左边或者右边"
              confirm-button-text="右边"
              cancel-button-text="左边"
              v-on:confirm="handleAdd(scope.row, 'out', 'right')"
              v-on:cancel="handleAdd(scope.row, 'out', 'left')"
            >
              <i slot="reference" class="el-icon-circle-plus click-icon"></i>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card>
            <div slot="header">
              <span>角球（左）</span>
              <el-select
                v-model="corner.val"
                class="tac-select"
                size="mini"
                @change="setStorage"
              >
                <el-option
                  v-for="(opt, index) in corner.option"
                  :key="index"
                  :label="opt"
                  :value="opt"
                ></el-option>
              </el-select>
            </div>
            <el-row>
              <ul>
                <li
                  v-for="(player, index) in corner.left"
                  :key="index"
                  class="player-lst"
                >
                  {{ player.name + ' ' }}
                  <i
                    class="el-icon-remove click-icon"
                    @click="handleRemove(player, 'corner', 'left')"
                  ></i>
                </li>
              </ul>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>角球（右）</span>
              <el-select
                v-model="corner.val"
                class="tac-select"
                size="mini"
                @change="setStorage"
              >
                <el-option
                  v-for="(opt, index) in corner.option"
                  :key="index"
                  :label="opt"
                  :value="opt"
                ></el-option>
              </el-select>
            </div>
            <el-row>
              <ul>
                <li
                  v-for="(player, index) in corner.right"
                  :key="index"
                  class="player-lst"
                >
                  {{ player.name + ' ' }}
                  <i
                    class="el-icon-remove click-icon"
                    @click="handleRemove(player, 'corner', 'right')"
                  ></i>
                </li>
              </ul>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card>
            <div slot="header">
              <span>任意球（左）</span>
              <el-select
                v-model="free.val"
                class="tac-select"
                size="mini"
                @change="setStorage"
              >
                <el-option
                  v-for="(opt, index) in free.option"
                  :key="index"
                  :label="opt"
                  :value="opt"
                ></el-option>
              </el-select>
            </div>
            <el-row>
              <ul>
                <li
                  v-for="(player, index) in free.left"
                  :key="index"
                  class="player-lst"
                >
                  {{ player.name + ' ' }}
                  <i
                    class="el-icon-remove click-icon"
                    @click="handleRemove(player, 'free', 'left')"
                  ></i>
                </li>
              </ul>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>任意球（右）</span>
              <el-select
                v-model="free.val"
                class="tac-select"
                size="mini"
                @change="setStorage"
              >
                <el-option
                  v-for="(opt, index) in free.option"
                  :key="index"
                  :label="opt"
                  :value="opt"
                ></el-option>
              </el-select>
            </div>
            <el-row>
              <ul>
                <li
                  v-for="(player, index) in free.right"
                  :key="index"
                  class="player-lst"
                >
                  {{ player.name + ' ' }}
                  <i
                    class="el-icon-remove click-icon"
                    @click="handleRemove(player, 'free', 'right')"
                  ></i>
                </li>
              </ul>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card>
            <div slot="header">
              <span>界外球（左）</span>
              <el-select
                v-model="out.val"
                class="tac-select"
                size="mini"
                @change="setStorage"
              >
                <el-option
                  v-for="(opt, index) in out.option"
                  :key="index"
                  :label="opt"
                  :value="opt"
                ></el-option>
              </el-select>
            </div>
            <el-row>
              <ul>
                <li
                  v-for="(player, index) in out.left"
                  :key="index"
                  class="player-lst"
                >
                  {{ player.name + ' ' }}
                  <i
                    class="el-icon-remove click-icon"
                    @click="handleRemove(player, 'out', 'left')"
                  ></i>
                </li>
              </ul>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>界外球（右）</span>
              <el-select
                v-model="out.val"
                class="tac-select"
                size="mini"
                @change="setStorage"
              >
                <el-option
                  v-for="(opt, index) in out.option"
                  :key="index"
                  :label="opt"
                  :value="opt"
                ></el-option>
              </el-select>
            </div>
            <el-row>
              <ul>
                <li
                  v-for="(player, index) in out.right"
                  :key="index"
                  class="player-lst"
                >
                  {{ player.name + ' ' }}
                  <i
                    class="el-icon-remove click-icon"
                    @click="handleRemove(player, 'out', 'right')"
                  ></i>
                </li>
              </ul>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import qs from 'qs'
import _ from 'lodash'
export default {
  name: 'SetPieces',
  data() {
    return {
      infoLst: [],
      corner: {
        val: '',
        option: ['远门柱', '近门柱', '禁区边缘', '战术角球', '直接射门'],
        left: [],
        right: []
      },
      free: {
        val: '',
        option: ['射门', '战术配合', '边路', '纵深'],
        left: [],
        right: []
      },
      out: {
        val: '',
        option: ['短传', '长传', '快速'],
        left: [],
        right: []
      }
    }
  },
  methods: {
    // 处理添加事件
    handleAdd(player, type, side) {
      switch (type) {
        case 'corner':
          if (!this.isExist(this.corner[side], player)) {
            this.corner[side].push(player)
          } else {
            return this.$message.error('已经加入')
          }
          break
        case 'free':
          if (!this.isExist(this.free[side], player)) {
            this.free[side].push(player)
          } else {
            return this.$message.error('已经加入')
          }
          break
        case 'out':
          if (!this.isExist(this.out[side], player)) {
            this.out[side].push(player)
          } else {
            return this.$message.error('已经加入')
          }
          break
      }
      this.post(player, type, side)
    },
    // 检查在不在数组里
    isExist(side = [], player = null) {
      const res = side.indexOf(player)
      return !(res === -1)
    },
    isExistBoth(left = [], right = [], player = null) {
      const leftRes = left.indexOf(player)
      const rightRes = right.indexOf(player)
      return !(leftRes === -1 || rightRes === -1)
    },
    // 处理删除事件
    handleRemove(player, type, side) {
      let index = -1
      switch (type) {
        case 'corner':
          index = this.corner[side].indexOf(player)
          this.corner[side].splice(index, 1)
          this.del(player, type, side)
          break
        case 'free':
          index = this.free[side].indexOf(player)
          this.free[side].splice(index, 1)
          break
        case 'out':
          index = this.out[side].indexOf(player)
          this.out[side].splice(index, 1)
          break
      }
    },
    // 数据加载
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
      this.corner.left = this.infoLst.filter(x => x.isCornerLeft === 1)
      this.corner.right = this.infoLst.filter(x => x.isCornerR === 1)
      this.free.left = this.infoLst.filter(x => x.isFreeKickL === 1)
      this.free.right = this.infoLst.filter(x => x.isFreeKickR === 1)
      this.out.left = this.infoLst.filter(x => x.isThrowInL === 1)
      this.out.right = this.infoLst.filter(x => x.isThrowInR === 1)
      const conf = JSON.parse(window.localStorage.getItem('placeKick'))
      if (conf != null) {
        Object.assign(this.corner, conf.corner)
        Object.assign(this.free, conf.free)
        Object.assign(this.out, conf.out)
      }
    },
    // 处理更新
    async post(player, type, side) {
      let snd = {}
      switch (type) {
        case 'corner':
          if (side === 'left') {
            snd = {
              playerId: player.playerId,
              isCornerLeft: 1
            }
          } else {
            snd = {
              playerId: player.playerId,
              isCornerR: 1
            }
          }
          break
        case 'free':
          if (side === 'left') {
            snd = {
              playerId: player.playerId,
              isFreeKickL: 1
            }
          } else {
            snd = {
              playerId: player.playerId,
              isFreeKickR: 1
            }
          }
          break
        case 'out':
          if (side === 'left') {
            snd = {
              playerId: player.playerId,
              isThrowInL: 1
            }
          } else {
            snd = {
              playerId: player.playerId,
              isThrowInR: 1
            }
          }
          break
      }
      await this.$http.post('placeKick/addSetPieces', snd)
    },
    // 处理删除
    async del(player, type, side) {
      let snd = {}
      switch (type) {
        case 'corner':
          if (side === 'left') {
            snd = {
              playerId: player.playerId,
              type: 'isCorner',
              side: 'L'
            }
          } else {
            snd = {
              playerId: player.playerId,
              type: 'isCorner',
              side: 'R'
            }
          }
          break
        case 'free':
          if (side === 'left') {
            snd = {
              playerId: player.playerId,
              type: 'isFreeKick',
              side: 'L'
            }
          } else {
            snd = {
              playerId: player.playerId,
              type: 'isFreeKick',
              side: 'R'
            }
          }
          break
        case 'out':
          if (side === 'left') {
            snd = {
              playerId: player.playerId,
              type: 'isThrowIn',
              side: 'L'
            }
          } else {
            snd = {
              playerId: player.playerId,
              type: 'isThrowIn',
              side: 'R'
            }
          }
          break
      }
      const rcv = await this.$http.post('placeKick/del', qs.stringify(snd), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(rcv.data)
    },
    // 提交战术配置
    async setConf(content) {
      await this.$http.post('conf/postConf', {
        content: JSON.stringify(content),
        type: 'placeKick'
      })
    },
    setStorage() {
      const corner = {
        val: this.corner.val
      }
      const free = {
        val: this.free.val
      }
      const out = {
        val: this.out.val
      }
      const content = {
        corner,
        free,
        out
      }
      this.setConf(content)
      window.localStorage.setItem('placeKick', JSON.stringify(content))
    },
    // 惯用脚
    getfoot(foot) {
      if (foot === 'left') return '左'
      else return '右'
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
.tac-select {
  font-size: 10px;
  width: 100px;
  height: 10px;
}
.player-lst {
  position: relative;
  i {
    position: absolute;
    right: 0;
  }
}
</style>
