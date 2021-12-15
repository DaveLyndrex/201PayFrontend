import axios from "axios";

// initial state
const state = () => ({
  payrollGroups: [],
  timeKeeping: [],
  taxStatus: [],
  payFrequency: [],
  shiftSet: [],
  dmAccount: [],
  payrollData: [],
});

// mutations
const mutations = {
  setPayrollGroups(state, data) {
    state.payrollGroups = JSON.parse(data).data;
  },

  setTimeKeeping(state, data) {
    state.timeKeeping = JSON.parse(data).data;
  },

  setTaxStatus(state, data) {
    state.taxStatus = JSON.parse(data).data;
  },

  setPayFrequency(state, data) {
    state.payFrequency = JSON.parse(data).data;
  },

  setShiftSet(state, data) {
    state.shiftSet = JSON.parse(data).data;
  },

  setDMAccount(state, data) {
    state.dmAccount = JSON.parse(data).data;
  },
  //   End of masterfile mutations

  setPayrollData(state, responseData) {
    const dataToAdd = JSON.parse(responseData);
    state.payrollData = dataToAdd.data;
  },
};

// actions
const actions = {
  getPayrollGroups() {
    return axios
      .get("getAllPayrollGroup")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  getTimeKeeping() {
    return axios
      .get("getAllTimekeeping")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  getTaxStatus() {
    return axios
      .get("getAllTaxStatus")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  getPayFrequency() {
    return axios
      .get("getAllDefaultPayFrequency")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  getShiftSet() {
    return axios
      .get("getAllShiftSet")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  getDMAccount() {
    return axios
      .get("getAllDMAccount")
      .then((result) => {
        
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  //   End of master file integrations

  createPayroll({ dispatch }, data) {
    return axios
      .post("createPayrollData", data)
      .then(async (result) => {
        try {
          await dispatch("getPayrollData");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getPayrollData() {
    return axios
      .get("getAllPayrollDataById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updatePayroll({state}, props) {
    return axios
        .post("updatePayrollData", props.ciphertext)
        .then((result) => {
          state.payrollData[props.index] = props.editedData;
          return result;
        })
        .catch((err) => {
          return err.response;
        });
  },

  // deletePayroll({ state }, props) {
  //   return axios
  //     .delete("deletePayrollData/" + props.id)
  //     .then((result) => {
  //       state.payrollData.splice(state.payrollData.indexOf(props.item), 1);
  //       return result;
  //     })
  //     .catch((err) => {
  //       return err.response;
  //     });
  // },
};

// getters
const getters = {
  allPayrollGroups: (state) => state.payrollGroups,
  allTimeKeeping: (state) => state.timeKeeping,
  allTaxStatus: (state) => state.taxStatus,
  allPayFrequency: (state) => state.payFrequency,
  allShiftSet: (state) => state.shiftSet,
  allDMAccount: (state) => state.dmAccount,
  allPayrollData: (state) => state.payrollData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
