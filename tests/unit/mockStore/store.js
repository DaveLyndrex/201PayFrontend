import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const state = {
  data: {}
}
export const mutations = {
  SET_DATA (state, data) {
    state.data = data
  }
}
export const actions = {
  retrieve ({ commit }) {
    return axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      commit('SET_DATA', response.data.title)
    })
    .catch(err => console.log(err))
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})