import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    employees: [],
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
    }
  },

  modules: {}
})
