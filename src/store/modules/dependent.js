import axios from "axios";

// initial state
const state = () => ({
  dependents: [],
  suffixDatas: [],
  dependentsType: []
});

const mutations = {
  setDependents(state, data) {
    state.dependents = JSON.parse(data).data;
  },
  setDependentsType(state, data) {
    state.dependentsType = JSON.parse(data).data;
  },

  setSuffixDatas(state, data) {
    state.suffixDatas = JSON.parse(data).data;
  },
};

const actions = {
  // master file relationship
  retrieveSuffix() {
    return axios
      .get("getAllSuffixes")
      .then((res) => {
        console.log(res)
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveDependentsType() {
    return axios
      .get("getDependentsType")
      .then((res) => {
        console.log(res)
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  // end of master file integration

  createDependent({ dispatch }, data) {
    return axios
      .post("createEmployeeDependentRecord", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveDependents");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveDependents() {
    return axios
      .get("getAllDependentsById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

 
  updateDependent({ state }, props) {
    return axios
      .post("updateEmployeeDependentRecord", props.ciphertext)
      .then((result) => {
        state.dependents[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  // removeDependent({ state }, props) {
  //   const index = state.dependents.indexOf(props.item);
  //   return axios
  //     .delete("employeeDependent/delete/" + props.id)
  //     .then((result) => {
  //       state.dependents.splice(index, 1);
  //       return result;
  //     })
  //     .catch((err) => {
  //       return err.response;
  //     });
  // },
};

const getters = {
  allDependents: (state) => state.dependents,
  allDependentsType: (state) => state.dependentsType,
  allSuffixes: (state) => state.suffixDatas,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
