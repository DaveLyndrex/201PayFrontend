/*[11/03/2021 CN C.Rubio ]*/
import axios from "axios";

const state = () => ({
        civilStatus: [],
  });

  const mutations = {
      setCivilStatus(state, data) {
        state.civilStatus = JSON.parse(data).data;
      },
  };

  const actions = {
        // createCivilStatus ({dispatch}, data) {
        //     return axios
        //     .post("createCivilStatus", data)
        //     .then(async (result) => {
        //         try {
        //             await dispatch("retrieveAllCivilStatusMasterData");
        //           } catch (error) {
        //             return error;
        //           }
        //           return result;
        //     }) .catch((err) => {
        //       return err.response;
        //     });
        // },

        // updateCivilStatus({ state }, props) {
        //   return axios
        //     .post("updateCivilStatus", props.ciphertext)
        //     .then((result) => {
        //       state[props.index] = props.editedData;

        //       return result;
        //     })
        //     .catch((err) => {
        //       return err.response;
        //     });
        // },


        createCivilStatus ({dispatch, state}, data) {
          return axios
          .post("createCivilStatus", data)
          .then(async (result) => {
              try {
                  await dispatch("retrieveAllCivilStatusMasterData");
                  state.civilStatus[state.civilStatus.length] = data
                } catch (error) {
                  return error;
                }
                return result;
          }) .catch((err) => {
            return err.response;
          });
      },

      updateCivilStatus({ state }, props) {
        return axios
          .post("updateCivilStatus", props.ciphertext)
          .then((result) => {
            state.civilStatus[props.index] = props.editedData;

            return result;
          })
          .catch((err) => {
            return err.response;
          });
      },
      


        deleteCivilStatus({ state }, props) {
        const index = state.civilStatus.indexOf(props.item);
        
        return axios
          .delete("deleteCivilstatus/" + props.id)
          .then((result) => {

            state.civilStatus.splice(index, 1);
    
            return result;
          })
          .catch((err) => {
            return err.response;
          });
  },
  };

  const getters = {
    allCivilStatus: (state) => state.civilStatus,
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }