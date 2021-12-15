import axios from "axios";

// initial state
const state = () => ({
    jobFamilyName: [],
});

// mutations
const mutations = {
    setJobFamilyName(state, data) {
        state.jobFamilyName = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createJobFamilyName({ dispatch }, data) {
        return axios
            .post("createJobFamilyName", data)
            .then(async (result) => {
                try {
                    await dispatch("getJobFamilyName");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getJobFamilyName() {
        return axios
            .get("getAllJobFamilyNames")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateJobFamilyName({ state }, props) {
        return axios
            .post("updateJobFamilyName", props.ciphertext)
            .then((result) => {
                state.jobFamilyName[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteJobFamilyName({ state }, props) {
        const index = state.jobFamilyName.indexOf(props.item);
        return axios
            .delete("deleteJobFamilyName/" + props.id)
            .then((result) => {
                state.jobFamilyName.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allJobFamilyName: (state) => state.jobFamilyName,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
