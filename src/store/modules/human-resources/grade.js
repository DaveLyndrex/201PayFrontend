import axios from "axios";

// initial state
const state = () => ({
  grades: [],
});

// mutations
const mutations = {
  setGrade(state, data) {
    state.grades = JSON.parse(data).data;
  },

};

// actions
const actions = {

  createGrade({ dispatch }, data) {
    return axios
      .post("createGrade", data)
      .then(async (result) => {
        try {
          await dispatch("getGrades");
          return result;
        } catch (error) {   
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  getGrades() {
    return axios
      .get("getAllGrades")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  },

    updateGrade({state}, props) {
      return axios
          .post("updateGrade", props.ciphertext)
          .then((result) => {
            state.grades[props.index] = props.editedData;
            return result;
          })
          .catch((err) => {
            return err.response;
          });
    },

  deleteGrade({ state }, props) {
    const index = state.grades.indexOf(props.item);
    return axios
      .delete("deleteGrade/" + props.id)
      .then((result) => {
        state.grades.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

// getters
const getters = {
  allGradeSetup: (state) => state.grades,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
