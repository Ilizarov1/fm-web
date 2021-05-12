<template>
  <div>
    <el-row type="flex" style="margin-bottom: 10px">
      <el-input
        placeholder="请输入内容"
        v-model="search.content"
        style="width: 350px"
        size="small"
      >
        <el-select
          v-model="search.searchType"
          slot="prepend"
          placeholder="请选择"
          style="width: 90px"
        >
          <el-option label="姓名" value="name"></el-option>
          <el-option label="所属" value="employGroup"></el-option>
          <el-option label="职位" value="position"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
    <el-row>
      <el-table width="1060px" :data="employees" max-height="550px">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="所属" prop="employGroup"></el-table-column>
        <el-table-column label="具体职位" prop="position"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="select(scope.row.id)"
              >调整职位</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="end">
      <div class="pager-box">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          class="pagination"
        >
        </el-pagination>
      </div>
    </el-row>

    <el-dialog :visible.sync="posVisible" title="调整">
      <el-row type="flex" justify="space-around">
        <el-col :span="8">
          <el-select v-model="posForm.employGroup" @change="changeSelect">
            <el-option
              v-for="item in groupSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="8">
          <el-select v-model="posForm.position">
            <el-option
              v-for="item in posSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> </el-col
      ></el-row>
      <el-row>
        <el-button type="primary" class="submit-button" @click="submit"
          >确认调整</el-button
        >
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      posVisible: false,
      posForm: {
        employGroup: '',
        position: '',
        id: -1
      },
      groupSelect: [
        {
          label: '教练组',
          value: '教练组'
        },
        {
          label: '医疗组',
          value: '医疗组'
        },
        {
          label: '球探组',
          value: '球探组'
        }
      ],
      posSelect: [],
      coach: [
        {
          label: '主教练',
          value: '主教练'
        },
        {
          label: '助理教练',
          value: '助理教练'
        },
        {
          label: '普通教练',
          value: '普通教练'
        },
        {
          label: '体能教练',
          value: '体能教练'
        },
        {
          label: '门将教练',
          value: '门将教练'
        }
      ],
      medicine: [
        {
          label: '首席医生',
          value: '首席医生'
        },
        { label: '队医', value: '队医' }
      ],
      scout: [
        {
          label: '首席球探',
          value: '首席球探'
        },
        {
          label: '球探',
          value: '球探'
        }
      ],
      search: {
        content: '',
        searchType: 'name'
      }
    }
  },
  computed: {
    ...mapState(['employees'])
  },
  methods: {
    ...mapActions(['getEmployees']),
    changeSelect(e) {
      this.posForm.position = ''
      this.posSelect = []
      switch (e) {
        case '教练组': {
          this.posSelect = this.coach
          break
        }
        case '医疗组': {
          this.posSelect = this.medicine
          break
        }
        case '球探组': {
          this.posSelect = this.scout
          break
        }
      }
    },
    // 提交
    async submit() {
      const { status, data } = await this.$http.post(
        'employee/adjust',
        this.posForm
      )
      this.posVisible = false
      if (status !== 200) {
        this.$message.error('error')
      } else {
        if (data.msg === 'success') {
          this.$message.success('调整成功')
        }
      }
      await this.getEmployees()
    },
    // 传入选择的id
    select(id) {
      this.posForm.id = id
      this.posVisible = true
    }
  },
  mounted() {
    this.getEmployees()
  }
}
</script>

<style scoped>
.submit-button {
  margin-top: 20px;
  margin-left: 550px;
}
.pagination {
  margin-right: -5px;
}
.pager-box >>> button,
.pager-box >>> .el-pager li {
  background-color: transparent !important;
}

.pager-box >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgb(228, 245, 239) !important;
}
</style>
