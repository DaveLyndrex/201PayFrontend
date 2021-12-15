//Dave Lyndrex Millan
import axios from "axios";

//initial state
const state = () => ({
        employeeStatus: [],
  });

  //mutations
  const mutations = {
    setEmployeeStatus(state, data) {
        state.employeeStatus = JSON.parse(data).data;
      },
  };

  //actions
  const actions = {
    getEmployeeStatusData() {
      return axios
          .get("getAllEmployeeStatus")
          .then((result) => {
              return result;
          })
          .catch((err) => {
              return err.response;
          });
  },

        createEmployeeStatus({dispatch, state }, data) {
            return axios
            .post("createEmployeeStatus", data)
            .then(async (result) => {
                try {
                    await dispatch("getEmployeeStatusData");
                    state.employeeStatus[state.employeeStatus.length] = data
                    return result;
                  } catch (error) {
                    return error;
                  }
            }) .catch((err) => {
              return err.response;
            });
        },

        updateEmployeeStatus({ state }, props) {
          return axios
            .put("updateEmployeeStatus", props.ciphertext)
            .then((result) => {
              //state[props.index] = props.editedData;
              state.employeeStatus[props.index] = props.editedData;
              return result;
            })
            .catch((err) => {
              return err.response;
            });
        },

        deleteEmployeeStatus ({dispatch}, data) {
          return axios
            .delete("deleteEmployeeStatus/"+ data.id)
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
    allEmployeeStatusGetters: (state) => state.employeeStatus
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }