import axios from "axios";

// initial state
const state = () => ({
  businessUnit: [],
});

// mutations
const mutations = {
  setBusinessUnit(state, data) {
    state.businessUnit = JSON.parse(data).data;
  },

};

// actions
const actions = {

  createBusinessUnit({ dispatch }, data) {
    return axios
      .post("createBusinessUnit", data)
      .then(async (result) => {
        try {
          await dispatch("getBusinessUnit");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getBusinessUnit() {
    return axios
      .get("getAllBusinessUnits")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateBusinessUnit({state}, props) {
      return axios
          .post("updateBusinessUnit", props.ciphertext)
          .then((result) => {
            state.businessUnit[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteBusinessUnit({ state }, props) {
    const index = state.businessUnit.indexOf(props.item);
    return axios
      .delete("deleteBusinessUnit/" + props.id)
      .then((result) => {
        state.businessUnit.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allBusinessUnit: (state) => state.businessUnit,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
