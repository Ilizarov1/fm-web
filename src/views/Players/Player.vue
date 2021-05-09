<template>
  <div>
    <!--    第一行-->
    <el-row :gutter="18" type="flex">
      <el-col :span="7" class="player-col">
        <!--      球员图片-->
        <!--        <el-card class="player-col-gutter">-->
        <!--          <img-->
        <!--            src="../../assets/images/players/messi.png"-->
        <!--            alt=""-->
        <!--            width="175px"-->
        <!--            height="175px"-->
        <!--            style="padding: 5px;margin-left: 31px"-->
        <!--          />-->
        <!--        </el-card>-->
        <div class="player-img"></div>
      </el-col>

      <el-col :span="17">
        <el-row :gutter="10" type="flex">
          <el-col :span="15">
            <el-card>
              <el-row :gutter="20">
                <el-col :span="12">
                  <h5>基本信息</h5>
                  <ul style="display: block">
                    <li>姓名 - {{ info.name }}</li>
                    <li>国籍 - {{ info.nation }}</li>
                    <li>年龄 - {{ info.age }}</li>
                    <li>身高 - {{ info.height }} cm</li>
                    <li>体重 - {{ info.weight }} kg</li>
                  </ul>
                </el-col>
                <el-col :span="12">
                  <h5>球探建议</h5>
                  <span>{{ info.suggestions }}</span>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="9">
            <el-card>
              <h5>概览</h5>
              <ul style="display: block">
                <li>
                  <el-tag :type="tagColor(info.rate)">{{ info.rate }}</el-tag>
                  综合能力
                </li>
                <li>
                  <el-tag :type="tagColor(info.potential)">{{
                    info.potential
                  }}</el-tag>
                  潜力评级
                </li>
                <li>惯用脚 - {{ info.foot }}</li>
                <li>积极性 - {{ info.motivation }}</li>
                <li>熟练角色 - {{ info.skilledRole }}</li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--    第二行-->
    <el-row :gutter="18" type="flex" style="margin-bottom: 20px">
      <el-col :span="7" class="player-col">
        <el-card shadow="hover">
          <div id="player-radar" style="width:250px;height: 220px"></div>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-row
          :gutter="10"
          type="flex"
          justify="space-around"
          class="player-col-gutter"
        >
          <el-card
            class="player-info player-info-width"
            style="height: 106px"
            shadow="hover"
          >
            <h5>速度</h5>
            <ul style="display: block">
              <li>
                <el-tag :type="tagColor(info.acc)">{{ info.acc }}</el-tag
                >&nbsp;&nbsp;加速度
              </li>
              <li>
                <el-tag :type="tagColor(info.maxSpeed)">{{
                  info.maxSpeed
                }}</el-tag
                >&nbsp;&nbsp;冲刺速度
              </li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 226px"
            shadow="hover"
          >
            <h5>射门</h5>
            <ul style="display: block">
              <li>
                <el-tag :type="tagColor(info.runningPosition)">{{
                  info.runningPosition
                }}</el-tag
                >&nbsp;&nbsp;跑位
              </li>
              <li>
                <el-tag :type="tagColor(info.shotSkill)">{{
                  info.shotSkill
                }}</el-tag
                >&nbsp;&nbsp;射术
              </li>
              <li>
                <el-tag :type="tagColor(info.shotStrength)">{{
                  info.shotStrength
                }}</el-tag
                >&nbsp;&nbsp;射门力量
              </li>
              <li>
                <el-tag :type="tagColor(info.longShot)">{{
                  info.longShot
                }}</el-tag
                >&nbsp;&nbsp;远射
              </li>
              <li>
                <el-tag :type="tagColor(info.overhead)">{{
                  info.overhead
                }}</el-tag
                >&nbsp;&nbsp;凌空
              </li>
              <li>
                <el-tag :type="tagColor(info.penalty)">{{
                  info.penalty
                }}</el-tag
                >&nbsp;&nbsp;点球
              </li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 226px"
            shadow="hover"
          >
            <h5>传球</h5>
            <ul style="display: block">
              <li>
                <el-tag :type="tagColor(info.horizon)">{{
                  info.horizon
                }}</el-tag
                >&nbsp;&nbsp;视野
              </li>
              <li>
                <el-tag :type="tagColor(info.pass2center)">{{
                  info.pass2center
                }}</el-tag
                >&nbsp;&nbsp;传中
              </li>
              <li>
                <el-tag :type="tagColor(info.freeKick)">{{
                  info.freeKick
                }}</el-tag
                >&nbsp;&nbsp;任意球
              </li>
              <li>
                <el-tag :type="tagColor(info.shortPass)">{{
                  info.shortPass
                }}</el-tag
                >&nbsp;&nbsp;短传
              </li>
              <li>
                <el-tag :type="tagColor(info.longPass)">{{
                  info.longPass
                }}</el-tag
                >&nbsp;&nbsp;长传
              </li>
              <li>
                <el-tag :type="tagColor(info.arcsPass)">{{
                  info.arcsPass
                }}</el-tag
                >&nbsp;&nbsp;弧线
              </li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 226px"
            shadow="hover"
          >
            <h5>盘带</h5>
            <ul style="display: block">
              <li>
                <el-tag :type="tagColor(info.agile)">{{ info.agile }}</el-tag
                >&nbsp;&nbsp;敏捷
              </li>
              <li>
                <el-tag :type="tagColor(info.balance)">{{
                  info.balance
                }}</el-tag
                >&nbsp;&nbsp;平衡
              </li>
              <li>
                <el-tag :type="tagColor(info.react)">{{ info.react }}</el-tag
                >&nbsp;&nbsp;反应
              </li>
              <li>
                <el-tag :type="tagColor(info.control)">{{
                  info.control
                }}</el-tag
                >&nbsp;&nbsp;控球
              </li>
              <li>
                <el-tag :type="tagColor(info.composure)">{{
                  info.composure
                }}</el-tag
                >&nbsp;&nbsp;沉着
              </li>
            </ul>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <!--    第三行-->
    <el-row :gutter="18" type="flex">
      <el-col :span="7" class="player-col">
        <div class="field">
          <div class="lineup">
            <!--          ST-->
            <div class="line-row">
              <div class="line-col">
                <div class="position-box">&nbsp;</div>
              </div>
              <div class="line-col">
                <div :class="positionClass.LS">
                  LS
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.ST">
                  ST
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RS">
                  RS
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">&nbsp;</div>
            </div>
            <!--            CF-->
            <div class="line-row">
              <div class="line-col">
                <div :class="positionClass.LW">
                  LW
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.LF">
                  LF
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.CF">
                  CF
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RF">
                  RF
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RW">
                  RW
                  <br />
                  熟练
                </div>
              </div>
            </div>
            <!--            CAM-->
            <div class="line-row">
              <div class="line-col"></div>
              <div class="line-col">
                <div :class="positionClass.LAM">
                  LAM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.CAM">
                  CAM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RAM">
                  RAM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col"></div>
            </div>
            <!--            CM-->
            <div class="line-row">
              <div class="line-col">
                <div :class="positionClass.LM">
                  LM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.LCM">
                  LCM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.CM">
                  CM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RCM">
                  RCM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RM">
                  RM
                  <br />
                  熟练
                </div>
              </div>
            </div>
            <!--            CDM-->
            <div class="line-row">
              <div class="line-col">
                <div :class="positionClass.LWB">
                  LWB
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.LDM">
                  LDM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.CDM">
                  CDM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RDM">
                  RDM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RWB">
                  RWB
                  <br />
                  熟练
                </div>
              </div>
            </div>
            <!--            CB-->
            <div class="line-row">
              <div class="line-col">
                <div :class="positionClass.LB">
                  LB
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.LCB">
                  LCB
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.CB">
                  CB
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RCB">
                  RCB
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div :class="positionClass.RB">
                  RB
                  <br />
                  熟练
                </div>
              </div>
            </div>
            <!--            GK-->
            <div class="line-row">
              <div class="line-col"></div>
              <div class="line-col"></div>
              <div class="line-col">
                <div :class="positionClass.GK">
                  GK
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col"></div>
              <div class="line-col"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <el-row
          :gutter="10"
          type="flex"
          justify="space-around"
          class="player-col-gutter"
        >
          <el-card
            class="player-info player-info-width"
            style="height: 193px"
            shadow="hover"
          >
            <h5>防守</h5>
            <ul style="display: block">
              <li>
                <el-tag :type="tagColor(info.intAware)">{{
                  info.intAware
                }}</el-tag
                >&nbsp;&nbsp;拦截意识
              </li>
              <li>
                <el-tag :type="tagColor(info.headShot)">{{
                  info.headShot
                }}</el-tag
                >&nbsp;&nbsp;头球
              </li>
              <li>
                <el-tag :type="tagColor(info.defAware)">{{
                  info.defAware
                }}</el-tag
                >&nbsp;&nbsp;防守意识
              </li>
              <li>
                <el-tag :type="tagColor(info.steal)">{{ info.steal }}</el-tag
                >&nbsp;&nbsp;抢断
              </li>
              <li>
                <el-tag :type="tagColor(info.cutoff)">{{ info.cutoff }}</el-tag
                >&nbsp;&nbsp;铲断
              </li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 160px"
            shadow="hover"
          >
            <h5>身体</h5>
            <ul style="display: block">
              <li>
                <el-tag :type="tagColor(info.bounce)">{{ info.bounce }}</el-tag
                >&nbsp;&nbsp;弹跳
              </li>
              <li>
                <el-tag :type="tagColor(info.fitness)">{{
                  info.fitness
                }}</el-tag
                >&nbsp;&nbsp;体能
              </li>
              <li>
                <el-tag :type="tagColor(info.strength)">{{
                  info.strength
                }}</el-tag
                >&nbsp;&nbsp;强壮
              </li>
              <li>
                <el-tag :type="tagColor(info.aggressive)">{{
                  info.aggressive
                }}</el-tag
                >&nbsp;&nbsp;侵略性
              </li>
            </ul>
          </el-card>

          <el-card
            class="player-info player-info-width"
            style="height: 193px"
            shadow="hover"
          >
            <h5>守门</h5>
            <ul style="display: block">
              <li>
                <el-tag :type="tagColor(info.flyPounce)">{{
                  info.flyPounce
                }}</el-tag
                >&nbsp;&nbsp;GK 飞扑
              </li>
              <li>
                <el-tag :type="tagColor(info.hitBall)">{{
                  info.hitBall
                }}</el-tag
                >&nbsp;&nbsp;GK 击球
              </li>
              <li>
                <el-tag :type="tagColor(info.kickoff)">{{
                  info.kickoff
                }}</el-tag
                >&nbsp;&nbsp;GK 开球
              </li>
              <li>
                <el-tag :type="tagColor(info.standPosition)">{{
                  info.standPosition
                }}</el-tag
                >&nbsp;&nbsp;GK 站位
              </li>
              <li>
                <el-tag :type="tagColor(info.gkReact)">{{
                  info.gkReact
                }}</el-tag
                >&nbsp;&nbsp;GK 反应
              </li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 100%"
            shadow="hover"
          >
            <el-row>
              <h5>优点</h5>
              <ul style="display: block">
                <li
                  v-for="(item, index) in advantages"
                  :key="index"
                  style="color: #42B983;"
                >
                  # {{ item }}
                </li>
              </ul>
            </el-row>
            <el-row>
              <h5>缺点</h5>
              <ul>
                <li
                  v-for="(item, index) in disadvantages"
                  :key="index"
                  style="color: #F56C6C;"
                >
                  # {{ item }}
                </li>
                <!--              <li># 远程射手</li>-->
                <!--              <li># 盘带高手</li>-->
                <!--              <li># 组织核心</li>-->
                <!--              <li># 全能前锋</li>-->
                <!--              <li># 任意球专家</li>-->
              </ul>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Player',
  data() {
    return {
      info: {},
      advantages: [],
      disadvantages: [],
      avaPoint: {
        pac: 0,
        pas: 0,
        sho: 0,
        dri: 0,
        def: 0,
        phy: 0
      },
      positionClass: {
        LS: 'position-tab position-green position-hidden',
        ST: 'position-tab position-green position-hidden',
        RS: 'position-tab position-green position-hidden',
        LW: 'position-tab position-green position-hidden',
        LF: 'position-tab position-green position-hidden',
        CF: 'position-tab position-green position-hidden',
        RF: 'position-tab position-green position-hidden',
        RW: 'position-tab position-green position-hidden',
        LAM: 'position-tab position-green position-hidden',
        CAM: 'position-tab position-green position-hidden',
        RAM: 'position-tab position-green position-hidden',
        LM: 'position-tab position-green position-hidden',
        LCM: 'position-tab position-green position-hidden',
        CM: 'position-tab position-green position-hidden',
        RCM: 'position-tab position-green position-hidden',
        RM: 'position-tab position-green position-hidden',
        LWB: 'position-tab position-green position-hidden',
        LDM: 'position-tab position-green position-hidden',
        CDM: 'position-tab position-green position-hidden',
        RDM: 'position-tab position-green position-hidden',
        RWB: 'position-tab position-green position-hidden',
        LB: 'position-tab position-green position-hidden',
        LCB: 'position-tab position-green position-hidden',
        CB: 'position-tab position-green position-hidden',
        RCB: 'position-tab position-green position-hidden',
        RB: 'position-tab position-green position-hidden',
        GK: 'position-tab position-green position-hidden'
      }
    }
  },
  async mounted() {
    const { status, data } = await this.$http.post('scout/getScout', {
      id: this.$route.params.playerId
    })
    // Object.assign(this.info, data.player)
    // Object.assign(this.info, data.report)
    this.info = {
      ...data.player,
      ...data.report
    }
    this.advantages = this.info.advantages.split(',')
    this.disadvantages = this.info.disadvantages.split(',')
    this.avaPoint.pac = this.info.pac
    this.avaPoint.pas = this.info.pas
    this.avaPoint.sho = this.info.sho
    this.avaPoint.dri = this.info.dri
    this.avaPoint.phy = this.info.phy
    this.avaPoint.def = this.info.def

    const roles = this.info.skilledRole.split(',')
    for (const role of roles) {
      this.positionClass[role] = 'position-tab position-green '
    }
    this.drawRadar()
  },
  async created() {},
  methods: {
    drawRadar() {
      const playRadar = echarts.init(document.getElementById('player-radar'))
      playRadar.setOption({
        // title: {
        //   text: '能力'
        // },
        // legend: {
        //   data: ['能力']
        // },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              borderRadius: 3,
              padding: 0
            },
            fontSize: 11,
            color: '#8CAAC0'
          },
          indicator: [
            { name: '速度', max: 100 },
            { name: '传球', max: 100 },
            { name: '射门', max: 100 },
            { name: '盘带', max: 100 },
            { name: '防守', max: 100 },
            { name: '身体', max: 100 }
          ]
        },
        series: [
          {
            name: '能力',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [
                  this.avaPoint.pac,
                  this.avaPoint.pas,
                  this.avaPoint.sho,
                  this.avaPoint.dri,
                  this.avaPoint.def,
                  this.avaPoint.phy
                ],
                name: '能力'
              }
            ]
          }
        ]
      })
    },
    // 改变标签颜色
    tagColor(val) {
      if (val < 50) {
        return 'danger'
      } else if (val >= 50 && val < 80) {
        return 'warning'
      } else {
        return 'primary'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.player-box {
  display: flex;
  border: 0px;
  padding: 10px;
  height: 250px;
}
.player-info {
  padding: 0;
}
.player-table {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0px;
}
.el-table {
  flex: 1;
}
.player-img {
}
#player-radar {
  flex: 1;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
h5 {
  margin: 0 0 5px 0;
}
.el-tag {
  height: 21px;
  line-height: 21px;
  padding: 0 3px;
}
li {
  margin: 5px 0;
}
h5,
li {
  font-size: 13px;
}
.player-col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.player-col-gutter {
  margin-bottom: 20px;
}
.player-info-width {
  width: 160px;
}
.field {
  height: 329px;
  position: relative;
}
.field::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background: transparent url(../../assets/images/fields/positionField.webp)
    no-repeat scroll center top;
  background-size: cover;
}
.player-img {
  height: 160px;
  position: relative;
}
.player-img::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url(../../assets/images/players/messi.png) no-repeat
    scroll center top;
  background-size: contain;
}
.lineup {
  height: 329px;
  position: relative;
  margin-top: 11px;
}
.line-row {
  display: flex;
}
.line-col {
  flex: 1;
  padding: 3px;
}
.position-box {
  width: 20%;
}
.position-tab {
  text-align: center;
  vertical-align: middle;
  font-size: 15px;
  color: #fff;
}
.position-green {
  background-color: #4caf50;
}
.position-yellow {
  background-color: #ffc940;
}
.position-red {
  background-color: #d13913;
}
.position-hidden {
  visibility: hidden;
}
</style>
