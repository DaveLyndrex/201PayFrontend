import axios from "axios";

// initial state
const state = () => ({
    employeeData: [],
    filteredTimesheet: [],
});

// mutations
const mutations = {
    setEmployeeData(state, data) {
        state.employeeData = JSON.parse(data).data;
    },
    setFilteredTimesheet(state, data) {
        state.filteredTimesheet = JSON.parse(data).data;
    },
};

// actions
const actions = {
    filterTimesheet({ state }, data) {
        state.filteredTimesheet = [];
        return axios
            .get("filterEmployee/" + data.id)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },
    retrieveAllEmployee() {
        return axios
            .get("getEmployeeFilter")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allEmployeeData: (state) => state.employeeData,
    allFilteredTimesheet: (state) => state.filteredTimesheet,
};

export default {
    state,
    mutations,
    actions,
    getters,
};