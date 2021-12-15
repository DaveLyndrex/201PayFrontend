import axios from "axios";

// initial state
const state = () => ({
    jobCategory: [],
});

// mutations
const mutations = {
    setJobCategory(state, data) {
        state.jobCategory = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createJobCategory({ dispatch }, data) {
        return axios
            .post("createJobCategory", data)
            .then(async (result) => {
                try {
                    await dispatch("getJobCategory");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getJobCategory() {
        return axios
            .get("getAllJobCategories")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateJobCategory({ state }, props) {
        return axios
            .post("updateJobCategory", props.ciphertext)
            .then((result) => {
                state.jobCategory[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteJobCategory({ state }, props) {
        const index = state.jobCategory.indexOf(props.item);
        return axios
            .delete("deleteJobCategory/" + props.id)
            .then((result) => {
                state.jobCategory.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allJobCategory: (state) => state.jobCategory,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
