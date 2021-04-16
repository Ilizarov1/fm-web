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
            <el-form-item label="球员姓名">
              <el-input v-model="scoutRepo.name"></el-input>
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
            <el-form-item label="预计花费">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="预计薪资">
              <el-input></el-input>
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
      <el-button type="primary">提交</el-button>
      <el-button>重置</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Repo',
  data() {
    return {
      scoutRepo: {
        name: '',
        age: 16,
        position: [],
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
          { label: '盘带', val: 0 },
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
        ]
      },
      pos: {
        front: ['ST', 'CF', 'RW', 'LW'],
        mid: ['CAM', 'CM', 'LM', 'RM', 'CDM'],
        back: ['LB', 'CB', 'RB']
      },
      activeName: '0'
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.slider-input input {
  width: 10px;
}
</style>
