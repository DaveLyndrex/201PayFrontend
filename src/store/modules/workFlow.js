import axios from "axios";

// initial state
const state = () => ({
    approvalGroups: [],
    workFlowData: [],
    approverAndRater: []
});

// mutations
const mutations = {
    // master file data related
    setApprovalGroups(state, data) {
        state.approvalGroups = JSON.parse(data).data;
    },

    setApproverAndRater(state, data) {
        state.approverAndRater = JSON.parse(data).data;
    },
    // end of master file data related

    setWorkFlowData(state, data) {
        state.workFlowData = JSON.parse(data).data;
    },
};


// actions
const actions = {
    // master file data related
    retrieveApprovalGroup() {
        return axios
            .get("getAllApprovalGroups")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveApproverAndRater() {
        return axios
            .get("getAllApproverAndRater")
            .then((res) => {

                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    // end of master file data related

    createWorkFlow({ dispatch }, data) {
        return axios
            .post("createWorkflow", data)
            .then(async(result) => {
                try {
                    await dispatch("retrieveAllWorkflows");
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },
    // retrieveAllWorkFlows() {
    //   return axios
    //     .get("getAllApprovalWorkflow")
    //     .then((res) => {
    //       return res;
    //     })
    //     .catch((err) => {
    //       return err.response;
    //     });
    // },
    retrieveAllWorkflows() {
        state.workFlowData = [];
        return axios
            .get("getEmployeeWorkflow/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },
    updateWorkFlow({ state }, props) {
        return axios
            .post("updateWorkflow", props.ciphertext)
            .then((result) => {
                state.workFlowData[props.index] = props.editedData;
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
    deleteWorkflow({ state }, props) {
        const index = state.workFlowData.indexOf(props.item);
        return axios
            .delete("deleteWorkflow/" + props.id)
            .then((result) => {
                state.workFlowData.splice(index, 1);
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

// getters
const getters = {
    allApprovalGroups: state => state.approvalGroups,
    allWorkFlowData: (state) => state.workFlowData,
    allApproverAndRater: (state) => state.approverAndRater,
};

export default {
    state,
    mutations,
    actions,
    getters,
};