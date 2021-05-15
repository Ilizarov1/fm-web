<template>
  <div>
    <el-col :span="4" style="position: relative">
      <div class="tool-bar">
        <div class="tool-box">
          <p>主队球员</p>
          <div
            class="circle circle-1 circle-pos"
            draggable="true"
            data-type="player"
            @dragstart="handlerDrag"
            data-color="black"
          ></div>
        </div>
        <div class="tool-box">
          <p>客队球员</p>
          <div
            class="circle circle-3 circle-pos"
            draggable="true"
            data-type="player"
            @dragstart="handlerDrag"
            data-color="yellow"
          ></div>
        </div>
        <div class="tool-box">
          <p>球</p>
          <div
            class="circle circle-2 circle-pos"
            draggable="true"
            data-type="ball"
            @dragstart="handlerDrag"
          ></div>
        </div>
        <div class="tool-box" id="text-box">
          <p style="margin-bottom: 10px">指示</p>
          <div
            v-for="(text, index) in textFrame"
            :key="index"
            draggable="true"
            data-type="text"
            @dragstart="handlerDrag"
            class="command"
          >
            {{ text }}
          </div>
          <el-button
            v-if="addTextCtrl"
            @click="addText"
            size="mini"
            class="add-btn"
            >添加文字指示</el-button
          >
          <el-input v-else size="mini" v-model="textCommand">
            <el-button
              slot="append"
              icon="el-icon-check"
              @click="submitText"
            ></el-button>
          </el-input>
        </div>
      </div>
    </el-col>
    <el-col :span="11">
      <el-row>
        <div v-show="paintVis" id="field" class="field-1">
          <div class="field-row" v-for="(row, rindex) in field" :key="rindex">
            <div class="field-col" v-for="(col, cindex) in row" :key="cindex">
              <div
                class="drag-zone"
                @drop="handlerDrop($event, col)"
                @dragover.prevent
              ></div>
            </div>
          </div>
        </div>
        <canvas
          id="canvas"
          v-show="!paintVis"
          width="440"
          height="320"
        ></canvas>
      </el-row>
    </el-col>
    <el-col :span="9">
      <el-row>
        <el-select v-model="preAnime.val" size="mini" class="anime-select">
          <el-option
            v-for="(item, index) in preAnime.anime"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-button-group>
          <el-button
            class="anime-play"
            size="mini"
            @click="playPre"
            type="success"
            >播放预设</el-button
          >
          <el-button
            size="mini"
            class="anime-play"
            @click="dialogVisible = true"
            >设置预设</el-button
          >
          <el-button
            size="mini"
            class="anime-play"
            type="danger"
            @click="delPre"
            >删除</el-button
          >
        </el-button-group>
      </el-row>
      <el-row class="frame-text">
        <el-button-group>
          <el-button @click="pushFrame" size="mini" type="primary"
            >添加关键帧</el-button
          >
          <el-button @click="delFrame" size="mini" type="danger"
            >撤销关键帧</el-button
          >
          <el-button
            v-if="paintVis"
            @click="playAnime"
            size="mini"
            type="success"
            >播放关键帧</el-button
          >

          <el-button v-else @click="paintVis = true" size="mini"
            >设置关键帧</el-button
          >
          <el-button v-if="!paintVis" size="mini" type="info" @click="playAnime"
            >重播</el-button
          >
        </el-button-group>
      </el-row>

      <el-steps direction="vertical" :active="steps.active">
        <el-step
          v-for="(frame, index) in steps.frames"
          :title="`关键帧${index}`"
          :key="index"
          :description="frame.description"
        ></el-step>
      </el-steps>
    </el-col>
    <el-dialog title="设置战术名称" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="preAnime.inputVal">
        <template slot="prepend">名称</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setFrames2DB">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Anime',
  data() {
    return {
      paintVis: true,
      field: {
        0: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        },
        1: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        },
        2: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        },
        3: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        },
        4: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        },
        5: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        },
        6: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        },
        7: {
          0: {
            x: 0,
            y: 0
          },
          1: {
            x: 0,
            y: 0
          },
          2: {
            x: 0,
            y: 0
          },
          3: {
            x: 0,
            y: 0
          },
          4: {
            x: 0,
            y: 0
          },
          5: {
            x: 0,
            y: 0
          },
          6: {
            x: 0,
            y: 0
          },
          7: {
            x: 0,
            y: 0
          },
          8: {
            x: 0,
            y: 0
          },
          9: {
            x: 0,
            y: 0
          },
          10: {
            x: 0,
            y: 0
          }
        }
      },
      dragged: {
        elem: null,
        x: 0,
        y: 0
      },
      cordinateSet: [],
      // 元素索引，记录一共产生了多少圆
      index: 0,
      ctx: null,
      bg: new Image(),
      time: new Date().getTime(),
      frame: {
        x: 20,
        y: 20
      },
      steps: {
        frames: [],
        active: 1
      },
      keyframes: new Map(),
      addTextCtrl: true,
      textCommand: '',
      textFrame: [],
      textHeight: '',
      textIndex: 0,
      preAnime: {
        val: '',
        inputVal: '',
        anime: [{ name: '', frames: [] }]
      },
      dialogVisible: false
    }
  },
  methods: {
    playAnime() {
      if (this.steps.frames.length < 2) {
        return this.$message.error('至少要两个关键帧')
      }
      this.paintVis = false
      const keyframes = _.cloneDeep(this.steps.frames)
      const lastframe = _.cloneDeep(keyframes[keyframes.length - 1])
      keyframes.push(lastframe)
      this.steps.active = 1
      this.drawAnime(keyframes, 1)
    },
    // 初始化画布
    initCanvas() {
      this.ctx = document.getElementById('canvas').getContext('2d')
    },
    // 初始化坐标
    initXandY() {
      let currentX = 20
      let currentY = 20
      for (const [rkey, row] of Object.entries(this.field)) {
        for (const [ckey, col] of Object.entries(row)) {
          col.x = currentX
          col.y = currentY
          currentX += 40
        }
        currentY += 40
        currentX = 20
      }
    },
    // 处理拖动
    handlerDrag(event) {
      this.dragged.elem = event.target
      const dataType = this.dragged.elem.getAttribute('data-type')
      if (dataType === 'player' || dataType === 'text') {
        const dataIsCopy = this.dragged.elem.getAttribute('data-is-copy')
        const elemIndex = this.dragged.elem.getAttribute('data-index')
        if (dataIsCopy === null) {
          this.dragged.elem.setAttribute('data-is-copy', '0')
        }
        if (elemIndex === null) {
          // 添加元素索引
          if (dataType === 'player') {
            this.dragged.elem.setAttribute('data-index', this.index++)
          } else {
            this.dragged.elem.setAttribute('data-index', this.textIndex++)
          }
        }
        event.dataTransfer.setData('text', null)
      }
    },
    // 处理放置
    handlerDrop(event, col) {
      let copyFlag = ''
      let dataIndex = -1
      let dataType = ''
      let dataColor = ''
      if (this.dragged.elem !== null) {
        copyFlag = this.dragged.elem.getAttribute('data-is-copy')
        dataIndex = this.dragged.elem.getAttribute('data-index')
        dataType = this.dragged.elem.getAttribute('data-type')
        dataColor = this.dragged.elem.getAttribute('data-color')
      } else return
      if (copyFlag === '0') {
        // 在工具栏里的
        const pNode = this.dragged.elem.parentNode
        pNode.removeChild(this.dragged.elem)
        const dupNode = this.dragged.elem.cloneNode(true)
        dupNode.addEventListener('dragstart', this.handlerDrag)
        if (dataType === 'player') {
          dupNode.setAttribute('data-index', this.index++)
        } else {
          dupNode.setAttribute('data-index', this.textIndex++)
        }

        pNode.appendChild(dupNode)
        this.dragged.elem.setAttribute('data-is-copy', '1')
        event.target.appendChild(this.dragged.elem)
        const content = this.dragged.elem.innerText
        this.dragged.elem = null
        if (dataType === 'player') {
          if (!this.keyframes.has('player')) {
            this.keyframes.set('player', [])
          }
          // 处理从工具栏-球场，球员，帧
          const frames = this.keyframes.get('player')
          frames.push({
            x: col.x,
            y: col.y,
            index: dataIndex,
            color: dataColor
          })
          this.keyframes.set('player', frames)
        } else if (dataType === 'text') {
          if (!this.keyframes.has('text')) {
            this.keyframes.set('text', [])
          }
          const frames = this.keyframes.get('text')
          frames.push({
            x: col.x,
            y: col.y,
            content,
            index: dataIndex
          })
          this.keyframes.set('text', frames)
        }
      } else {
        // 在画布上的放置
        const pNode = this.dragged.elem.parentNode
        pNode.removeChild(this.dragged.elem)
        event.target.appendChild(this.dragged.elem)
        const elemType = this.dragged.elem.getAttribute('data-type')
        let idx = -1
        if (elemType !== 'ball') {
          idx = this.dragged.elem.getAttribute('data-index')
        }
        this.dragged.elem = null
        if (elemType === 'player' || elemType === 'text') {
          // 球员或者文字的话，更新坐标
          const frames = this.keyframes.get(elemType)
          for (const frame of frames) {
            if (frame.index === idx) {
              frame.x = col.x
              frame.y = col.y
            }
          }
          this.keyframes.set(elemType, frames)
        } else if (elemType === 'ball') {
          // 球的话
          const ballframe = {
            x: col.x,
            y: col.y
          }
          this.keyframes.set('ball', ballframe)
        }
      }
    },
    // 添加关键帧
    pushFrame() {
      let playerframes = _.cloneDeep(this.keyframes.get('player'))
      let ballframe = this.keyframes.get('ball')
      let textframes = _.cloneDeep(this.keyframes.get('text'))
      if (playerframes == null) {
        return this.$message.error('场上没有球员')
      }
      if (ballframe == null) {
        return this.$message.error('场上没有球')
      }
      const balldes = `球在(${ballframe.x},${ballframe.y})处`
      let playerdes = ''
      for (const frame of playerframes) {
        const template = `；球员${frame.index}号在(${frame.x},${frame.y})处`
        playerdes += template
      }
      let textdes = ''
      if (textframes != null) {
        for (const frame of textframes) {
          const template = `；${frame.content}在(${frame.x},${frame.y})处`
          textdes += template
        }
      }

      const item = {
        ball: ballframe,
        players: playerframes,
        text: textframes,
        description: balldes + playerdes + textdes
      }
      this.steps.frames.push(item)
      playerframes = null
      ballframe = null
      textframes = null
    },
    drawAnime(keyframes, time) {
      // 画在画布上面
      let currentFrame = keyframes.shift()
      let nextFrame = keyframes.shift()
      let delta = this.caldxdy(currentFrame, nextFrame, time)
      const ctx = document.getElementById('canvas').getContext('2d')
      ctx.clearRect(0, 0, 440, 320)
      const playerimg1 = new Image()
      playerimg1.src = require('@/assets/images/numbers/跑.png')
      const playerimg2 = new Image()
      playerimg2.src = require('@/assets/images/numbers/跑1.png')
      let flag = nextFrame.ball.x - currentFrame.ball.x
      const draw = () => {
        ctx.globalCompositeOperation = 'destination-over'
        ctx.clearRect(0, 0, 440, 320)
        ctx.fillStyle = '#000000'
        ctx.strokeStyle = 'dodgerblue'
        ctx.save()

        // 画球
        ctx.fillStyle = '#ffffff'
        const { dx, dy } = delta.ball
        ctx.beginPath()
        ctx.arc(
          currentFrame.ball.x + dx,
          currentFrame.ball.y + dy,
          10,
          0,
          2 * Math.PI
        )
        ctx.fill()
        currentFrame.ball.x = currentFrame.ball.x + dx
        currentFrame.ball.y = currentFrame.ball.y + dy
        ctx.restore()
        ctx.save()
        // 画球员
        for (const player of currentFrame.players) {
          const { dx, dy } = delta.players.find(x => x.index === player.index)
          if (player.color === 'black') {
            ctx.drawImage(
              playerimg1,
              player.x + dx - 15,
              player.y + dy - 15,
              30,
              30
            )
          } else {
            ctx.drawImage(
              playerimg2,
              player.x + dx - 15,
              player.y + dy - 15,
              30,
              30
            )
          }

          player.x = player.x + dx
          player.y = player.y + dy
        }
        ctx.restore()
        ctx.save()
        ctx.font = '16px Microsoft YaHei'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#ffffff'
        if (currentFrame.text != null) {
          for (const command of currentFrame.text) {
            ctx.fillText(command.content, command.x, command.y)
          }
        }

        // 有没有下一关键帧了
        if (flag > 0) {
          if (currentFrame.ball.x >= nextFrame.ball.x) {
            this.steps.active++
            currentFrame = nextFrame
            nextFrame = keyframes.shift()
            if (nextFrame == null) return this.$message.success('放完了')
            delta = this.caldxdy(currentFrame, nextFrame, time)
            flag = nextFrame.ball.x - currentFrame.ball.x
            setTimeout(draw, 16)
          } else setTimeout(draw, 16)
        } else {
          if (currentFrame.ball.x <= nextFrame.ball.x) {
            this.steps.active++
            currentFrame = nextFrame
            nextFrame = keyframes.shift()
            if (nextFrame == null) return this.$message.success('放完了')
            delta = this.caldxdy(currentFrame, nextFrame, time)
            flag = nextFrame.ball.x - currentFrame.ball.x
            setTimeout(draw, 16)
          } else setTimeout(draw, 16)
        }
      }
      setTimeout(draw, 16)
    },
    // 根据关键帧计算每一帧坐标递增
    caldxdy(from, to, secondes) {
      if (from == null || to == null) return null
      const balldx = (to.ball.x - from.ball.x) / (secondes * 60)
      const balldy = (to.ball.y - from.ball.y) / (secondes * 60)
      const players = []
      const fromMap = new Map(Object.entries(from.players))
      const toMap = new Map(Object.entries(to.players))
      let index = '0'
      while (fromMap.size !== 0) {
        const cur = fromMap.get(index)
        const next = toMap.get(index)
        players.push({
          dx: (next.x - cur.x) / (secondes * 60),
          dy: (next.y - cur.y) / (secondes * 60),
          index: cur.index
        })
        fromMap.delete(index)
        toMap.delete(index)
        index = parseInt(index) + 1 + ''
      }
      return {
        ball: {
          dx: balldx,
          dy: balldy
        },
        players
      }
    },
    // 撤销关键帧
    delFrame() {
      this.steps.frames.pop()
    },
    // 添加文字指示
    addText() {
      this.addTextCtrl = false
    },
    // 提交文字并展示
    submitText() {
      this.textFrame.push(this.textCommand)
      this.textCommand = ''
      const textbox = document.getElementById('text-box')
      if (textbox.style.height == null) {
        textbox.style.height = '80px'
      }
      this.addTextCtrl = true
    },
    // 设置关键帧
    async setFrames2DB() {
      const item = {
        name: this.preAnime.inputVal,
        frames: this.steps.frames
      }
      if (item.frames.length < 2) {
        return this.$message.error('至少两个关键帧')
      }
      let pre = JSON.parse(window.localStorage.getItem('anime'))
      if (pre != null) {
        pre.push(item)
        window.localStorage.setItem('anime', JSON.stringify(pre))
      } else {
        pre = []
        pre.push(item)
        window.localStorage.setItem('anime', JSON.stringify(pre))
      }
      await this.$http.post('conf/postConf', {
        content: JSON.stringify(pre),
        type: 'anime'
      })
      this.dialogVisible = false
      this.loadFrames()
    },
    // 加载关键帧
    loadFrames() {
      this.preAnime.anime = JSON.parse(window.localStorage.getItem('anime'))
    },
    // 播放预设
    playPre() {
      this.steps.frames = this.preAnime.anime.find(
        x => x.name === this.preAnime.val
      ).frames
      this.playAnime()
    },
    // 删除预设
    async delPre() {
      const anime = this.preAnime.anime
      const idx = anime.indexOf(anime.find(x => x.name === this.preAnime.val))
      anime.splice(idx, 1)
      window.localStorage.setItem('anime', JSON.stringify(anime))
      await this.$http.post('conf/postConf', {
        content: JSON.stringify(anime),
        type: 'anime'
      })
    }
  },
  mounted() {
    this.initCanvas()
    this.initXandY()
    this.loadFrames()
  }
}
</script>

