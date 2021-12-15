import axios from "axios";

// initial state
const state = () => ({
  ethnicity: [],
});

// mutations
const mutations = {
  setEthnicity(state, data) {
    state.ethnicity = JSON.parse(data).data;
  },

};

// actions
const actions = {
  addEthnicity({ dispatch, state }, data) {
    return axios
      .post("addEthnicity", data)
      .then(async (result) => {
        try {
          await dispatch("getEthnicity");
          state.ethnicity = [ ...state.ethnicity, data]
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getEthnicity() {
    return axios
      .get("getAllEthnicity")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateEthnicity({state}, props) {
    return axios
        .put("updateEthnicity", props.ciphertext)
        .then((result) => {
          state.ethnicity[props.index] = props.editedData;
          return result;
        })
        .catch((err) => {
          return err.response;
        });
  },

  deleteEthnicity({ state }, props) {
    const index = state.ethnicity.indexOf(props.item);
    return axios
      .delete("deleteEthnicity/" + props.id)
      .then((result) => {
        state.ethnicity.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allEthnicitySetup: (state) => state.ethnicity,
};

export default {
  state,
  mutations,
  actions,
  getters,
};