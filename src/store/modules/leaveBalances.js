import axios from "axios";

// initial state
const state = () => ({
    leaveBalancesData: [],
    leaveCreditYearData:[]
  });

// mutations
  const mutations = {
    setLeaveBalancesData(state, data) {
      state.leaveBalancesData = JSON.parse(data).data;
    },
    setLeaveCreditYearData(state, data) {
      state.leaveCreditYearData = JSON.parse(data).data;
    },
  
  };

  // actions
const actions = {
    // master file integration
    retrieveAllLeaveBalances() {
      return axios
        .get("getAllLeaveBalances")
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => {
          return err.response;
        });
    },

    retrieveAllLeaveCreditYear() {
      return axios
        .get("getLeaveCreditYear")
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err.response;
        });
    },
    //   End of master file integrations

    }

// getters
const getters = {
    allLeaveBalancesData: (state) => state.leaveBalancesData,
    allLeaveCreditYearData: (state) => state.leaveCreditYearData,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  