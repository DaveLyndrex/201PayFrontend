import axios from "axios";

// initial state
const state = () => ({
    managerType: [],
});

// mutations
const mutations = {
    setManagerType(state, data) {
        state.managerType = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createManagerType({ dispatch }, data) {
        return axios
            .post("createManagerType", data)
            .then(async (result) => {
                try {
                    await dispatch("getManagerType");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getManagerType() {
        return axios
            .get("getManagerType")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateManagerType({ state }, props) {
        return axios
            .post("updateManagerType", props.ciphertext)
            .then((result) => {
                state.managerType[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteManagerType({ state }, props) {
        const index = state.managerType.indexOf(props.item);
        return axios
            .delete("deleteManagerType/" + props.id)
            .then((result) => {
                state.managerType.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allManagerType: (state) => state.managerType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
