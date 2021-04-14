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
              <h5>基本信息</h5>
              <ul style="display: block">
                <li>姓名 - Lionel Andrés Messi Cuccittini</li>
                <li>国籍 - 阿根廷</li>
                <li>年龄 - 33</li>
                <li>身高 - 5'7"</li>
                <li>体重 - 159lb</li>
              </ul>
            </el-card>
          </el-col>
          <el-col :span="9">
            <el-card>
              <h5>概览</h5>
              <ul style="display: block">
                <li><el-tag type="primary">93</el-tag> 综合能力</li>
                <li><el-tag type="primary">93</el-tag> 潜力评级</li>
                <li>惯用脚 - 左</li>
                <li>积极性 - 中</li>
                <li>熟练角色 - RW,CF,ST</li>
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
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;加速度</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;冲刺速度</li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 226px"
            shadow="hover"
          >
            <h5>射门</h5>
            <ul style="display: block">
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;跑位</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;射术</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;射门力量</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;远射</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;凌空</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;点球</li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 226px"
            shadow="hover"
          >
            <h5>传球</h5>
            <ul style="display: block">
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;视野</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;传中</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;任意球</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;短传</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;长传</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;弧线</li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 226px"
            shadow="hover"
          >
            <h5>盘带</h5>
            <ul style="display: block">
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;敏捷</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;平衡</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;反应</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;控球</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;盘带</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;沉着</li>
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
                <div class="position-tab position-green">
                  LS
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  ST
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
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
                <div class="position-tab position-green">
                  LW
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  LF
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  CF
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  RF
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
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
                <div class="position-tab position-green">
                  LAM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  CAM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
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
                <div class="position-tab position-green">
                  LM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  LCM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  CM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  RCM
                  <br />
                  熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-green">
                  RM
                  <br />
                  熟练
                </div>
              </div>
            </div>
            <!--            CDM-->
            <div class="line-row">
              <div class="line-col">
                <div class="position-tab position-yellow">
                  LWB
                  <br />
                  一般
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-yellow">
                  LDM
                  <br />
                  一般
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-yellow">
                  CDM
                  <br />
                  一般
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-yellow">
                  RDM
                  <br />
                  一般
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-yellow">
                  RWB
                  <br />
                  一般
                </div>
              </div>
            </div>
            <!--            CB-->
            <div class="line-row">
              <div class="line-col">
                <div class="position-tab position-red">
                  LB
                  <br />
                  不熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-red">
                  LCB
                  <br />
                  不熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-red">
                  CB
                  <br />
                  不熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-red">
                  RCB
                  <br />
                  不熟练
                </div>
              </div>
              <div class="line-col">
                <div class="position-tab position-red">
                  RB
                  <br />
                  不熟练
                </div>
              </div>
            </div>
            <!--            GK-->
            <div class="line-row">
              <div class="line-col"></div>
              <div class="line-col"></div>
              <div class="line-col">
                <div class="position-tab position-red">
                  GK
                  <br />
                  不熟练
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
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;拦截意识</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;头球</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;防守意识</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;抢断</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;铲断</li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 160px"
            shadow="hover"
          >
            <h5>身体</h5>
            <ul style="display: block">
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;弹跳</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;体能</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;强壮</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;侵略性</li>
            </ul>
          </el-card>

          <el-card
            class="player-info player-info-width"
            style="height: 193px"
            shadow="hover"
          >
            <h5>守门</h5>
            <ul style="display: block">
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;GK 飞扑</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;GK 击球</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;GK 开球</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;GK 站位</li>
              <li><el-tag type="primary">91</el-tag>&nbsp;&nbsp;GK 反应</li>
            </ul>
          </el-card>
          <el-card
            class="player-info player-info-width"
            style="height: 100%"
            shadow="hover"
          >
            <h5>特点</h5>
            <ul style="display: block">
              <li># 远程射手</li>
              <li># 盘带高手</li>
              <li># 组织核心</li>
              <li># 全能前锋</li>
              <li># 任意球专家</li>
            </ul>
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
    return {}
  },
  mounted() {
    this.drawRadar()
  },
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
            { name: '防守', max: 100 }
          ]
        },
        series: [
          {
            name: '能力',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [100, 100, 100, 100, 45],
                name: '能力'
              }
            ]
          }
        ]
      })
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
</style>
