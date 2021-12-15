import axios from "axios";

// initial state
const state = () => ({
    shiftData: []
  });

// mutations
  const mutations = {
    setShiftData(state, data) {
      state.shiftData = JSON.parse(data).data;
    },
  
  };

  // actions
const actions = {
    // master file integration
    retrieveAllShift() {
      return axios
        .get("getAllKioskShift")
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
    allShiftData: (state) => state.shiftData,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  