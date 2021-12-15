import axios from "axios";

// initial state
const state = () => ({
    reason: [],
});

// mutations
const mutations = {
    setReason(state, data) {
        state.reason = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createReason({ dispatch }, data) {
        return axios
            .post("createReason", data)
            .then(async (result) => {
                try {
                    await dispatch("getReason");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getReason() {
        return axios
            .get("getAllReasons")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateReason({ state }, props) {
        return axios
            .post("updateReason", props.ciphertext)
            .then((result) => {
                state.reason[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteReason({ state }, props) {
        const index = state.reason.indexOf(props.item);
        return axios
            .delete("deleteReason/" + props.id)
            .then((result) => {
                state.reason.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allReason: (state) => state.reason,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
