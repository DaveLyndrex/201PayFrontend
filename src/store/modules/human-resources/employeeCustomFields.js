import axios from "axios";

// initial state
const state = () => ({
  customFields: [],
});

// mutations
const mutations = {
  setCustomFields(state, data) {
    state.customFields = JSON.parse(data).data;
  },

};

// actions
const actions = {
  addCustomFields({ dispatch, state }, data) {
    return axios
      .post("addCustomField", data)
      .then(async (result) => {
        try {
          await dispatch("getCustomFields");
          state.customFields = [ ...state.customFields, data]
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getCustomFields() {
    return axios
      .get("getAllCustomFields")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateCustomFields({state}, props) {
      return axios
          .put("updateCustomField", props.ciphertext)
          .then((result) => {
            state.customFields[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteCustomFields({ state }, props) {
    const index = state.customFields.indexOf(props.item);
    return axios
      .delete("deleteCustomField/" + props.id)
      .then((result) => {
        state.customFields.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allCustomFieldSetup: (state) => state.customFields,
};

export default {
  state,
  mutations,
  actions,
  getters,
};