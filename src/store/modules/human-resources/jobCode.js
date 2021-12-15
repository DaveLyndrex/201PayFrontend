import axios from "axios";

// initial state
const state = () => ({
    jobCode: [],
});

// mutations
const mutations = {
    setJobCode(state, data) {
        state.jobCode = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createJobCode({ dispatch, state }, data) {
        return axios
            .post("createJobCode", data)
            .then(async (result) => {
                try {
                    await dispatch("getJobCode");
                    state.jobCode[state.jobCode.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getJobCode() {
        return axios
            .get("getAllJobCodes")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateJobCode({ state }, props) {
        return axios
            .post("updateJobCode", props.ciphertext)
            .then((result) => {
                state.jobCode[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteJobCode({ state }, props) {
        const index = state.jobCode.indexOf(props.item);
        return axios
            .delete("deleteJobCode/" + props.id)
            .then((result) => {
                state.jobCode.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allJobCode: (state) => state.jobCode,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
