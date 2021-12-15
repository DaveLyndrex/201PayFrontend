import axios from "axios";

// initial state
const state = () => ({
    citizenshipSetup: [],
});

// mutations
const mutations = {
    setCitizenshipSetup(state, data) {
        state.citizenshipSetup = JSON.parse(data).data;
    },

};

// actions
const actions = {
    getCitizenshipSetup() {
        return axios
            .get("getAllCitizenshipStatus")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    citizenshipSetupAction({ dispatch, state }, data) {
        return axios
            .post("citizenshipSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getCitizenshipSetup");
                    state.citizenshipSetup[state.citizenshipSetup.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateCitizenshipSetup({ state }, props) {
        return axios
            .post("citizenshipSetupAction", props.ciphertext)
            .then((result) => {
                state.citizenshipSetup[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteCitizenshipSetup({ state }, props) {
        const index = state.citizenshipSetup.indexOf(props.item);
        return axios
            .delete("deleteCitizenshipSetup/" + props.id)
            .then((result) => {
                state.citizenshipSetup.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

};

// getters
const getters = {
    allCitizenshipSetup: (state) => state.citizenshipSetup,
};

export default {
    state,
    mutations,
    actions,
    getters,
};