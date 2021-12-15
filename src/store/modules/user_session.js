import axios from "axios";

const state = () => ({
    userToken: sessionStorage.getItem('user_session') ? JSON.parse(sessionStorage.getItem('user_session')) : null,
    userDetails: null,
});

const mutations = {
    setUserToken(state, data) {
        state.userToken = data;
        sessionStorage.setItem("user_session", data);
        axios.defaults.headers.common.Authorization = `bearer ${
      JSON.parse(data).access_token
    }`;
    },

    clearUserSession() {
        sessionStorage.removeItem("user_session");
        localStorage.removeItem("user_details");

        axios.defaults.headers.common.Authorization = "";
        location.reload();
    },

    setUserDetails(state, data) {
        state.userDetails = JSON.parse(data);
        localStorage.setItem('user_details', data);
    }
};

const actions = {
    loginLocally({ commit }, data) {
        return axios
            .post("user/login", data)
            .then((result) => {
                console.log(result.message);

                commit("setUserToken", result.data);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    loginUsingGoogle({ commit }, data) {
        return axios
            .post("user/loginWithGoogle", data)
            .then((result) => {
                if (result.data) {
                    console.log(result.data + "result.data");
                    commit("setUserToken", result.data);
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveUserData({ state, commit }) {
        return axios.get(`user/profile/${JSON.parse(state.userToken).empId}`).then((result) => {

            commit('setUserDetails', JSON.stringify(result.data));
            return result;
        }).catch((err) => {
            return err.response;
        });
    },

    logout({ commit }) {
        commit("clearUserSession");
        this.$router.push({
            path: window.location.host.split(':')[0] == "localhost" ? "/login" : ""
        });
    },
};

const getters = {
    loggedUserToken: (state) => state.userToken,
};

export default {
    state,
    actions,
    mutations,
    getters,
};