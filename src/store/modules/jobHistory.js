import axios from "axios";

// initial state
const state = () => ({
  jobHistoryData: [],
});

// mutations
const mutations = {
  setJobHistoryData(state, data) {
    state.jobHistoryData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  createJobHistoryData({ dispatch }, data) {
    return axios
      .post("createEmployeeJobHistory", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveAllJobHistory");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },


  retrieveAllJobHistory() {
    state.jobHistoryData = [];
    return axios
      .get("getEmployeeJobHistoryById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  updateJobHistoryData({ state }, props) {
    return axios
      .post("updateEmployeeJobHistory", props.ciphertext)
      .then((result) => {
        state.jobHistoryData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

 
};

// getters
const getters = {
  allJobHistoryData: (state) => state.jobHistoryData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};