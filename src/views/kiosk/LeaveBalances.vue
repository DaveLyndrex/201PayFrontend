<template>
  <!-- [10/12/2021 CN CRUBIO] -->
  <div>
    <b-container v-if="!addRequest">
      <b-row>
        <b-col>
          <div class="d-flex">
            <!-- Period Dropdown -->
            <div class="mt-5 mr-2">
              <p>Employee:</p>
            </div>
            <div class="mt-4">
              <!-- <v-select
                v-model="employeeData"
                :items="employee"
                label="Select Employee"
                dense
                solo
              ></v-select> -->
              <p class="border-bottom border-secondary pt-1 font-size pr-10">
                {{ FirstName + " " + LastName }}
              </p>
            </div>

            <!-- Payroll Group dropdown -->
            <div class="mt-5 mr-2 ml-5">
              <p>Leave Credit Year:</p>
            </div>
            <div class="mt-4">
              <p class="border-bottom border-secondary font-size pt-1 pr-10">
                {{ leaveCreditYearData || "Loading.. .&nbsp;&nbsp;&nbsp;" }}
              </p>
              <!-- <v-select
              class="border-bottom"
              flat
              readonly
                v-model="leaveCreditYearData"
                :items="leaveCreditYear"
                label="Select Year"
                dense
                solo
                append-icon=""
              ></v-select> -->
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="auto">
          <Request></Request>
        </b-col>
      </b-row>
    </b-container>

    <div>
      <DefaultDataTable
        v-if="!addRequest"
        :headers="headers"
        :items="retrieveLeaveBalances"
        :editedItem="editedItem"
        :defaultItem="defaultItem"
        :dataLoading="loading" 
      >
      </DefaultDataTable>

          <!-- <v-data-table
            v-if="!addRequest"
            :headers="headers"
        
            :items="retrieveLeaveBalances"
            :editedItem="editedItem"
            :defaultItem="defaultItem"
            :loading="loading"
            :search="search"
            @click:row="handleClick"
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
          </v-data-table>-->
          <RequestForm v-else  :requestType="request"></RequestForm> 
    </div>
  </div>
</template>
<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
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
    DefaultDataTable,
    RequestForm,
    Request,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      FirstName: JSON.parse(localStorage.getItem("user_details")).data
        .FirstName,
      LastName: JSON.parse(localStorage.getItem("user_details")).data.LastName,
      leaveCreditYear: [],
      // selected:[],
      leaveCreditYearData: "",
      leaveBalancesData: [],
      employee: [],
      employeeData: [],
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      request:"",
      editedItem: {},
      defaultItem: {},
      items: [],
      addRequest: false,
      search: "",
 
      headers: [
        {
          text: "Leave Type",
          align: "start",
          value: "LeaveType",
        },

        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Carried Over Expiry", value: "CarriedOverExpiry" },
        { text: "Beginning", value: "Beginning" },
        { text: "Carried Over", value: "CarriedOver" },
        { text: "Total Beginning Credits", value: "TotalBegCredits" },
        { text: "Availed", value: "Approved" },
        { text: "Expired Carried Over", value: "ExpiredCarriedOver" },
        { text: "Balance", value: "Balance" },
      ],
    };
  },
  created() {
    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });
    EventBus.$on("addRequest", (data) => {
      this.addRequest = true;
      this.request = data;
      console.log(this.request);
    });

    
    this.retrieveData();
  },
  computed: {
    retrieveLeaveBalances() {
      if (!this.leaveBalancesData || this.leaveBalancesData.length === 0)
        return [];
      return this.leaveBalancesData.map((item) => {
        return {
          ...item,
          CarriedOverExpiry: moment(item.CarriedOverExpiry).format("L"),
          StartDate: moment(item.StartDate).format("L"),
          EndDate: moment(item.EndDate).format("L"),
        };
      });
    },
  },
  methods: {
    retrieveData: async function () {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllLeaveBalances",
          "setLeaveBalancesData",
          "allLeaveBalancesData"
        );
        console.log(getdata);

        let credityear = await this.retrieve(
          "retrieveAllLeaveCreditYear",
          "setLeaveCreditYearData",
          "allLeaveCreditYearData"
        );
        let employee = await this.retrieve(
          "retrieveAllEmployee",
          "setEmployeeData",
          "allEmployeeData"
        );
        this.leaveCreditYear = credityear ? credityear : [];
        this.leaveCreditYearData = credityear[0];

        for (let index = 0; index < getdata.length; index++) {
          if (
            getdata[index]["EmpID"] ==
            JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo
          ) {
            this.leaveBalancesData.push(getdata[index]);
          }
        }
  
        console.log(this.leaveBalancesData);
        this.employee = employee ? employee : [];
        this.employeeData = employee.slice(0)[0];
        // EventBus.$emit("LeaveBalancesData",this.leaveBalancesData);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

  },
};
</script>