import axios from "axios";

// initial state
const state = () => ({
  addressType: [],
  addresses: [],
  countries: []
});

// mutations
const mutations = {
  setAddressTypes(state, data) {
    state.addressType = JSON.parse(data).data;
  },

  setAddresses(state, responseData) {
    const dataToAdd = JSON.parse(responseData);
    state.addresses = dataToAdd.data;
  },

  setCountries(state, responseData) {
    const dataToAdd = JSON.parse(responseData);
    state.countries = dataToAdd.data;
  },
};

// actions
const actions = {
  getAddressTypes() {
    return axios
      .get("getAllDefaultAddressType")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  getCountries() {
    return axios
      .get("getAllCountries")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  //   End of master file integrations

  createAddressData({ dispatch }, data) {
    return axios
      .post("createEmployeeAddress", data)
      .then(async (result) => {
        try {
          await dispatch("getAddressesData");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getAddressesData() {
    return axios
      .get("getAllEmployeeAddressById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateAddressData({state}, props) {
      return axios
          .post("updateEmployeeAddress", props.ciphertext)
          .then((result) => {
            state.addresses[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },
    

  // deleteAddressData({ state }, props) {
  //   const index = state.addresses.indexOf(props.item);
  //   return axios
  //     .delete("employeAddress/delete/" + props.id)
  //     .then((result) => {
  //       state.addresses.splice(index, 1);
  //       return result;
  //     })
  //     .catch((err) => {
  //       return err.response;
  //     });
  // },


};

// getters
const getters = {
  allAddressTypes: (state) => state.addressType,
  allAddresses: (state) => state.addresses,
  allCountries: (state) =>state.countries
};

export default {
  state,
  mutations,
  actions,
  getters,
};
