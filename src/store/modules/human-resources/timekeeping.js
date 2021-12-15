import axios from "axios";

// initial state
const state = () => ({
    timekeepingSetup: [],
});

// mutations
const mutations = {
    setTimekeepingSetup(state, data) {
        state.timekeepingSetup = JSON.parse(data).data;
    },
};

// actions
const actions = {
    timekeepingSetupAction({ dispatch, state }, data) {
        return axios
            .post("timekeepingSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getTimekeepingSetup");
                    state.timekeepingSetup[state.timekeepingSetup.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getTimekeepingSetup() {
        return axios
            .get("getAllTimekeeping")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateTimekeepingSetup({ state }, props) {
        return axios
            .post("timekeepingSetupAction", props.ciphertext)
            .then((result) => {
                state.timekeepingSetup[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteTimekeepingSetup({ state }, props) {
        const index = state.timekeepingSetup.indexOf(props.item);
        return axios
            .delete("deleteTimekeepingSetup/" + props.id)
            .then((result) => {
                state.timekeepingSetup.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allTimekeepingSetup: (state) => state.timekeepingSetup,
};

export default {
    state,
    mutations,
    actions,
    getters,
};