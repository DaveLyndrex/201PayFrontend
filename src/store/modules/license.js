import axios from "axios";

// initial state
const state = () => ({
  license: [],
});

const mutations = {
  setLicenseData(state, data) {
    state.license = JSON.parse(data).data;
  },
};

const actions = {
  createLicense({ dispatch }, data) {
    return axios
      .post("createLicense", data)
      .then(async (result) => {
        try {
          await dispatch("getAllEmployeeLicense");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveLicenseData() {
    state.license = [];
    return axios
      .get("getLicenseByEmpId/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  updateLicense({ state }, props) {
    console.log(props)
    return axios
    
      .post("updateLicense", props.ciphertext)
      .then((result) => {
        state.license[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

const getters = {
  allLicenseData: (state) => state.license,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
