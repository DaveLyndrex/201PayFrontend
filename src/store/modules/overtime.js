import axios from "axios";

// initial state
const state = () => ({
    overtimeData: []
  });

// mutations
  const mutations = {
    setOvertimeData(state, data) {
      state.overtimeData = JSON.parse(data).data;
    },
  
  };

  // actions
const actions = {
    // master file integration
    retrieveAllOvertime() {
      return axios
        .get("getAllOvertime")
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
    allOvertimeData: (state) => state.overtimeData,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  