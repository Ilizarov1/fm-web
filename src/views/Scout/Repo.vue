<template>
  <div>
    <el-tabs :active-name="activeName" @tab-click="handleTab">
      <el-tab-pane label="球探报告" name="0"></el-tab-pane>
      <el-tab-pane label="能力数据" name="1"></el-tab-pane>
    </el-tabs>

    <div v-if="activeName === '0'">
      <el-row :gutter="20">
        <el-col :span="8">
          <h1>概要</h1>
          <el-form
            label-width="80px"
            :form="scoutRepo"
            label-position="left"
            size="small"
          >
            <el-form-item label="姓名">
              <el-select
                v-model="scoutRepo.name"
                placeholder="请输入/选择球员"
                filterable
                allow-create
                @change="getForm"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in this.players"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number
                :min="16"
                :max="100"
                v-model="scoutRepo.age"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="位置">
              <el-select
                v-model="scoutRepo.position"
                multiple
                style="width: 100%"
              >
                <el-option-group label="前场">
                  <el-option
                    v-for="(item, index) in pos.front"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-option-group>
                <el-option-group label="中场">
                  <el-option
                    v-for="(item, index) in pos.mid"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-option-group>
                <el-option-group label="后场">
                  <el-option
                    v-for="(item, index) in pos.back"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="国籍">
              <el-input v-model="scoutRepo.nation"></el-input>
            </el-form-item>
            <el-form-item label="身高">
              <el-input v-model="scoutRepo.height">
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="体重">
              <el-input v-model="scoutRepo.weight">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="惯用脚">
              <el-select v-model="scoutRepo.foot.val" style="width: 100%">
                <el-option
                  v-for="(item, index) in scoutRepo.foot.option"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="积极性">
              <el-select v-model="scoutRepo.movitation.val" style="width: 100%">
                <el-option
                  v-for="(item, index) in scoutRepo.movitation.option"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <h1>优点</h1>
          <el-form label-width="80px" label-position="left" size="small">
            <el-form-item
              v-for="(item, index) in scoutRepo.advantages"
              :key="index"
              :label="'优点 ' + (index + 1)"
            >
              <el-input v-model="item.content">
                <template slot="append">
                  <el-button
                    type="danger"
                    size="small"
                    @click="removeAdv(index)"
                    >删除</el-button
                  >
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button size="small" type="primary" @click="addAdv"
            >添加优点</el-button
          >
        </el-col>
        <el-col :span="8">
          <h1>缺点</h1>
          <el-form label-width="80px" label-position="left" size="small">
            <el-form-item
              v-for="(item, index) in scoutRepo.disadvantages"
              :key="index"
              :label="'缺点 ' + (index + 1)"
            >
              <el-input v-model="item.content">
                <template slot="append">
                  <el-button
                    type="danger"
                    size="small"
                    @click="removeDis(index)"
                    >删除</el-button
                  >
                </template>
              </el-input>
            </el-form-item>
            <el-button size="small" type="primary" @click="addDis"
              >添加缺点</el-button
            >
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <h1>球探建议</h1>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            resize="none"
            rows="4"
            v-model="scoutRepo.suggestion"
            maxlength="255"
            show-word-limit
          ></el-input>
        </el-col>
        <el-col :span="12">
          <h1>总体评分</h1>
          <el-form :inline="true">
            <el-form-item label="能力评分" style="margin-top: 20px">
              <el-input-number
                :min="1"
                :max="100"
                v-model="scoutRepo.rate"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="潜力评分" style="margin-top: 20px">
              <el-input-number
                :min="1"
                :max="100"
                v-model="scoutRepo.potential"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :span="8">
          <h1>速度</h1>
          <el-form label-width="80px" label-position="left">
            <el-form-item
              v-for="(item, index) in scoutRepo.pac"
              :key="index"
              :label="item.label"
              ><el-slider
                v-model="item.val"
                show-input
                :show-input-controls="false"
                input-size="small"
              >
              </el-slider>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <h1>射门</h1>
          <el-form label-width="80px" label-position="left">
            <el-form-item
              v-for="(item, index) in scoutRepo.sho"
              :key="index"
              :label="item.label"
            >
              <el-slider
                v-model="item.val"
                show-input
                :show-input-controls="false"
                input-size="small"
              >
              </el-slider>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <h1>传球</h1>
          <el-form label-width="80px" label-position="left">
            <el-form-item
              v-for="(item, index) in scoutRepo.pas"
              :key="index"
              :label="item.label"
            >
              <el-slider
                v-model="item.val"
                show-input
                :show-input-controls="false"
                input-size="small"
              >
              </el-slider>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <h1>盘带</h1>
          <el-form label-width="80px" label-position="left">
            <el-form-item
              v-for="(item, index) in scoutRepo.dri"
              :key="index"
              :label="item.label"
              ><el-slider
                v-model="item.val"
                show-input
                :show-input-controls="false"
                input-size="small"
              >
              </el-slider>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <h1>防守</h1>
          <el-form label-width="80px" label-position="left">
            <el-form-item
              v-for="(item, index) in scoutRepo.def"
              :key="index"
              :label="item.label"
            >
              <el-slider
                v-model="item.val"
                show-input
                :show-input-controls="false"
                input-size="small"
              >
              </el-slider>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <h1>身体</h1>
          <el-form label-width="80px" label-position="left">
            <el-form-item
              v-for="(item, index) in scoutRepo.phy"
              :key="index"
              :label="item.label"
            >
              <el-slider
                v-model="item.val"
                show-input
                :show-input-controls="false"
                input-size="small"
              >
              </el-slider>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <h1>守门</h1>
          <el-form label-width="80px" label-position="left">
            <el-form-item
              v-for="(item, index) in scoutRepo.gk"
              :key="index"
              :label="item.label"
              ><el-slider
                v-model="item.val"
                show-input
                :show-input-controls="false"
                input-size="small"
              >
              </el-slider>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>
    <el-row type="flex" justify="space-around">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button>重置</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Repo',
  data() {
    return {
      scoutRepo: {
        name: '',
        age: 16,
        position: [],
        nation: '',
        height: 170,
        weight: 80,
        advantages: [
          {
            content: ''
          }
        ],
        disadvantages: [{ content: '' }],
        suggestion: '',
        rate: 100,
        potential: 100,
        pac: [
          { label: '加速度', val: 0 },
          { label: '冲刺速度', val: 0 }
        ],
        sho: [
          { label: '跑位', val: 0 },
          { label: '射术', val: 0 },
          { label: '射门力量', val: 0 },
          { label: '远射', val: 0 },
          { label: '凌空', val: 0 },
          { label: '点球', val: 0 }
        ],
        pas: [
          { label: '视野', val: 0 },
          { label: '传中', val: 0 },
          { label: '任意球', val: 0 },
          { label: '短传', val: 0 },
          { label: '长传', val: 0 },
          { label: '弧线', val: 0 }
        ],
        dri: [
          { label: '敏捷', val: 0 },
          { label: '平衡', val: 0 },
          { label: '反应', val: 0 },
          { label: '控球', val: 0 },
          { label: '沉着', val: 0 }
        ],
        def: [
          { label: '拦截意识', val: 0 },
          { label: '头球', val: 0 },
          { label: '防守意识', val: 0 },
          { label: '抢断', val: 0 },
          { label: '铲断', val: 0 }
        ],
        phy: [
          { label: '弹跳', val: 0 },
          { label: '体能', val: 0 },
          { label: '强壮', val: 0 },
          { label: '侵略性', val: 0 }
        ],
        gk: [
          { label: '飞扑', val: 0 },
          { label: '击球', val: 0 },
          { label: '开球', val: 0 },
          { label: '站位', val: 0 },
          { label: '反应', val: 0 }
        ],
        foot: {
          option: [
            { label: '左脚', val: 'left' },
            { label: '右脚', val: 'right' }
          ],
          val: ''
        },
        movitation: {
          option: [
            { label: '低', val: 'low' },
            { label: '中', val: 'mid' },
            { label: '高', val: 'high' }
          ],
          val: ''
        }
      },
      pos: {
        front: ['ST', 'CF', 'RW', 'LW'],
        mid: ['CAM', 'CM', 'LM', 'RM', 'CDM'],
        back: ['LB', 'CB', 'RB', 'GK']
      },
      activeName: '0',
      scoutForm: {},
      playerForm: {},
      reflect: {
        runningPosition: '跑位',
        shotSkill: '射术',
        shotStrength: '射门力量',
        longShot: '远射',
        overhead: '凌空',
        penatly: '点球',
        horizon: '视野',
        pass2center: '传中',
        freeKick: '任意球',
        shortPass: '短传',
        longPass: '长传',
        arcsPass: '弧线',
        acc: '加速度',
        maxSpeed: '冲刺速度',
        agile: '敏捷',
        balance: '平衡',
        react: '反应',
        control: '控球',
        composure: '沉着',
        intAware: '拦截意识',
        headShot: '头球',
        defAware: '防守意识',
        steal: '抢断',
        cutoff: '铲断',
        bounce: '弹跳',
        fitness: '体能',
        strength: '强壮',
        aggressive: '侵略性',
        flyPounce: '飞扑',
        hitBall: '击球',
        kickoff: '开球',
        standPosition: '站位',
        gkReact: '反应'
      }
    }
  },
  computed: {
    ...mapState(['players'])
  },
  methods: {
    ...mapActions(['getPlayers']),
    removeAdv(index) {
      this.scoutRepo.advantages.splice(index, 1)
    },
    addAdv() {
      this.scoutRepo.advantages.push({
        content: ''
      })
    },
    removeDis(index) {
      this.scoutRepo.disadvantages.splice(index, 1)
    },
    addDis() {
      this.scoutRepo.disadvantages.push({ content: '' })
    },
    handleTab() {
      this.activeName === '0'
        ? (this.activeName = '1')
        : (this.activeName = '0')
    },
    // 处理提交的表单
    handlePlayerForm() {
      this.playerForm = {
        name: this.scoutRepo.name,
        age: this.scoutRepo.age,
        nation: this.scoutRepo.nation,
        height: this.scoutRepo.height,
        weight: this.scoutRepo.weight,
        rate: this.scoutRepo.rate,
        potential: this.scoutRepo.potential,
        skilledRole: this.scoutRepo.position.join(','),
        foot: this.scoutRepo.foot.val,
        motivation: this.scoutRepo.movitation.val
      }
    },
    handleScoutForm(playerid) {
      this.scoutForm = {
        advantages: this.getVantages('advantages'),
        disadvantages: this.getVantages('disadvantages'),
        suggestions: this.scoutRepo.suggestion,
        runningPosition: this.getAbility('sho', '跑位'),
        shotSkill: this.getAbility('sho', '射术'),
        shotStrength: this.getAbility('sho', '射门力量'),
        longShot: this.getAbility('sho', '远射'),
        overhead: this.getAbility('sho', '凌空'),
        penatly: this.getAbility('sho', '点球'),
        horizon: this.getAbility('pas', '视野'),
        pass2center: this.getAbility('pas', '传中'),
        freeKick: this.getAbility('pas', '任意球'),
        shortPass: this.getAbility('pas', '短传'),
        longPass: this.getAbility('pas', '长传'),
        arcsPass: this.getAbility('pas', '弧线'),
        acc: this.getAbility('pac', '加速度'),
        maxSpeed: this.getAbility('pac', '冲刺速度'),
        agile: this.getAbility('dri', '敏捷'),
        balance: this.getAbility('dri', '平衡'),
        react: this.getAbility('dri', '反应'),
        control: this.getAbility('dri', '控球'),
        composure: this.getAbility('dri', '沉着'),
        intAware: this.getAbility('def', '拦截意识'),
        headShot: this.getAbility('def', '头球'),
        defAware: this.getAbility('def', '防守意识'),
        steal: this.getAbility('def', '抢断'),
        cutoff: this.getAbility('def', '铲断'),
        bounce: this.getAbility('phy', '弹跳'),
        fitness: this.getAbility('phy', '体能'),
        strength: this.getAbility('phy', '强壮'),
        aggressive: this.getAbility('phy', '侵略性'),
        flyPounce: this.getAbility('gk', '飞扑'),
        hitBall: this.getAbility('gk', '击球'),
        kickoff: this.getAbility('gk', '开球'),
        standPosition: this.getAbility('gk', '站位'),
        gkReact: this.getAbility('gk', '反应'),
        playerId: playerid
      }
    },
    // 获取优缺点
    getVantages(mod) {
      const res = []
      for (const item of this.scoutRepo[mod]) {
        res.push(item.content)
      }
      return res.join(',')
    },
    setVantages(mod, vantages = '') {
      this.scoutRepo[mod] = []
      const vantagesArray = vantages.split(',')
      for (const item of vantagesArray) {
        this.scoutRepo[mod].push({
          content: item
        })
      }
    },
    // 获得能力值
    getAbility(mod, abName) {
      return this.scoutRepo[mod].find(x => {
        return x.label === abName
      }).val
    },
    setAbility(mod, abName, val) {
      this.scoutRepo[mod].find(x => {
        return x.label === abName
      }).val = val
    },
    // 提交表单
    async submit() {
      this.handlePlayerForm()
      await this.$http
        .post('player/insert', this.playerForm)
        .then(async ({ status, data }) => {
          this.handleScoutForm(data.playerId)
          if (status !== 200) {
            return this.$message.error('!')
          } else {
            this.$message.success('球员' + data.msg)
          }
          return await this.submitReport()
        })
        .then(({ status, data }) => {
          if (status !== 200) {
            return this.$message.error('!')
          } else {
            this.$message.success('报告' + data.msg)
          }
        })
    },
    async submitReport() {
      return await this.$http.post('scout/insert', this.scoutForm)
    },
    async getForm() {
      const { status, data } = await this.$http.post('scout/getScout', {
        name: this.scoutRepo.name
      })
      // 处理球员基本信息
      const player = data.player
      this.scoutRepo.name = player.name
      this.scoutRepo.age = player.age
      this.scoutRepo.position = player.skilledRole.split(',')
      this.scoutRepo.nation = player.nation
      this.scoutRepo.height = player.height
      this.scoutRepo.weight = player.weight
      this.scoutRepo.foot.val = player.foot
      this.scoutRepo.movitation.val = player.motivation
      // 处理报告
      const report = data.report
      for (const [key, val] of Object.entries(this.reflect)) {
        const pac = this.scoutRepo.pac.find(x => x.label === val)
        const sho = this.scoutRepo.sho.find(x => x.label === val)
        const pas = this.scoutRepo.pas.find(x => x.label === val)
        const dri = this.scoutRepo.dri.find(x => x.label === val)
        const def = this.scoutRepo.def.find(x => x.label === val)
        const phy = this.scoutRepo.phy.find(x => x.label === val)
        const gk = this.scoutRepo.gk.find(x => x.label === val)
        if (pac != null) {
          pac.val = report[key]
        }
        if (sho != null) {
          sho.val = report[key]
        }
        if (pas != null) {
          pas.val = report[key]
        }
        if (dri != null) {
          dri.val = report[key]
        }
        if (def != null) {
          def.val = report[key]
        }
        if (phy != null) {
          phy.val = report[key]
        }
        if (gk != null) {
          gk.val = report[key]
        }
      }
      this.setVantages('advantages', report.advantages)
      this.setVantages('disadvantages', report.disadvantages)
      this.scoutRepo.suggestion = report.suggestions
    }
  },
  mounted() {
    this.getPlayers()
  }
}
</script>

<style scoped>
.slider-input input {
  width: 10px;
}
</style>
