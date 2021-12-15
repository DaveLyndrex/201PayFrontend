import axios from "axios";
/*`mf_cost_center` `b` ON ((`a`.`CostCenterID` = `b`.`ID`)))
        LEFT JOIN `mf_default_costcenter_type` `c` ON ((`a`.`TypeID` = `c`.`ID`)))
        LEFT JOIN `mf_company`*/
// initial state
const state = () => ({
  costCenterData: [],
  costCenter:[],
  costCenterSetup: [],
  company: []
});

// mutations
const mutations = {
  setCostCenter(state, data) {
    state.costCenter = JSON.parse(data).data;
  },
  setCostCenterSetup(state, data) {
    state.costCenterSetup = JSON.parse(data).data;
  },
  setCostCenterData(state, data) {
    state.costCenterData = JSON.parse(data).data;
  },
  setCompany(state, data) {
    state.company = JSON.parse(data).data;
  },
};

// actions
const actions = {

  retrieveCostCenter() {
    return axios
      .get("getAllCostCenterSetup")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrieveCostCenterSetup() {
    return axios
      .get("getAllDefaultCostCenterType")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveCompanies() {
    return axios
      .get("getAllCompanySetup")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveCostCenterData() {
    return axios
      .get("getAllCostCenterById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

  createCostCenterData({ dispatch }, data) {
    return axios
      .post("createCostCenter", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveCostCenterData");
        } catch (error) {
          return error;
        }
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateCostCenterData({ state }, props) {
    return axios
      .post("updateCostCenter", props.ciphertext)
      .then((result) => {
        state[props.index] = props.editedData;
        // console.log(props.index);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

};

// getters
const getters = {
  allCostCenterData: (state) => state.costCenterData,
  allCostCenter: (state) => state.costCenter,
  allCostCenterSetup: (state) => state.costCenterSetup,
  allCompany: (state) => state.company,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
