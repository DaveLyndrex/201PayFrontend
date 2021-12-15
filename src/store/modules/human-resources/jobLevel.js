import axios from "axios";

// initial state
const state = () => ({
  jobLevel: [],
});

// mutations
const mutations = {
  setJobLevel(state, data) {
    state.jobLevel = JSON.parse(data).data;
  },

};

// actions
const actions = {

  createJobLevel({ dispatch }, data) {
    return axios
      .post("createJobLevel", data)
      .then(async (result) => {
        try {
          await dispatch("getJobLevel");
          return result;
        } catch (error) {   
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getJobLevel() {
    return axios
      .get("getAllJobLevels")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateJobLevel({state}, props) {
      return axios
          .post("updateJobLevel", props.ciphertext)
          .then((result) => {
            state.jobLevel[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteJobLevel({ state }, props) {
    const index = state.jobLevel.indexOf(props.item);
    return axios
      .delete("deleteJobLevel/" + props.id)
      .then((result) => {
        state.jobLevel.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allJobLevel: (state) => state.jobLevel,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
