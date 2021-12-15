<template>
  <v-app>
    <b-container fluid>
      <v-toolbar flat v-if="!addRequest">
        <p class="mt-1 mr-4">Employee:</p>
        <!-- <v-select
          style="width: 50px"
          class="float-left font-size mr-30 w-15"
          v-model="empName"
          :items="employeeData"
          dense
          flat
          variant="primary"
          append-icon=""
        ></v-select> -->

        <p class="border-bottom border-secondary font-size pr-10">
          {{ FirstName + " " + LastName }}
        </p>
        <p class="mt-1 mr-4 ml-4">Period:</p>
        <!-- <p class="border-bottom border-secondary font-size pr-10">
          {{ currentPeriod || "Loading.. .&nbsp;&nbsp;&nbsp;" }}
        </p> -->
 
        <v-select
         style="width:0px"
          class="float-left font-size "
          :items="periodData"
          v-model="currentPeriod"
          dense
          flat
          variant="primary"
        ></v-select>
        <v-spacer></v-spacer>
        <Request class="mb-8"></Request>
      </v-toolbar>
    </b-container>
    <div class="">
      <v-data-table
        class="elevation-1 mt-2 border-top"
        v-if="!addRequest"
        v-model="selected"
        :headers="headers"
        :items="formattedItems"
        :search="search"
        item-key="ID"
        loading-text="Loading... Please wait."
        :calculate-widths="true"
        show-select
        dense
        @click:row="handleClick"
        :loading="loading"
      >
        <template v-slot:[`item.Absent1`]="{ item }">
          <p :class="item.Absent1 > 0 ? 'text-danger pt-4' : 'text-dark pt-4'">
            {{ item.Absent1 }}
          </p>
        </template>
        <template v-slot:[`item.Absent2`]="{ item }">
          <p :class="item.Absent2 > 0 ? 'text-danger pt-4' : 'text-dark pt-4'">
            {{ item.Absent2 }}
          </p>
        </template>
        <template v-slot:top class="float-right">
          <b-container>
            <b-row>
              <b-col sm="8" class="font-weight-bold text-secondary"
                >Employee Timesheet</b-col
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
      </v-data-table>
      <RequestForm v-else :timesheetDate="date" :requestType="request"></RequestForm>
    </div>
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
  // props:["timesheetDate"],
  components: {
    // DefaultDataTable,
    RequestForm,
    Request,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data: () => ({
    FirstName: JSON.parse(localStorage.getItem("user_details")).data.FirstName,
    LastName: JSON.parse(localStorage.getItem("user_details")).data.LastName,
    validated: [],
    dialog: false,
    toBeFilter: "All",
    timesheetsData: [],
    search: "",
    employeeData: [],
    employee: "",
    request: "",
    selected: [],
    periodData: [],
    currentPeriod: "",
    addRequest: false,
    loading: true,
    edit: false,
    date:null,
    AllID: [],

    headers: [
      {
        text: "ID",
        align: "d-none",
        value: "ID",
        class: "d-none",
        cellClass: "d-none",
      },
      { text: "Date", value: "Date" },
      { text: "Day Type", value: "DayTypeCode" },
      { text: "Shift", value: "ShiftCode" },
      { text: "In 1", value: "In1" },
      { text: "Out 1", value: "Out1" },
      { text: "In 2", value: "In2" },
      { text: "Out 2", value: "Out2" },
      { text: "Raw DTR", value: "RawDTR" },
      { text: "COA", value: "COA" },
      { text: "Leave", value: "Leave" },
      { text: "Tardy 1", value: "Tardy1" },
      { text: "Absent 1", value: "Absent1" },
      { text: "Undertime 1", value: "Undertime1" },
      { text: "Tardy 2", value: "Tardy2" },
      { text: "Absent 2", value: "Absent2" },
      { text: "Undertime 2", value: "Undertime2" },
      { text: "Req OT", value: "RequestedOT" },
      { text: "Req OT Hrs", value: "RequestedOTHrs" },
      { text: "OT", value: "OTHrs" },
      { text: "OT Paid", value: "OTHrsPaid" },
      { text: "ND", value: "NDHrs" },
    ],
  }),

  computed: {
    formattedItems() {
      if (!this.timesheetsData || this.timesheetsData.length === 0) return [];
      return this.timesheetsData.map((item) => {
        return {
          ...item,
          Date: moment(item.Date).format("L"),

          In1: item.In1 == 0 ? null : item.In1,
          Out1: item.Out1 == 0 ? null : item.Out1,
          In2: item.In2 == 0 ? null : item.In2,
          Out2: item.Out2 == 0 ? null : item.Out2,
          Absent1:
            item.Absent1 == 0 ? null : String(Number(item.Absent1).toFixed(2)),
          Tardy1:
            item.Tardy1 == 0 ? null : String(Number(item.Tardy1).toFixed(2)),
          Undertime1:
            item.Undertime1 == 0
              ? null
              : String(Number(item.Undertime1).toFixed(2)),
          Absent2:
            item.Absent2 == 0 ? null : String(Number(item.Absent2).toFixed(2)),
          Tardy2:
            item.Tardy2 == 0 ? null : String(Number(item.Tardy2).toFixed(2)),
          Undertime2:
            item.Undertime2 == 0
              ? null
              : String(Number(item.Undertime2).toFixed(2)),
          RequestedOTHrs:
            item.RequestedOTHrs == 0
              ? null
              : String(Number(item.RequestedOTHrs).toFixed(2)),
          OTHrs: item.OTHrs == 0 ? null : String(Number(item.OTHrs).toFixed(2)),
          OTHrsPaid:
            item.OTHrsPaid == 0
              ? null
              : String(Number(item.OTHrsPaid).toFixed(2)),
          NDHrs: item.NDHrs == 0 ? null : String(Number(item.NDHrs).toFixed(2)),
        };
      });
    },
  },

  created() {
    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });



    EventBus.$on("addRequest", (data) => {
      this.addRequest = true;
      this.request = data;
      // console.log(this.request);
    });

    EventBus.$on("success", (data) => {
      if (data) {
        this.loading = false;
      }
    });
    this.retrieveData();
  },

  methods: {
    filter() {
      console.log(this.toBeFilter);
      for (let [index, item] of this.employeeData.entries()) {
        if (item == this.toBeFilter) {
          // console.log("mao ni " + this.AllID[index]);
          this.filterTimesheet(this.AllID[index]);
          break;
        }
      }
    },

    dataAll(data) {
      let arr = [];
      for (let item of data) {
        this.AllID.push(item.EmpID);

        arr.push(item.Fullname);
      }
      return arr;
    },

    filterTimesheet: async function (empid) {
      this.loading = true;
      this.dialog = true;
      try {
        let getData = await this.$store.dispatch("filterTimesheet", {
          id: empid,
        });
        let decryptedInfo = await this.decrypt(
          getData.data.ciphertext,
          "setFilteredTimesheet"
        );
        let id = JSON.parse(decryptedInfo.data).data;
        this.timesheetsData = id;

        EventBus.$emit("success", true);
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },

    getValidated(data, rowID) {
      data.map((item, index) => {
        if (item.ID == rowID) {
          if (
            item.Validated == 1 &&
            this.sheetExists(this.validated, item.ID)
          ) {
            this.validated = this.validated.filter((value) => {
              return value.ID != item.ID;
            });
            this.validate(0, rowID);
          } else {
            this.validate(1, rowID);
            this.validated.splice(index, 0, item);
          }
        }
      });
    },

    selectDate(data, rowID) {
      data.map((item, index) => {
        if (item.ID == rowID) {
          if (this.sheetExists(this.selected, item.ID)) {
            this.selected = this.selected.filter((value) => {
              return value.ID != item.ID;
            });
          } else {
            this.selected.splice(index, 0, item);
          }
        }
      });
    },

    validate: async function (Validate, ID) {
      let encrypteddata = await this.encrypt({ Validate, ID });
      await this.$store.dispatch("validateKioskTimesheet", encrypteddata);
    },

    sheetExists(data, id) {
      return data.some(function (el) {
        return el.ID === id;
      });
    },

    handleClick(row) {
      this.formattedItems.map((item, index) => {
        item.selected = item === row;
        this.$set(this.formattedItems, index, item);
      });
      this.selectDate(this.formattedItems, row.ID);
      // this.getValidated(this.formattedItems, row.ID);
      console.log(row.Date);
      this.date=row.Date;
    },

    retrieveData: async function () {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllTimesheets",
          "setTimesheets",
          "allTimesheets"
        );
        let period = await this.retrieve(
          "retrieveAllPeriod",
          "setPeriodData",
          "allPeriodData"
        );
        let employee = await this.retrieve(
          "retrieveAllEmployee",
          "setEmployeeData",
          "allEmployeeData"
        );


        let currentperiod = await this.retrieve (
          "retrieveSystemProfile",
          "setSystemProfile",
          "allSystemProfile"
        );
        console.log(currentperiod);

        

        // this.timesheetsData = getdata ? getdata : [];
        for(const data of getdata){
          if(data.EmpID==JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo){
            this.timesheetsData.push(data)
          
          }
        }
        this.periodData = period ? period : [];
        for (let index = 0; index < this.periodData.length; index++) {
         if (this.periodData[index] == currentperiod) {
             this.currentPeriod = currentperiod;
         }
          
        }
       

        this.employeeData = this.dataAll(employee);
        this.toBeFilter = this.employeeData[0];

        this.loading = false;
        this.timesheetsData.map((item) => {
          if (item.Validated == 1) {
            this.validated.push(item);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style >
.font-size {
  font-size: 14px !important;
  cursor: pointer;

}

.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
td {
  font-size: 12px !important;
  padding-right: 0px !important;
}
</style>
