import axios from "axios";

// initial state
const state = () => ({
    regularizationSetup: [],
});

// mutations
const mutations = {
    setRegularizationSetup(state, data) {
        state.regularizationSetup = JSON.parse(data).data;
    },
};

// actions
const actions = {
    regularizationSetupAction({ dispatch, state }, data) {
        return axios
            .post("regularizationAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getRegularizationSetup");
                    state.regularizationSetup[state.regularizationSetup.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getRegularizationSetup() {
        return axios
            .get("getRegularizationPA")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateRegularizationSetup({ state }, props) {
        return axios
            .post("regularizationAction", props.ciphertext)
            .then((result) => {
                state.regularizationSetup[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteRegularizationPASetup({ state }, props) {
        const index = state.regularizationSetup.indexOf(props.item);
        return axios
            .delete("deleteRegularizationPA/" + props.id)
            .then((result) => {
                state.regularizationSetup.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allRegularizationSetup: (state) => state.regularizationSetup,
};

export default {
    state,
    mutations,
    actions,
    getters,
};