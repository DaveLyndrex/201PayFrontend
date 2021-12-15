import axios from "axios";

// initial state
const state = () => ({
  periodData: [],
});

// mutations
const mutations = {
  setPeriodData(state, data) {
    state.periodData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  retrieveAllPeriod() {
    return axios
      .get("getPeriod")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allPeriodData: (state) => state.periodData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
