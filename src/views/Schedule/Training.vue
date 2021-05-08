<template>
  <div>
    <el-row>
      <el-button type="primary" size="mini" @click="arrangeVis = true"
        >安排训练</el-button
      >
    </el-row>
    <el-row>
      <el-calendar :range="['2021-04-01', '2021-07-01']">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="cal-box">
            <p class="date-text">
              {{
                data.day
                  .split('-')
                  .slice(1)
                  .join('-')
              }}
            </p>
            <div v-if="isTrainExists(data.day)">
              <el-alert
                v-for="(item, index) in trainItems.get(data.day).slice(0, 2)"
                :title="item.trainType"
                effect="dark"
                :closable="false"
                class="cal-item"
                :key="index"
                type="success"
              ></el-alert>
              <el-alert
                v-if="isMore(data.day)"
                effect="dark"
                :closable="false"
                type="info"
                title="更多..."
                class="cal-item"
              ></el-alert>
              <el-link
                :underline="false"
                @click="checkMore(data.day)"
                class="cak-link"
                >查看详细
              </el-link>
            </div>
          </div>
        </template>
      </el-calendar>
    </el-row>
    <!--    训练详细-->
    <el-drawer
      title="详细训练安排"
      :visible.sync="detailVisible"
      direction="rtl"
      size="15%"
    >
      <div class="detail-box">
        <ul>
          <li
            v-for="(item, index) in drawerList"
            :key="index"
            class="detail-li"
          >
            <el-tag v-if="item.trainTime === '上午'" type="primary">{{
              item.trainTime
            }}</el-tag>
            <el-tag v-else type="success">{{ item.trainTime }}</el-tag>
            {{ item.trainType }}
          </li>
        </ul>
      </div>
    </el-drawer>
    <!--    安排训练表-->
    <el-dialog title="安排训练" :visible.sync="arrangeVis" width="30%">
      <el-form :label-position="'left'" label-width="100px">
        <el-form-item label="训练类型">
          <el-select v-model="arrangeForm.trainType" placeholder="选择训练类型">
            <el-option value="体能训练" label="体能训练"></el-option>
            <el-option value="进攻训练" label="进攻训练"></el-option>
            <el-option value="防守训练" label="防守训练"></el-option>
            <el-option value="战术训练" label="战术训练"></el-option>
            <el-option value="恢复训练" label="恢复训练"></el-option>
            <el-option value="门将训练" label="门将训练"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="arrangeForm.trainDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间段">
          <el-select v-model="arrangeForm.trainTime" placeholder="选择时间段">
            <el-option value="上午" label="上午"></el-option>
            <el-option value="下午" label="下午"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教练">
          <el-select v-model="selectedName" placeholder="选择教练">
            <el-option
              v-for="(item, index) in coaches"
              :key="index"
              :value="item.name"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right">{{ item.position }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Training',
  data() {
    return {
      detailVisible: false,
      arrangeVis: false,
      selectedName: '',
      trainingList: [
        {
          date: '2021-04-14',
          item: [
            { type: '体能训练', time: '上午' },
            { type: '战术训练', time: '下午' }
          ]
        },
        {
          date: '2021-04-15',
          item: [
            { type: '进攻训练', time: '上午' },
            { type: '恢复训练', time: '下午' }
          ]
        },
        {
          date: '2021-04-16',
          item: [
            { type: '进攻训练', time: '上午' },
            { type: '恢复训练', time: '上午' },
            { type: '防守训练', time: '下午' }
          ]
        }
      ],
      trainItems: new Map(),
      drawerList: new Map(),
      arrangeForm: {
        trainType: '',
        trainTime: '',
        coachId: '',
        trainDate: ''
      }
    }
  },
  computed: {
    ...mapState(['coaches']),
    ...mapState(['trainingLst'])
  },
  methods: {
    ...mapActions(['getCoaches']),
    ...mapActions(['getTrainLst']),
    // 比较上午下午
    compareTime(a, b) {
      if (a.trainTime === '上午' && b.trainTime === '下午') {
        return -1
      } else if (a.trainTime === '下午' && b.trainTime === '上午') {
        return 1
      } else {
        return 0
      }
    },
    // 是否存在训练计划
    isTrainExists(date) {
      const trainItems = this.trainingLst.find(x => x.trainDate === date)
      return trainItems != null
    },
    // 初始化trainItems
    initTrainItems() {
      for (const items of this.trainingLst) {
        this.trainItems.set(items.trainDate, items.item)
      }
    },
    // 是否超过三个
    isMore(day) {
      return this.trainItems.get(day).length >= 3
    },
    // 查看详细
    checkMore(date) {
      const res = this.trainingLst.find(x => x.trainDate === date)
      this.drawerList = res.item
      this.detailVisible = true
    },
    // 提交
    async submit() {
      this.arrangeForm.coachId = this.coaches.find(
        x => x.name === this.selectedName
      ).id

      await this.$http.post('schedule/postSchedule', this.arrangeForm)
      await this.getTrainLst()
      this.trainingList = this.trainingLst
      this.initTrainItems()
      this.arrangeVis = false
      this.$forceUpdate()
    }
  },
  async created() {
    await this.getTrainLst()
  },
  mounted() {
    this.getCoaches()
    this.trainingList = this.trainingLst
    this.initTrainItems()
  }
}
</script>

<style lang="less" scoped>
.date-text {
  margin: 0;
  font-size: 10px;
}
.cal-box {
  height: 100%;
  position: relative;
  .cak-link {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
  }
  .cal-item {
    padding: 0;
    margin: 2px;
    font-size: 8px;
  }
}
.detail-box {
  margin: 10px;
  .detail-li {
    margin: 10px;
  }
}
</style>
