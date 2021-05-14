<template>
  <div>
    <el-col :span="8">
      <div>
        <h5>首席球探</h5>
        <p>{{ firstScout.name }}</p>
      </div>
    </el-col>
    <el-col :span="8">
      <div>
        <h5>球探重点</h5>
        <p>
          {{ settings.point }}
          <i class="el-icon-edit point" @click="dialogVisible = true"></i>
        </p>
      </div>
    </el-col>
    <el-col :span="8">
      <div>
        <h5>球探团队</h5>
        <p>{{ members.length }}名成员</p>
      </div>
    </el-col>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <el-select v-model="settings.point" @change="saveSettings">
        <el-option
          v-for="(item, index) in pointOption"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ScoutPanel',
  data() {
    return {
      firstScout: {
        name: ''
      },
      settings: {
        point: '全部'
      },
      members: [],
      pointOption: ['经验丰富', '当打之年', '明日之星', '全部'],
      areaOption: [],
      dialogVisible: false
    }
  },
  methods: {
    async load() {
      const rcv = await this.$http.get('employee/getScouts')
      this.members = rcv.data
      this.firstScout.name = rcv.data.find(x => x.position === '首席球探').name
      const settings = JSON.parse(window.localStorage.getItem('scout'))
      if (settings != null) {
        this.settings = settings
      }
    },
    async saveSettings() {
      const settings = JSON.stringify(this.settings)
      window.localStorage.setItem('scout', settings)
      await this.$http.post('conf/postConf', {
        content: settings,
        type: 'scout'
      })
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style lang="less" scoped>
.point {
  cursor: pointer;
}
</style>
