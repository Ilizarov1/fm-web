<template>
  <div>
    <el-tabs>
      <el-tab-pane label="其他定位球">
        <set-pieces></set-pieces>
      </el-tab-pane>
      <el-tab-pane label="点球">
        <penalty></penalty>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SetPieces from 'components/Tactics/SetPieces'
import Penalty from 'components/Tactics/Penalty'
export default {
  name: 'freekick',
  components: {
    SetPieces,
    Penalty
  }
}
</script>

<style lang="less" scoped></style>
