<template>
  <div class="grid">
    <div id="alert" style="display: none">
      <Alert :response="response" :message="message" />
    </div>
    <div v-if="!addRequest">
      <v-spacer></v-spacer>
      <Request class="btnReq float-right mr-2 mb-4"></Request>
      <v-expansion-panels class="mb-6">
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header
            expand-icon="mdi-menu-down"
            dark
            color="primary"
            class="primary"
          >
            <span class="text--white text-light">FOR APPROVAL </span>
            <span
              class="
                position-absolute
                top-0
                start-10
                translate-middle
                badge
                bg-danger
              "
            >
              {{ formattedItems.length >= 1 ? formattedItems.length : 0 }}
            </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-data-table
                class=""
                v-if="!addRequest"
                :headers="headers"
                :items="formattedItems"
                loading-text="Loading... Please wait."
                :calculate-widths="true"
                dense
                @click:row="handleClick"
                :search="search"
                :loading="loading"
              >
                <template class="" v-slot:[`item.Status`]="{ item }">
                  <v-chip
                    class="ma-2"
                    small
                    label
                    color="#df4759"
                    text-color="white"
                  >
                    {{ item.Status }}
                  </v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    small
                    dark
                    color="primary"
                    @click.stop="process(2, 'one', item.RequestID)"
                  >
                    <i class="mdi mdi-thumb-up"></i> </v-btn
                  >&nbsp;
                  <v-btn
                    dark
                    small
                    color="danger"
                    @click.stop="process(3, 'one', item.RequestID)"
                  >
                    <i class="mdi mdi-thumb-down"></i>
                  </v-btn>
                </template>
                <template class="" v-slot:[`item.Request`]="{ item }">
                  <v-chip small label
                   :color="item.Request == 'Certificate of Attendance' ? 'green' : item.Request == 'Overtime' ? 'primary':
                   item.Request == 'Shift Change Request' ? 'green' : 'orange'"
                   text-color="white">
                    {{ item.Request }}
                  </v-chip>
                </template>
                <template v-slot:top>
                  <b-container>
                    <b-row>
                      <b-col sm="4" class="font-weight-bold text-secondary">
                        <b-form-input
                          id="input-none"
                          class="mb-4"
                          v-model="search"
                          placeholder="Search"
                        ></b-form-input>
                      </b-col>
                      <b-col sm="8">
                        <div class="float-right">
                          <v-btn
                            color="primary"
                            dark
                            class="mb-2 px-8 mr-2"
                            @click="process(2, 'all', null)"
                          >
                            <i class="mdi mdi-thumb-up"></i>
                            Approve
                          </v-btn>

                          <v-btn
                            class="mb-2 px-8 ml-2"
                            @click="process(3, 'all', null)"
                            dark
                            color="danger"
                          >
                            <i class="mdi mdi-thumb-down"></i>
                            Disapprove
                          </v-btn>
                        </div>
                      </b-col>
                    </b-row>
                  </b-container>
                </template>
              </v-data-table>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header expand-icon="mdi-menu-down">
            FOR APPROVAL TO WITHDRAWN
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                class=""
                v-if="!addRequest"
                :headers="headers"
                :items="[]"
                loading-text="Loading... Please wait."
                :calculate-widths="true"
                dense
                @click:row="handleClick"
                :search="search"
                :loading="loading"
              >
                <template class="" v-slot:[`item.Status`]="{ item }">
                  <v-chip
                    class="ma-2"
                    small
                    label
                    color="#df4759"
                    text-color="white"
                  >
                    {{ item.Status }}
                  </v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    small
                    dark
                    color="primary"
                    @click.stop="process(2, 'one', item.RequestID)"
                  >
                    <i class="mdi mdi-thumb-up"></i> </v-btn
                  >&nbsp;
                  <v-btn
                    dark
                    small
                    color="danger"
                    @click.stop="process(3, 'one', item.RequestID)"
                  >
                    <i class="mdi mdi-thumb-down"></i>
                  </v-btn>
                </template>
                <template class="" v-slot:[`item.Request`]="{ item }">
                  <v-chip small label color="success" text-color="white">
                    {{ item.Request }}
                  </v-chip>
                </template>
                <template v-slot:top>
                  <b-container>
                    <b-row>
                      <b-col sm="4" class="font-weight-bold text-secondary">
                        <b-form-input
                          id="input-none"
                          class="mb-4"
                          v-model="search"
                          placeholder="Search"
                        ></b-form-input>
                      </b-col>
                      <b-col sm="8">
                        <div class="float-right">
                          <v-btn
                            color="primary"
                            dark
                            class="mb-2 px-8 mr-2"
                            @click="process(2, 'all', null)"
                          >
                            <i class="mdi mdi-thumb-up"></i>
                            Approve
                          </v-btn>

                          <v-btn
                            class="mb-2 px-8 ml-2"
                            @click="process(3, 'all', null)"
                            dark
                            color="danger"
                          >
                            <i class="mdi mdi-thumb-down"></i>
                            Disapprove
                          </v-btn>
                        </div>
                      </b-col>
                    </b-row>
                  </b-container>
                </template>
              </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <RequestForm
      v-else
      :clickData="viewData"
      :mode="mode"
      :requestType="request"
    ></RequestForm>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
