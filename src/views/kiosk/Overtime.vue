
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
    <b-container>
      <v-data-table
        v-if="!addRequest"
        :headers="headers"
        :items="retrieveOTData"
        :loading="loading"
        :search="search"
        @click:row="handleClick"
      >
       <template v-slot:top class="float-right" >
          <b-container>
            <b-row>
              <b-col sm="8" class="font-weight-bold text-secondary"
                >Overtime</b-col
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
                    color="info"
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
      <RequestForm v-else :clickData="viewData" :mode="mode" :requestType="request"></RequestForm>
    </b-container>
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
    RequestForm,
    Request,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data: () => ({
    search:"",
    mode: "add",
    addRequest: false,
    editedItem: {},
    defaultItem: {},
    request: "",
    loading: false,
    edit: false,
    yearData: [],
    viewData:null,
    year: "",
    headers: [
      {
        text: "ID",
        align: "start",
        value: "RequestID",
      },
      { text: "Request", value: "Form" },
      { text: "In Date", value: "StartDate" },
      { text: "Out Date", value: "EndDate" },
      { text: "Requester", value: "Requester" },
      { text: "Created By", value: "CreatedBy" },
      { text: "Date Created", value: "CreatedDate" },
      { text: "Status", value: "Status" },
    ],
    overtimeData: [],
    editedIndex: -1,
    EmpID: JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo,
  }),
  created() {
    EventBus.$on("closeRequest", (data) => {
      console.log("close");
      if (data) {
         this.mode="add"
        this.retrieveData();
        this.addRequest = false;
      }
    });

    EventBus.$on("addRequest", (data) => {
      this.addRequest = true;
      this.request = data;
      console.log(this.request);
    });

    this.retrieveData();
    this.retrieveYear();
  },
  computed: {
    retrieveOTData() {
      if (!this.overtimeData || this.overtimeData.length === 0) return [];
      return this.overtimeData.map((item) => {
        return {
          ...item,
          StartDate: moment(item.StartDate).format("L"),
          EndDate: moment(item.EndDate).format("L"),
          CreatedDate: moment(item.CreatedDate).format("L"),
        };
      });
    },
  },
  methods: {
    handleClick(row) {
      console.log("not");
      this.retrieveOTData.map((item, index) => {
        item.selected = item === row;
        this.$set(this.retrieveOTData, index, item);
      });
      // EventBus.$emit("viewRequest", row);
      this.viewData=row;
      this.addRequest = true;
      this.request = { item: ["OT"] };
      this.mode="view"
    },
    retrieveData: async function () {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllOvertime",
          "setOvertimeData",
          "allOvertimeData"
        );

       for (const item of getdata) {
          if (item.EmpID == this.EmpID) {
            this.overtimeData.push(item);
          }
        }
        this.overtimeData=this.overtimeData.reverse()
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
</style>