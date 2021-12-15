<template>
  <v-app>
    <!-- <v-text-field type="date"></v-text-field> -->

    <ModalIdle v-if="isIdle" />
    <router-view />
  </v-app>
</template>

<script>
import PromptAlert from "@/utils/PromptAlert";
import ModalIdle from "@/components/ModalIdle";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import { EventBus } from "@/bus/bus";
export default {
  name: "App",

  components: {
    ModalIdle,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],

  data() {
    return {
      timeLeft: 10000,
    };
  },
watch: {
$route(){
    EventBus.$off("deleteItem");
    console.log('Route changed');
}
},
  created() {
    const storedSession = sessionStorage.getItem("user_session");
    const storedSessionData = JSON.parse(storedSession);
    //console.log(storedSessionData);

    let currentRoute = this.$route;
    if (storedSessionData && storedSessionData.access_token) {
      this.$axios.defaults.headers.common.Authorization = `bearer ${storedSessionData.access_token}`;
      this.$router
        .push(
          currentRoute.path != "/login"
            ? { path: currentRoute.path }
            : { path: "/home" }
        )
        .catch(() => {});
    } else {
      this.$router.push({ path: "/login" }).catch(() => {});
    }
    this.initializeEmploymentRelated();
    this.initializeKioskRelated();
  },

  methods: {
    // Parent method for employment Related
    initializeEmploymentRelated: async function () {
      try {
        await this.getCompanies();
        await this.getDepartments();
        await this.getEmployeeStatus();
        await this.getJobLevels();
        await this.getJobCategories();
        await this.getJobDesignations();
        await this.getJobLocations();
        await this.getJobRegions();
        await this.getJobSites();
        await this.getReasons();
        await this.getProjects();
        await this.getJobBusinessUnits();
        await this.getJobFamilyNames();
        await this.getJobCodes();
        await this.getEmploymentType();
        await this.getDivisions();
        await this.getGrade();
        await this.getGradeRates();
        await this.getWorkerTypes();
        await this.getPayFrequency();
        await this.getCostCenterSetUps();
        await this.getLeave();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },
    initializeKioskRelated: async function () {
      try {
        await this.getLeave();
        await this.getCOA();
        await this.getOT();
        await this.getShift();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },

    // Sub methods for employment related
    getCompanies: async function () {
      await this.retrieve("getCompanies", "setCompanies", "allCompanies");
    },

    getDepartments: async function () {
      await this.retrieve("getDepartments", "setDepartments", "allDepartments");
    },

    getEmployeeStatus: async function () {
      await this.retrieve(
        "getEmployeeStatus",
        "setEmployeeStatus",
        "allEmployeeStatus"
      );
    },

    getJobLevels: async function () {
      await this.retrieve("getJobLevels", "setJobLevels", "allJobLevels");
    },

    getJobCategories: async function () {
      await this.retrieve(
        "getJobCategories",
        "setJobCategories",
        "allJobCategories"
      );
    },

    getJobDesignations: async function () {
      await this.retrieve(
        "getJobDesignations",
        "setJobDesignations",
        "allJobDesignations"
      );
    },

    getJobLocations: async function () {
      await this.retrieve(
        "getJobLocations",
        "setJobLocations",
        "allJobLocations"
      );
    },

    getJobRegions: async function () {
      await this.retrieve("getJobRegions", "setJobRegions", "allJobRegions");
    },

    getJobSites: async function () {
      await this.retrieve("getJobSites", "setJobSites", "allJobSites");
    },

    getReasons: async function () {
      await this.retrieve("getReasons", "setReasons", "allReasons");
    },

    getProjects: async function () {
      await this.retrieve("getProjects", "setProjects", "allProjects");
    },

    getJobBusinessUnits: async function () {
      await this.retrieve(
        "getJobBusinessUnits",
        "setJobBusinessUnits",
        "allJobBusinessUnits"
      );
    },

    getJobFamilyNames: async function () {
      await this.retrieve(
        "getJobFamilyNames",
        "setJobFamilyNames",
        "allJobFamilyNames"
      );
    },

    getJobCodes: async function () {
      await this.retrieve("getJobCodes", "setJobCodes", "allJobCodes");
    },

    getEmploymentType: async function () {
      await this.retrieve(
        "getEmploymentType",
        "setEmploymentType",
        "allEmploymentType"
      );
    },

    getDivisions: async function () {
      await this.retrieve("getDivisions", "setDivisions", "allDivisions");
    },

    getGrade: async function () {
      await this.retrieve("getGrade", "setGrades", "allGrades");
    },

    getGradeRates: async function () {
      await this.retrieve("getGradeRates", "setGradeRates", "allGradeRates");
    },

    getWorkerTypes: async function () {
      await this.retrieve("getWorkerTypes", "setWorkerTypes", "allWorkerTypes");
    },

    getPayFrequency: async function () {
      await this.retrieve(
        "getPayFrequency",
        "setPayFrequency",
        "allPayFrequency"
      );
    },

    getCostCenterSetUps: async function () {
      await this.retrieve(
        "getCostCenterSetUps",
        "setCostCenterSetUps",
        "allCostCenterSetUp"
      );
    },

    getLeave: async function () {
      await this.retrieve("retrieveAllLeave", "setLeaveData", "allLeaveData");
    },
    getCOA: async function () {
      await this.retrieve(
        "retrieveAllCertificateOfAttendant",
        "setCertificateData",
        "allCertificateData"
      );
    },
    getOT: async function () {
      await this.retrieve(
        "retrieveAllOvertime",
        "setOvertimeData",
        "allOvertimeData"
      );
    },
    getShift: async function () {
      await this.retrieve("retrieveAllShift", "setShiftData", "allShiftData");
    },
  },

  computed: {
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.v-application--wrap {
  background-color: #ffffff;
}
</style>
