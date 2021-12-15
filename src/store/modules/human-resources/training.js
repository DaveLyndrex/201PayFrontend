import axios from "axios";

// initial state
const state = () => ({
    trainingType: [],
});

// mutations
const mutations = {
    setTrainingType(state, data) {
        state.trainingType = JSON.parse(data).data;
    },
};

// actions
const actions = {
    trainingTypeAction({ dispatch, state }, data) {
        return axios
            .post("trainingSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getTrainingType");
                    state.trainingType[state.trainingType.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getTrainingType() {
        return axios
            .get("getAllTrainingTypes")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateTrainingType({ state }, props) {
        return axios
            .post("trainingSetupAction", props.ciphertext)
            .then((result) => {
                state.trainingType[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteTrainingType({ state }, props) {
        const index = state.trainingType.indexOf(props.item);
        return axios
            .delete("deleteTrainingSetup/" + props.id)
            .then((result) => {
                state.trainingType.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allTrainingType: (state) => state.trainingType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};