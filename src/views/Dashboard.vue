<template>
  <div>
    <el-row :gutter="10">
      <el-button @click="sndEmail">send email test</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  methods: {
    async sndEmail() {
      const rcv = await this.$http.get('mail/snd')
      console.log(rcv.data)
    }
  }
}
</script>

<style scoped></style>
