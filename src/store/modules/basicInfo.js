import axios from "axios";

// initial state
const state = () => ({
  basicInfoData: [],
  suffixMasterData: [],
  prefixMasterData: [],
  bankSetUpMasterData: [],
  countriesMasterData: [],
  regularizationPAMasterData: [],
  bloodTypeSetUpMasterData: [],
  gpaSetUpMasterData: [],
  civilStatusMasterData: [],
  sexMasterData: []
});

// mutations
const mutations = {
  setBasicInfoData(state, data) {
    state.basicInfoData = JSON.parse(data).data;
  },
  setSuffixMasterData(state, data) {
    state.suffixMasterData = JSON.parse(data).data;
  },
  setPrefixMasterData(state, data) {
    state.prefixMasterData = JSON.parse(data).data;
  },
  setCountriesMasterData(state, data) {
    state.countriesMasterData = JSON.parse(data).data;
  },
  setCivilStatusMasterData(state, data) {
    state.civilStatusMasterData = JSON.parse(data).data;
  },
  setBankSetUpMasterData(state, data) {
    state.bankSetUpMasterData = JSON.parse(data).data;
  },
  SetRegularizationPAMasterData(state, data) {
    state.regularizationPAMasterData = JSON.parse(data).data;
  },
  setBloodTypeSetUpMasterData(state, data) {
    state.bloodTypeSetUpMasterData = JSON.parse(data).data;
  },
  setGpaSetUpMasterData(state, data) {
    state.gpaSetUpMasterData = JSON.parse(data).data;
  },

  setSexMasterData(state, data) {
    state.sexMasterData = JSON.parse(data).data;
  },
};

// actions
const actions = {
  //start master Data API Integration
  retrieveAllCountriesMasterData() {
    return axios
      .get("getAllCountries")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllCivilStatusMasterData() {
    return axios
      .get("getAllCivilStatus")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllSuffixMasterData() {
    return axios
      .get("getAllSuffixes")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllPrefixMasterData() {
    return axios
      .get("getAllPrefixes")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllBankSetUpMasterData() {
    return axios
      .get("getAllBanks")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllRegularizationPAMasterData() {
    return axios
      .get("getRegularizationPA")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllBloodTypesMasterData() {
    return axios
      .get("getAllBloodTypes")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllGPASMasterData() {
    return axios
      .get("getAllGPAS")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveAllSexMasterData() {
    return axios
      .get("getAllSex")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  //end master Data API Integration

  retrieveBasicInfoData() {
    console.log(JSON.parse(sessionStorage.getItem("user_session")))
    state.basicInfoData = []
    return axios
      .get("getAllBasicInformationById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  createBasicInfoData({ dispatch }, data) {
    return axios
      .post("createBasicInformation", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveBasicInfoData");
        } catch (error) {
          return error;
        }
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateBasicInfoData({ state }, props) {
    return axios
      .post("updateBasicInformation", props.ciphertext)
      .then((result) => {
        state.basicInfoData[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

};

// getters
const getters = {
  allBasicInfoData: (state) => state.basicInfoData,
  allSuffixMasterData: (state) => state.suffixMasterData,
  allPrefixMasterData: (state) => state.prefixMasterData,
  allBankSetUpMasterData: (state) => state.bankSetUpMasterData,
  allRegularizationPAMasterData: (state) => state.regularizationPAMasterData,
  allBloodTypeSetUpMasterData: (state) => state.bloodTypeSetUpMasterData,
  allGpaSetUpMasterData: (state) => state.gpaSetUpMasterData,
  allCountriesMasterData: (state) => state.countriesMasterData,
  allCivilStatusMasterData: (state) => state.civilStatusMasterData,
  allSexMasterData: (state) => state.sexMasterData
};

export default {
  state,
  mutations,
  actions,
  getters,
};
