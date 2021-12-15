import axios from "axios";

// initial state
const state = () => ({
  prefix: [],
});

// mutations
const mutations = {
  setPrefix(state, data) {
    state.prefix = JSON.parse(data).data;
  },
};

// actions
const actions = {
  addPrefix({ dispatch, state }, data) {
    return axios
      .post("addPrefix", data)
      .then(async (result) => {
        try {
          await dispatch("getAllPrefix");
          state.prefix = [ ...state.prefix, data]
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getPrefix() {
    return axios
      .get("getAllPrefixes")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updatePrefix({state}, props) {
      return axios
          .put("updatePrefix", props.ciphertext)
          .then((result) => {
            state.prefix[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deletePrefix({ state }, props) {
    const index = state.prefix.indexOf(props.item);
    return axios
      .delete("deletePrefix/" + props.id)
      .then((result) => {
        state.prefix.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allPrefix: (state) => state.prefix,
};

export default {
  state,
  mutations,
  actions,
  getters,
};