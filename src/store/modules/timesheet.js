import axios from "axios";

// initial state
const state = () => ({
    timesheets: [],
    systemprofile:[],
});

// mutations
const mutations = {
    setTimesheets(state, data) {
        state.timesheets = JSON.parse(data).data;
    },
    setSystemProfile(state, data) {
        state.systemprofile = JSON.parse(data).data;
    },

};

// actions
const actions = {


    validateKioskTimesheet({ commit }, data) {
        // console.log(data.data);
        return axios
            .post("validateKioskTimesheet", data.data)
            .then(async(result) => {
                try {
                    commit
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveAllTimesheets() {
        return axios
            .get("getAllTimesheet")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
    //   End of master file integrations

    retrieveSystemProfile() {
        return axios
        .get("getSystemProfile")
        .then((result) => {
            return result
        })
        .catch((err) => {
            return err.response;
        });
    },

}

// getters
const getters = {
    allTimesheets: (state) => state.timesheets,
    allSystemProfile: (state) => state.systemprofile,
};

export default {
    state,
    mutations,
    actions,
    getters,
};