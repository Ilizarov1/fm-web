import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    employees: [],
    coaches: [],
    trainingLst: [],
    competition: [],
    status: 200
  },
  mutations: {
    // 更新players
    updatePlayers(state, newPlayers) {
      state.players = newPlayers
    },
    // 更新status
    updateStatus(state, newStatus) {
      state.status = newStatus
    },
    // 更新员工
    updateEmployees(state, newEmployees) {
      state.employees = newEmployees
    },
    // 更新教练
    updateCoaches(state, newCoaches) {
      state.coaches = newCoaches
    }, // 更新训练表
    updateTrainLst(state, newLst) {
      for (const x of newLst) {
        x.item.sort((a, b) => {
          if (a.trainTime === '上午' && b.trainTime === '下午') {
            return -1
          } else if (a.trainTime === '下午' && b.trainTime === '上午') {
            return 1
          } else {
            return 0
          }
        })
      }
      state.trainingLst = newLst
    },
    // 更新赛程
    updateCompetition(state, newCom) {
      state.competition = newCom
    }
  },
  actions: {
    async getPlayers({ commit }) {
      commit('updateStatus', 200)
      const { status, data } = await axios.get('player/getAll')
      if (status !== 200) {
        commit('updateStatus', status)
      } else {
        commit('updatePlayers', data)
      }
    },
    async getEmployees({ commit }) {
      commit('updateStatus', 200)
      const { status, data } = await axios.get('employee/getAll')
      if (status !== 200) {
        commit('updateStatus', status)
      } else {
        commit('updateEmployees', data)
      }
    },
    async getCoaches({ commit }) {
      commit('updateStatus', 200)
      const { status, data } = await axios.get('employee/getCoaches')
      if (status !== 200) {
        commit('updateStatus', status)
      } else {
        commit('updateCoaches', data)
      }
    },
    async getTrainLst({ commit }) {
      commit('updateStatus', 200)
      const { status, data } = await axios.get('schedule/getTrainLst')
      if (status !== 200) {
        commit('updateStatus', status)
      } else {
        commit('updateTrainLst', data)
      }
    },
    async getCompetition({ commit }) {
      commit('updateStatus', 200)
      const { status, data } = await axios.get('schedule/getCompetition')
      if (status !== 200) {
        commit('updateStatus', status)
      } else {
        commit('updateCompetition', data)
      }
    }
  },

  modules: {}
})
