import axios from "axios";

// initial state
const state = () => ({
  company: [],
});

// mutations
const mutations = {
  setCompany(state, data) {
    state.company = JSON.parse(data).data;
  },

};

// actions
const actions = {

  createCompany({ dispatch, state }, data) {
    return axios
      .post("createCompany", data)
      .then(async (result) => {
        try {
          await dispatch("getCompany");
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

  getCompany() {
    return axios
      .get("getAllCompanySetup")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateCompany({state}, props) {
      return axios
          .post("updateCompany", props.ciphertext)
          .then((result) => {
            state.company[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteCompany({ state }, props) {
    const index = state.company.indexOf(props.item);
    return axios
      .delete("deleteCompany/" + props.id)
      .then((result) => {
        state.company.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allCompanySetup: (state) => state.company,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
