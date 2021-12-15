import axios from "axios";

// initial state
const state = () => ({
    leaveType: [],
});

// mutations
const mutations = {
    setLeaveType(state, data) {
        state.leaveType = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createLeaveType({ dispatch }, data) {
        return axios
            .post("createLeaveType", data)
            .then(async (result) => {
                try {
                    await dispatch("getLeaveType");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getLeaveType() {
        return axios
            .get("getAllLeaveTypes")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateLeaveType({ state }, props) {
        return axios
            .post("updateLeaveType", props.ciphertext)
            .then((result) => {
                state.leaveType[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteLeaveType({ state }, props) {
        const index = state.leaveType.indexOf(props.item);
        return axios
            .delete("deleteLeaveType/" + props.id)
            .then((result) => {
                state.leaveType.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allLeaveType: (state) => state.leaveType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
