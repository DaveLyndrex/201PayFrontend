import axios from "axios";

// initial state
const state = () => ({
  designation: [],
});

// mutations
const mutations = {
  setDesignation(state, data) {
    state.designation = JSON.parse(data).data;
  },

};

// actions
const actions = {

  createDesignation({ dispatch }, data) {
    return axios
      .post("createDesignation", data)
      .then(async (result) => {
        try {
          await dispatch("getDesignation");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getDesignation() {
    return axios
      .get("getAllDesignations")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateDesignation({state}, props) {
      return axios
          .post("updateDesignation", props.ciphertext)
          .then((result) => {
            state.designation[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteDesignation({ state }, props) {
    const index = state.designation.indexOf(props.item);
    return axios
      .delete("deleteDesignation/" + props.id)
      .then((result) => {
        state.designation.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allDesignation: (state) => state.designation,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
