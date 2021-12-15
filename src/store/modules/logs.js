import axios from "axios";

const state = () => ({
  accessLogs: [],
  activityLogs: [],
  changeLogs: [],
});

const mutations = {
  setAccessLogs(state, data) {
    state.accessLogs = JSON.parse(data).data;
  },

  setActivityLogs(state, data) {
    state.activityLogs = JSON.parse(data).data;
  },

  setChangeLogs(state, data) {
    state.changeLogs = JSON.parse(data).data;
  },
};

const actions = {

  retrieveAllAccessLogs() {
    return axios
      .get("getLogsByType/1")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveAllActivityLogs() {
    return axios
      .get("getLogsByType/2")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveAllChangeLogs() {
    return axios
      .get("getLogsByType/3")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

const getters = {
  allAccessLogs: (state) => state.accessLogs,
  allActivityLogs: (state) => state.activityLogs,
  allChangesLogs: (state) => state.changeLogs,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
