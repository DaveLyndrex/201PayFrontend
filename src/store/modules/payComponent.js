import axios from "axios";

// initial state
const state = () => ({
  payComponentData: [],
  payCodeMasterData: [],
  periodIDMasterData: [],
  currencyMasterData: [],
  payRateMasterData: [],
  payComponentTypeMasterData: []
});

// mutations
const mutations = {
  setPayComponentData(state, data) {
    state.payComponentData = JSON.parse(data).data;
  },

  setPayCodeMasterData(state, data) {
    state.payCodeMasterData = JSON.parse(data).data;
  },

  setPeriodIDMasterData(state, data) {
    state.periodIDMasterData = JSON.parse(data).data;
  },
  setCurrencyMasterData(state, data) {
    state.currencyMasterData = JSON.parse(data).data;
  },
  setPayRateMasterData(state, data) {
    state.payRateMasterData = JSON.parse(data).data;
  },
  setPayComponentTypeMasterData(state, data) {
    state.payComponentTypeMasterData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  // master file integration
  retrievePayCodeMasterData() {
    return axios
      .get("getAllPayCodes")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrievePeriodIDMasterData() {
    return axios
      .get("getAllPayrollPeriod")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveCurrencyMasterData() {
    return axios
      .get("getAllDefaultCurrency")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrievePayRateMasterData() {
    return axios
      .get("getAllPayRates")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrievePayComponentTypeMasterData() {
    return axios
      .get("getAllDefaultPayComponentType")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  //   End of master file integrations

  createPayComponent({ dispatch }, data) {
    return axios
      .post("createPayComponent", data)
      .then(async (result) => {
        console.log(result)
        try {
          await dispatch("retrievePayComponent");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrievePayComponent() {
    return axios
      .get("getAllPayComponentById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  updatePayComponent({ state }, props) {
    return axios
      .post("updatePayComponent", props.ciphertext)
      .then((result) => {
        state.payComponentData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  removePayComponent({ state }, props) {
    const index = state.payComponentData.indexOf(props.item);
    return axios
      .delete("deletePayComponent/" + props.id)
      .then((result) => {
        state.payComponentData.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allPayComponentData: (state) => state.payComponentData,
  allPayCodeMasterData: (state) => state.payCodeMasterData,
  allPeriodIDMasterData: (state) => state.periodIDMasterData,
  allCurrencyMasterData: (state) => state.currencyMasterData,
  allPayRateMasterData: (state) => state.payRateMasterData,
  allPayComponentTypeMasterData: (state) => state.payComponentTypeMasterData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
