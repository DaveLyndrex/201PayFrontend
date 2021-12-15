import axios from "axios";

// initial state
const state = () => ({
  emergencyContactData: [],
});

// mutations
const mutations = {
  setEmergencyContactData(state, responseData) {
    const dataToAdd = JSON.parse(responseData);
    state.emergencyContactData = dataToAdd.data;
  },
};

// actions
const actions = {
  getEmergencyContactData() {
    return axios
      .get("getEmergencyContact/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  createEmergencyContactData({ dispatch }, data) {
    return axios
      .post("createEmergencyContact", data)
      .then(async (result) => {
        try {
          await dispatch("getEmergencyContactData");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateEmergencyContactData({ state }, props) {
    return axios
      .post("updateEmergencyContact", props.ciphertext)
      .then((result) => {
        state.emergencyContactData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  deleteEmergencyContactData({ state }, props) {
    const index = state.emergencyContactData.indexOf(props.item);
    return axios
      .delete("emergencyContact/delete/" + props.id)
      .then((result) => {
        state.emergencyContactData.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
};

// getters
const getters = {
  allEmergencyContactData: (state) => state.emergencyContactData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
