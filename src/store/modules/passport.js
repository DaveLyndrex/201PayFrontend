import axios from "axios";

// initial state
const state = () => ({
  passportData: [],
});

// mutations
const mutations = {
  setPassportData(state, data) {  
    state.passportData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  createPassportData({ dispatch }, data) {
    return axios
      .post("createEmployeePassport", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveAllPassport");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveAllPassport() {
    return axios
      .get("getEmployeePassportById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        console.log(res)
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  
  updatePassportData({ state }, props) {
    return axios
      .post("updateEmployeePassport", props.ciphertext)
      .then((result) => {
        state.passportData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  
};

// getters
const getters = {
  allPassportData: (state) => state.passportData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};