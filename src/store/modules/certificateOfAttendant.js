import axios from "axios";

// initial state
const state = () => ({
    certificateData: []
  });

// mutations
  const mutations = {
    setCertificateData(state, data) {
      state.certificateData = JSON.parse(data).data;
    },
  
  };

  // actions
const actions = {
    // master file integration
    retrieveAllCertificateOfAttendant() {
      return axios
        .get("getAllCertificateOfAttendant")
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
    allCertificateData: (state) => state.certificateData,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  