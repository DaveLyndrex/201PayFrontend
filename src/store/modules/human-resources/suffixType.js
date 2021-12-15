import axios from "axios";

// initial state
const state = () => ({
    suffixType: [],
});

// mutations
const mutations = {
    setSuffixType(state, data) {
        state.suffixType = JSON.parse(data).data;
    },

};

// actions
const actions = {

    suffixTypeAction({ dispatch, state }, data) {
        return axios
            .post("suffixSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getSuffixType");
                    state.suffixType[state.suffixType.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },



    getSuffixType() {
        return axios
            .get("getAllSuffixes")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateSuffixType({ state }, props) {
        return axios
            .post("suffixSetupAction", props.ciphertext)
            .then((result) => {
                state.suffixType[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteSuffixType({ state }, props) {
        const index = state.suffixType.indexOf(props.item);
        return axios
            .delete("deleteSuffixType/" + props.id)
            .then((result) => {
                state.suffixType.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allSuffixType: (state) => state.suffixType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};