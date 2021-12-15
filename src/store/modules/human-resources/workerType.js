import axios from "axios";

// initial state
const state = () => ({
    workerType: [],
});

// mutations
const mutations = {
    setWorkerType(state, data) {
        state.workerType = JSON.parse(data).data;
    },
};

// actions
const actions = {
    workerTypeAction({ dispatch, state }, data) {
        return axios
            .post("workerTypeSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getWorkerType");
                    state.workerType[state.workerType.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getWorkerType() {
        return axios
            .get("getAllWorkerTypes")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateWorkerType({ state }, props) {
        return axios
            .post("workerTypeSetupAction", props.ciphertext)
            .then((result) => {
                state.workerType[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteWorkerType({ state }, props) {
        const index = state.workerType.indexOf(props.item);
        return axios
            .delete("deleteWorkerType/" + props.id)
            .then((result) => {
                state.workerType.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allWorkerType: (state) => state.workerType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};