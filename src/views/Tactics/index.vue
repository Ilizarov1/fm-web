<template>
  <div>
    <el-row :gutter="2">
      <el-col :span="4">
        <el-row>
          <el-card :class="'stage-card stage-1 ' + expandClass.stage1">
            <div v-if="abbrInfo.stage1">
              <div class="abbr-card">
                <span class="text-top">持球阶段</span>
                <p class="text-content">{{ abbr.stage1.fieldWidth }}</p>
                <p class="text-content">{{ abbr.stage1.pass2Space }}</p>
                <p
                  class="text-content"
                  v-for="(item, index) in abbr.stage1.up"
                  :key="index"
                >
                  {{ item }}
                </p>
                <p
                  class="text-content"
                  v-for="(item, index) in abbr.stage1.sideOrMid"
                  :key="index"
                >
                  {{ item }}
                </p>
                <p class="text-content">{{ abbr.stage1.shortPass }}</p>
                <p class="text-content">{{ abbr.stage1.pass }}</p>
                <p class="text-content">{{ abbr.stage1.pace }}</p>
                <p class="text-content">{{ abbr.stage1.delay }}</p>
                <p class="text-content">{{ abbr.stage1.shotOrElse }}</p>
                <p class="text-content">{{ abbr.stage1.freeKick }}</p>
                <p class="text-content">{{ abbr.stage1.dri }}</p>
                <p class="text-content">{{ abbr.stage1.creative }}</p>
                <p class="text-content">{{ abbr.stage1.pass2Center }}</p>
              </div>

              <div class="expand-btn" @click="cardExpand('stage1')">更改</div>
            </div>
            <div v-else>
              <el-col :span="8">
                <span>进攻宽度</span><br />
                <span style="font-size: 10px">{{
                  fieldWidth.slider.title
                }}</span>
                <el-row>
                  <el-slider
                    :value="fieldWidth.slider.val"
                    :step="25"
                    show-stops
                    @input="slider"
                    class="field-slider"
                    :format-tooltip="formatTooltip"
                  >
                  </el-slider>
                </el-row>
                <el-row>
                  <div class="sm-field">
                    <div
                      v-for="(item, i) in fieldWidth.elemStyle"
                      :key="i"
                      class="field-row"
                    >
                      <div
                        v-for="(style, j) in item"
                        :key="j"
                        :class="'field-col ' + fieldWidth.widthClass"
                        :style="formatPosStyle(i, j, style)"
                      ></div>
                    </div>
                    <div class="field-row">
                      <div class="field-col" style="background:#F8CF00;"></div>
                    </div>
                  </div>
                </el-row>
              </el-col>
              <el-col :span="8">
                <span>组织打法</span><br />
                <el-row>
                  <el-button
                    size="mini"
                    @click="pass2SpaceBtn"
                    :type="organization.pass2SpaceBtnType"
                    class="passBtn"
                    >多传空当</el-button
                  ></el-row
                >
                <el-row>
                  <div class="sm-field">
                    <div class="field-row pass-row">
                      <div
                        :class="'pass-col-1 ' + area.up.leftSide"
                        @click="up2Restricted('leftSide')"
                      >
                        <span class="pass-text">左侧套边插上</span>
                      </div>
                      <div
                        :class="'pass-col-1 ' + area.up.leftRib"
                        @click="up2Restricted('leftRib')"
                      >
                        <span class="pass-text">左侧肋部插上</span>
                      </div>
                      <div
                        :class="'pass-col-1 ' + area.up.rightRib"
                        @click="up2Restricted('rightRib')"
                      >
                        <span class="pass-text">右侧肋部插上</span>
                      </div>
                      <div
                        :class="'pass-col-1 ' + area.up.rightSide"
                        @click="up2Restricted('rightSide')"
                      >
                        <span class="pass-text">右侧套边插上</span>
                      </div>
                    </div>
                    <div class="field-row pass-row">
                      <div
                        :class="'pass-col-2 ' + area.sideOrMid.left"
                        @click="sideOrMid('left')"
                      >
                        <span class="pass-text">多走左路</span>
                      </div>
                      <div
                        :class="'pass-col-2 ' + area.sideOrMid.mid"
                        @click="sideOrMid('mid')"
                      >
                        <span class="pass-text">多走中路</span>
                      </div>
                      <div
                        :class="'pass-col-2 ' + area.sideOrMid.right"
                        @click="sideOrMid('right')"
                      >
                        <span class="pass-text">多走右路</span>
                      </div>
                    </div>
                    <div class="field-row pass-row">
                      <div
                        :class="'pass-col-3 ' + area.shortPass"
                        @click="shortCtrl"
                      >
                        <span class="pass-text">防守区域短传出球</span>
                      </div>
                    </div>
                  </div>
                </el-row>
                <el-row>
                  <span style="font-size: 8px">直传偏好</span><br />
                  <span style="font-size: 5px">{{
                    organization.passSlider.title
                  }}</span>
                  <el-slider
                    :value="organization.passSlider.val"
                    :step="25"
                    show-stops
                    class="field-slider"
                    @input="passCtrl"
                    :show-tooltip="false"
                  >
                  </el-slider>
                </el-row>
                <el-row>
                  <span style="font-size: 8px">比赛节奏</span><br />
                  <span style="font-size: 5px">{{
                    organization.paceSlider.title
                  }}</span>
                  <el-slider
                    :value="organization.paceSlider.val"
                    :step="25"
                    show-stops
                    class="field-slider"
                    @input="paceCtrl"
                    :show-tooltip="false"
                  >
                  </el-slider>
                </el-row>
                <el-row>
                  <span style="font-size: 8px">拖延时间</span><br />
                  <span style="font-size: 5px">{{
                    organization.delaySlider.title
                  }}</span>
                  <el-slider
                    :value="organization.delaySlider.val"
                    :step="50"
                    show-stops
                    class="field-slider"
                    :show-tooltip="false"
                    @input="delayCtrl"
                  >
                  </el-slider>
                </el-row>
              </el-col>
              <el-col :span="8">
                <span>进攻区域</span><br />
                <el-row>
                  <el-select
                    v-model="area.pass2center.val"
                    placeholder="选择传中方式"
                    size="mini"
                    class="passBtn"
                  >
                    <el-option
                      v-for="(item, index) in area.pass2center.option"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-row>

                <el-row>
                  <div class="sm-field">
                    <div class="field-row area-row">
                      <div
                        :class="'area-col-1 ' + this.area.shotOrElse.toRestrict"
                        @click="shotCtrl('toRestrict')"
                      >
                        <span class="area-text">把球做入禁区</span>
                      </div>
                    </div>
                    <div class="field-row area-row">
                      <div
                        :class="
                          'area-col-2 ' + this.area.shotOrElse.pass2Center
                        "
                        @click="shotCtrl('pass2Center')"
                      >
                        <span class="area-text">尽早传中</span>
                      </div>
                      <div
                        :class="'area-col-3 ' + this.area.shotOrElse.shot"
                        @click="shotCtrl('shot')"
                      >
                        <span class="area-text">有机会就射门</span>
                      </div>
                      <div
                        :class="
                          'area-col-2 ' + this.area.shotOrElse.pass2Center
                        "
                        @click="shotCtrl('pass2Center')"
                      >
                        <span class="area-text">尽早传中</span>
                      </div>
                    </div>
                  </div>
                </el-row>
                <el-row>
                  <el-button size="mini" :type="area.freeKick" @click="fkCtrl"
                    >制造定位球机会</el-button
                  >
                </el-row>
                <el-row>
                  <span style="font-size: 10px">盘带</span><br />
                  <el-button-group>
                    <el-button
                      size="mini"
                      :type="area.dri.less"
                      @click="driCtrl('less')"
                      >减少带球</el-button
                    >
                    <el-button
                      size="mini"
                      :type="area.dri.more"
                      @click="driCtrl('more')"
                      >突破防线</el-button
                    >
                  </el-button-group>
                </el-row>
                <el-row>
                  <span style="font-size: 10px">创造力</span><br />
                  <el-button-group>
                    <el-button
                      size="mini"
                      :type="area.creative.more"
                      @click="creativeCtrl('more')"
                      >注重发挥</el-button
                    >
                    <el-button
                      size="mini"
                      :type="area.creative.less"
                      @click="creativeCtrl('less')"
                      >坚守纪律</el-button
                    >
                  </el-button-group>
                </el-row>
              </el-col>
              <div class="expand-btn" @click="cardExpand('stage1')">完成</div>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card :class="'stage-card stage-2 ' + expandClass.stage2">
            <div v-if="abbrInfo.stage2">
              <span class="text-top">转换阶段</span>
              <div class="expand-btn" @click="cardExpand('stage2')">更改</div>
            </div>
            <div v-else>
              <el-col :span="12">
                <el-row>
                  <p>失去球权时</p>
                  <el-button-group>
                    <el-button size="mini">立即反抢</el-button>
                    <el-button size="mini">重组队形</el-button>
                  </el-button-group>
                </el-row>
                <el-row>
                  <p>赢得球权时</p>
                  <el-button-group>
                    <el-button size="mini">立即反击</el-button>
                    <el-button size="mini">保持队形</el-button>
                  </el-button-group>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <p>门将控球时</p>
                  <el-button-group>
                    <el-button size="mini">快速出球</el-button>
                    <el-button size="mini">降低节奏</el-button>
                  </el-button-group>
                </el-row>
                <el-row>
                  <div class="sm-field">
                    <div class="field-row-2">
                      <div class="field-col-1">
                        <span class="text">发过对方防线</span>
                      </div>
                    </div>
                    <div class="field-row-2 row-height">
                      <div class="field-col-2 pos-1">
                        <span class="text">交给两翼</span>
                      </div>
                      <div class="field-col-3 pos-3">
                        <span class="text">给进攻核心</span>
                      </div>
                      <div class="field-col-3 pos-4">
                        <span class="text">给组织核心</span>
                      </div>
                      <div class="field-col-2 pos-2">
                        <span class="text">交给两翼</span>
                      </div>
                    </div>
                    <div class="field-row-2">
                      <div class="field-col-4">
                        <span class="text">给边后卫</span>
                      </div>
                      <div class="field-col-4">
                        <span class="text">给中后卫</span>
                      </div>
                      <div class="field-col-4">
                        <span class="text">给边后卫</span>
                      </div>
                    </div>
                  </div>
                </el-row>
                <el-row>
                  <el-select size="mini">
                    <el-option>1</el-option>
                    <el-option>1</el-option>
                    <el-option>1</el-option>
                  </el-select>
                </el-row>
              </el-col>
              <div class="expand-btn" @click="cardExpand('stage2')">完成</div>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card
            :class="'stage-card stage-2 ' + expandClass.stage3"
            @click.native="cardExpand('stage3')"
          >
            <div v-if="abbrInfo.stage3">
              <span class="text-top">持球阶段</span>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="11">
        <div class="field-1"></div>
      </el-col>
      <el-col :span="9">这里是球员</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      // 缩略信息
      abbr: {
        stage1: {
          fieldWidth: '',
          pass2Space: '',
          up: [],
          sideOrMid: [],
          shortPass: '',
          pass: '',
          pace: '',
          delay: '',
          shotOrElse: '',
          freeKick: '',
          dri: '',
          creative: '',
          pass2Center: ''
        }
      },
      expandClass: {
        stage1: '',
        stage2: '',
        stage3: ''
      },
      // 控制缩略图状态信息展示
      abbrInfo: {
        stage1: true,
        stage2: true,
        stage3: true
      },
      // 控制战术宽度-stage1
      fieldWidth: {
        elemStyle: {
          0: {
            0: 'background: transparent;',
            1: 'background: transparent;',
            2: '',
            3: 'background: transparent;',
            4: 'background: transparent;'
          },
          1: {
            0: '',
            1: 'background: transparent;',
            2: 'background: transparent;',
            3: 'background: transparent;',
            4: ''
          },
          2: {
            0: 'background: transparent;',
            1: 'background: transparent;',
            2: 'background: transparent;',
            3: 'background: transparent;',
            4: 'background: transparent;'
          },
          3: {
            0: 'background: transparent;',
            1: '',
            2: 'background: transparent;',
            3: '',
            4: 'background: transparent;'
          },
          4: {
            0: 'background: transparent;',
            1: 'background: transparent;',
            2: '',
            3: 'background: transparent;',
            4: 'background: transparent;'
          },
          5: {
            0: '',
            1: '',
            2: 'background: transparent;display: none;',
            3: '',
            4: ''
          }
        },
        slider: {
          val: 50,
          title: '相对拉开'
        },
        widthClass: 'field-col-width-3 '
      },
      // 进攻组织-stage1
      organization: {
        pass2SpaceBtnType: '',
        passSlider: {
          val: 50,
          title: '略多直传'
        },
        paceSlider: {
          val: 50,
          title: '相对较快'
        },
        delaySlider: {
          val: 0,
          title: '从不'
        }
      },
      // 进攻区域-stage1
      area: {
        pass2center: {
          val: '',
          option: ['混合传中', '高球传中', '弧线球传中', '地平球传中']
        },
        up: {
          leftSide: '',
          leftRib: '',
          rightRib: '',
          rightSide: ''
        },
        sideOrMid: {
          left: '',
          mid: '',
          right: ''
        },
        shortPass: '',
        shotOrElse: {
          toRestrict: '',
          pass2Center: '',
          shot: ''
        },
        freeKick: '',
        dri: {
          more: '',
          less: ''
        },
        creative: {
          more: '',
          less: ''
        }
      },
      // 赢得球权-stage2
      winBall: {
        type: '',
        val: ''
      },
      loseBall: {
        type: '',
        val: ''
      },
      gkBall: {
        pace: {
          type: '',
          val: ''
        },
        target: {
          back: '',
          wings: '',
          attCore: '',
          orgCore: '',
          backWings: '',
          backCenter: ''
        }
      }
    }
  },
  methods: {
    cardExpand(index) {
      // console.log(
      //   '触发了',
      //   index,
      //   this.expandClass[index],
      //   this.abbrInfo[index]
      // )

      // 初始化其他窗口
      Object.keys(this.expandClass).forEach(key => {
        if (key !== index) this.expandClass[key] = ''
      })
      Object.keys(this.abbrInfo).forEach(key => {
        if (key !== index) this.abbrInfo[key] = true
      })
      // 更换展开class
      this.expandClass[index]
        ? (this.expandClass[index] = '')
        : (this.expandClass[index] =
            'stage-expand-' + index.replace('stage', ''))
      // 更新缩略图
      this.abbrInfo[index]
        ? (this.abbrInfo[index] = false)
        : (this.abbrInfo[index] = true)
    },
    // 更新滑块值和宽度
    slider(e) {
      this.fieldWidth.slider.val = e
      if (e === 0) {
        this.fieldWidth.slider.title = '收缩'
        this.fieldWidth.widthClass = 'field-col-width-1 '
      } else if (e === 25) {
        this.fieldWidth.slider.title = '标准'
        this.fieldWidth.widthClass = 'field-col-width-2 '
      } else if (e === 50) {
        this.fieldWidth.slider.title = '相对拉开'
        this.fieldWidth.widthClass = 'field-col-width-3 '
      } else if (e === 75) {
        this.fieldWidth.slider.title = '拉边'
        this.fieldWidth.widthClass = 'field-col-width-4 '
      } else {
        this.fieldWidth.slider.title = '极度拉开'
        this.fieldWidth.widthClass = 'field-col-width-5 '
      }
    },
    // 宽度滑块
    formatTooltip(val) {
      if (val === 0) return '收缩'
      else if (val === 25) return '标准'
      else if (val === 50) return '相对拉开'
      else if (val === 75) return '拉边'
      else return '极度拉开'
    },
    // 如果中间的位置是空的就把两边往里靠
    formatPosStyle(i, j, style) {
      const centerStyleStr = this.fieldWidth.elemStyle[i][2]
      if (centerStyleStr.indexOf('display: none;') >= 0) {
        if (j === '1' || j === '3') {
          return style + 'margin: 0 10px;'
        }
        if (j === '0') {
          return style + 'margin-right: 20px;'
        }
        if (j === '4') return style + 'margin-left: 20px;'
      }
      return style
    },
    // 组织传空当按钮
    pass2SpaceBtn() {
      this.organization.pass2SpaceBtnType === ''
        ? (this.organization.pass2SpaceBtnType = 'primary')
        : (this.organization.pass2SpaceBtnType = '')
    },
    // 区域插上控制（4选2）
    up2Restricted(way) {
      console.log('点到区域了', way)
      let exclusive = null
      // 找出互斥项
      switch (way) {
        case 'leftSide':
          exclusive = 'leftRib'
          break
        case 'leftRib':
          exclusive = 'leftSide'
          break
        case 'rightRib':
          exclusive = 'rightSide'
          break
        case 'rightSide':
          exclusive = 'rightRib'
      }
      const state = this.area.up[way]
      if (state === '' || state === 'area-unselect') {
        // 未选中情况
        this.area.up[way] = 'area-select'
        this.area.up[exclusive] = 'area-unselect'
      } else {
        // 已经选中了 - 清空
        this.area.up[way] = ''
        this.area.up[exclusive] = ''
      }
    },
    // 左中右控制
    sideOrMid(way) {
      let exclusive = ''
      switch (way) {
        case 'left':
          exclusive = 'mid'
          break
        case 'right':
          exclusive = 'mid'
          break
        case 'mid':
          exclusive = 'left'
          break
      }
      const state = this.area.sideOrMid[way]
      if (state === '') {
        this.area.sideOrMid[way] = 'area-select'
        if (exclusive === 'left') {
          this.area.sideOrMid.left = 'area-unselect'
          this.area.sideOrMid.right = 'area-unselect'
        } else {
          this.area.sideOrMid.mid = 'area-unselect'
        }
      } else if (state === 'area-unselect') {
        this.area.sideOrMid[way] = 'area-select'
        if (way === 'mid') {
          this.area.sideOrMid.left = 'area-unselect'
          this.area.sideOrMid.right = 'area-unselect'
        } else if (way === 'left') {
          this.area.sideOrMid.mid = 'area-unselect'
          this.area.sideOrMid.right = ''
        } else if (way === 'right') {
          this.area.sideOrMid.mid = 'area-unselect'
          this.area.sideOrMid.left = ''
        }
      } else {
        if (way === 'mid') {
          this.area.sideOrMid.mid = ''
          this.area.sideOrMid.left = ''
          this.area.sideOrMid.right = ''
        } else if (way === 'left') {
          this.area.sideOrMid.left = ''
          if (this.area.sideOrMid.right !== 'area-select') {
            this.area.sideOrMid.mid = ''
          }
        } else if (way === 'right') {
          this.area.sideOrMid.right = ''
          if (this.area.sideOrMid.left !== 'area-select') {
            this.area.sideOrMid.mid = ''
          }
        }
      }
    },
    // 短传出球控制
    shortCtrl() {
      if (this.area.shortPass === '') {
        this.area.shortPass = 'area-select'
      } else {
        this.area.shortPass = ''
      }
    },
    // 直传倾向控制
    passCtrl(e) {
      this.organization.passSlider.val = e
      switch (e) {
        case 0:
          this.organization.passSlider.title = '很多短传'
          break
        case 25:
          this.organization.passSlider.title = '略多短传'
          break
        case 50:
          this.organization.passSlider.title = '略多直传'
          break
        case 75:
          this.organization.passSlider.title = '更多直传'
          break
        case 100:
          this.organization.passSlider.title = '极多直传'
          break
      }
    },
    // 节奏控制
    paceCtrl(e) {
      this.organization.paceSlider.val = e
      switch (e) {
        case 0:
          this.organization.paceSlider.title = '较低'
          break
        case 25:
          this.organization.paceSlider.title = '标准'
          break
        case 50:
          this.organization.paceSlider.title = '更快'
          break
        case 75:
          this.organization.paceSlider.title = '极快'
          break
        case 100:
          this.organization.paceSlider.title = '很高'
          break
      }
    },
    // 拖延控制
    delayCtrl(e) {
      this.organization.delaySlider.val = e
      switch (e) {
        case 0:
          this.organization.delaySlider.title = '从不'
          break
        case 50:
          this.organization.delaySlider.title = '有时'
          break
        case 100:
          this.organization.delaySlider.title = '总是'
          break
      }
    },
    // 射门或者传中控制
    shotCtrl(way) {
      const state = this.area.shotOrElse[way]
      switch (way) {
        case 'toRestrict':
          if (state === '' || state === 'area-unselect') {
            this.area.shotOrElse.toRestrict = 'area-select'
            this.area.shotOrElse.pass2Center = this.area.shotOrElse.shot =
              'area-unselect'
          } else {
            for (const key in this.area.shotOrElse) {
              this.area.shotOrElse[key] = ''
            }
          }
          break
        case 'pass2Center':
          if (state === '' || state === 'area-unselect') {
            this.area.shotOrElse[way] = 'area-select'
            this.area.shotOrElse.toRestrict = 'area-unselect'
          } else {
            this.area.shotOrElse[way] = ''
            if (
              this.area.shotOrElse.shot === '' &&
              this.area.shotOrElse.pass2Center === ''
            ) {
              this.area.shotOrElse.toRestrict = ''
            }
          }
          break
        case 'shot':
          if (state === '' || state === 'area-unselect') {
            this.area.shotOrElse[way] = 'area-select'
            this.area.shotOrElse.toRestrict = 'area-unselect'
          } else {
            this.area.shotOrElse[way] = ''
            if (
              this.area.shotOrElse.shot === '' &&
              this.area.shotOrElse.pass2Center === ''
            ) {
              this.area.shotOrElse.toRestrict = ''
            }
          }
          break
      }
    },
    // 控制定位球
    fkCtrl() {
      this.area.freeKick === ''
        ? (this.area.freeKick = 'primary')
        : (this.area.freeKick = '')
    },
    // 控制盘带
    driCtrl(times) {
      if (this.area.dri[times] === '' || this.area.dri[times] === 'danger') {
        this.area.dri[times] = 'primary'
        for (const key in this.area.dri) {
          if (key !== times) {
            this.area.dri[key] = 'danger'
          }
        }
      } else if (this.area.dri[times] === 'primary') {
        for (const key in this.area.dri) {
          this.area.dri[key] = ''
        }
      }
    },
    // 创造力控制
    creativeCtrl(times) {
      if (
        this.area.creative[times] === '' ||
        this.area.creative[times] === 'danger'
      ) {
        this.area.creative[times] = 'primary'
        for (const key in this.area.creative) {
          if (key !== times) {
            this.area.creative[key] = 'danger'
          }
        }
      } else if (this.area.creative[times] === 'primary') {
        for (const key in this.area.creative) {
          this.area.creative[key] = ''
        }
      }
    }
  },
  watch: {
    'fieldWidth.slider.title': {
      handler: function(val) {
        this.abbr.stage1.fieldWidth = val
      },
      deep: true,
      immediate: true
    },
    'organization.pass2SpaceBtnType': {
      handler: function(val) {
        if (val === 'primary') this.abbr.stage1.pass2Space = '多传空当'
        else this.abbr.stage1.pass2Space = ''
      },
      deep: true,
      immediate: true
    },
    'organization.passSlider.title': {
      handler: function(val) {
        this.abbr.stage1.pass = val
      },
      deep: true,
      immediate: true
    },
    'organization.paceSlider.title': {
      handler: function(val) {
        this.abbr.stage1.pace = val + '的比赛节奏'
      },
      deep: true,
      immediate: true
    },
    'organization.delaySlider.title': {
      handler: function(val) {
        if (val !== '') {
          this.abbr.stage1.delay = val + '拖延'
        }
      },
      deep: true,
      immediate: true
    },
    'area.pass2center.val': {
      handler: function(val) {
        this.abbr.stage1.pass2Center = val
      },
      deep: true,
      immediate: true
    },
    'area.up': {
      handler: function(val) {
        const map = new Map()
        map.set('leftSide', '左侧套边插上')
        map.set('rightSide', '右侧套边插上')
        map.set('rightRib', '右侧肋部插上')
        map.set('leftRib', '左侧肋部插上')
        this.abbr.stage1.up = []
        for (const key in val) {
          if (val[key] === 'area-select') {
            this.abbr.stage1.up.push(map.get(key))
          }
        }
      },
      deep: true,
      immediate: true
    },
    'area.sideOrMid': {
      handler: function(val) {
        const map = new Map()
        map.set('left', '多走左路')
        map.set('mid', '多走中路')
        map.set('right', '多走右路')
        this.abbr.stage1.sideOrMid = []
        for (const key in val) {
          if (val[key] === 'area-select') {
            this.abbr.stage1.up.push(map.get(key))
          }
        }
      },
      deep: true,
      immediate: true
    },
    'area.shortPass': {
      handler: function(val) {
        if (val === 'area-select') {
          this.abbr.stage1.shortPass = '防守区域短传出球'
        }
      },
      deep: true,
      immediate: true
    },
    'area.freeKick': {
      handler: function(val) {
        if (val === 'primary') {
          this.abbr.stage1.freeKick = '制造定位球机会'
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.area-select {
  background-color: rgba(22, 210, 89, 0.8) !important;
}
.area-unselect {
  background-color: rgba(182, 99, 72, 0.8) !important;
}
.abbrInfo {
  position: relative;
}
.abbr-card {
  height: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.passBtn {
  margin: 20px;
}
.stage-card {
  position: relative;
  background: rgb(228, 245, 239);
  text-align: center;

  .text-content {
    margin: 0;
    padding: 0;
    font-size: 5px;
  }
  .text-top {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  .expand-btn {
    cursor: pointer;
    position: absolute;
    font-size: 5px;
    margin: 10px;
    bottom: 0;
    right: 0;
  }
}
.stage-1 {
  height: 200px;
}

.stage-2 {
  height: 200px;
}
.stage-3 {
  height: 200px;
}
.stage-expand-1 {
  width: 1000px;
  height: 700px;
  position: relative;
  z-index: 999;
}
.stage-expand-2 {
  width: 600px;
  height: 500px;
  position: relative;
  z-index: 999;
}
.field-1 {
  height: 642px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/fields/球场竖向.png') no-repeat center
      center;
  }
}
.sm-field {
  height: 250px;
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
    background-size: 60%;
  }
}

.field-row {
  position: relative;
  width: 192px;
  top: 16px;
  left: 64px;
  margin: 10px 0;
  .area-col-1 {
    height: 30px;
    width: 80px;
    margin: 0 1px;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .area-text {
      font-size: 5px;
      color: #f2f6fc;
    }
  }
  .area-col-2 {
    height: 90px;
    width: 50px;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .area-text {
      font-size: 3px;
      color: #f2f6fc;
      line-height: 90px;
    }
  }
  .area-col-3 {
    height: 90px;
    width: 80px;
    display: inline-block;
    margin: 0 1px;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .area-text {
      font-size: 3px;
      color: #f2f6fc;
      line-height: 90px;
    }
  }
  .pass-col-1 {
    margin: 0 1px;
    height: 44px;
    width: 44px;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .pass-text {
      font-size: 5px;
      color: #f2f6fc;
    }
  }
  .pass-col-2 {
    width: 60px;
    height: 64px;
    margin: 0 1px;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .pass-text {
      font-size: 5px;
      text-align: center;
      color: #f2f6fc;
      line-height: 64px;
    }
  }
  .pass-col-3 {
    width: 190px;
    height: 32px;
    margin: 0;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .pass-text {
      font-size: 5px;
      text-align: center;
      color: #f2f6fc;
      line-height: 32px;
    }
  }
  .field-col {
    height: 20px;
    width: 20px;
    border-radius: 20px;
    display: inline-block;
    background: #ffffff;
  }
  .field-col-width-1 {
    margin: 0 3px;
  }
  .field-col-width-2 {
    margin: 0 4px;
  }
  .field-col-width-3 {
    margin: 0 5px;
  }
  .field-col-width-4 {
    margin: 0 6px;
  }
  .field-col-width-5 {
    margin: 0 7px;
  }
}

.field-row-2 {
  position: relative;
  width: 192px;
  top: 4px;
  left: 44px;
  margin: 1px 0;
  .field-col-1 {
    height: 37px;
    width: 166px;
    margin: 0 1px;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .text {
      font-size: 5px;
      line-height: 37px;
      color: #f2f6fc;
    }
  }
  .field-col-2 {
    position: absolute;
    height: 100px;
    width: 50px;
    margin: 0 1px;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .text {
      font-size: 5px;
      line-height: 100px;
      color: #f2f6fc;
    }
  }
  .field-col-3 {
    position: absolute;
    height: 49px;
    width: 64px;
    margin: 0 1px;
    margin-left: -32px;
    display: inline-block;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .text {
      font-size: 5px;
      line-height: 49px;
      color: #f2f6fc;
    }
  }
  .field-col-4 {
    height: 37px;
    width: 54px;
    display: inline-block;
    margin: 0 0.5px;
    background: rgba(31, 84, 34, 0.8);
    cursor: pointer;
    .text {
      font-size: 5px;
      line-height: 37px;
      color: #f2f6fc;
    }
  }
  .pos-1 {
    top: -3px;
    left: 12px;
  }
  .pos-2 {
    top: -3px;
    right: 12px;
  }
  .pos-3 {
    top: -3px;
  }
  .pos-4 {
    top: 47px;
  }
}

.row-height {
  height: 100px;
}
.pass-row {
  top: 50px;
  margin: 1px;
}
.area-row {
  top: 0;
  margin: 1px;
}
.field-slider {
  margin: 0 64px;
  width: 192px;
}
</style>
