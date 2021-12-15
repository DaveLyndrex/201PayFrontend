import axios from "axios";

// initial state
const state = () => ({
  leaveData: [],
  COADetails:[],
});

// mutations
const mutations = {
  setLeaveData(state, data) {
    state.leaveData = JSON.parse(data).data;
  },
  setShiftDetails(state, data) {
    state.COADetails = JSON.parse(data).data;
  }

};

// actions
const actions = {
  // master file integration
  retrieveAllLeave() {
    return axios
      .get("getAllLeave")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  //   End of master file integrations

  getShiftDetails({ dispatch }) {
    return axios
      .get("getShiftDetails/" + JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo)
      .then((result) => {
        dispatch
    
        return result
      }
      )
  },
}

// getters
const getters = {
  allLeaveData: (state) => state.leaveData,

};

export default {
  state,
  mutations,
  actions,
  getters,
};
