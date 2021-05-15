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
import SetPieces from '@/views/Tactics/FreeKick/player/components/SetPieces'
import Penalty from '@/views/Tactics/FreeKick/player/components/Penalty'
export default {
  name: 'freekick',
  components: {
    SetPieces,
    Penalty
  }
}
</script>

<style lang="less" scoped></style>
