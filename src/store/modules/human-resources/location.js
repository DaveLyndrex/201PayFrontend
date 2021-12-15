import axios from "axios";

// initial state
const state = () => ({
    location: [],
});

// mutations
const mutations = {
    setLocation(state, data) {
        state.location = JSON.parse(data).data;
    },

};

// actions
const actions = {

    createLocation({ dispatch, state }, data) {
        return axios
            .post("createLocation", data)
            .then(async (result) => {
                try {
                    await dispatch("getLocation");
                    state.location[state.location.length] = data
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getLocation() {
        return axios
            .get("getAllLocations")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    updateLocation({ state }, props) {
        return axios
            .post("updateLocation", props.ciphertext)
            .then((result) => {
                state.location[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    deleteLocation({ state }, props) {
        const index = state.location.indexOf(props.item);
        return axios
            .delete("deleteLocation/" + props.id)
            .then((result) => {
                state.location.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allLocation: (state) => state.location,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
