import axios from "axios";

// initial state
const state = () => ({
  educationData: [],
});

// mutations
const mutations = {
  setEducationData(state, data) {
    state.educationData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  createEducationData({ dispatch }, data) {
    return axios
      .post("createEmployeeEducation", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveAllEducations");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },


  retrieveAllEducations() {
    return axios
      .get("getEmployeeEducationById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateEducationData({ state }, props) {
    return axios
      .post("updateEmployeeEducation", props.ciphertext)
      .then((result) => {
        state.educationData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  
};

// getters
const getters = {
  allEducationData: (state) => state.educationData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
