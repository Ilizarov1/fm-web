<template>
  <el-row :gutter="30">
    <el-col :span="9">
      <el-card>
        <div slot="header">
          <i class="el-icon-cpu"></i>
          当前阵型
        </div>
        <div class="field">
          <formation></formation>
        </div>
      </el-card>
    </el-col>
    <el-col :span="15">
      <el-row>
        <el-card>
          <div slot="header">
            <i class="el-icon-video-play"></i>
            当前预设战术 - {{ anime.length }} 种
          </div>
          <div
            v-for="(item, index) in anime"
            :key="index"
            class="anime-item clearfix"
          >
            <div class="anime-name">
              <i class="el-icon-video-camera"></i>
              战术：{{ item.name }}
            </div>
            <div class="anime-player">
              {{
                item.frames[0].players.filter(x => x.color === 'black').length
              }}
              人参与
            </div>
            <div class="anime-check">
              查看
            </div>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card>
          <div slot="header"><i class="el-icon-star-off"></i> 一线队成员</div>
          <div class="fst-Team">
            <fst-team></fst-team>
          </div>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Formation from '@/views/dashboard/admin/components/Formation'
import FstTeam from '@/views/dashboard/admin/components/FstTeam'
export default {
  name: 'Tactics',
  components: { FstTeam, Formation },
  data() {
    return {
      anime: []
    }
  },
  methods: {
    getAnime() {
      this.anime = JSON.parse(window.localStorage.getItem('anime'))
    }
  },
  mounted() {
    this.getAnime()
  }
}
</script>

<style lang="less" scoped>
.field {
  width: 319.99px;
  height: 250px;
}
.anime-item {
  margin: 5px;
  position: relative;
  .anime-player {
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .anime-name {
    display: inline-block;
    float: left;
  }
  .anime-check {
    float: right;
    display: inline-block;
    cursor: pointer;
  }
}
</style>
