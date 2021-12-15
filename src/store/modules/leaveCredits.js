import axios from "axios";

// initial state
const state = () => ({
  leaveCreditsData: [],
  leaveTypes: [],
  leaveCreditYears: []
});

// mutations
const mutations = {
  setLeaveCreditsData(state, data) {
  state.leaveCreditsData = JSON.parse(data).data;
  },

  setLeaveTypes(state, data) {
    state.leaveTypes = JSON.parse(data).data;
  },

  setLeaveCreditYears(state, data) {
    state.leaveCreditYears = JSON.parse(data).data;
  },
};

// actions
const actions = {

    // master file related datas
    retrieveAllLeaveTypes() {
        return axios
      .get("getAllLeaveTypes")
      .then((result) => {
         
        return result;
      })
      .catch((err) => {
        return err.response;
      });
      
  },
  retrieveAllLeaveCreditYears() {
    return axios
  .get("getAllLeaveCreditYears")
  .then((result) => { 
    return result;
  })
  .catch((err) => {
    return err.response;
  });

},
  createLeaveCreditsData({ dispatch }, data) {
    console.log(data)
    return axios
      .post("createEmployeeLeaveCredits", data)
      .then(async (result) => {
 
        try {
          await dispatch("retrieveAllLeaveCredits");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveAllLeaveCredits() {
    return axios
      .get("getEmployeeLeaveCreditsById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
 
  updateLeaveCreditsData({ state }, props) {
    return axios
      .post("updateEmployeeLeaveCredits", props.ciphertext)
      .then((result) => {
        state.leaveCreditsData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  
};

// getters
const getters = {
  allLeaveCreditsData: (state) => state.leaveCreditsData,
  allLeaveTypes: (state) => state.leaveTypes,
  allLeaveCreditYears: (state) => state.leaveCreditYears,
};

export default {
  state,
  mutations,
  actions,
  getters,
};