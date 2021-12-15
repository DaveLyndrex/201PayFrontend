import axios from "axios";

// initial state
const state = () => ({
  otherData: [],
  customFields: []
});

const mutations = {
  setOtherData(state, data) {
    state.otherData = JSON.parse(data).data;
  },

  setCustomFields(state, data) {
    state.customFields = JSON.parse(data).data;
  },
};

const actions = {

  retrieveAllCustomFields() {
    return axios
      .get("getAllCustomFields")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  createOtherData({ dispatch }, data) {
    return axios
      .post("createOtherData", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveOtherDataById");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },
  // retrieveAllOtherData() {
  //   return axios
  //     .get("getAllOtherData")
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       return err.response;
  //     });
  // },
  retrieveOtherDataById() {
    state.otherData = [];
    return axios
      .get("getOtherDataByEmpId/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  updateOtherData({ state }, props) {
    return axios
      .post("updateOtherData", props.ciphertext)
      .then((result) => {
        state.otherData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  // deleteOtherData({ state }, props) {
  //   const index = state.otherData.indexOf(props.item);
  //   return axios
  //     .delete("deleteOtherData/" + props.id)
  //     .then((result) => {
  //       state.otherData.splice(index, 1);
  //       return result;
  //     })
  //     .catch((err) => {
  //       return err.response;
  //     });
  // },
};

const getters = {
  allOtherData: (state) => state.otherData,
  allCustomFields: (state) =>state.customFields
};

export default {
  state,
  mutations,
  actions,
  getters,
};
