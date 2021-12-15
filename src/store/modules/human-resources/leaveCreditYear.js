/*[11/03/2021 CN C.Rubio ]*/
import axios from "axios";

const state = () => ({
    leaveCreditYear: [],
});

const mutations = {
    setLeaveCreditYear(state, data) {
        state.leaveCreditYear = JSON.parse(data).data;
    },
};

const actions = {
    createLeaveCreditsYear({ dispatch, state }, data) {
        return axios
            .post("createLeaveCreditsYear", data)
            .then(async(result) => {
                try {
                    await dispatch("retrieveAllLeaveCreditYears");
                    state.leaveCreditYear[state.leaveCreditYear.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            }).catch((err) => {
                return err.response;
            });
    },

    updateLeaveCreditYear({ state }, props) {
        return axios
            .post("updateLeaveCreditYear", props.ciphertext)
            .then((result) => {
                state.leaveCreditYear[props.index] = props.editedData;

                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteLeaveCreditYear({ state }, props) {
        console.log(props);
        const index = state.leaveCreditYear.indexOf(props.item);
        return axios
            .delete("deleteLeaveCreditYear/" + props.id)
            .then((result) => {
                state.leaveCreditYear.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

const getters = {
    allLeaveCreditYearGetters: (state) => state.leaveCreditYear,
};

export default {
    state,
    mutations,
    actions,
    getters,
}