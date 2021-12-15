import axios from "axios";

//  10/07/2021 CN CRUBIO 
//initial state
const state = () => ({
    period: [],
    payroll: [],
    report: [],
    location: [],
    employee: [],
    timesheet: [],
    postTimesheet: [],
    selected:[],
    setSpecificEmployeeLocaton:[],
});

const mutations = {
    setPeriodData(state, data) {
        state.period = JSON.parse(data).data;
    },

    setPayrollGroup(state, data) {
        state.payroll = JSON.parse(data).data;
    },
    setException(state, data) {
        state.report = JSON.parse(data).data;
    },
    setLocation(state, data) {
        state.location = JSON.parse(data).data;
    },
    setEmployee(state, data) {
        state.employee = JSON.parse(data).data;
    },
    setTimesheet(state, data) {
        state.timesheet = JSON.parse(data).data;
    },
    setSpecificEmployeeLocaton(state, data) {
        state.specificEmployeeLocation = JSON.parse(data).data
    },
    setPostTimesheetResult(state, data) {
        state.postTimesheet = JSON.parse(data).data
    }
    
};

const actions = {
    
   
    periodData({dispatch},data) {
        return axios
            .get("getAllPeriod/" + data)
            .then(async(result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
               
            })
            .catch((err) => {
                return err.response;
            });
    },

    getCurrentPeriod ({dispatch} , data) {
        console.log(data.data);
        return axios
            .post("getCurrentPeriod", data.data)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },
    
    payrollGroup() {
        return axios
            .get("getPayrollGroup")
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            })
    },

    passPayrollGroup( { dispatch }, data) {
        return axios
            .post("payrollGroup/"+ data)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },


    updateSelected({ dispatch }, data) { 
        console.log(data.data);
        return axios
            .post("validateTimesheet", data.data)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    ValidateAllUserTimesheet({dispatch}, data) {
        console.log(data.data);

        return axios
            .post("ValidateAllUserTimesheet", data.data)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    exceptionReport({dispatch} , data) {
        console.log(data);
        return axios
            .get("viewExceptionReport/" + data)
            .then(async (res) => {
                dispatch
                return res;
            })
            .catch((err) => {
                return err.response;
            })
    },

    location( {dispatch} , data) {
        return axios
            .get("getLocation/" + data)
            .then(async (res) => {
                dispatch
                return res;
            })
            .catch((err) => {
                return err.response;
            })
    },

    getSpecificEmployeeTimesheet({dispatch}, data) {
        console.log(data);
        return axios
            .post("getSpecificEmployeeTimesheet", data.data)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },
 
    getEmployee({dispatch} , data) {
        return axios
            .get("getEmployee/" + data)
            .then(async (res) => {
                dispatch
                
                return res;
            })
            .catch((err) => {
                return err.response;
            })
    },

    processTimesheet({ dispatch }, data) { 

        console.log(data.data);
        return axios
            .post("processTimesheet", data.data)
            .then(async (result) => {
                try {
                     dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },
    export_CSV({ dispatch }, data) { 

        console.log(data.data);
        return axios
            .post("exportCSV", data.data)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    getSpecificEmployeeLocation({ dispatch }, data) { 
        return axios
            .post("getSpecificEmployeeLocation", data.data)
            .then(async (result) => {
                try {
                    dispatch
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },

    postTimesheet({ dispatch }, data) { 

        return axios
            .post("postTimesheet", data.data)
            .then(async (result) => {
                try {
                    dispatch
                    this.postTimesheet = result;
                    return result
                } catch (error) {
                    return error
                }
            })
            .catch((err) => {
                return err.response;
            });
    },
};
const getters = {
    getPeriodData: (state) => state.period,
    getPayrollGroup: (state) => state.payroll,
    getException: (state) => state.report,
    getLocation: (state) => state.location,
    getEmployee: (state) => state.employee,
    getTimesheet: state => state.timesheet,
    getSelected: (state) => state.report,
};

export default {
    state,
    getters,
    actions,
    mutations,
};

