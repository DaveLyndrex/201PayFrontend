import axios from "axios";

const state = () => ({
  trainings: [],
  trainingTypes: [],
});

const mutations = {
  setTrainings(state, data) {
    state.trainings = JSON.parse(data).data;
  },

  setTrainingTypes(state, data) {
    state.trainingTypes = JSON.parse(data).data;
  },
};

const actions = {
  // master file related datas
  retrieveAllTrainingTypes() {
    return axios
      .get("getAllTrainingTypes")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  // end of master file related datas
  createNewEmpTraining({ dispatch }, data) {
    return axios
      .post("createEmployeeTraining", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveAllTrainings");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },


  retrieveAllTrainings() {
    return axios
      .get("getAllTrainings/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },

  updateTraining({ state }, props) {
    return axios
      .post("updateEmployeeTraining", props.ciphertext)
      .then((result) => {
        state.trainings[props.index] = props.editedData;
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
  deleteTraining({ state }, props) {
    const index = state.trainings.indexOf(props.item);
    return axios
      .delete("employeeTraining/delete/" + props.id)
      .then((result) => {
        state.trainings.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

const getters = {
  allTrainings: (state) => state.trainings,
  allTrainingTypes: (state) => state.trainingTypes,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
