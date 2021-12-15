import axios from "axios";

// initial state
const state = () => ({
    siteType: [],
});

// mutations
const mutations = {
    setSiteType(state, data) {
        state.siteType = JSON.parse(data).data;
    },
};

// actions
const actions = {
    siteTypeAction({ dispatch, state }, data) {
        return axios
            .post("siteSetupAction", data)
            .then(async(result) => {
                try {
                    await dispatch("getSiteType");
                    state.siteType[state.siteType.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getSiteType() {
        return axios
            .get("getAllSites")
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateSiteType({ state }, props) {
        return axios
            .post("siteSetupAction", props.ciphertext)
            .then((result) => {
                state.siteType[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteSiteType({ state }, props) {
        const index = state.siteType.indexOf(props.item);
        return axios
            .delete("deleteSiteType/" + props.id)
            .then((result) => {
                state.siteType.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allSiteType: (state) => state.siteType,
};

export default {
    state,
    mutations,
    actions,
    getters,
};