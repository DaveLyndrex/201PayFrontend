import axios from "axios";

// initial state
const state = () => ({
  bloodtypes: [],
});

// mutations
const mutations = {
  setBloodType(state, data) {
    state.bloodtypes = JSON.parse(data).data;
  },

};

// actions
const actions = {
  addBloodType({ dispatch, state }, data) {
    return axios
      .post("addBloodType", data)
      .then(async (result) => {
        try {
          await dispatch("getBloodTypes");
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

  getBloodTypes() {
    return axios
      .get("getBloodList")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateBloodType({state}, props) {
      return axios
          .post("updateBloodType", props.ciphertext)
          .then((result) => {
            state.bloodtypes[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteBLoodType({ state }, props) {
    const index = state.bloodtypes.indexOf(props.item);
    console.log(index)
    return axios
      .delete("deleteBLoodType/" + props.id)
      .then((result) => {
        state.bloodtypes.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allBloodTypes: (state) => state.bloodtypes,
};

export default {
  state,
  mutations,
  actions,
  getters,
};