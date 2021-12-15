import axios from "axios";

// initial state
const state = () => ({
  region: [],
});

// mutations
const mutations = {
  setRegion(state, data) {
    state.region = JSON.parse(data).data;
  },

};

// actions
const actions = {
  addRegion({ dispatch, state }, data) {
    return axios
      .post("addRegion", data)
      .then(async (result) => {
        try {
          await dispatch("getRegion");
          state.region = [ ...state.region, data]
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getRegion() {
    return axios
      .get("getAllRegions")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateRegion({state}, props) {
      return axios
          .put("updateRegion", props.ciphertext)
          .then((result) => {
            state.region[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteRegion({ state }, props) {
    const index = state.region.indexOf(props.item);
    return axios
      .delete("deleteRegion/" + props.id)
      .then((result) => {
        state.region.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allRegion: (state) => state.region,
};

export default {
  state,
  mutations,
  actions,
  getters,
};