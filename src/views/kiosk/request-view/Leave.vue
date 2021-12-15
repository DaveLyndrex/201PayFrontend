<!-- 10/12/2021 CN JLAYAOG -->
<template>
  <div>
    <v-layout row wrap class="mt-5">
      <v-flex>
        <v-layout column justify-space-between fill-height>
          <b-row>
            <b-col>
              <v-card flat class="ml-4" color="transparent font-weight-bold">
                <b-icon
                  scale="1"
                  class="mr-2"
                  icon="file-earmark-check"
                ></b-icon>
                {{ requestType[0].toUpperCase() }}
                DETAILS
              </v-card>
            </b-col>
            <b-col>
              <ViewLeaveBalances />
              <b-button
                variant="primary"
                @click="leaveModalOn"
                class="float-right text-center mr-4"
                size="sm"
              >
                <span>View Leave Balances</span>
              </b-button>
            </b-col>
          </b-row>
          <v-divider></v-divider>
          <v-toolbar flat class="font-size">
            <v-card flat class="font-weight-bold required"> Leave Type </v-card>
            <v-col class="d-flex" cols="12" sm="2">
              <v-select
                class="mt-3 font-size"
                v-model="type"
                :items="leaves"
                :readonly="mode == 'view'"
                dense
                flat
                variant="primary"
                append-icon=""
                @change="chargeToLeave()"
              ></v-select>
              <!-- @change="chargeToLeave()" -->
            </v-col>
            <v-col class="d-flex ml-10" cols="12" sm="2">
              <v-card flat class="font-weight-bold pt-4">
                Paid<span style="font-size: 15px" class="text-danger">*</span>
              </v-card>
              <v-select
                class="mt-3 ml-3 font-size"
                :items="['Yes', 'No']"
                :readonly="mode == 'view'"
                v-model="isPaid"
                dense
                flat
                @change="chargeToLeave()"
                variant="primary"
                append-icon=""
              ></v-select>
            </v-col>
            <v-card flat class="font-weight-bold ml-10"> Charge To </v-card>
            <v-col class="d-flex" cols="12" sm="2">
              <v-select
                class="mt-3 font-size"
                v-model="chargeTo"
                :items="leaves"
                dense
                readonly
                flat
                variant="primary"
                append-icon=""
              ></v-select>

              <!-- :items="leaves" -->
            </v-col>
          </v-toolbar>
        </v-layout>
      </v-flex>
    </v-layout>

    <div class="--table">
      <table
        class="table table-responsive"
        style="font-size: 14px"
        fixed-header
      >
        <thead>
          <tr class="border-bottom border-dark">
            <th width="13%" v-if="this.type != 'Undertime'">
              Start Date<span style="font-size: 15px" class="text-danger"
                >*</span
              >
            </th>
            <th width="13%" v-if="this.type == 'Undertime'">
              Date<span style="font-size: 15px" class="text-danger">*</span>
            </th>
            <th width="10%" v-if="this.type != 'Undertime'">
              Span<span style="font-size: 15px" class="text-danger">*</span>
            </th>
            <th width="13%" v-if="this.type != 'Undertime'">
              End Date<span style="font-size: 15px" class="text-danger">*</span>
            </th>
            <th width="10%" v-if="this.type != 'Undertime'">
              Span<span style="font-size: 15px" class="text-danger">*</span>
            </th>
            <th width="10%" v-if="this.type != 'Undertime'">Total Days</th>
            <th width="10%" v-if="this.type == 'Undertime'">
              Start Time<span style="font-size: 15px" class="text-danger"
                >*</span
              >
            </th>
            <th width="10%" v-if="this.type == 'Undertime'">
              End Time<span style="font-size: 15px" class="text-danger">*</span>
            </th>
            <th width="10%" v-if="this.type == 'Undertime'">Total Hours</th>
            <th colspan="6">
              Reason<span style="font-size: 15px" class="text-danger">*</span>
            </th>
            <th class="float-right border-0">
              <b-button
                :disabled="mode == 'view'"
                variant="primary"
                @click="addNewRow"
                class="mt-4 text-center float-right"
                size="sm"
              >
                <b-icon
                  icon="plus"
                  class="pr-1"
                  scale="1.5"
                  aria-hidden="true"
                ></b-icon>
                <span class="mr-2">Add</span>
              </b-button>
            </th>
          </tr>
        </thead>

        <tbody id="rows">
          <tr class="font-size" v-for="(item, key) in data" :key="key">
            <!-- ========= Date==================== -->
            <td width="13%" class="" v-if="type == 'Undertime'">
              <date-picker
                :disabled="mode == 'view'"
                id="date-picker"
                class="form-control default-input"
                v-model="item.Date"
                :elRef="'date' + key"
                autocomplete="off"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>
            </td>

            <td width="13%" v-if="type != 'Undertime'">
              <date-picker
                :disabled="mode == 'view'"
                id="date-picker-start-date"
                class="form-control default-input"
                :elRef="'start-date' + key"
                v-model="item.StartDate"
                autocomplete="off"
                @input="setDate($event, item, 'StartDate')"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>
            </td>

            <!-- =========End Date==================== -->
            <td v-if="type != 'Undertime'">
              <b-form-select
                class="form-control"
                v-model="item.Span1"
                :disabled="mode == 'view'"
                :style="
                  item.Span1 == 'Second Half'
                    ? 'font-size:12px'
                    : 'font-size:14px'
                "
                @change="getDays(item)"
                :options="['First Half', 'Second Half']"
              ></b-form-select>
            </td>

            <td width="13%" v-if="type != 'Undertime'">
              <date-picker
                id="date-picker"
                class="form-control default-input"
                v-model="item.EndDate"
                :disabled="mode == 'view'"
                :elRef="'end-date' + key"
                :value.sync="item.EndDate"
                autocomplete="off"
                format="MM/DD/YYYY"
                @input="setDate($event, item, 'EndDate')"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>
            </td>
            <td v-if="type != 'Undertime'">
              <b-form-select
                class="form-control"
                :disabled="mode == 'view'"
                v-model="item.Span2"
                :style="
                  item.Span2 == 'Second Half'
                    ? 'font-size:12px'
                    : 'font-size:14px'
                "
                @change="getDays(item)"
                :options="['First Half', 'Second Half']"
              ></b-form-select>
            </td>

            <td id="reason" v-if="type != 'Undertime'">
              <input
                class="form-control tdays text-right"
                readonly
                v-model="item.TotalDays"
              />
            </td>

            <!-- Undertime -->

            <td v-if="type == 'Undertime'">
              <input
                required
                :disabled="mode == 'view'"
                class="form-control"
                type="time"
                v-model="item.StartTime"
                id=""
                @change="getHours(item)"
              />
            </td>

            <td v-if="type == 'Undertime'" width="13%">
              <input
                required
                class="form-control"
                type="time"
                :disabled="mode == 'view'"
                v-model="item.EndTime"
                @change="getHours(item)"
                id=""
              />
            </td>

            <td v-if="type == 'Undertime'" id="reason">
              <input
                class="form-control tdays text-right"
                readonly
                v-model="item.TotalHours"
              />
            </td>
            <!-- End of Undertime -->

            <td colspan="6" id="reason" class="x">
              <input
                class="form-control"
                :disabled="mode == 'view'"
                v-model="item.Reason"
              />
            </td>
            <td>
              <b-button
                :disabled="mode == 'view'"
                variant="danger"
                @click="deleteRow(key, item)"
                class="float-right mr-2"
                size="sm"
              >
                <span class="">Remove</span>
              </b-button>
              <!-- <v-btn
                @click="deleteRow(key, item)"
                elevation="0"
                class="text-danger float-right"
              >
                <v-icon left> mdi-close </v-icon>
                Remove
              </v-btn> -->
            </td>
          </tr>
          <tr>
            <td
              :colspan="type == 'Undertime' ? 3 : 4"
              class="font-weight-bold"
              style="text-align: right; padding-top: 15px"
            >
              <span class="">Total</span>
            </td>
            <td>
              <input
                class="form-control tdays font-size text-right"
                readonly
                v-model="total"
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { EventBus } from "../../../bus/bus";
import ViewLeaveBalances from "../modal/LeaveBalancesModal.vue";
import CRUD from "@/utils/CRUD";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import moment from "moment";
// import LeaveBalances from "../modal/LeaveBalances.vue";
import DatePicker from "@/components/DatePicker.vue";
export default {
  // props: ["requestType", "timesheetDate"],
  props: {
    requestType: {
      type: [String, Array, Object],
      required: false,
    },
    timesheetDate: {
      type: String,
      required: false,
    },
    mode: {
      type: String,
      required: false,
      default: "add",
    },
    clickData: {
      type: [Object, Array],
      required: false,
    },
  },

  components: {
    DatePicker,
    ViewLeaveBalances,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      leaveModal: false,
      total: 0,
      chargeTo: "",
      reason: true,
      yearData: [],
      leaveBalancesData: [],
      request: "",
      type: "",
      warningMessage: "",
      // data: [
      //   {
      //     RequestID: null,
      //     Date: null,
      //     StartDate: "",
      //     Span1: "First Half",
      //     EndDate: "",
      //     Span2: "First Half",
      //     TotalDays: 0,
      //     TotalHours: 0,
      //     StartTime: "",
      //     EndTime: "",
      //     Reason: "",
      //     ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data
      //       .Email,
      //   },
      // ],
      data: [],
      leaves: [
        "Sick",
        "Vacation",
        "Undertime",
        "Birthday",
        "Emergency",
        "Maternity",
        "Paternity",
        "Calamity",
        "Educational",
        "Earned",
        "Study",
        "Service Incentive",
        "Relocation",
        "Magna Carta",
        "Solo Parent",
        "Bereavement",
        "Others",
      ],
      isPaid: "",
      counter: 0,
    };
  },

  created() {
    this.addNewRow();
    this.request = this.requestType;
    console.log(this.request);

    EventBus.$on("addRequest", (data) => {
      this.request = data.item;
      console.log(this.request);
    });

    console.log(this.timesheetDate);
    if (this.timesheetDate == null) {
      this.data[0].StartDate = moment(moment().toDate()).format("MM/DD/YYYY");
      this.data[0].Date = moment(moment().toDate()).format("MM/DD/YYYY");
    } else {
      this.data[0].StartDate = this.timesheetDate;
      this.data[0].Date = this.timesheetDate;
    }

    EventBus.$on(`submitForm${this.request[0]}`, (data) => {
      if (data) {
        if (this.type == "") {
          EventBus.$emit(`formData${this.request[0]}`, {
            data: this.formattedData,
            valid: false,
          });
        } else {
          if (this.validateBalances() == "" && !this.validateForm()) {
            EventBus.$emit(`formData${this.request[0]}`, {
              data: this.formattedData,
              valid: this.validateForm(),
            });
          } else if (this.validateBalances() != "") {
            EventBus.$emit("HandleMessageLeave", {
              warningMessage: this.validateBalances(),
              warning: true,
              type: "Leave: " + this.type,
            });
            console.log(this.validateBalances());
          } else {
            EventBus.$emit(`formData${this.request[0]}`, {
              data: this.formattedData,
              valid: this.validateForm(),
            });
          }
        }
      }
    });

    this.type = !this.request[1] ? "" : this.request[1];

    if (this.mode == "view" && this.type == "Undertime") {
      this.data[0].Date = moment(this.clickData.Date).format("L");
      this.data[0].Reason = this.clickData.Reason;
      this.data[0].StartTime = moment(this.clickData.StartTime, "HHmm").format(
        "HH:mm:ss"
      );
      this.data[0].EndTime = moment(this.clickData.EndTime, "HHmm").format(
        "HH:mm:ss"
      );
      this.total = this.getTotalHours();
    } else if (this.mode == "view") {
      this.data[0].Span1 = this.clickData.Span;
      this.data[0].Span2 = this.clickData.Span2;
      this.data[0].StartDate = this.clickData.StartDate;
      this.data[0].EndDate = this.clickData.EndDate;
      this.data[0].Reason = this.clickData.Reason;
    }

    if (this.type != "Undertime" && this.type != "Emergency") {
      this.chargeTo = this.type;
    } else {
      this.chargeTo = "Vacation";
    }

    this.isPaid = "Yes";

    this.retrieveLeaveBalances();
    EventBus.$emit("leaveHeaderDetails", {
      leaveType: !this.type ? "0" : this.type,
      isPaid: this.isPaid == "Yes" ? 1 : 0,
    });
  },

  computed: {
    formattedData() {
      console.log("DATA");
      if (!this.data || this.data.length === 0) return [];
      return this.data.map((item) => {
        if (this.type == "Undertime") {
          return {
            ...item,
            StartDate: null,
            Span1: 0,
            EndDate: null,
            Span2: 0,
            Date: moment(item.Date).format("YYYY-MM-DD"),
            StartTime: moment(item.StartTime, "h:m:s A").format("HHmm"),
            EndTime: moment(item.EndTime, "h:m:s A").format("HHmm"),
          };
        } else {
          return {
            ...item,
            StartDate: moment(item.StartDate).format("YYYY-MM-DD"),
            Span1: item.Span1 == "First Half" ? 1 : 2,
            Span2: item.Span2 == "First Half" ? 1 : 2,
            EndDate: moment(item.EndDate).format("YYYY-MM-DD"),
            Date: null,
            StartTime: null,
            EndTime: null,
          };
        }
      });
    },
  },

  methods: {
    retrieveLeaveBalances: async function () {
      let getdata = await this.retrieve(
        "retrieveAllLeaveBalances",
        "setLeaveBalancesData",
        "allLeaveBalancesData"
      );
      console.log(getdata);
      if (getdata != null) {
        for (let index = 0; index < getdata.length; index++) {
          if (
            getdata[index]["EmpID"] ==
            JSON.parse(localStorage.getItem("user_details")).data.EmployeeIDNo
          ) {
            this.leaveBalancesData.push(getdata[index]);
          }
        }
        EventBus.$emit("LeaveBalancesData", this.leaveBalancesData);
      }
    },

    validateLeaveBalances() {
      if (this.leaveBalancesData.some((balance) => balance.Balance > 0)) {
        return true;
      } else {
        return false;
      }
    },

    validateLeaveType() {
      if (this.leaveBalancesData.some((type) => type.LeaveType == this.type)) {
        return true;
      } else {
        return false;
      }
    },

    validateBalances() {
      let message = "";
     
      for (const item of this.leaveBalancesData) {
        if (this.validateLeaveType()) {
          if (this.type == item.LeaveType) {
            if (item.Balance > 0) {
              message = "";
            } else {
              message = "Requester does not have enough leave credit";
            }
            if (this.checkLeaveDate(item)) {
              message = "";
            } else {
              message =
                "Start Date and End Date are not covered by requester's leave credit";
            }
          }
        } else {
          message = "Leave Type does not exist in Leave Credit";
        }
      }
      return message;
    },

    checkLeaveDate(item) {
      let toReturn;
      for (const data of this.data) {
        if (
          this.dateCheck(
            item.StartDate,
            item.EndDate,
            this.type == "Undertime" ? data.Date : data.EndDate
          )
        ) {
          toReturn = true;
        } else {
          toReturn = false;
        }
      }
      return toReturn;
    },

    dateCheck(from, to, check) {
      var fDate, lDate, cDate;
      fDate = Date.parse(from);
      lDate = Date.parse(to);
      cDate = Date.parse(check);

      if (cDate <= lDate && cDate >= fDate) {
        return true;
      }
      return false;
    },

    leaveModalOn() {
      EventBus.$emit("leaveBalancesModal", true);
    },

    chargeToLeave() {
      EventBus.$emit("leaveHeaderDetails", {
        leaveType: this.type == undefined ? "0" : this.type,
        isPaid: this.isPaid == "Yes" ? 1 : 0,
      });
      console.log({
        leaveType: this.type == "" ? 0 : this.type,
        isPaid: this.isPaid == "Yes" ? 1 : 0,
      });
      if (this.type != "Undertime" && this.type != "Emergency") {
        this.chargeTo = this.type;
      } else {
        this.chargeTo = "Vacation";
      }
      if (this.mode != "view") {
        this.data = [];
        this.addNewRow();
        this.total = 0;
      }

      // for (let index = 0; index < this.data.length; index++) {
      //   if(this.data.length != 0) {
      //     this.data.splice(index, 1);
      //   }

      // }
    },
    validateForm() {
      let data;
      for (const item of this.data) {
        for (let [index, value] of Object.entries(item)) {
          if (this.type == "Undertime") {
            if (
              index != "StartDate" &&
              index != "Span1" &&
              index != "EndDate" &&
              index != "Span2" &&
              index != "RequestID" &&
              index != "ModifiedBy" &&
              index != "TotalDays" &&
              index != "TotalHours"
            ) {
              console.log(index + " is required");
              if ((value === "") | (value === null)) {
                data = false;
                break;
              } else {
                data = true;
              }
            }
          } else {
            if (
              index != "Date" &&
              index != "RequestID" &&
              index != "ModifiedBy" &&
              index != "StartTime" &&
              index != "EndTime" &&
              index != "TotalDays" &&
              index != "TotalHours"
            ) {
              if ((value === "") | (value === null)) {
                data = false;
                break;
              } else {
                data = true;
              }
            }
          }
        }
      }
      return data;
    },
    setDate(e, item, key) {
      item[key] = e;
      this.getDays(item);
    },

    span() {},

    getTotal() {
      let total = 0;
      for (const item of this.data) {
        total += item.TotalDays;
      }
      return total;
    },

    getDays(item) {
      console.log(JSON.stringify(item));

      let span1 = item.Span1;
      let span2 = item.Span2;
      console.log(span1);
      console.log(span2);
      console.log(item.StartDate, "Start date");
      console.log(item.EndDate, "End Date");

      if (item.StartDate == "" || item.EndDate == "") {
        item.TotalDays = 0;
      } else {
        if (item.StartDate == item.EndDate) {
          if (span1 == span2) {
            item.TotalDays = 0.5;
          } else if (span1 == "First Half" && span2 == "Second Half") {
            item.TotalDays = 1;
          } else if (span1 == "Second Half" && span2 == "First Half") {
            item.TotalDays = 1;
          }
        } else if (item.StartDate != item.EndDate) {
          let days = moment(item.EndDate).diff(moment(item.StartDate), "days");
          this.TotalDays = days;
          if (span1 == "First Half" && span2 == "Second Half") {
            item.TotalDays = days + 1;
          } else if (span1 == "First Half" && span2 == "First Half") {
            item.TotalDays = days + 1 - 0.5;
          } else if (span1 == "Second Half" && span2 == "Second Half") {
            item.TotalDays = days + 1 - 0.5;
          } else if (span1 == "Second Half" && span2 == "First Half") {
            item.TotalDays = days + 1 - 1;
          } else if (span1 == "First Half" && span2 == "Second Half") {
            item.TotalDays = days + 1 - 0.5;
          }
        }
      }
      this.total = this.getTotal();
    },

    getHours(item) {
      let starttime = moment.duration(item.StartTime, "HH:mm");
      let endtime = moment.duration(item.EndTime, "HH:mm");
      let diff = endtime.subtract(starttime);
      let hours = diff.hours();
      let minutes = diff.minutes();

      if (item.StartTime == "" || item.EndTime == "") {
        this.total = 0;
      } else {
        if (minutes < 10) {
          item.TotalHours = parseFloat(hours + "." + 0 + "" + minutes);
        } else {
          item.TotalHours = parseFloat(hours + "." + minutes);
        }
      }
      this.total = this.getTotalHours();
    },

    getTotalHours() {
      let total = 0;
      for (const item of this.data) {
        total += item.TotalHours;
      }
      return total;
    },

    addNewRow() {
      this.data.push({
        RequestID: null,
        Date: "",
        StartDate: "",
        Span1: "First Half",
        EndDate: "",
        Span2: "First Half",
        TotalDays: 0,
        TotalHours: 0,
        StartTime: null,
        EndTime: null,
        Reason: "",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      });
    },

    deleteRow(index, item) {
      this.total = 0;
      var idx = this.data.indexOf(item);
      console.log(idx, index);
      if (idx > -1) {
        this.data.splice(idx, 1);
      }
      this.total =
        this.type == "Undertime" ? this.getTotalHours() : this.getTotal();
    },
  },
};
</script>

<style scoped>
.required::after {
  content: "*";
  color: red;
}
.b-form-btn-label-control.form-control {
  height: 40px;
  padding: 0;
  background-image: none;
  text-align: center;
}
.default-input {
  width: 130px;
}
.tdays {
  width: 80px;
}
.form--number {
  width: 60px;
}
.--table {
  overflow-y: auto;
  width: 100%;
}
.font-size {
  font-size: 14px !important;
}

td input {
  font-size: 14px;
}
::-webkit-calendar-picker-indicator {
  margin-left: 0px;
}
</style>
