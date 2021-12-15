<template>
  <!-- [10/12/2021 CRUBIO] -->
  <v-app>
    <b-container v-if="!addRequest">
      <v-select
        class="mt-3 ml-2 float-left"
        v-model="year"
        :items="yearData"
        label="Year"
        :disabled="year == '' ? true : false"
        dense
        flat
        variant="primary"
        append-icon=""
      ></v-select>
      <Request class="float-right"></Request>
    </b-container>
    <v-divider v-if="!addRequest"></v-divider>
    <v-data-table
      class="table"
      v-if="!addRequest"
      :headers="headers"
      :items="retrieveCOAData"
      :loading="loading"
      :search="search"
      @click:row="handleClick"
    >
      <template v-slot:top class="float-right">
        <b-container>
          <b-row>
            <b-col sm="8" class="font-weight-bold text-secondary"
              >Certificate of Attendance</b-col
            >
            <b-col sm="4">
              <b-form-input
                id="input-none"
                class="mb-4"
                v-model="search"
                placeholder="Search"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <template class="" v-slot:[`item.Form`]="{ item }">
        <v-chip class="ma-2" small label color="green" text-color="white">
          {{ item.Form }}
        </v-chip>
      </template>
      <template class="" v-slot:[`item.Status`]="{ item }">
        <v-chip
          class="ma-2"
          small
          label
          :color="
            item.Status == 'Approved'
              ? 'primary'
              : item.Status == 'For Approval'
              ? 'orange'
              : 'danger'
          "
          text-color="white"
        >
          {{ item.Status }}
        </v-chip>
      </template>
    </v-data-table>

    <RequestForm
      v-else
      :clickData="viewData"
      :mode="mode"
      :requestType="request"
    ></RequestForm>
  </v-app>
</template>
<script>
// import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import RequestForm from /* webpackChunkName: "Data Table" */ "@/components/RequestForm.vue";
import Request from /* webpackChunkName: "Data Table" */ "@/components/AddRequest.vue";
import { EventBus } from "../../bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import moment from "moment";

export default {
  components: {
    // DefaultDataTable,
    RequestForm,
    Request,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data: () => ({
    search: "",
    addRequest: false,
    certificateData: [],
    request: "",
    loading: true,
    edit: false,
    yearData: [],
    year: "",
    viewData: [],
    mode: "add",
    EmpID: JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "RequestID",
      },
      { text: "Request", value: "Form" },
      { text: "Date", value: "Date" },
      { text: "Requester", value: "Requester" },
      { text: "Created By", value: "CreatedBy" },
      { text: "Date Created", value: "CreatedDate" },
      { text: "Status", value: "Status" },
    ],
    editedItem: {},
    defaultItem: {
      ID: null,
      Form: null,
      Request: null,
      Date: null,
      Requester: null,
      CreatedDate: null,
      RequesterName: null,
      Status: null,
    },
    editedIndex: -1,
  }),

  created() {
    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });
    EventBus.$on("addRequest", (data) => {
      this.addRequest = true;
      this.request = data;
      console.log(this.request);
    });
    EventBus.$on("closeRequest", (data) => {
      if (data) {
        this.mode = "add";
        this.retrieveData();
        this.addRequest = false;
      }
    });
    this.retrieveData();
    this.retrieveYear();
    console.log(
      JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo
    );
  },
  computed: {
    retrieveCOAData() {
      if (!this.certificateData || this.certificateData.length === 0) return [];
      return this.certificateData.map((item) => {
        return {
          ...item,
          Date: moment(item.Date).format("L"),
          CreatedDate: moment(item.CreatedDate).format("L"),
          StartTimeDate: moment(item.StartTimeDate).format("L"),
          StartTime: moment(item.StartTime, "HHmm").format("HH:mm:ss"),
          EndTimeDate: moment(item.EndTimeDate).format("L"),
          EndTime: moment(item.EndTime, "HHmm").format("HH:mm:ss"),

          StartTimeDate2: moment(item.StartTimeDate2).format("L"),
          StartTime2: moment(item.StartTime2, "HHmm").format("HH:mm:ss"),
          EndTimeDate2: moment(item.EndTimeDate2).format("L"),
          EndTime2: moment(item.EndTime2, "HHmm").format("HH:mm:ss"),
        };
      });
    },
  },
  methods: {
    retrieveData: async function () {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllCertificateOfAttendant",
          "setCertificateData",
          "allCertificateData"
        );

        for (const item of getdata) {
          if (item.EmpID == this.EmpID) {
            this.certificateData.push(item);
          }
        }
        this.certificateData = this.certificateData.reverse();
        // this.certificateData = getdata
        //   .reverse()
        //   .filter((item) => this.EmpID.includes(item.EmpID));
        // console.log(getdata);
        // for (let index = 0; index < getdata.length; index++) {
        //   if(getdata[index]['EmpID'] == JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo) {
        //       this.certificateData.push(getdata[index])
        //   }

        // }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    retrieveYear: async function () {
      try {
        let getYear = await this.retrieve(
          "retrieveKioskFilterOvertime",
          "setKioskFilter",
          "allKioskFilter"
        );
        this.yearData = getYear ? getYear : [];
        this.year = getYear.slice(0)[0];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    handleClick(row) {
      this.retrieveCOAData.map((item, index) => {
        item.selected = item === row;
        this.$set(this.retrieveCOAData, index, item);
      });
      this.viewData = row;
      this.addRequest = true;
      this.request = { item: ["COA"] };
      this.mode = "view";
      console.log(row);
    },
  },
};
</script>
<style scoped>
.sub-menu {
  position: absolute;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  z-index: 1;
}
.menu {
  border-radius: 20px;
  padding: 2px;
  color: white !important;
  background-color: rgb(67, 44, 170);
}
</style>