import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
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
    }
  },

  modules: {}
})
