<template>
  <!-- [10/12/2021 CRUBIO] -->
  <v-app>
    <b-container v-if="!addRequest">
      <v-select
        :disabled="year == '' ? true : false"
        class="mt-3 ml-2 float-left"
        v-model="year"
        :items="yearData"
        label="Year"
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
      :items="retrieveLeaveData"
      @click:row="handleClick"
      :loading="loading"
      :search="search"
    >
     <template v-slot:top class="float-right" >
          <b-container>
            <b-row>
              <b-col sm="8" class="font-weight-bold text-secondary"
                >Leave</b-col
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
         <template class="" v-slot:[`item.LeaveType`]="{ item }" >
                   
                  <v-chip
                    class="ma-2"
                    small
                    label
                    color="orange"
                    text-color="white"  
                  >
                    {{ item.LeaveType }}
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
export default {
  components: {
    // DefaultDataTable,
    RequestForm,
    Request,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data: () => ({
    mode: "add",
    viewData: null,
    search:"",
    addRequest: false,
    editedItem: {},
    defaultItem: {},
    request: "",
    yearData: [],
    year: "",
    loading: true,
    edit: false,
    EmpID: JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "RequestID",
      },
      { text: "Leave Type", value: "LeaveType" },
      { text: "Date", value: "Date" },
      { text: "Start Date", value: "StartDate" },
      { text: "End Date", value: "EndDate" },
      { text: "Requester", value: "Requester" },
      { text: "Created By", value: "CreatedBy" },
      { text: "Date Created", value: "CreatedDate" },
      { text: "Status", value: "Status" },
    ],
    leaveData: [],
    editedIndex: -1,
  }),
  created() {
  
    EventBus.$on("addRequest", (data) => {
      this.addRequest = true;
      this.request = data;
    });
    EventBus.$on("closeRequest", (data) => {
      if (data) {
        this.mode = "add";
        this.retrieveData();
        this.addRequest = false;
      }
    });
    this.retrieveData();
  },
  computed: {
    retrieveLeaveData() {
      if (!this.leaveData || this.leaveData.length === 0) return [];
      return this.leaveData.map((item) => {
        return {
          ...item,
          Date:
            item.LeaveType == "Undertime"
              ? moment(item.Date).format("L")
              : "N/A",
          CreatedDate: moment(item.CreatedDate).format("L"),
          StartDate:
            item.StartDate == "1978-12-12T00:00:00"
              ? "N/A"
              : moment(item.StartDate).format("L"),
          EndDate:
            item.EndDate == "1978-12-12T00:00:00"
              ? "N/A"
              : moment(item.EndDate).format("L"),
        };
      });
    },
  },
  methods: {
    handleClick(row) {
      this.retrieveLeaveData.map((item, index) => {
        item.selected = item === row;
        this.$set(this.retrieveLeaveData, index, item);
      });
      // EventBus.$emit("viewRequest", row);
      this.viewData = row;
      this.addRequest = true;
      this.request = { item: ["Leave", row.LeaveType] };
      this.mode = "view";
    },
    retrieveData: async function () {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllLeave",
          "setLeaveData",
          "allLeaveData"
        );
        if (getdata == null) {
          this.loading == false;
        }
        let getYear = await this.retrieve(
          "retrieveKioskFilterLeave",
          "setKioskFilter",
          "allKioskFilter"
        );
        // console.log(getdata);
        // for (let index = 0; index < getdata.length; index++) {
        //   if (
        //     getdata[index]["EmpID"] ==
        //     JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo
        //   ) {
        //     this.leaveData.push(getdata[index]);
        //   }
        // }
          //  this.leaveData = getdata
          // .reverse()
          // .filter((item) => this.EmpID.includes(item.EmpID));
          for (const item of getdata) {
          if (item.EmpID == this.EmpID) {
            this.leaveData.push(item);
          }
        }
        this.leaveData = this.leaveData.reverse();
        console.log(this.leaveData);

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