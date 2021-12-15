import axios from "axios";

// initial state
const state = () => ({
    visaSetup: [],
    // items: []
});

// mutations
const mutations = {

    setVisaSetup(state, data) {
        state.visaSetup = JSON.parse(data).data;
        // state.items = data
    },
};

// actions
const actions = {
    visaSetupAction({ dispatch, state }, data) {
        return axios
            .post("visaSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getAllVisaSetup");
                    state.visaSetup[state.visaSetup.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getAllVisaSetup() {
        return axios
            .get("getAllVisaPermitType")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateVisaSetup({ state }, props) {
        return axios
            .post("visaSetupAction", props.ciphertext)
            .then((result) => {
                state.visaSetup[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteVisaSetup({ state }, props) {
        const index = state.visaSetup.indexOf(props.item);
        return axios
            .delete("deleteVisaSetup/" + props.id)
            .then((result) => {
                state.visaSetup.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allVisaSetup: (state) => state.visaSetup,
};

export default {
    state,
    mutations,
    actions,
    getters,
};