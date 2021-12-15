//DAVE LYNDREX MILLAN 
import axios from "axios";

//initial state
const state = () => ({
        GroupPersonalAccidentSetup: [],
  });

  //mutations
  const mutations = {
    setGroupPersonalAccident(state, data) {
        state.GroupPersonalAccidentSetup = JSON.parse(data).data;
      },
  };

  //actions
  const actions = {

    createGroupPersonalAccident({dispatch, state}, data) {
            return axios
            .post("createGroupPersonalAccident", data)
            .then(async (result) => {
                try {
                    await dispatch("retrieveAllGPASMasterData");
                    state.GroupPersonalAccidentSetup[state.GroupPersonalAccidentSetup.length] = data
                    return result;
                  } catch (error) {
                    return error;
                  }
                  
            }) .catch((err) => {
              return err.response;
            });
        },

        updateGroupPersonalAccident({ state }, props) {
          return axios
            .put("updateGroupPersonalAccident", props.ciphertext)
            .then((result) => {
              state.GroupPersonalAccidentSetup[props.index] = props.editedData;

              return result;
            })
            .catch((err) => {
              return err.response;
            });
        },

        deleteGroupPersonalAccident ({dispatch}, data) {
          return axios
            .delete("deleteGroupPersonalAccident/"+ data.id)
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
    allGroupPersonalAccidentGetters: (state) => state.GroupPersonalAccidentSetup
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }