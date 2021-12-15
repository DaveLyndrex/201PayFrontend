import axios from "axios";

// initial state
const state = () => ({
  nidData: [],
});

// mutations
const mutations = {
  setNIDData(state, data) {
    state.nidData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  createNIDData({ dispatch }, data) {
    return axios
      .post("createEmployeeNID", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveAllNID");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveAllNID() {
    return axios
      .get("getEmployeeNIDById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        console.log(res)
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateNIDData({ state }, props) {
    return axios
      .post("updateEmployeeNID", props.ciphertext)
      .then((result) => {
        state.nidData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

};

// getters
const getters = {
  allNIDData: (state) => state.nidData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};