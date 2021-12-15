import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import payroll from "./modules/payroll";
import address from "./modules/address";
import deduction from "./modules/deduction";
import emergencyContact from "./modules/emergencyContact";
import costCenter from "./modules/costCenter";
import user_session from "./modules/user_session";
import workFlow from "./modules/workFlow";
import payComponent from "./modules/payComponent";
import dependent from "./modules/dependent";
import trainings from "./modules/trainings";
import basicInfo from "./modules/basicInfo";
import educational from "./modules/educational";
import otherData from "./modules/otherData";
import jobHistory from "./modules/jobHistory";
import legislative from "./modules/legislative";
import license from "./modules/license";
import phone from "./modules/phone";
import citizenship from "./modules/citizenship";
import visa from "./modules/visa";
import leaveCredits from "./modules/leaveCredits";
import logs from "./modules/logs";
import shift from "./modules/shift";
import ethnicity from "./modules/ethnicity";
import nid from "./modules/nid";
import passport from "./modules/passport";
import processTimesheet from "./modules/processTimesheet";

import timesheet from "./modules/timesheet";
import coa from "./modules/certificateOfAttendant";
import overtime from "./modules/overtime";
import kioskShift from "./modules/kioskShift";
import leave from "./modules/leave";
import leaveBalances from "./modules/leaveBalances";
import selectPeriod from "./modules/selectPeriod";
import selectEmployee from "./modules/selectEmployee";
import kiosk from "./modules/kiosk";
import setupCostCenter from "./modules/human-resources/costCenter";
import setupCitizenship from "./modules/human-resources/citizenship";
import SetupHolidayType from "./modules/human-resources/holidayType";
import SetupProject from "./modules/human-resources/project";
import setupSuffix from "./modules/human-resources/suffixType";
import setupSiteLocation from "./modules/human-resources/siteLocation";
import setupWorkerType from "./modules/human-resources/workerType";
import setupTraining from "./modules/human-resources/training";
import setupTimekeeping from "./modules/human-resources/timekeeping";
import setupRegularizationPA from "./modules/human-resources/regularization";
import setupVisa from "./modules/human-resources/visaSetup";
import bank from "./modules/human-resources/bank";
import bloodTypes from "./modules/human-resources/bloodType";
import employeeCustomFields from "./modules/human-resources/employeeCustomFields";
import businessUnit from "./modules/human-resources/businessUnit";
import designation from "./modules/human-resources/designation";
import civilStatus from "./modules/human-resources/civilStatus";
import employmentType from "./modules/human-resources/employmenttype";
import department from "./modules/human-resources/department";
import leaveCreditYear from "./modules/human-resources/leaveCreditYear";
import company from "./modules/human-resources/company";
import grade from "./modules/human-resources/grade";
import division from "./modules/human-resources/division";
import jobCategory from "./modules/human-resources/jobCategory";
import jobCode from "./modules/human-resources/jobCode";
import leaveType from "./modules/human-resources/leaveType";
import managerType from "./modules/human-resources/managerType";
import reason from "./modules/human-resources/reason";
import location from "./modules/human-resources/location";
import holidays from "./modules/human-resources/holiday";
import jobFamilyNamesAll from "./modules/human-resources/jobFamilyName";
import addressType from "./modules/human-resources/addressType";
import jobLevel from "./modules/human-resources/jobLevel";
// import LeaveCreditYear from "./modules/human-resources/leaveCreditYear";
import employeeStatus from "./modules/human-resources/employeeStatus";
import groupPersonalAccident from "./modules/human-resources/groupPersonalAccident";
import gender from "./modules/human-resources/gender";
import prefix from "./modules/human-resources/prefix";
import religion from './modules/human-resources/religion';
import ethnicitySetup from "./modules/human-resources/ethnicitySetup";
import region from './modules/human-resources/region';
import period from './modules/human-resources/period';
import gradeRate from './modules/human-resources/gradeRate';


Vue.use(Vuex);

