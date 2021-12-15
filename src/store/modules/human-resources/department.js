/*[11/03/2021 CN C.Rubio ]*/
import axios from "axios";

const state = () => ({
        department: [],
  });

  const mutations = {
      setDepartment(state, data) {
        state.department = JSON.parse(data).data;
      },
  };

  const actions = {

    getDepartment() {
      return axios
          .get("getAllDepartments")
          .then((result) => {
              return result;
          })
          .catch((err) => {
              return err.response;
          });
  },

        createDepartment ({dispatch, state}, data) {
            return axios
            .post("createDepartment", data)
            .then(async (result) => {
                try {
                    await dispatch("getDepartment");
                    state.department[state.department.length] = data
                    return result
                  } catch (error) {
                    return error;
                  }
            }) .catch((err) => {
              return err.response;
            });
        },

        updateDepartmentData({ state }, props) {
          return axios
            .post("updateDepartment", props.ciphertext)
            .then((result) => {
              state.department[props.index] = props.editedData;

              return result;
            })
            .catch((err) => {
              return err.response;
            });
        },

        deleteDepartment({ state }, props) {
          console.log(props);
          const index = state.department.indexOf(props.item);
          return axios
            .delete("deleteDepartment/" + props.id)
            .then((result) => {
              state.department.splice(index, 1);
              return result;
            })
            .catch((err) => {
              return err.response;
            });
  },
  };

  const getters = {
    getAllDepartment: (state) => state.department,
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }