import axios from "axios";

// initial state
const state = () => ({
    legislativeData: [],
    sexType: [],
});

// mutations
const mutations = {
    setLegislativeData(state, data) {
      state.legislativeData = JSON.parse(data).data;
    },
    setSexType(state, data) {
      console.log(state, data)
      state.sexType = JSON.parse(data).data;
    },
  };

// actions
const actions = {

  retrieveSexType() {
    return axios
      .get("getAllSex")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    retrieveLegislative() {
      return axios
        .get("getLegislativeById/"  + JSON.parse(sessionStorage.getItem("user_session")).empId)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },

    createLegislativeData({ dispatch }, data) {
        return axios
          .post("createLegislative", data)
          .then(async (result) => {
            try {
              await dispatch("retrieveLegislative");
            } catch (error) {
              return error;
            }
            return result;
          })
          .catch((err) => {
            return err.response;
        });
    },

    updateLegislativeData({ state }, props) {
        return axios
          .post("updateLegislative", props.ciphertext)
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
    allLegislative: (state) => state.legislativeData,
    allSexType: (state) => state.sexType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};