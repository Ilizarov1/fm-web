<template>
  <div>
    <el-col :span="4" style="position: relative">
      <el-row>
        <el-button v-if="paintVis" @click="paintVis = false"
          >切换到canvas</el-button
        >
        <el-button v-else @click="paintVis = true">切换到画图</el-button>
      </el-row>
      <div class="tool-bar">
        <div class="tool-box">
          <p>球员</p>
          <div
            class="circle circle-1"
            draggable="true"
            data-type="player"
            @dragstart="handlerDrag"
          ></div>
        </div>
        <div class="tool-box">
          <p>球</p>
          <div
            class="circle circle-2"
            draggable="true"
            data-type="ball"
            @dragstart="handlerDrag"
          ></div>
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
      <el-col :span="12">
        <p>关键帧</p>
        <el-steps direction="vertical" :active="1">
          <el-step title="0" description="test"></el-step>
          <el-step
            v-for="(frame, index) in steps.frames"
            :title="index"
            :key="index"
            :description="frame.descrption"
          ></el-step>
        </el-steps>
      </el-col>
      <el-col :span="12">
        <el-button @click="pushFrame">添加关键帧</el-button>
      </el-col>
    </el-col>
  </div>
</template>

<script>
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
      keyframes: new Map()
    }
  },
  methods: {
    // 初始化画布
    initCanvas() {
      this.ctx = document.getElementById('canvas').getContext('2d')
      this.bg.src = require('@/assets/images/fields/球场竖向.png')
      window.requestAnimationFrame(this.drawAnime)
      // this.drawBG()
      // this.drawCircleMove()
    },
    // 画背景
    drawBG() {
      const ctx = document.getElementById('canvas').getContext('2d')
      const img = new Image()
      img.onload = function() {
        ctx.drawImage(img, 0, 0)
      }
      img.src = require('@/assets/images/fields/球场竖向.png')
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
    // 展示坐标
    showXY(col) {
      console.log(col.x, col.y)
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
          //球的话
        }
      }
    },
    // 添加关键帧
    pushFrame() {},
    // 画一个圆并且移动
    drawCircleMove() {
      this.ctx.beginPath()
      this.ctx.arc(20, 20, 20, 0, 2 * Math.PI)
      this.ctx.fill()
    },
    drawAnime() {
      // 画在画布上面
      const ctx = this.ctx
      ctx.globalCompositeOperation = 'destination-over'
      ctx.clearRect(0, 0, 440, 320)
      const curTime = new Date().getTime()
      ctx.beginPath()
      // 20->100
      this.frame.x = this.frame.x + (curTime - this.time) / 10
      this.frame.y = this.frame.y + (curTime - this.time) / 10
      ctx.arc(this.frame.x, this.frame.y, 20, 0, 2 * Math.PI)
      this.time = curTime
      ctx.fill()
      window.requestAnimationFrame(this.drawAnime)
    }
  },
  mounted() {
    this.initCanvas()
    this.initXandY()
  }
}
</script>

<style lang="less" scoped>
.field-1 {
  height: 320px;
  width: 440px;
  position: relative;
  .field-row {
    width: 100%;
    display: flex;
    .field-col {
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
  border-radius: 30px;
  background: #000000;
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
  display: flex;
  justify-content: space-around;
  p {
    margin: 5px;
  }
  .tool-box {
    margin: 0 5px;
  }
}
</style>
