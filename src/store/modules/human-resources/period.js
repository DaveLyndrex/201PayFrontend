//DAVE LYNDREX MILLAN
import axios from "axios";

//initial state
const state = () => ({
        Period: [],
  });

  //mutations
  const mutations = {
    setPeriods(state, data) {
        state.Period = JSON.parse(data).data;
      },
  };

  //actions
  const actions = {

        createPeriod({dispatch}, data) {
            return axios
            .post("createPeriod", data)
            .then(async (result) => {
                try {
                    await dispatch("getPeriods");
                  } catch (error) {
                    return error;
                  }
                  return result;
            }) .catch((err) => {
              return err.response;
            });
        },

        getPeriods() {
          return axios
            .get("getPeriods")
            .then((res) => {
              console.log(res)
              return res;
            })
            .catch((err) => {
              return err.response;
            });
        },
        updatePeriod({ state }, props) {
          return axios
            .post("updatePeriod", props.ciphertext)
            .then((result) => {
              state[props.index] = props.editedData;

              return result;
            })
            .catch((err) => {
              return err.response;
            });
        },

        deletePeriod ({dispatch}, data) {
          return axios
            .delete("deletePeriod/"+ data.id)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
        },
  };

  const getters = {
    allPeriodsGetters: (state) => state.Period
    // allPeriod: (state) => state.Period
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }