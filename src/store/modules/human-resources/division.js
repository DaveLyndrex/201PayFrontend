import axios from "axios";

// initial state
const state = () => ({
    division: [],
});

// mutations
const mutations = {
    setDivision(state, data) {
        state.division = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createDivision({ dispatch }, data) {
        return axios
            .post("createDivisions", data)
            .then(async (result) => {
                try {
                    await dispatch("getDivision");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getDivision() {
        return axios
            .get("getAllDivision")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateDivision({ state }, props) {
        return axios
            .post("updateDivisions", props.ciphertext)
            .then((result) => {
                state.division[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteDivision({ state }, props) {
        const index = state.division.indexOf(props.item);
        return axios
            .delete("deleteDivisions/" + props.id)
            .then((result) => {
                state.division.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allDivision: (state) => state.division,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
