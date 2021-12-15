<template>
  <!-- 10/07/2021 CN CRUBIO -->

  <div class="container">
   
    <BreadCrumb class="breadcrumb" />

     <div id="alertContainer" style="display:none;">
       <Alert :response="response" :message="message"/>
    </div>
    
    <v-row>
      <!-- period  -->
      <v-col class="col">
        <h5><b>Period:</b></h5>
        <div>
          <v-select
            v-model="selectedPeriod"
            :items="allPeriod"
            label="loading... ."
            class="selectField mt-1"
            solo
            dense
          ></v-select>
        </div>
      </v-col>
      <!-- payroll Group -->
      <v-col class="col">
        <h5><b> Payroll Group: </b></h5>

        <div>
          <v-select
            v-model="selectedPayroll"
            :items="payrollGroup ? payrollGroup : []"
            label="loading... ."
            solo
            dense
            class="selectField mt-1"
            @change="changePayrollGroup()"
          ></v-select>
        </div>
      </v-col>
      <v-col class="col">
        <div class="btn_div d-flex mt-5">
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="btnMargin px-1"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                Process Timesheet
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h6">
                Are you sure You want to Process Timesheet?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  No
                </v-btn>
                <v-btn color="green darken-1" text @click="processTimesheet">
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="progressBar" persistent max-width="290">
            <v-card>
              <v-progress-linear
                persistent
                v-model="processProgress"
                height="25"
              >
                <strong class="text-dark"
                  >{{ Math.ceil(processProgress) }}%</strong
                >
              </v-progress-linear>
            </v-card>
          </v-dialog>

          <v-btn class="btnMargin px-1 ml-1" disabled> View Timesheet </v-btn>
          <v-btn
            class="btnMargin px-1 ml-1"
            id="viewERColor"
            @click="viewExceptionReport()"
          >
            View Exception Report
          </v-btn>
          <v-btn
            class="btnMargin px-1 ml-1"
            id="pTimesheet"
            @click="postTimesheet"
          >
            Post Timesheet
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Location dropdown Group -->
    <div id="dataContainer" style="display: none">
      <v-row>
        <v-col>
          <p><b> Location:</b></p>
          <div>
            <v-select
              label="All"
              v-model="selectedLocation"
              :items="location ? location : []"
              solo
              dense
              class="selectField"
              @change="filterLocation()"
            ></v-select>
          </div>
        </v-col>
        <v-col>
          <!-- Employee dropdown Group -->

          <p><b> Employee:</b></p>

          <v-select
            :items="employee"
            v-model="tempEmployee"
            solo
            dense
            class="selectField"
            style="width:250px;"
            @change="filterEmployeeTimesheet()"
          ></v-select>
        </v-col>
        <v-col>
          <div class="d-flex mt-5 pt-4 ml-5">
            <v-btn
              :disabled="this.selectEmpIndex == 0"
              @click="indicatorArrow('back')"
            >
              <v-icon> mdi-arrow-left-bold </v-icon>
            </v-btn>
            <v-btn
              :disabled="this.selectEmpIndex == this.employee.length - 1"
              class="ml-2"
              @click="indicatorArrow('forward')"
            >
              <v-icon> mdi-arrow-right-bold </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <div class="d-flex mt-5 pt-4">
            <v-dialog v-model="validatedialog" persistent max-width="336">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  class="btnSize pa-4 px-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Validate Timesheet
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Are you sure You want to Validate All Timesheet?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="validatedialog = false"
                  >
                    No
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="ValidateAllUserTimesheet()"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="progressBarVal" persistent max-width="290">
              <v-card>
                <v-progress-linear
                  persistent
                  v-model="processProgress"
                  height="25"
                >
                  <strong class="text-dark"
                    >{{ Math.ceil(processProgress) }}%</strong
                  >
                </v-progress-linear>
              </v-card>
            </v-dialog>

            <v-btn x-small class="btnSize pa-4 px-2 ml-2">
              Send Notifications
            </v-btn>
            <v-btn x-small class="btnSize pa-4 px-2 ml-2"
              ><download-csv
                class="csv_btn"
                :data="csvTimesheetAll_data"
                name="Timesheet.csv"
              >
                Export CSV
              </download-csv></v-btn
            >
          </div>
        </v-col>
      </v-row>
      <div class="container mt-1">
        <div class="card">
          <div class="d-flex">
            <p class="mt-2 mb-1" id="user">{{ this.tempEmployee }}</p>
            <div class="d-flex ml-auto">
              <div class="headerStyle mt-4 mr-3">
                <v-icon small class="headerIcon"
                  >mdi-checkbox-marked-circle</v-icon
                >
                <span
                  ><a href="#" @click="validateAll(selectAll)"
                    >Validate All</a
                  ></span
                >
              </div>
              <div class="headerStyle mt-4 mr-3">
                <v-icon small class="headerIcon">mdi-email-outline</v-icon>
                <span><a href=""> Send Notification</a></span>
              </div>
              <div class="headerStyle mt-4 mr-5">
                <span>
                  <a href="#"
                    ><download-csv
                      :data="csvTimesheet_data"
                      name="Timesheet.csv"
                      ><v-icon small class="headerIcon">mdi-download</v-icon>
                      Export CSV
                    </download-csv></a
                  ></span
                >
              </div>
            </div>
          </div>
        </div>
        <v-data-table
          :headers="headers"
          :loading="loading"
          :search="search"
          :items="formattedItems"
          class="datatable mt-3"
          @click:row="handleClick"
          dense
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                solo
                outlined
                dense
                clearable
                hide-details
                class="shrink w-50"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.valid`]="{ item }">
            <v-simple-checkbox
              v-model="item.valid"
              @click="validateSingle(item)"
              :ripple="false"
            ></v-simple-checkbox>
          </template>
          <template v-slot:[`item.Absent1`]="{ item }">
            <p
              :class="
                item.Absent1 > 0.0 ? 'text-danger pt-4' : 'text-secondary pt-4'
              "
            >
              {{ item.Absent1 }}
            </p>
          </template>
          <template v-slot:[`item.Absent2`]="{ item }">
            <p
              :class="
                item.Absent2 > 0.0 ? 'text-danger pt-4' : 'text-secondary pt-4'
              "
            >
              {{ item.Absent2 }}
            </p>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import Alert from "@/components/Alert.vue";
import Vue from "vue";
import JsonCSV from "vue-json-csv";
import BreadCrumb from /* webpackChunkName: Bread Crumbs" */ "@/components/BreadCrumbs.vue";
import moment from "moment";
Vue.component("downloadCsv", JsonCSV);
export default {
  name: "TimeKeepingMain",
  components: {
    BreadCrumb,
    Alert,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  timesheet_data: [],

//  props:["response"],
  data() {
    return {
      response:"",
      message:"",
      processProgress: 0,
      progressBarVal: false,
      progressBar: false,
      validatedialog: false,
      dialog: false,
      search: "",
      csvTimesheet_data: [],
      csvTimesheetAll_data: [],
      selectedPeriod: "",
      selectedPayroll: "",
      selectedLocation: "",
      tempEmployee: "",
      loading: false,
      editedItem: {},
      defaultItem: {},
      savingChanges: false,
      allPeriod: [],
      period: [],
      payrollGroup: [],
      location: [],
      timesheet: [],
      employee: [],
      selectEmpIndex: 0,
      validateAllEmployee: [],
      validate: false,
      buttonName: "",
      storeAllEmployee: [],
      headers: [
        {
          text: "Date",
          align: "start",
          value: "Date",
        },
        { text: "ID", value: "ID", align: " d-none" },
        { text: "EmpID", value: "EmpID", align: " d-none" },
        { text: "Day Type", value: "DayType" },
        { text: "Shift", value: "Shift" },
        { text: "In", value: "In1" },
        { text: "Out", value: "Out1" },
        { text: "In", value: "In2" },
        { text: "Out", value: "Out2" },
        { text: "Raw DTR", value: "RawDTR" },
        { text: "COA", value: "COA" },
        { text: "Leave", value: "Leave" },
        { text: "Tardy 1", value: "Tardy1" },
        {
          text: "Absent 1",
          value: "Absent1",
        },
        { text: "Undertime 1", value: "Undertime1" },
        { text: "Tardy 2 ", value: "Tardy2" },
        { text: "Absent 2", value: "Absent2" },
        { text: "Undertime 2", value: "Undertime2" },
        { text: "Req OT", value: "ReqOT" },
        { text: "Req OT Hrs", value: "OTHrs" },
        { text: "OT", value: "OT" },
        { text: "ND", value: "ND" },
        { text: "valid", value: "Validate", align: " d-none" },
        { text: "valid", value: "valid" },
      ],
      selectAll: false,
    };
  },
  computed: {
    formattedItems() {
      if (!this.timesheet || this.timesheet.length === 0) return [];
      return this.timesheet.map((item) => {
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
          OT: item.OT == 0 ? null : String(Number(item.OTHrsPaid).toFixed(2)),
          ND: item.ND == 0 ? null : String(Number(item.NDHrs).toFixed(2)),
        };
      });
    },
  },
  created() {
    this.getPayrollGroup();
    console.log(JSON.parse(localStorage.getItem("user_details")).data.Email);
  },

  methods: {
    validateAll: function (selectAll) {
      if (selectAll == false) {
        this.selectAll = true;

        for (let index = 0; index < this.timesheet.length; index++) {
          this.timesheet[index].Validate = 1;
          this.timesheet[index].valid = true;
          this.updateSelected(
            this.timesheet[index].Validate,
            this.timesheet[index].ID
          );
          console.log(this.timesheet[index].Validate);
        }
      } else {
        this.selectAll = false;

        for (let index = 0; index < this.timesheet.length; index++) {
          this.timesheet[index].Validate = 0;
          this.timesheet[index].valid = false;
          this.updateSelected(
            this.timesheet[index].Validate,
            this.timesheet[index].ID
          );
          console.log(this.timesheet[index].Validate);
        }
      }
    },

    indicatorArrow(type) {
      this.loading = true;
      if (type == "back" && this.selectEmpIndex != 0) {
        this.selectEmpIndex--;
      } else {
        this.selectEmpIndex++;
      }
      this.tempEmployee = this.employee[this.selectEmpIndex];
      this.filterEmployeeTimesheet();
    },

    getPayrollGroup: async function () {
      try {
        let getdata = await this.retrieve(
          "payrollGroup",
          "setPayrollGroup",
          "getPayrollGroup"
        );
        this.payrollGroup = getdata ? getdata : [];
        this.selectedPayroll = getdata.slice(0)[0];

        this.selectPayrollGroup();
        this.getEmployee();
        this.getLocation();
      } catch (error) {
        console.log(error);
        this.showErrorResponse("Something went wrong");
      }
    },

    changePayrollGroup: function () {
      this.selectEmpIndex = 0;
      document.getElementById("dataContainer").style.display = "none";
      this.allPeriod = [];
      this.employee = [];
      this.location = [];
      this.storeAllEmployee = [];
      console.log(this.selectPayrollGroup);
      this.selectPayrollGroup();
      this.getEmployee();
      this.getLocation();
    },
    errorHandling(getData, data) {

      switch (getData.status) {
        case 200: {

          if (
            JSON.parse(data.data).code === "404" ||
            JSON.parse(data.data).code === "500"
          ) {
            // this.showErrorResponse(data.data.message);
            this.showErrorResponse("Something went wrong");
            return null;
          }
          return false;
        }

        case 500: {
          this.showErrorResponse("Something went wrong");
          return null;
        }

        default:
          return null;
      }
    },
    selectPayrollGroup: async function () {
      //post specific payroll group
      let PayrollGroup = this.selectedPayroll;
      console.log(PayrollGroup);
      await this.$store.dispatch("passPayrollGroup", PayrollGroup);

      // period data
      let result = await this.$store.dispatch("periodData", PayrollGroup);
      let data = await this.decrypt(result.data.ciphertext, "setPeriodData");

      //catch error
      let error = this.errorHandling(result, data);
      console.log(error);

      if (error == false) {
        //  convert data to json
        let finalData = this.parseData(data.data).data;
        this.allPeriod = this.myData(finalData);
      }

      // get current period
      let encrypteddata = await this.encrypt({ PayrollGroup });
      result = await this.$store.dispatch("getCurrentPeriod", encrypteddata);
      let currentperiod = JSON.parse(result.data).data[0]["ConcattedPeriod"];

      // loop to find the current period in all Periods
      for (let index = 0; index < this.allPeriod.length; index++) {
        if (this.allPeriod[index] == currentperiod) {
          this.selectedPeriod = this.allPeriod[index];
        }
      }
    },
    parseData(data) {
      if (!data) return {};
      if (typeof data === "object") return data;
      if (typeof data === "string") return JSON.parse(data);

      return {};
    },
    myData(data) {
      var arr = [];
      if (data != null) {
        data.forEach(function (item) {
          arr.push(item);
        });
      } else {
        arr = [];
      }

      return arr;
    },
    getLocation: async function () {
      let selected = this.selectedPayroll;

      let location = await this.$store.dispatch("location", selected);
      let data = await this.decrypt(location.data.ciphertext, "setLocation");
      console.log(data);
      let error = this.errorHandling(location, data);
      if (error == false) {
        let finalData = this.parseData(data.data).data;
        this.location = this.myData(finalData);
        this.selectedLocation = this.location.slice(0)[0];
      }
    },

    filterLocation: async function () {
      this.loading = true;
      let Location = this.selectedLocation;
      let PayrollGroup = this.selectedPayroll;
      let arr = [];
      let employee = [];

      arr = await this.encrypt({ Location, PayrollGroup });

      let data = await this.$store.dispatch("getSpecificEmployeeLocation", arr);

      let error = this.errorHandling(data, data);

      if (error == false) {
        let finalData = this.parseData(data.data).data;
        arr = this.myData(finalData);

        for (let item = 0; item < arr.length; item++) {
          employee.push(arr[item]["Employee"]);
        }
        this.employee = employee;
        this.tempEmployee = this.employee[0];
        this.filterEmployeeTimesheet();
      }
    },

    getEmployee: async function () {
      let selected = this.selectedPayroll;
      let arr = [];
      let employee = [];
      let result = await this.$store.dispatch("getEmployee", selected);
      let data = await this.decrypt(result.data.ciphertext, "setEmployee");
      let error = this.errorHandling(result, data);

      if (error == false) {
        let finalData = this.parseData(data.data).data;
        arr = this.myData(finalData);

        for (let item = 0; item < arr.length; item++) {
          employee.push(arr[item]["Employee"]);
          this.storeAllEmployee.push(arr[item]["EmployeeID"]);
        }
        this.employee = employee;

        this.tempEmployee = this.employee[0];
      }
    },

    filterEmployeeTimesheet: async function () {
      try {
        this.timesheet = [];
        if (this.buttonName != "Process Timesheet") {
          this.loading = true;
        }

        let PayrollGroup = this.selectedPayroll;
        let Employee = this.tempEmployee;
        let ButtonName = this.buttonName;

        let encrypteddata = await this.encrypt({
          PayrollGroup,
          Employee,
          ButtonName,
        });
        let result = await this.$store.dispatch(
          "getSpecificEmployeeTimesheet",
          encrypteddata
        );

        let error = this.errorHandling(result, result);
        if (error == false) {
          if (JSON.parse(result.data).data.length <= 0) {
            this.timesheet = [];
            this.loading = false;
          } else {
            let finalData = this.parseData(result.data).data;
            let arr = this.myData(finalData);

            this.timesheetValueHolder(arr);
            this.loading = false;
          }
        }
      } catch (error) {
        console.log(error);
        this.showErrorResponse("Something went wrong");
      }
    },

    viewExceptionReport: function () {
      this.buttonName = "View Exception Report";
      this.csvTimesheetAll_data = [];
      this.timesheet = [];
      document.getElementById("dataContainer").style.display = "block";
      this.filterEmployeeTimesheet();
      this.exportCSV();
    },
    timesheetValueHolder(itemValues) {
      this.timesheet = [];
      this.selectAll = false;
      for (let index = 0; index < itemValues.length; index++) {
        let timesheet = {
          Date: itemValues[index]["Date"],
          ID: itemValues[index]["ID"],
          EmpID: itemValues[index]["EmpID"],
          DayType: itemValues[index]["DayType"],
          Shift: itemValues[index]["Shift"],
          In1: itemValues[index]["In1"],
          Out1: itemValues[index]["Out1"],
          In2: itemValues[index]["In2"],
          Out2: itemValues[index]["Out2"],
          RawDTR: itemValues[index]["RawDTR"],
          COA: itemValues[index]["COA"],
          Leave: itemValues[index]["Leave"],
          Tardy1: itemValues[index]["Tardy1"],
          Absent1: itemValues[index]["Absent1"],
          Undertime1: itemValues[index]["Undertime1"],
          Tardy2: itemValues[index]["Tardy2"],
          Absent2: itemValues[index]["Absent2"],
          Undertime2: itemValues[index]["Undertime2"],
          ReqOT: itemValues[index]["ReqOT"],
          OTHrs: itemValues[index]["OTHrs"],
          OT: itemValues[index]["OT"],
          ND: itemValues[index]["ND"],
          Validate: itemValues[index]["Validate"],
          valid: itemValues[index]["Validate"] == 1 ? true : false,
        };

        this.timesheet.push(timesheet);
      }
      this.csvTimesheet_data = this.timesheet;
    },

    processTimesheet: async function () {
      
      document.getElementById("dataContainer").style.display = "none";
      this.timesheet = [];
      this.progressBar = true;
      this.dialog = false;
      this.buttonName = "Process Timesheet";
      this.csvTimesheetAll_data = [];

      try {
        this.loading = true;
        const ModifiedBy = JSON.parse(localStorage.getItem("user_details")).data
          .Email;
        let PayrollGroup = this.selectedPayroll;
        let result;
        let arr = await this.encrypt({ ModifiedBy, PayrollGroup });
        let time;
        for (let i = 0; i <= 10; i++) {
          time = i * 10;
          if (time === 30) {
            setTimeout(() => (this.processProgress = 30), 500);
            this.filterEmployeeTimesheet();
          } else if (time === 80) {
            
            setTimeout(() => (this.processProgress = 80), 2500);

            result = await this.$store.dispatch("processTimesheet", arr);

          } else if (time === 100) {
            let error = this.errorHandling(result, result);
            if (!error) {
              this.processProgress = 100;
              setTimeout(() => (this.progressBar = false), 500);
              setTimeout(
                () => (this.response = "success"),
                (this.message = "Process Complete"),
                (document.getElementById("alertContainer").style.display =
                  "block"),
                1000
              );
              setTimeout(() => (this.processProgress = 0), 1500);
              setTimeout(
                () =>
                  (document.getElementById("alertContainer").style.display =
                    "none"),
                5000
              );
              document.getElementById("dataContainer").style.display = "block";
            }
          }
          this.exportCSV();
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.showErrorResponse("Something went wrong");
      }
    },

    postTimesheet: async function () {
      const ModifiedBy = JSON.parse(localStorage.getItem("user_details")).data
        .Email;
      let PayrollGroup = this.selectedPayroll;
      console.log(PayrollGroup);
      let arr = [];
      arr = await this.encrypt({ ModifiedBy, PayrollGroup });
      let data = await this.$store.dispatch("postTimesheet", arr);

      if (JSON.parse(data.data).error == true) {
        this.showWarningResponse(JSON.parse(data.data).message);
      } else {
        this.showSuccessResponse(JSON.parse(data.data).message);
        // this.viewExceptionReport();
      }
    },

    validateSingle(item) {
      console.log(item);
      if (item.valid == true) {
        item.Validate = 1;
      } else {
        item.Validate = 0;
      }
      this.updateSelected(item.Validate, item.ID);
    },

    updateSelected: async function (Validate, ID) {
      let encrypteddata = await this.encrypt({ Validate, ID });
      let result = await this.$store.dispatch("updateSelected", encrypteddata);
      this.errorHandling(result, result);
    },

    handleClick(row) {
      for (let index = 0; index < this.timesheet.length; index++) {
        if (
          this.timesheet[index]["ID"] == row["ID"] &&
          this.timesheet[index]["valid"] == false
        ) {
          this.timesheet[index]["valid"] = true;
          row["Validate"] = 1;
        } else if (
          this.timesheet[index]["ID"] == row["ID"] &&
          this.timesheet[index]["valid"] == true
        ) {
          this.timesheet[index]["valid"] = false;
          row["Validate"] = 0;
        }
      }
      this.updateSelected(row["Validate"], row["ID"]);
    },

    ValidateAllUserTimesheet: async function () {

      this.validatedialog = false;
      try {
        let time;
        let data = ""; 
        this.progressBarVal = true;
        for (let i = 0; i <= 10; i++) {
          time = i * 10;
          if (time === 30) {
            setTimeout(() => (this.processProgress = 30), 500);
          } else if (time === 80) {
            setTimeout(() => (this.processProgress = 80), 1000);
            for (let index = 0; index < this.storeAllEmployee.length; index++) {
              let EmployeeID = this.storeAllEmployee[index];
              let encrypteddata = await this.encrypt({ EmployeeID });
              data = await this.$store.dispatch(
                "ValidateAllUserTimesheet",
                encrypteddata
              );
            }
            console.log(data);
          } else if (time === 100) {
            if (JSON.parse(data.data).error == false) {
              this.processProgress = 100;
              setTimeout(() => (this.progressBarVal = false), 500);
              setTimeout(
                () => (this.response = "success"),
                (this.message = "All Timesheet Validated"),
                (document.getElementById("alertContainer").style.display =
                  "block"),
                1000
              );
              setTimeout(() => (this.processProgress = 0), 1500);
              setTimeout(
                () =>
                  (document.getElementById("alertContainer").style.display =
                    "none"),
                5000
              );
              for (let index = 0; index < this.timesheet.length; index++) {
                this.timesheet[index]["valid"] = true;
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
        this.showErrorResponse("Something went wrong");
      }
    },

    // this.validatedialog = false;
      // try {
      //   this.progressBarVal = true;
      //   setTimeout(() => (this.processProgress = 30), 500);
      //   setTimeout(() => (this.processProgress = 60), 1000);
      //   let data = "";
      //   setTimeout(() => (this.processProgress = 70), 1200);
      //   for (let index = 0; index < this.storeAllEmployee.length; index++) {
      //     let EmployeeID = this.storeAllEmployee[index];
      //     let encrypteddata = await this.encrypt({ EmployeeID });
      //     data = await this.$store.dispatch(
      //       "ValidateAllUserTimesheet",
      //       encrypteddata
      //     );
      //   }

      //   console.log(data);
      //   if (JSON.parse(data.data).error == false) {
      //     this.processProgress = 100;
      //     setTimeout(() => (this.progressBarVal = false), 500);
      //     setTimeout(
      //       () => this.showSuccessResponse("All Timesheet Validated"),
      //       1000
      //     );
      //     setTimeout(() => (this.processProgress = 0), 1500);

      //     for (let index = 0; index < this.timesheet.length; index++) {
      //       this.timesheet[index]["valid"] = true;
      //     }
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

    exportCSV: async function () {
      try {
        this.csvTimesheetAll_data = [];
        let ButtonName = this.buttonName;

        for (let index = 0; index < this.storeAllEmployee.length; index++) {
          let EmployeeID = this.storeAllEmployee[index];
          let encrypteddata = await this.encrypt({
            ButtonName,
            EmployeeID,
          });
          let result = await this.$store.dispatch("export_CSV", encrypteddata);
          console.log(result);

          if (JSON.parse(result.data).data.length <= 0) {
            this.timesheet = [];
            this.loading = false;
          } else {
            let finalData = this.parseData(result.data).data;
            let arr = this.myData(finalData);

            for (let index = 0; index < arr.length; index++) {
              let timesheet = {
                Date: arr[index]["Date"],
                ID: arr[index]["ID"],
                EmpID: arr[index]["EmpID"],
                DayType: arr[index]["DayType"],
                Shift: arr[index]["Shift"],
                In1: arr[index]["In1"],
                Out1: arr[index]["Out1"],
                In2: arr[index]["In2"],
                Out2: arr[index]["Out2"],
                RawDTR: arr[index]["RawDTR"],
                COA: arr[index]["COA"],
                Leave: arr[index]["Leave"],
                Tardy1: arr[index]["Tardy1"],
                Absent1: arr[index]["Absent1"],
                Undertime1: arr[index]["Undertime1"],
                Tardy2: arr[index]["Tardy2"],
                Absent2: arr[index]["Absent2"],
                Undertime2: arr[index]["Undertime2"],
                ReqOT: arr[index]["ReqOT"],
                OTHrs: arr[index]["OTHrs"],
                OT: arr[index]["OT"],
                ND: arr[index]["ND"],
                Validate: arr[index]["Validate"],
                valid: arr[index]["Validate"] == 1 ? true : false,
              };

              this.csvTimesheetAll_data.push(timesheet);
            }
          }
        }
      } catch (error) {
        console.log(error);
        this.showErrorResponse("Something went wrong");
      }
    },
  },
};
</script>

<style scoped>
.searchBar {
  width: 20%;
}
#viewERColor {
  background-color: #696969;
}
.container {
  margin-top: 2vh;
}
.btnSize {
  text-transform: none;
  background-color: white;
  color: gray;
  border: 1px solid gray;
}
.btnMargin {
  /* text-transform: none; */
  padding: 0px;
  margin-top: 4px;
  color: white;
  font-size: 9px;
}
.csv_btn {
  font-size: 9px;
}

#pTimesheet {
  background-color: red;
}
* {
  font-size: 13px;
  font-style: arial;
}
.headerIcon {
  color: blue;
}
#user {
  padding: 10px;
}

@media (max-width: 300px) {
  .card {
    height: 5000px;
  }
}
.card {
  background-color: lightgray;
  height: 50px;
}
.text-danger {
  color: red !important;
}

.breadcrumb {
  font-size: 16px;
}
.mainDiv {
  margin-top: 2px;
}
</style>

<style>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
td {
  font-size: 12px !important;
  padding-right: 0px !important;
}
</style>
