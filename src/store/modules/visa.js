import axios from "axios";

// initial state
const state = () => ({
    visaData: [],
    visaPermitType: [],
});

// mutations
const mutations = {

    setVisaData(state, data) {
        state.visaData = JSON.parse(data).data;
    },

    setVisaPermitType(state, data) {
        state.visaPermitType = JSON.parse(data).data;
    },
};

// actions
const actions = {

    retrieveVisaPermitType() {
        return axios
            .get("getAllVisaPermitType")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    createVisaData({ dispatch }, data) {
        return axios
            .post("createEmployeeVisa", data)
            .then(async(result) => {
                try {
                    await dispatch("retrieveAllVisa");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveAllVisa() {
        return axios
            .get("getEmployeeVisaById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateVisaData({ state }, props) {
        return axios
            .post("updateEmployeeVisa", props.ciphertext)
            .then((result) => {
                state.visaData[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },


};

// getters
const getters = {
    allVisaData: (state) => state.visaData,
    allVisaPermitType: (state) => state.visaPermitType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};