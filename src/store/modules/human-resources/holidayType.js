import axios from "axios";

// initial state
const state = () => ({
    holidayTypeSetup: [],
});

// mutations
const mutations = {
    setHolidayTypeSetup(state, data) {
        state.holidayTypeSetup = JSON.parse(data).data;
    },

};

// actions
const actions = {
    getHolidayTypeSetup() {
        return axios
            .get("getHolidayType")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    holidayTypeSetupAction({ dispatch, state }, data) {
        return axios
            .post("holidayTypeSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getHolidayTypeSetup");
                    state.holidayTypeSetup[state.holidayTypeSetup.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateHolidayTypeSetup({ state }, props) {
        return axios
            .post("holidayTypeSetupAction", props.ciphertext)
            .then((result) => {
                state.holidayTypeSetup[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteHolidayTypeSetup({ state }, props) {
        const index = state.holidayTypeSetup.indexOf(props.item);
        return axios
            .delete("deleteHolidayType/" + props.id)
            .then((result) => {
                state.holidayTypeSetup.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

};

// getters
const getters = {
    allHolidayTypeSetup: (state) => state.holidayTypeSetup,
};

export default {
    state,
    mutations,
    actions,
    getters,
};