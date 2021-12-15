<template>
  <!-- [10/12/2021 CRUBIO] -->
  <!-- [10/12/2021 JLAYAOG] -->
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
      v-if="!addRequest"
      :headers="headers"
      :items="retrieveShiftData"
      :loading="loading"
      @click:row="handleClick"
      :search="search"
    >
     <template v-slot:top class="float-right" >
          <b-container>
            <b-row>
              <b-col sm="8" class="font-weight-bold text-secondary"
                >Shift</b-col
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
         <template class="" v-slot:[`item.Form`]="{ item }" >
                   
                  <v-chip
                    class="ma-2"
                    small
                    label
                    color="green"
                    text-color="white"  
                  >
                    {{ item.Form }}
                  </v-chip>
              
                </template>
        <template class="" v-slot:[`item.Status`]="{ item }" >
                   
                  <v-chip
                    class="ma-2"
                    small
                    label
                    :color="item.Status=='Approved' ? 'primary': item.Status == 'For Approval' ? 'orange' :'danger' "
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
// import axios from "axios";
export default {
  components: {
    // DefaultDataTable,
    RequestForm,
    Request,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data: () => ({
    search:"",
    mode: "add",
    viewData: null,
    addRequest: false,
    editedItem: {},
    defaultItem: {},
    yearData: [],
    year: "",
    request: "",
    loading: true,
    edit: false,
    shiftData: [],
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
    editedIndex: -1,
    EmpID: JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo,
  }),
  created() {
    EventBus.$on("closeRequest", (data) => {
      console.log("close");
      if (data) {
        this.mode = "add";
        this.retrieveData();
        this.addRequest = false;
      }
    });
    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });
    EventBus.$on("addRequest", (data) => {
      this.addRequest = true;
      this.request = data;
      // console.log(this.request);
    });
    this.retrieveData();
    this.retrieveYear();
  },
  computed: {
    retrieveShiftData() {
      if (!this.shiftData || this.shiftData.length === 0) return [];
      return this.shiftData.map((item) => {
        return {
          ...item,
          Date: moment(item.Date).format("L"),
          CreatedDate: moment(item.CreatedDate).format("L"),
        };
      });
    },
  },
  methods: {
    handleClick(row) {
      this.retrieveShiftData.map((item, index) => {
        item.selected = item === row;
        this.$set(this.retrieveShiftData, index, item);
      });
      // EventBus.$emit("viewRequest", row);
      this.viewData = row;
      this.addRequest = true;
      this.request = { item: ["Shift"] };
      this.mode = "view";
    },
    retrieveData: async function () {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllShift",
          "setShiftData",
          "allShiftData"
        );
       

        for (const item of getdata) {
          if (item.EmpID == this.EmpID) {
            this.shiftData.push(item);
          }
        }
        this.shiftData=this.shiftData.reverse()
        // this.shiftData = getdata
        //   .reverse()
        //   .filter((item) => this.EmpID.includes(item.EmpID));

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
  },
};
</script>
<style scoped>
.v-select__selections {
  color: blue !important;
}
.v-select .v-select__selections {
  width: 50px !important;
}
</style>