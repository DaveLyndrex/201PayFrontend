import axios from "axios";

// initial state
const state = () => ({
  genders: [],
});

// mutations
const mutations = {
  setGender(state, data) {
    state.genders = JSON.parse(data).data;
  },

};

// actions
const actions = {
  addGender({ dispatch, state }, data) {
    return axios
      .post("insertSex", data)
      .then(async (result) => {
        try {
          await dispatch("getAllSex");
          state.genders = [ ...state.genders, data]
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getGenders() {
    return axios
      .get("getAllSex")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },



    updateGender({state}, props) {
      return axios
          .put("updateSex", props.ciphertext)
          .then((result) => {
            state.genders[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
        });
    },

  deleteGender({ state }, props) {
    const index = state.genders.indexOf(props.item);
    return axios
      .delete("deleteSex/" + props.id)
      .then((result) => {
        state.genders.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allGenders: (state) => state.genders,
};

export default {
  state,
  mutations,
  actions,
  getters,
};