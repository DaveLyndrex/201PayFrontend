import axios from "axios";

// initial state
const state = () => ({
    projectSetup: [],
});

// mutations
const mutations = {
    setProjectSetup(state, data) {
        state.projectSetup = JSON.parse(data).data;
    },

};

// actions
const actions = {

    projectSetupAction({ dispatch, state }, data) {
        return axios
            .post("projectSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getProjectSetup");
                    state.projectSetup[state.projectSetup.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },



    getProjectSetup() {
        return axios
            .get("getAllProjects")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updatetProjectSetupAction({ state }, props) {
        return axios
            .post("projectSetupAction", props.ciphertext)
            .then((result) => {
                state.projectSetup[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteProjectSetup({ state }, props) {
        const index = state.projectSetup.indexOf(props.item);
        return axios
            .delete("deleteProjectSetup/" + props.id)
            .then((result) => {
                state.projectSetup.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    AllProjectSetup: (state) => state.projectSetup,
};

export default {
    state,
    mutations,
    actions,
    getters,
};