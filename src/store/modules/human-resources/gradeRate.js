/*[11/03/2021 CN C.Rubio ]*/
import axios from "axios";

const state = () => ({
        gradeRates: [],
  });

  const mutations = {
      setGradeRates(state, data) {
        state.gradeRates = JSON.parse(data).data;
      },
  };

  const actions = {
        createGradeRates ({dispatch}, data) {
            return axios
            .post("createGradeRate", data)
            .then(async (result) => {
                try {
                    await dispatch("getGradeRates");
                  } catch (error) {
                    return error;
                  }
                  return result;
            }) .catch((err) => {
              return err.response;
            });
        },

        updateGradeRatesData({ state }, props) {
          return axios
            .post("updateGradeRates", props.ciphertext)
            .then((result) => {
              state[props.index] = props.editedData;

              return result;
            })
            .catch((err) => {
              return err.response;
            });
        },

        deleteGradeRates({ state }, props) {
          console.log(props);
          const index = state.gradeRates.indexOf(props.item);
          return axios
            .delete("deleteGradeRate/" + props.id)
            .then((result) => {
              state.gradeRates.splice(index, 1);
              return result;
            })
            .catch((err) => {
              return err.response;
            });
  },
  };

  const getters = {
    getAllGradeRates: (state) => state.gradeRates,
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }