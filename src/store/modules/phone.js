import axios from "axios";

// initial state
const state = () => ({
  phoneData: [],
  phoneType:[],
 // phone: [],
});

const mutations = {
  setPhoneData(state, data) {
    state.phoneData = JSON.parse(data).data;
  },

  // setPhone(state, data){
  //   state.phone = JSON.parse(data).data;
  // },

  setPhoneType(state, data) {
    state.phoneType = JSON.parse(data).data;
  },
};

const actions = {
  retrievePhoneType() {
    return axios
  .get("getAllPhoneType")
  .then((result)     => {
     
    return result;
  })
  .catch((err) => {
    return err.response;
  });
},

  
  createPhoneData({ dispatch }, data) {
    console.log(data);
    return axios
      .post("createPhone", data)
      .then(async (result) => {
        try {
          await dispatch("retrievePhoneData");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },
  retrievePhoneData() {
    return axios
      .get("getPhoneByEmpId/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },
 
  updatePhoneData({ state }, props) {
    return axios
    .post("updatePhoneData", props.ciphertext)
    .then((result) => {
      state[props.index] = props.editedData;
      console.log(props.index);
      return result;
    })
    .catch((err) => {
      return err.response;
      });
  },
 
};

const getters = {
  allPhoneData: (state) => state.phoneData,
  allPhoneType: (state) => state.phoneType,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
