import axios from "axios";

// initial state
const state = () => ({
    citizenshipData: [],
    citizenshipStatus: [],
});

// mutations
const mutations = {
    setCitizenship(state, data) {
      state.citizenshipData = JSON.parse(data).data;
    },
    setCitizenshipStatus(state, data){
      state.citizenshipStatus = JSON.parse(data).data;
    }
};

// actions
const actions = {
    retrieveCitizenshipStatus() {
      return axios
        .get("getAllCitizenshipStatus")
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },


    retrieveCitizenshipData() {
      state.otherData = [];
      return axios
        .get("getCitizenshipByID/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    createCitizenshipData({ dispatch }, data) {
        return axios
          .post("createCitizenshipData", data)
          .then(async (result) => {
            try {
              await dispatch("retrieveCitizenshipData");
            } catch (error) {
              return error;
            }
            return result;
            })
          .catch((err) => {
            return err.response;
        });
    },

    updateCitizenshipData({ state }, props) {
        return axios
          .post("updateCitizenshipData", props.ciphertext)
          .then((result) => {
            state[props.index] = props.editedData;
            console.log(props.index);
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

};

// getters
const getters = {
    allCitizenshipData: (state) => state.citizenshipData,
    allCitizenshipStatus: (state) => state.citizenshipStatus,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };