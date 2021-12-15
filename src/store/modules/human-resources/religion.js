import axios from "axios";

// initial state
const state = () => ({
  religion: [],
});

// mutations
const mutations = {
  setReligion(state, data) {
    state.religion = JSON.parse(data).data;
  },

};

// actions
const actions = {
  addReligion({ dispatch, state }, data) {
    return axios
      .post("addReligion", data)
      .then(async (result) => {
        try {
          await dispatch("getReligion");
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

  getReligion() {
    return axios
      .get("getAllReligion")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateReligion({state}, props) {
      return axios
          .put("updateReligion", props.ciphertext)
          .then((result) => {
            state.religion[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteReligion({ state }, props) {
    const index = state.religion.indexOf(props.item);
    return axios
      .delete("deleteReligion/" + props.id)
      .then((result) => {
        state.religion.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allReligion: (state) => state.religion,
};

export default {
  state,
  mutations,
  actions,
  getters,
};