// import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import RequestForm from /* webpackChunkName: "Data Table" */ "@/components/RequestForm.vue";
import Request from /* webpackChunkName: "Data Table" */ "@/components/AddRequest.vue";

import { EventBus } from "../../bus/bus";
import moment from "moment";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import Alert from "@/components/Alert.vue";
export default {
  components: {
    // DefaultDataTable,
    RequestForm,
    Request,
    Alert,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      mode: "add",
      viewData: null,
      overlay: false,
      response: "",
      message: "",
      search: "",
      openForm: false,
      loading: true,
      edit: false,
      EmployeeName:
        JSON.parse(localStorage.getItem("user_details")).data.FirstName +
        " " +
        JSON.parse(localStorage.getItem("user_details")).data.LastName,
      request: "",
      addRequest: false,
      savingChanges: false,
      editedItem: {},
      defaultItem: {},
      processClicked: false,
      headers: [
        {
          text: "ID",
          align: "start",
          value: "RequestID",
        },
        // { text: "Firstname", value: "Firstname" },
        { text: "Request", value: "Request" },
        { text: "Created By", value: "CreatedBy" },
        { text: "Date Created", value: "CreatedDate" },
        { text: "Status", value: "Status", cellClass: "text-center " },
        { text: "Actions", value: "actions", sortable: false },
      ],
      overtime: [],
      shift: [],
      coa: [],
      leave: [],
      dataToApproved: [],
      dataToDispproved: [],
      basicInfo: [],
      allData: [],
      params: {},

      localOT: [],
      localCOA: [],
      localLeave: [],
      localShift: [],
      localData: null,
    };
  },
  created() {
    this.setLocalData();
    // console.log(this.$store.getters.allLeaveData);
    console.log(this.EmployeeName);
    EventBus.$on("addRequest", (data) => {
      this.addRequest = true;
      this.request = data;
      // console.log(this.request);
    });
    EventBus.$on("closeRequest", (data) => {
      console.log("close");
      if (data) {
        this.mode = "add";
        this.addRequest = false;
        // this.allData=[]
        // this.retrieveShift();
        // this.retrieveOT();
        // this.retrieveLeave();
        // this.retrieveCOA();
      }
    });
    this.retrieveShift();
    this.retrieveOT();
    this.retrieveLeave();
    this.retrieveCOA();
    this.allApprovalData();
      this.allData = this.allData.sort(function (a, b) {
        return a.RequestID - b.RequestID;
      });
      this.allData.reverse();
    this.initializeKioskRelated();
    this.setLocalData();
    // this.retrieveAll();
  },
  computed: {
    formattedItems() {
      if (!this.allData || this.allData.length === 0) return [];
      return this.allData.map((item) => {
        return {
          ...item,
          CreatedDate: moment(item.CreatedDate).format("L"),
        };
      });
    },
  },

  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 2000);
    },
  },
  methods: {
    handleClick(row) {
       this.mode = "view";
      this.allData.map((item, index) => {
        item.selected = item === row;
        this.$set(this.allData, index, item);
      });
      // EventBus.$emit("viewRequest", row);
      console.log(this.getRequestData(row, "data"));
      this.viewData = this.getRequestData(row, "data");
      this.addRequest = true;
      this.request = {
        item:
          this.getRequestData(row, null) == "Leave"
            ? [
                this.getRequestData(row, null),
                this.getRequestData(row, "data").LeaveType,
              ]
            : [this.getRequestData(row, null)],
      };
     
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
    retrieveAll: function () {
      this.retrieveShift();
      this.retrieveOT();
      this.retrieveLeave();
      this.retrieveCOA();
    },

    setLocalData: async function () {
      this.localOT = this.$store.getters.allOvertimeData;
      this.localCOA = this.$store.getters.allCertificateData;
      this.localLeave = this.$store.getters.allLeaveData;
      this.localShift = this.$store.getters.allShiftData;
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
    getRequestData(row, type) {
      let request = "";
      let data = null;
      switch (row.Request) {
        case "Shift Change Request":
          data = this.localShift.filter((item) =>
            [row.RequestID].includes(item.RequestID)
          );
          request = "Shift";
          break;
        case "Certificate of Attendance":
          data = this.localCOA.filter((item) =>
            [row.RequestID].includes(item.RequestID)
          );
          request = "COA";
          break;
        case "Overtime":
          data = this.localOT.filter((item) =>
            [row.RequestID].includes(item.RequestID)
          );
          request = "OT";
          break;
        case "Leave":
          data = this.localLeave.filter((item) =>
            [row.RequestID].includes(item.RequestID)
          );
          request = "Leave";
          break;
        default:
          data = this.localLeave.filter((item) =>
            [row.RequestID].includes(item.RequestID)
          );
          request = "Leave";
          break;
      }
      if (type == null) {
        return request;
      } else {
        return !data ? {} : data[0];
      }
    },

    process: async function (Status, type, id) {
      this.processClicked = true;
      this.overlay = true;
      let encrypteddata;
      let RequestID;
      if (type == "all") {
        for (const item of this.allData) {
          RequestID = item.RequestID;
          try {
            encrypteddata = await this.encrypt({ RequestID, Status });
            await this.$store.dispatch("processApproval", encrypteddata);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        RequestID = id;
        encrypteddata = await this.encrypt({ RequestID, Status });
        await this.$store.dispatch("processApproval", encrypteddata);
      }

      console.log(encrypteddata);

      if (encrypteddata) {
        // this.allApprovalData();
        this.response = "success";
        Status == 2
          ? (this.message = "Approved Successfully")
          : (this.message = "Disapproved Successfully");
        // this.allData = [];
        this.allData=this.removeProcessedApproval(this.allData,id)
        // this.retrieveAll();
        document.getElementById("alert").style.display = "block";

        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          3000
        );
      } else {
        this.showErrorResponse("Nothing to approve");
      }
      this.processClicked = false;
    },
    removeProcessedApproval(data, RequestID) {
      return data.filter((item) => item.RequestID !== RequestID);
    },
    allApprovalData() {
      if (this.overtime > 0) {
        for (const item of this.overtime) {
          this.allData.push(item);
        }
      }

      if (this.coa > 0) {
        for (const item of this.coa) {
          this.allData.push(item);
        }
      }

      if (this.leave > 0) {
        for (const item of this.leave) {
          this.allData.push(item);
        }
      }

      if (this.shift > 0) {
        for (const item of this.shift) {
          this.allData.push(item);
        }
      }
    
    },

    retrieveShift: async function () {
      try {
        let param = await this.encrypt({
          View: "CN_SHIFT_V",
          Name: this.EmployeeName,
        });
        let getData = await this.$store.dispatch("retrieveAwaitingApproval", {
          param,
        });

        this.shift = JSON.parse(getData.data).data;
        if (this.shift != []) {
          for (const item of this.shift) {
            this.allData.push(item);
          }
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    retrieveLeave: async function () {
      try {
        let param = await this.encrypt({
          View: "CN_LEAVE_V",
          Name: this.EmployeeName,
        });
        let getData = await this.$store.dispatch("retrieveAwaitingApproval", {
          param,
        });

        this.leave = JSON.parse(getData.data).data;
        // console.log(this.leave);
        if (this.leave != []) {
          for (const item of this.leave) {
            this.allData.push(item);
          }
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    retrieveCOA: async function () {
      try {
        let param = await this.encrypt({
          View: "CN_COA_V",
          Name: this.EmployeeName,
        });
        let getData = await this.$store.dispatch("retrieveAwaitingApproval", {
          param,
        });

        this.coa = JSON.parse(getData.data).data;
        if (this.coa != []) {
          for (const item of this.coa) {
            this.allData.push(item);
          }
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    retrieveOT: async function () {
      try {
        let param = await this.encrypt({
          View: "CN_OVERTIME_V",
          Name: this.EmployeeName,
        });
        let getData = await this.$store.dispatch("retrieveAwaitingApproval", {
          param,
        });

        this.overtime = JSON.parse(getData.data).data;
        if (this.overtime != []) {
          for (const item of this.overtime) {
            this.allData.push(item);
          }
        }
        // console.log(this.overtime);
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

