import axios from "axios";

// initial state
const state = () => ({
  deductions: [],
  deductionsMasterData: [],
  payFrequencyMasterData: []
});

// mutations
const mutations = {
  setDeductions(state, data) {
    state.deductions = JSON.parse(data).data;
  },

  setDeductionsMasterData(state, data) {
    state.deductionsMasterData = JSON.parse(data).data;
  },
  setPayFrequencyMasterData(state, data) {
    state.payFrequencyMasterData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  // master file integration
  retrieveDeductionsMasterData() {
    return axios
      .get("getAllPayDeduction")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrievePayFrequencyMasterData() {
    return axios
      .get("getAllDefaultPayFrequency")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  //   End of master file integrations

  createDeductions({ dispatch }, data) {
    return axios
      .post("createEmployeeDeductions", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveDeductions");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveDeductions() {
    return axios
      .get("getEmployeeDeduction/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateDeductions({ state }, props) {
    return axios
      .post("updateEmployeeDeductions", props.ciphertext)
      .then((result) => {
        state.deductions[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  removeDeduction({ state }, props) {
    const index = state.deductions.indexOf(props.item);
    return axios
      .delete("employeeDeductions/delete/" + props.id)
      .then((result) => {
        state.deductions.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allDeductionData: (state) => state.deductions,
  allDeductionMasterData: (state) => state.deductionsMasterData,
  allPayFrequencyMasterData: (state) => state.payFrequencyMasterData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
