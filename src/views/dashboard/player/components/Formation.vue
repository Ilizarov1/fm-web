<template>
  <div class="sm-field">
    <div v-for="(row, i) in fieldWidth.elemStyle" :key="i" class="field-row">
      <div
        v-for="(col, j) in row"
        :key="j"
        :class="'field-col ' + fieldWidth.widthClass"
        :style="col.style"
      ></div>
    </div>
    <div class="field-row">
      <div class="field-col" style="background: #f8cf00"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Formation',
  data() {
    return {
      fieldWidth: {
        elemStyle: {
          0: {
            0: {
              title: '',
              style: 'background: transparent;'
            },
            1: {
              title: 'LS',
              style: 'background: transparent;'
            },
            2: {
              title: 'ST',
              style: 'background: transparent;'
            },
            3: {
              title: 'RS',
              style: 'background: transparent;'
            },
            4: {
              title: '',
              style: 'background: transparent;'
            }
          },
          1: {
            0: {
              title: 'LW',
              style: 'background: transparent;'
            },
            1: {
              title: 'LF',
              style: 'background: transparent;'
            },
            2: {
              title: 'CF',
              style: 'background: transparent;'
            },
            3: {
              title: 'RF',
              style: 'background: transparent;'
            },
            4: {
              title: 'RW',
              style: 'background: transparent;'
            }
          },
          2: {
            0: {
              title: '',
              style: 'background: transparent;'
            },
            1: {
              title: 'LAM',
              style: 'background: transparent;'
            },
            2: {
              title: 'CAM',
              style: 'background: transparent;'
            },
            3: {
              title: 'RAM',
              style: 'background: transparent;'
            },
            4: {
              title: '',
              style: 'background: transparent;'
            }
          },
          3: {
            0: {
              title: 'LM',
              style: 'background: transparent;'
            },
            1: {
              title: 'LCM',
              style: 'background: transparent;'
            },
            2: {
              title: 'CM',
              style: 'background: transparent;'
            },
            3: {
              title: 'RCM',
              style: 'background: transparent;'
            },
            4: {
              title: 'RM',
              style: 'background: transparent;'
            }
          },
          4: {
            0: {
              title: 'LWB',
              style: 'background: transparent;'
            },
            1: {
              title: 'LDM',
              style: 'background: transparent;'
            },
            2: {
              title: 'CDM',
              style: 'background: transparent;'
            },
            3: {
              title: 'RDM',
              style: 'background: transparent;'
            },
            4: {
              title: 'RWB',
              style: 'background: transparent;'
            }
          },
          5: {
            0: {
              title: 'LB',
              style: 'background: transparent;'
            },
            1: {
              title: 'LCB',
              style: 'background: transparent;'
            },
            2: {
              title: 'CB',
              style: 'background: transparent;'
            },
            3: {
              title: 'RCB',
              style: 'background: transparent;'
            },
            4: {
              title: 'RB',
              style: 'background: transparent;'
            }
          }
        },
        widthClass: 'field-col-width-3 '
      }
    }
  },
  methods: {
    async initFormation() {
      const { data } = await this.$http.get('fstTeam/getFstPlayers')
      const fstLst = []
      for (const player of data.players) {
        const item = {
          ...player,
          ...data.fstTeam.find(x => x.playerId === player.id)
        }
        fstLst.push(item)
      }

      for (const player of fstLst) {
        if (player.status === 1) {
          for (const [rowkey, row] of Object.entries(
            this.fieldWidth.elemStyle
          )) {
            for (const [colkey, col] of Object.entries(row)) {
              if (player.position === col.title) {
                col.style = ''
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.initFormation()
  }
}
</script>

<style lang="less" scoped>
.sm-field {
  height: 250px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../../../assets/images/fields/球场竖向.png') no-repeat
      center center;
    background-size: 60%;
  }
}
.field-row {
  text-align: center;
  position: relative;
  width: 192px;
  top: 16px;
  left: 64px;
  margin: 10px 0;
  .field-col {
    height: 20px;
    width: 20px;
    margin: auto;
    border-radius: 20px;
    display: inline-block;
    background: #ffffff;
  }
  .field-col-width-3 {
    margin: 0 5px;
  }
}
</style>
