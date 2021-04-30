<template>
  <div>
    <el-col :span="4" style="position: relative">
      <div class="tool-bar">
        <div class="tool-box">
          <p>球员</p>
          <div
            class="circle circle-1 circle-pos"
            draggable="true"
            data-type="player"
            @dragstart="handlerDrag"
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
          <p>指示</p>
          <div
            v-for="(text, index) in textFrame"
            :key="index"
            draggable="true"
            data-type="text"
            @dragstart="handlerDrag"
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
    <el-col :span="8">
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
          <el-button
            v-show="!paintVis"
            size="mini"
            type="info"
            @click="playAnime"
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
      textHeight: ''
    }
  },
  methods: {
    playAnime() {
      if (this.steps.frames.length < 2) {
        return this.$message.error('至少要两个关键帧')
      }
      this.paintVis = false
      const keyframes = _.cloneDeep(this.steps.frames)
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
      if (this.dragged.elem.getAttribute('data-type') === 'player') {
        const dataIsCopy = this.dragged.elem.getAttribute('data-is-copy')
        const elemIndex = this.dragged.elem.getAttribute('data-index')
        if (dataIsCopy === null) {
          this.dragged.elem.setAttribute('data-is-copy', '0')
        }
        if (elemIndex === null) {
          // 添加元素索引
          this.dragged.elem.setAttribute('data-index', this.index++)
        }
        event.dataTransfer.setData('text', null)
      }
    },
    // 处理放置
    handlerDrop(event, col) {
      let copyFlag = ''
      let dataIndex = -1
      if (this.dragged.elem !== null) {
        copyFlag = this.dragged.elem.getAttribute('data-is-copy')
        dataIndex = this.dragged.elem.getAttribute('data-index')
      } else return
      if (copyFlag === '0') {
        // 在工具栏里的
        const pNode = this.dragged.elem.parentNode
        pNode.removeChild(this.dragged.elem)
        const dupNode = this.dragged.elem.cloneNode(true)
        dupNode.addEventListener('dragstart', this.handlerDrag)
        dupNode.setAttribute('data-index', this.index++)
        pNode.appendChild(dupNode)
        this.dragged.elem.setAttribute('data-is-copy', '1')
        event.target.appendChild(this.dragged.elem)
        this.dragged.elem = null
        if (!this.keyframes.has('player')) {
          this.keyframes.set('player', [])
        }
        // 处理从工具栏-球场，球员，帧
        const frames = this.keyframes.get('player')
        frames.push({
          x: col.x,
          y: col.y,
          index: dataIndex
        })
        this.keyframes.set('player', frames)
      } else {
        // 在画布上的放置
        const pNode = this.dragged.elem.parentNode
        pNode.removeChild(this.dragged.elem)
        event.target.appendChild(this.dragged.elem)
        const elemType = this.dragged.elem.getAttribute('data-type')
        let playerIdx = -1
        if (elemType !== 'ball') {
          playerIdx = this.dragged.elem.getAttribute('data-index')
        }
        this.dragged.elem = null
        if (elemType === 'player') {
          // 球员的话，更新坐标
          const playerframes = this.keyframes.get('player')
          for (const frame of playerframes) {
            if (frame.index === playerIdx) {
              frame.x = col.x
              frame.y = col.y
            }
          }
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
      const playerframes = this.keyframes.get('player')
      const ballframe = this.keyframes.get('ball')
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
      this.steps.frames.push({
        ball: ballframe,
        players: playerframes,
        description: balldes + playerdes
      })
    },
    drawAnime(keyframes, time) {
      // 画在画布上面
      let currentFrame = keyframes.shift()
      let nextFrame = keyframes.shift()
      let delta = this.caldxdy(currentFrame, nextFrame, time)
      const ctx = document.getElementById('canvas').getContext('2d')
      ctx.clearRect(0, 0, 440, 320)
      const playerimg = new Image()
      playerimg.src = require('@/assets/images/numbers/跑.png')
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
          ctx.drawImage(
            playerimg,
            player.x + dx - 15,
            player.y + dy - 15,
            30,
            30
          )
          player.x = player.x + dx
          player.y = player.y + dy
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
      const fromItor = Object.entries(from.players)
      const toItor = Object.entries(to.players)
      while (fromItor.length !== 0 && toItor.length !== 0) {
        const [cindex, cur] = fromItor.shift()
        const [nindex, next] = toItor.shift()
        players.push({
          dx: (next.x - cur.x) / (secondes * 60),
          dy: (next.y - cur.y) / (secondes * 60),
          index: cur.index
        })
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
    }
  },
  mounted() {
    this.initCanvas()
    this.initXandY()
  }
}
</script>

<style lang="less" scoped>
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
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/fields/球场竖向.png') no-repeat top;
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
  background: url(../../assets/images/numbers/跑.png) no-repeat center center;
  background-size: 30px;
}
.circle-2 {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #f2f6fc;
  border: 1px solid dodgerblue;
}
.drag-zone {
  height: 100%;
  width: 100%;
}
#canvas {
  background: url('../../assets/images/fields/球场竖向.png') no-repeat top;
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
</style>
