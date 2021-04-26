<template>
  <div>
    <el-col :span="13">
      <div class="field-1">
        <div v-if="alterCtrl">
          <div v-for="(row, i) in formation" :key="i" class="field-row-1">
            <div
              v-for="(col, j) in row"
              :key="j"
              :class="'field-col-1 ' + col.class"
            >
              <el-avatar shape="circle" :size="50" class="avatar">
                <el-popover
                  placement="right"
                  width="600"
                  trigger="click"
                  v-model="visible[col.popIndex]"
                >
                  <el-table :data="players" max-height="400px">
                    <el-table-column
                      prop="status"
                      label="状态"
                    ></el-table-column>
                    <el-table-column prop="name" label="球员"></el-table-column>
                    <el-table-column
                      prop="position"
                      label="位置"
                    ></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button-group>
                          <el-button
                            size="mini"
                            @click="
                              choosePlayer(
                                i,
                                j,
                                scope.$index,
                                scope.row,
                                col.popIndex,
                                true
                              )
                            "
                            :disabled="scope.row.status === '首发'"
                            type="primary"
                            >选择</el-button
                          >
                          <el-button
                            size="mini"
                            type="danger"
                            :disabled="scope.row.status === '未入选'"
                            @click="
                              choosePlayer(
                                i,
                                j,
                                scope.$index,
                                col.popIndex,
                                false
                              )
                            "
                            >移除</el-button
                          >
                        </el-button-group>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div slot="reference" class="player-text">
                    {{ col.player === '' ? '选择' : col.player }}
                  </div>
                </el-popover>
              </el-avatar>
              <el-popover
                placement="right"
                width="300"
                trigger="click"
                v-model="roleVis[col.popIndex]"
              >
                <el-table :data="col.positionLst" max-height="300px">
                  <el-table-column prop="title" label="角色"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button-group>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="chooseRole(i, j, scope.$index, col.popIndex)"
                          >选择</el-button
                        >
                      </el-button-group>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="role" slot="reference">
                  {{ col.role === '' ? '角色' : col.role }}
                  <i class="el-icon-arrow-down"></i>
                </div>
              </el-popover>

              <p>{{ col.title }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="(row, i) in formation" :key="i" class="field-row-1">
            <div
              v-for="(col, j) in row"
              :key="j"
              :class="'field-col-1 ' + col.class"
            >
              <el-avatar shape="circle" :size="50" class="avatar">
                <div class="player-text">
                  {{ col.player === '' ? '选择' : col.player }}
                </div>
              </el-avatar>

              <div class="role" slot="reference">
                {{ col.role === '' ? col.positionLst[0].title : col.role }}
              </div>

              <p>{{ col.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="11">
      <el-row>
        <el-button-group style="margin-right: 5px">
          <el-button @click="alterViewCtrl" :disabled="alterCtrl" size="small"
            >修改阵容</el-button
          >
          <el-button @click="saveViewCtrl" :disabled="!alterCtrl" size="small"
            >保存阵容</el-button
          >
          <el-button
            size="small"
            @click="alterReplace = true"
            :disabled="alterReplace"
            >修改替补上限</el-button
          >
        </el-button-group>
        <span v-if="!alterReplace">替补上限:{{ replaceMax }}</span>
        <div v-else class="alterReplace">
          <el-input v-model="replaceMax" size="small"></el-input>
          <el-button size="small" @click="alterReplace = !alterReplace"
            >确定</el-button
          >
        </div>
      </el-row>
      <el-row>
        <el-table :data="players" max-height="595px">
          <el-table-column label="位置/角色">
            <template slot-scope="scope">
              <el-tag
                v-if="
                  getPlayerField(scope.row.name, scope.row.status) === 'front'
                "
                type="primary"
                size="mini"
              >
                {{ getPlayerStatus(scope.row.name, scope.row.status) }}
              </el-tag>
              <el-tag
                v-if="
                  getPlayerField(scope.row.name, scope.row.status) === 'mid'
                "
                type="success"
                size="mini"
              >
                {{ getPlayerStatus(scope.row.name, scope.row.status) }}
              </el-tag>
              <el-tag
                v-if="
                  getPlayerField(scope.row.name, scope.row.status) === 'back'
                "
                type="warning"
                size="mini"
              >
                {{ getPlayerStatus(scope.row.name, scope.row.status) }}
              </el-tag>
              <div
                v-if="getPlayerField(scope.row.name, scope.row.status) === ''"
              >
                <el-tag type="info" size="mini" style="margin-right: 5px">
                  {{ getPlayerStatus(scope.row.name, scope.row.status) }}
                </el-tag>
                <el-tag
                  type="info"
                  size="mini"
                  style="cursor: pointer"
                  @click="setReplace(scope.$index)"
                >
                  选为替补
                </el-tag>
              </div>
              <div
                v-else-if="
                  getPlayerField(scope.row.name, scope.row.status) === 'replace'
                "
              >
                <el-tag type="info" size="mini" style="margin-right: 5px">
                  {{ getPlayerStatus(scope.row.name, scope.row.status) }}
                </el-tag>
                <el-tag
                  type="danger"
                  size="mini"
                  style="cursor: pointer"
                  @click="removeReplace(scope.$index)"
                >
                  移除替补
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="球员"></el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'ChooseLineUp',
  data() {
    return {
      alterCtrl: false,
      formation: {
        0: {
          1: {
            title: 'LS',
            class: '',
            player: '',
            popIndex: 0,
            positionLst: [
              { title: '拖后前锋' },
              { title: '突前前锋' },
              { title: '站桩式中锋' },
              { title: '抢点型前锋' },
              { title: '全能型前锋' },
              { title: '紧逼型前锋' },
              { title: '伪9号' }
            ],
            role: '',
            field: 'front'
          },
          2: {
            title: 'ST',
            class: '',
            player: '',
            popIndex: 1,
            positionLst: [
              { title: '拖后前锋' },
              { title: '突前前锋' },
              { title: '站桩式中锋' },
              { title: '抢点型前锋' },
              { title: '全能型前锋' },
              { title: '紧逼型前锋' },
              { title: '伪9号' }
            ],
            role: '',
            field: 'front'
          },
          3: {
            title: 'RS',
            class: '',
            player: '',
            popIndex: 2,
            positionLst: [
              { title: '拖后前锋' },
              { title: '突前前锋' },
              { title: '站桩式中锋' },
              { title: '抢点型前锋' },
              { title: '全能型前锋' },
              { title: '紧逼型前锋' },
              { title: '伪9号' }
            ],
            role: '',
            field: 'front'
          }
        },
        1: {
          0: {
            title: 'LW',
            class: '',
            player: '',
            popIndex: 3,
            positionLst: [
              { title: '边锋' },
              { title: '前场组织核心' },
              { title: '内锋' },
              { title: '边路进攻核心' },
              { title: '抢点型边锋' },
              { title: '内切型边锋' }
            ],
            role: '',
            field: 'front'
          },
          1: {
            title: 'LF',
            class: '',
            player: '',
            popIndex: 4,
            positionLst: [
              { title: '前场组织核心' },
              { title: '影子前锋' },
              { title: '九号半' },
              { title: '古典前腰' }
            ],
            role: '',
            field: 'front'
          },
          2: {
            title: 'CF',
            class: '',
            player: '',
            popIndex: 5,
            positionLst: [
              { title: '前场组织核心' },
              { title: '影子前锋' },
              { title: '九号半' },
              { title: '古典前腰' }
            ],
            role: '',
            field: 'front'
          },
          3: {
            title: 'RF',
            class: '',
            player: '',
            popIndex: 6,
            positionLst: [
              { title: '前场组织核心' },
              { title: '影子前锋' },
              { title: '九号半' },
              { title: '古典前腰' }
            ],
            role: '',
            field: 'front'
          },
          4: {
            title: 'RW',
            class: '',
            player: '',
            popIndex: 7,
            positionLst: [
              { title: '边锋' },
              { title: '前场组织核心' },
              { title: '内锋' },
              { title: '边路进攻核心' },
              { title: '抢点型边锋' },
              { title: '内切型边锋' }
            ],
            role: '',
            field: 'front'
          }
        },
        2: {
          1: {
            title: 'LAM',
            class: '',
            player: '',
            popIndex: 8,
            positionLst: [
              { title: '前场组织核心' },
              { title: '影子前锋' },
              { title: '伪九号' },
              { title: '古典前腰' },
              { title: '攻击型中场' }
            ],
            role: '',
            field: 'mid'
          },
          2: {
            title: 'CAM',
            class: '',
            player: '',
            popIndex: 9,
            positionLst: [
              { title: '前场组织核心' },
              { title: '影子前锋' },
              { title: '伪九号' },
              { title: '古典前腰' },
              { title: '攻击型中场' }
            ],
            role: '',
            field: 'mid'
          },
          3: {
            title: 'RAM',
            class: '',
            player: '',
            popIndex: 10,
            positionLst: [
              { title: '前场组织核心' },
              { title: '影子前锋' },
              { title: '伪九号' },
              { title: '古典前腰' },
              { title: '攻击型中场' }
            ],
            role: '',
            field: 'mid'
          }
        },
        3: {
          0: {
            title: 'LM',
            class: '',
            player: '',
            popIndex: 11,
            positionLst: [
              { title: '边锋' },
              { title: '边前卫' },
              { title: '边路组织核心' },
              { title: '防守型型边锋' },
              { title: '内切型边锋' }
            ],
            role: '',
            field: 'mid'
          },
          1: {
            title: 'LCM',
            class: '',
            player: '',
            popIndex: 12,
            positionLst: [
              { title: '伪边锋' },
              { title: '全能中场' },
              { title: '前场组织核心' },
              { title: '全能组织核心' },
              { title: '拖后组织核心' },
              { title: '攻击型翼卫' }
            ],
            role: '',
            field: 'mid'
          },
          2: {
            title: 'CM',
            class: '',
            player: '',
            popIndex: 13,
            positionLst: [
              { title: '中场' },
              { title: '全能中场' },
              { title: '前场组织核心' },
              { title: '全能组织核心' },
              { title: '拖后组织核心' }
            ],
            role: '',
            field: 'mid'
          },
          3: {
            title: 'RCM',
            class: '',
            player: '',
            popIndex: 14,
            positionLst: [
              { title: '伪边锋' },
              { title: '全能中场' },
              { title: '前场组织核心' },
              { title: '全能组织核心' },
              { title: '拖后组织核心' },
              { title: '攻击型翼卫' }
            ],
            role: '',
            field: 'mid'
          },
          4: {
            title: 'RM',
            class: '',
            player: '',
            popIndex: 15,
            positionLst: [
              { title: '边锋' },
              { title: '边前卫' },
              { title: '边路组织核心' },
              { title: '防守型型边锋' },
              { title: '内切型边锋' }
            ],
            role: '',
            field: 'mid'
          }
        },
        4: {
          0: {
            title: 'LWB',
            class: '',
            player: '',
            popIndex: 16,
            positionLst: [
              { title: '进攻型边后卫' },
              { title: '全能边后卫' },
              { title: '内切型边后卫' }
            ],
            role: '',
            field: 'back'
          },
          1: {
            title: 'LDM',
            class: '',
            player: '',
            popIndex: 17,
            positionLst: [
              { title: '防守型中场' },
              { title: '抢球机器' },
              { title: '防守型后腰' },
              { title: '全能组织核心' },
              { title: '拖后组织核心' },
              { title: '拖后后腰' },
              { title: '节拍器' }
            ],
            role: '',
            field: 'mid'
          },
          2: {
            title: 'CDM',
            class: '',
            player: '',
            popIndex: 18,
            positionLst: [
              { title: '防守型中场' },
              { title: '抢球机器' },
              { title: '防守型后腰' },
              { title: '全能组织核心' },
              { title: '拖后组织核心' },
              { title: '拖后后腰' },
              { title: '节拍器' }
            ],
            role: '',
            field: 'mid'
          },
          3: {
            title: 'RDM',
            class: '',
            player: '',
            popIndex: 19,
            positionLst: [
              { title: '防守型中场' },
              { title: '抢球机器' },
              { title: '防守型后腰' },
              { title: '全能组织核心' },
              { title: '拖后组织核心' },
              { title: '拖后后腰' },
              { title: '节拍器' }
            ],
            role: '',
            field: 'mid'
          },
          4: {
            title: 'RWB',
            class: '',
            player: '',
            popIndex: 20,
            positionLst: [
              { title: '进攻型边后卫' },
              { title: '全能边后卫' },
              { title: '内切型边后卫' }
            ],
            role: '',
            field: 'back'
          }
        },
        5: {
          0: {
            title: 'LB',
            class: '',
            player: '',
            popIndex: 21,
            positionLst: [
              { title: '防守型边后卫' },
              { title: '进攻型边后卫' },
              { title: '全能边后卫' },
              { title: '内切型边后卫' }
            ],
            role: '',
            field: 'back'
          },
          1: {
            title: 'LCB',
            class: '',
            player: '',
            popIndex: 22,
            positionLst: [
              { title: '中后卫' },
              { title: '出球后卫' },
              { title: '防守型中后卫' }
            ],
            role: '',
            field: 'back'
          },
          2: {
            title: 'CB',
            class: '',
            player: '',
            popIndex: 23,
            positionLst: [
              { title: '中后卫' },
              { title: '出球后卫' },
              { title: '防守型中后卫' }
            ],
            role: '',
            field: 'back'
          },
          3: {
            title: 'RCB',
            class: '',
            player: '',
            popIndex: 24,
            positionLst: [
              { title: '中后卫' },
              { title: '出球后卫' },
              { title: '防守型中后卫' }
            ],
            role: '',
            field: 'back'
          },
          4: {
            title: 'RB',
            class: '',
            player: '',
            popIndex: 25,
            positionLst: [
              { title: '防守型边后卫' },
              { title: '进攻型边后卫' },
              { title: '全能边后卫' },
              { title: '内切型边后卫' }
            ],
            role: '',
            field: 'back'
          }
        },
        6: {
          0: {
            title: 'GK',
            class: '',
            player: '',
            popIndex: 26,
            positionLst: [{ title: '门将' }, { title: '清道夫门将' }],
            role: '',
            field: 'back'
          }
        }
      },
      players: [
        {
          name: '1-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '2-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '3-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '4-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '5-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '6-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '7-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '8-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '9-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '10-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '11-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '12-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '13-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '14-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '15-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '16-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '17-player',
          position: 'ST/RW/CF',
          status: '未入选'
        },
        {
          name: '18-player',
          position: 'ST/RW/CF',
          status: '未入选'
        }
      ],
      visible: new Array(27).fill(false),
      roleVis: new Array(27).fill(false),
      replace: 0, // 替补人数 一般联赛7人为上限
      replaceMax: 7,
      replaceBtnCtrl: false,
      alterReplace: false
    }
  },
  methods: {
    // 切换阵容选择视图
    alterViewCtrl() {
      for (const row in this.formation) {
        for (const col in this.formation[row]) {
          const player = this.formation[row][col].player
          if (player === '') {
            this.formation[row][col].class = ''
          }
        }
      }
      this.alterCtrl ? (this.alterCtrl = false) : (this.alterCtrl = true)
    },
    // 选择球员
    choosePlayer(row, col, index, rowVal, popIndex, isChoose) {
      if (isChoose) {
        const name = this.formation[row][col].player
        if (name !== '') {
          // 球员姓名栏非空，之前已经选择过，先复原状态
          this.players.forEach(x => {
            if (x.name === name && x.status === '首发') {
              x.status = '未入选'
            }
          })
        }
        // 修改选择框
        this.formation[row][col].player = this.players[index].name
        // 修改球员状态
        this.players[index].status = '首发'
      } else {
        this.formation[row][col].player = ''
        this.players[index].status = '未入选'
      }

      // 关闭窗口
      this.visible[popIndex] = false
    },
    // 选择角色
    chooseRole(row, col, index, popIndex) {
      // 修改选择框
      this.formation[row][col].role = this.formation[row][col].positionLst[
        index
      ].title
      // 关闭窗口
      this.roleVis[popIndex] = false
    },
    // 保存阵容
    saveViewCtrl() {
      this.alterCtrl = false
      for (const row in this.formation) {
        for (const col in this.formation[row]) {
          const player = this.formation[row][col].player
          if (player === '') {
            this.formation[row][col].class = 'pos-none '
          }
        }
      }
    },
    // 获得当前球员状态
    getPlayerStatus(name, status) {
      if (status === '首发') {
        for (const row in this.formation) {
          for (const col in this.formation[row]) {
            if (this.formation[row][col].player === name) {
              if (this.formation[row][col].role === '') {
                return '首发'
              }
              return this.formation[row][col].role
            }
          }
        }
      } else if (status === '未入选') {
        return '未入选'
      } else {
        return '替补'
      }
    },
    // 判断当前首发球员是哪个部分
    getPlayerField(name, status) {
      if (status === '首发') {
        for (const row in this.formation) {
          for (const col in this.formation[row]) {
            if (this.formation[row][col].player === name) {
              return this.formation[row][col].field
            }
          }
        }
      } else if (status === '未入选') {
        return ''
      } else {
        return 'replace'
      }
    },
    // 选为替补
    setReplace(index) {
      this.replace++
      if (this.replace > this.replaceMax) {
        return this.$message.error('超过替补人数上限')
      }
      this.players[index].status = '替补'
    },
    removeReplace(index) {
      this.replace--
      this.players[index].status = '未入选'
    },
    // 修改替补上限
    alterReplaceMax() {}
  },
  mounted() {
    this.saveViewCtrl()
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.field-1 {
  height: 642px;
  width: 439px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/fields/球场竖向.png') no-repeat center
      center;
  }
  .field-row-1 {
    position: relative;
    display: flex;
    justify-content: space-around;
    top: 15px;
    left: 0;
    width: 100%;
    height: 75px;
    &:nth-child(n + 2) {
      margin: 15px 0;
    }

    .field-col-1 {
      position: relative;
      height: 100%;
      width: 18%;
      background: rgba(31, 84, 34, 0.8);
      p {
        font-size: 5px;
        color: #f2f6fc;
        padding: 0;
        margin: 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .avatar {
        position: absolute;
        top: 18%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        .player-text {
          position: absolute;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          top: 0;
          left: 0;
          width: 50px;
          font-size: 6px;
          color: #f2f6fc;
        }
      }
      .role {
        position: absolute;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
        width: 79px;
        font-size: 12px;
        color: #f2f6fc;
        bottom: 20%;
        cursor: pointer;
      }
    }
    .pos-none {
      visibility: hidden;
    }
  }
}
.alterReplace {
  display: inline-block;
  .el-input {
    width: 50px;
  }
}
</style>
