import axios from "axios";

// initial state
const state = () => ({
    holiday: [],
    holidayType: [],
});

// mutations
const mutations = {
    setHoliday(state, data) {
        state.holiday = JSON.parse(data).data;
    },
    setHolidayType(state, data) {
        state.holidayType = JSON.parse(data).data;
    },

};

// actions
const actions = {
    getHolidayType() {
        return axios
            .get("getHolidayType")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    //   End of master file integrations

    createHoliday({ dispatch }, data) {
        return axios
            .post("createHoliday", data)
            .then(async(result) => {
                try {
                    await dispatch("getHoliday");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getHoliday() {
        return axios
            .get("getAllHolidays")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateHoliday({ state }, props) {
        return axios
            .post("updateHoliday", props.ciphertext)
            .then((result) => {
                state.holiday[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteHoliday({ state }, props) {
        const index = state.holiday.indexOf(props.item);
        return axios
            .delete("deleteHoliday/" + props.id)
            .then((result) => {
                state.holiday.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allHoliday: (state) => state.holiday,
    allHolidayType: (state) => state.holidayType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};