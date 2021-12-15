import axios from "axios";

// initial state
const state = () => ({
  banks: [],
});

// mutations
const mutations = {
  setBanks(state, data) {
    state.banks = JSON.parse(data).data;
  },

};

// actions
const actions = {

  createBanks({ dispatch }, data) {
    return axios
      .post("createBanks", data)
      .then(async (result) => {
        try {
          await dispatch("getBanks");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getBanks() {
    return axios
      .get("getAllBanks")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  getSample(){
     return axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response =>response.data).catch(err =>err);
  },

    updateBanks({state}, props) {
      return axios
          .post("updateBanks", props.ciphertext)
          .then((result) => {
            state.banks[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteBanks({ state }, props) {
    const index = state.banks.indexOf(props.item);
    return axios
      .delete("deleteBanks/" + props.id)
      .then((result) => {
        state.banks.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};


// getters
const getters = {
  allBanks: (state) => state.banks,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
