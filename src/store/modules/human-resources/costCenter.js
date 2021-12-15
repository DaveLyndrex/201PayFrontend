import axios from "axios";

// initial state
const state = () => ({
    costCenter: [],
});

// mutations
const mutations = {
    setCostCenterSetups(state, data) {
        state.costCenter = JSON.parse(data).data;
    },

};

// actions
const actions = {

    costCenterAction({ dispatch, state }, data) {
        return axios
            .post("costCenterAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getCostCenterSetups");
                    state.costCenter[state.costCenter.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },



    getCostCenterSetups() {
        return axios
            .get("getAllCostCenterSetup")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updatetCostCenterSetups({ state }, props) {
        return axios
            .post("costCenterAction", props.ciphertext)
            .then((result) => {
                state.costCenter[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteCostCenterSetup({ state }, props) {
        const index = state.costCenter.indexOf(props.item);
        return axios
            .delete("deleteCostCenterSetup/" + props.id)
            .then((result) => {
                state.costCenter.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allCostCenterSetups: (state) => state.costCenter,
};

export default {
    state,
    mutations,
    actions,
    getters,
};