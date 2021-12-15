import axios from "axios";

const state = () => ({
    kioskFilter: [],
    // kioskEmployee: [],
    employees: [],
    newRequestID: [],
    userInfo: [],
    requestID: [],
    kioskWorkflow: [],
    awaitingApproval: [],
});

const mutations = {
    setKioskFilter(state, data) {
        state.kioskFilter = JSON.parse(data).data;
    },
    setRequestID(state, data) {
        state.requestID = JSON.parse(data).data;
    },
    setNewRequestID(state, data) {
        state.newRequestID = JSON.parse(data).data;
    },
    setUserInfo(state, data) {
        state.userInfo = JSON.parse(data).data;
    },
    setEmployees(state, data) {
        state.employees = JSON.parse(data).data;
    },
    setKioskWorkflow(state, data) {
        state.kioskWorkflow = JSON.parse(data).data;
    },
    setAwaitingApproval(state, data) {
        state.awaitingApproval = JSON.parse(data).data;
    },
};

const actions = {
    addRequestHeader({ commit }, data) {
        return axios
            .post("addRequestHeader", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    addRequestAttachment({ commit }, data) {
        return axios
            .post("addRequestAttachment", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },
    uploadFile(context, file) {
        console.log([...file]);
        return axios
            .post(
                "uploadAttachment",
                file, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                console.log(response.data)
                context;
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    },

    downloadFile(filename) {
        return axios.get("employee/downloadAttachment?filename=" + filename)
            .response((response) => {
                let blob = new Blob([response.data], { type: 'application/octet-stream' })
                let ref = this.state.ref
                ref.current.href = URL.createObjectURL(blob)
                ref.current.download = filename
                ref.current.click()
            })
    },
    downloadAttachment(context, file) {
        console.log([...file]);
        return axios
            .get(
                "employee/downloadAttachment?filename=",
                file, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                console.log(response.data)
                context;
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    },

    addRequestWorkflow({ commit }, data) {
        return axios
            .post("addRequestWorkflow", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    addRequestDetailShift({ commit }, data) {
        return axios
            .post("addRequestDetailShift", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    addRequestRequester({ commit }, data) {
        return axios
            .post("addRequestRequester", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    addRequestDetailCOA({ commit }, data) {
        return axios
            .post("addRequestDetailCOA", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    addRequestDetailOT({ commit }, data) {
        return axios
            .post("addRequestDetailOT", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    addRequestDetailLeave({ commit }, data) {
        return axios
            .post("addRequestDetailLeave", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    addRequestCC({ commit }, data) {
        return axios
            .post("addRequestCC", data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    processApproval({ commit }, data) {
        // console.log(data.data);
        return axios
            .post("processApproval", data.data)
            .then(async(result) => {
                try {
                    commit;
                } catch (error) {
                    return error;
                }
                return result;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveAwaitingApproval({ commit }, data) {
        // console.log(data);
        return axios
            .post("getAwaitingApproval", data.param.data)
            .then(async(result) => {
                try {
                    commit;
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveAwaitingApprovalData({ commit }, data) {
        // console.log(data);
        return axios
            .post("getAwaitingApproval", data.param.data)
            .then(async(result) => {
                try {
                    commit;
                    return result;
                } catch (error) {
                    return error;
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveRequestID({ state }, data) {
        state.requestID = [];
        return axios
            .get("getRequestID/" + data.id)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveUserInformation({ state }, data) {
        state.userInfo = [];
        return axios
            .get("getUserInformation/" + data.id)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveKioskWorkflow({ state }, data) {
        state.kioskWorkflow = [];
        return axios
            .get("getKioskWorkflow/" + data.id)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveEmployees({ state }, data) {
        state.employees = [];
        return axios
            .get("getEmployeeExcludeByID/" + data.id)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveKioskFilterCOA() {
        return axios
            .get("getYear/coa")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveKioskFilterOvertime() {
        return axios
            .get("getYear/overtime")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveKioskFilterShift() {
        return axios
            .get("getYear/shift")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },
    retrieveKioskFilterLeave() {
        return axios
            .get("getYear/leave")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },

    retrieveNewRequestID() {
        return axios
            .get("getNewRequestID")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    },
};

const getters = {
    allKioskFilter: (state) => state.kioskFilter,
    // allKioskEmployee: (state) => state.kioskEmployee,
    newRequestID: (state) => state.newRequestID,
    requestID: (state) => state.requestID,
    allUserInformation: (state) => state.userInfo,
    allEmployees: (state) => state.employees,
    allKioskWorkflow: (state) => state.kioskWorkflow,
    allAwatingApproval: (state) => state.awaitingApproval,
};

export default {
    state,
    mutations,
    actions,
    getters,
};