<style lang="less" scoped>
.anime-select {
  float: left;
  width: 170px;
}
.anime-play {
  float: left;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.frame-text {
  vertical-align: middle;
}
.field-1 {
  height: 320px;
  width: 440px;
  position: relative;
  .field-row {
    width: 100%;
    display: flex;
    .field-col {
      white-space: nowrap;
      overflow: visible;
      z-index: 1;
      height: 40px;
      width: 40px;
      color: #f2f6fc;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../../../assets/images/fields/球场竖向.png') no-repeat
      top;
  }
}
.circle {
  display: inline-block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.circle-1 {
  width: 30px;
  height: 30px;
  background: url(../../../../assets/images/numbers/跑.png) no-repeat center
    center;
  background-size: 30px;
}

.circle-2 {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #f2f6fc;
  border: 1px solid dodgerblue;
}
.circle-3 {
  width: 30px;
  height: 30px;
  background: url(../../../../assets/images/numbers/跑1.png) no-repeat center
    center;
  background-size: 30px;
}
.drag-zone {
  height: 100%;
  width: 100%;
}
#canvas {
  background: url('../../../../assets/images/fields/球场竖向.png') no-repeat top;
}

.tool-bar {
  p {
    margin: 5px;
  }
  .tool-box {
    min-height: 65px;
    width: 164px;
    margin: 0 5px;
    position: relative;
    .circle-pos {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .add-btn {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.command {
  text-align: center;
  margin: 5px 0;
}
</style>