// axios.defaults.baseURL = "http://localhost:51424/api";
axios.defaults.baseURL = "http://ec2-13.212.61.138.ap-southeast-1.compute.amazonaws.com/api";
export default new Vuex.Store({
    modules: {
        basicInfo,
        payroll,
        address,
        deduction,
        emergencyContact,
        costCenter,
        workFlow,
        payComponent,
        dependent,
        trainings,
        user_session,
        educational,
        legislative,
        license,
        otherData,
        jobHistory,
        phone,
        visa,
        leaveCredits,
        citizenship,
        ethnicity,
        logs,
        shift,
        nid,
        passport,
        processTimesheet,
        timesheet,
        coa,
        overtime,
        leave,
        kioskShift,
        selectPeriod,
        selectEmployee,
        leaveBalances,
        kiosk,
        setupCostCenter,
        setupCitizenship,
        SetupHolidayType,
        SetupProject,
        setupSuffix,
        setupSiteLocation,
        setupWorkerType,
        setupTraining,
        setupTimekeeping,
        setupRegularizationPA,
        setupVisa,
        bloodTypes,
        bank,
        businessUnit,
        designation,
        civilStatus,
        employmentType,
        department,
        gradeRate,
        leaveCreditYear,
        company,
        grade,
        division,
        jobCategory,
        jobCode,
        leaveType,
        managerType,
        reason,
        location,
        holidays,
        jobFamilyNamesAll,
        addressType,
        jobLevel,
        // LeaveCreditYear,
        employeeStatus,
        groupPersonalAccident,
        employeeCustomFields,
        gender,
        prefix,
        religion,
        ethnicitySetup,
        region,
        period,
    },
    state: {
        // Employment master file datas
        companies: [],
        departments: [],
        employeeStatus: [],
        jobLevels: [],
        jobCategories: [],
        jobDesignations: [],
        jobLocations: [],
        jobRegions: [],
        jobSites: [],
        reasons: [],
        projects: [],
        sites: [],
        jobBusinessUnits: [],
        jobFamilyNames: [],
        jobCodes: [],
        employmentType: [],
        divisions: [],
        grades: [],
        gradeRates: [],
        workerTypes: [],
        costCenterSetUps: [],
        // End of employment master file datas
        employmentData: [],
        payrollData: [],
        deductionData: [],
        trainingData: [],
        division: [],
        jobCategory: [],
        jobCode: [],
        leaveType: [],
        managerType: [],
        reason: [],
        location: [],
        holiday: [],
        jobFamilyName: [],
        drawerState: null
    },
    mutations: {
        // Mutations for master file
        // Start of mutations for employment related
        setCompanies(state, data) {
            state.companies = JSON.parse(data).data;
        },

        setDepartments(state, data) {
            state.departments = JSON.parse(data).data;
        },

        setEmployeeStatus(state, data) {
            state.employeeStatus = JSON.parse(data).data;
        },

        setJobLevels(state, data) {
            state.jobLevels = JSON.parse(data).data;
        },

        setJobCategories(state, data) {
            state.jobCategories = JSON.parse(data).data;
        },

        setJobDesignations(state, data) {
            state.jobDesignations = JSON.parse(data).data;
        },

        setJobLocations(state, data) {
            state.jobLocations = JSON.parse(data).data;
        },

        setJobRegions(state, data) {
            state.jobRegions = JSON.parse(data).data;
        },

        setJobSites(state, data) {
            state.jobSites = JSON.parse(data).data;
        },

        setReasons(state, data) {
            state.reasons = JSON.parse(data).data;
        },

        setProjects(state, data) {
            state.projects = JSON.parse(data).data;
        },

        setSites(state, data) {
            state.sites = JSON.parse(data).data;
        },

        setJobBusinessUnits(state, data) {
            state.jobBusinessUnits = JSON.parse(data).data;
        },

        setJobFamilyNames(state, data) {
            state.jobFamilyNames = JSON.parse(data).data;
        },

        setJobCodes(state, data) {
            state.jobCodes = JSON.parse(data).data;
        },

        setEmploymentType(state, data) {
            state.employmentType = JSON.parse(data).data;
        },

        setDivisions(state, data) {
            state.divisions = JSON.parse(data).data;
        },

        setGrades(state, data) {
            state.grades = JSON.parse(data).data;
        },

        setGradeRates(state, data) {
            state.gradeRates = JSON.parse(data).data;
        },

        setWorkerTypes(state, data) {
            state.workerTypes = JSON.parse(data).data;
        },
        setCostCenterSetUps(state, data) {
            state.costCenterSetUps = JSON.parse(data).data;
        },
        // End of mutations for masterfile

        setEmploymentData(state, responseData) {
            const dataToAdd = JSON.parse(responseData);
            state.employmentData = dataToAdd.data;
        },
        toggleDrawerState(state) {
            state.drawerState = !state.drawerState
        }
    },
    actions: {
        decryptData({ commit }, props) {
            return axios
                .post("test/decrypt", { ciphertext: props.data })
                .then((res) => {
                    commit(props.mutation, res.data);
                    return res;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        encryptData({ state }, props) {
            return axios
                .post("test/encrypt", props.data)
                .then((result) => {
                    state.encryptedData = result.data;
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        // Master file
        // Start employment related
        getCompanies() {
            return axios
                .get("getAllCompanySetup")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getDepartments() {
            return axios
                .get("getAllDepartments")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getEmployeeStatus() {
            return axios
                .get("getAllEmployeeStatus")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobLevels() {
            return axios
                .get("getAllJobLevels")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobCategories() {
            return axios
                .get("getAllJobCategories")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobDesignations() {
            return axios
                .get("getAllDesignations")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobLocations() {
            return axios
                .get("getAllLocations")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobRegions() {
            return axios
                .get("getAllRegions")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobSites() {
            return axios
                .get("getAllSites")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getReasons() {
            return axios
                .get("getAllReasons")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getProjects() {
            return axios
                .get("getAllProjects")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobBusinessUnits() {
            return axios
                .get("getAllBusinessUnits")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobFamilyNames() {
            return axios
                .get("getAllJobFamilyNames")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getJobCodes() {
            return axios
                .get("getAllJobCodes")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getEmploymentType() {
            return axios
                .get("getAllEmploymentType")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getDivisions() {
            return axios
                .get("getAllDivision")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getGrade() {
            return axios
                .get("getAllGrades")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getGradeRates() {
            return axios
                .get("getAllGradeRates")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getWorkerTypes() {
            return axios
                .get("getAllWorkerTypes")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },
        getCostCenterSetUps() {
            return axios
                .get("getAllCostCenterSetup")
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },
        // End employment related

        //
        // End of master file

        createEmploymentData({ dispatch }, data) {

            return axios
                .post("createEmploymentData", data)
                .then(async(result) => {
                    try {
                        await dispatch("getEmploymentData");
                    } catch (error) {
                        return error;
                    }
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        getEmploymentData() {

            return axios
                .get("getAllEmploymentDataById/" + JSON.parse(sessionStorage.getItem("user_session")).empId)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        updateEmploymentData({ state }, props) {
            return axios
                .post("updateEmploymentData", props.ciphertext)
                .then((result) => {
                    state.employmentData[props.index] = props.editedData;
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },

        deleteEmploymentData({ state }, props) {
            let index = state.employmentData.indexOf(props.item);
            return axios
                .delete("deleteEmploymentData/" + props.id)
                .then((result) => {
                    state.employmentData.splice(index, 1);
                    return result;
                })
                .catch((err) => {
                    return err.response;
                });
        },
    },
    getters: {
        // masterfile related
        // start of employment related
        allCompanies: (state) => state.companies,
        allDepartments: (state) => state.departments,
        allEmployeeStatus: (state) => state.employeeStatus,
        allJobLevels: (state) => state.jobLevels,
        allJobCategories: (state) => state.jobCategories,
        allJobDesignations: (state) => state.jobDesignations,
        allJobLocations: (state) => state.jobLocations,
        allJobRegions: (state) => state.jobRegions,
        allJobSites: (state) => state.jobSites,
        allReasons: (state) => state.reasons,
        allProjects: (state) => state.projects,
        allJobBusinessUnits: (state) => state.jobBusinessUnits,
        allJobFamilyNames: (state) => state.jobFamilyNames,
        allJobCodes: (state) => state.jobCodes,
        allEmploymentType: (state) => state.employmentType,
        allDivisions: (state) => state.divisions,
        allGrades: (state) => state.grades,
        allGradeRates: (state) => state.gradeRates,
        allWorkerTypes: (state) => state.workerTypes,
        allCostCenterSetUp: (state) => state.costCenterSetUps,
        // end of employment related
        // end of masterfile related
        allEmploymentData: (state) => state.employmentData,
    },
});