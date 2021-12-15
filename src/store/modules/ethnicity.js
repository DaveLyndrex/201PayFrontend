import axios from "axios";

// initial state
const state = () => ({
  EthnicityData: [],
  Ethnicity: []
});

// mutations
const mutations = {
  setEthnicityData(state, data) {
  state.EthnicityData = JSON.parse(data).data;
  },

  setEthnicity(state, data) {
    state.Ethnicity = JSON.parse(data).data;
  },
};

// actions
const actions = {

    // master file related datas
    retrieveAllEthnicity() {
        return axios
      .get("getAllEthnicity")
      .then((result) => {
         
        return result;
      })
      .catch((err) => {
        return err.response;
      });
      
  },

  createEthnicityData({ dispatch }, data) {
    return axios
      .post("createEmployeeEthnicity", data)
      .then(async (result) => {
        console.log(result)
        try {
          await dispatch("retrieveAllEmployeeEthnicity");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveAllEmployeeEthnicity() {
    return axios
      .get("getEmployeeEthnicityById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
         
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateEthnicityData({ state }, props) {
    return axios
      .post("updateEmployeeEthnicity", props.ciphertext)
      .then((result) => {
        state.EthnicityData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

};

// getters
const getters = {
  allEthnicityData: (state) => state.EthnicityData,
  allEthnicity: (state) => state.Ethnicity,
};

export default {
  state,
  mutations,
  actions,
  getters,
};