<template>
  <div>
    <el-row>
      <el-button type="primary" size="mini" @click="arrangeVis = true"
        >安排训练</el-button
      >
    </el-row>
    <el-row>
      <el-calendar>
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
                v-for="item in trainItems.slice(0, 2)"
                :title="item.type"
                effect="dark"
                :closable="false"
                class="cal-item"
                :key="item.type"
                type="success"
              ></el-alert>
              <el-alert
                v-if="isMore()"
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
          <li v-for="item in drawerList" :key="item.type" class="detail-li">
            <el-tag v-if="item.time === '上午'" type="primary">{{
              item.time
            }}</el-tag>
            <el-tag v-else type="success">{{ item.time }}</el-tag>
            {{ item.type }}
          </li>
        </ul>
      </div>
    </el-drawer>
    <!--    安排训练表-->
    <el-dialog title="安排训练" :visible.sync="arrangeVis" width="30%">
      <el-form :label-position="'left'" label-width="100px">
        <el-form-item label="训练类型">
          <el-select v-model="arrangeForm.type" placeholder="选择训练类型">
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
            v-model="arrangeForm.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间段">
          <el-select v-model="arrangeForm.time" placeholder="选择时间段">
            <el-option value="上午" label="上午"></el-option>
            <el-option value="下午" label="下午"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教练">
          <el-select v-model="arrangeForm.coach" placeholder="选择教练">
            <el-option value="小赵">
              <span style="float: left">小赵</span>
              <span style="float: right">主教练</span>
            </el-option>
            <el-option value="小舟">
              <span style="float: left">小舟</span>
              <span style="float: right">普通教练</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Training',
  data() {
    return {
      detailVisible: false,
      arrangeVis: false,
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
      trainItems: [],
      drawerList: [],
      arrangeForm: {
        type: '',
        time: '',
        coach: '',
        date: ''
      }
    }
  },
  methods: {
    // 是否存在训练计划
    isTrainExists(date) {
      const trainItems = this.trainingList.find(x => x.date === date)
      if (trainItems) {
        this.trainItems = trainItems.item
      }
      return !!trainItems
    },
    // 是否超过三个
    isMore() {
      return this.trainItems.length >= 3
    },
    // 查看详细
    checkMore(date) {
      const res = this.trainingList.find(x => x.date === date)
      this.drawerList = res.item
      console.log('res:')
      console.log(res)
      console.log('drawerList:')
      console.log(this.drawerList)
      this.detailVisible = true
    }
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
