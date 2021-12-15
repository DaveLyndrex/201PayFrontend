//Dave Lyndrex Millan
import axios from "axios";

//initial state
const state = () => ({
        addressType: [],
  });

  //mutations
  const mutations = {
    setAddressTypes(state, data) {
        state.addressType = JSON.parse(data).data;
      },
  };

  //actions
  const actions = {
    getAllDefaultAddressType() {
      return axios
        .get("getAllDefaultAddressType")
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err.response;
        });
    },
  
        createAddressType({dispatch,state}, data) {
          return axios
          .post("createAddressType", data)
          .then(async (result) => {
              try {
                  await dispatch("getAllDefaultAddressType");
                  state.addressType[state.addressType.length] = data
                  return result;
                } catch (error) {
                  return error;
                }
          }) .catch((err) => {
            return err.response;
          });
      },

      


        updateAddressType({ state }, props) {
          return axios
            .put("updateAddressType", props.ciphertext)
            .then((result) => {
              state[props.index] = props.editedData;

              return result;
            })
            .catch((err) => {
              return err.response;
            });
        },

        deleteAddressType ({dispatch}, data) {
          return axios
            .delete("deleteAddressType/"+ data.id)
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
    allAddressTypesGetters: (state) => state.addressType
    // allAddressType: (state) => state.addressType
  };

  export default {
      state,
      mutations,
      actions,
      getters,
  }