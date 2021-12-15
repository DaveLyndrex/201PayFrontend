//  [11/03/2021 CN C.Rubio ]
import axios from "axios";

const state = () => ({
    employmenttype: [],
  });

  const mutations = {
      setEmploymentType(state, data) {
        state.employmenttype = JSON.parse(data).data;
      },
  };

  const actions = {

    getEmploymentTypes() {
      return axios
          .get("getAllEmploymentType")
          .then((result) => {
              return result;
          })
          .catch((err) => {
              return err.response;
          });
  },
        createEmploymentType ({dispatch, state}, data) {
            return axios
            .post("createEmploymentType", data)
            .then(async (result) => {
                try {
                    await dispatch("getEmploymentType");
                    state.employmenttype[state.employmenttype.length] = data
                    return result;
                  } catch (error) {
                    return error;
                  }
            }) .catch((err) => {
              return err.response;
            });
        },

        updateEmploymentType({ state }, props) {
          return axios
            .post("updateEmploymentType", props.ciphertext)
            .then((result) => {
              state.employmenttype[props.index] = props.editedData;

              return result;
            })
            .catch((err) => {
              return err.response;
            });
        },

        deleteEmploymentType({ state }, props) {
          console.log(props);
        const index = state.employmenttype.indexOf(props.item);
        return axios
          .delete("deleteEmploymentType/" + props.id)
          .then((result) => {
            state.employmenttype.splice(index, 1);
            return result;
          })
          .catch((err) => {
            return err.response;
          });
  },
  };

  const getters = {
    allEmploymentTypeGetter: (state) => state.employmenttype,
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }