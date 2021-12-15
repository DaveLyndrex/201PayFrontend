<!-- 10/12/2021 CN JLAYAOG -->
<template>
  <div>
    <b-container class="mt-4">
      <b-row>
        <b-col>
          <v-card flat class="" color="transparent font-weight-bold">
            <b-icon scale="1" class="mr-2" icon="file-earmark-check"></b-icon>
            {{ requestType.toUpperCase() }}
            DETAILS
          </v-card>
        </b-col>

        <b-col>
          <b-button
            :disabled="mode == 'view'"
            variant="primary"
            @click="addNewRow"
            class="float-right text-center"
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
        </b-col>
      </b-row>
    </b-container>

    <div class="--table">
      <table
        class="table table-responsive"
        style="font-size: 12px"
        fixed-header
      >
        <thead>
          <tr class="">
            <th rowspan="2">Shift</th>
            <th colspan="4" class="text-center th">Actual</th>
            <th colspan="10" class="text-center th1">
              Proposed
              <span style="font-size: 15px" class="text-danger">*</span>
            </th>
          </tr>
          <tr class="text-center">
            <th class="th">In</th>
            <th class="th">Out</th>
            <th class="th">In</th>
            <th class="th">Out</th>
            <th class="th1">In Date</th>
            <th class="th1">In</th>
            <th class="th1">Out Date</th>
            <th class="th1">Out</th>
            <th class="th1">Reason</th>
            <th class="th1">Actions</th>
          </tr>
        </thead>
        <tbody id="rows">
          <tr v-for="(item, key) in data" :key="key">
            <td>
              <input
                readonly
                class="form-control default-input"
                type="text"
                v-model="Shift"
              />
            </td>
            <td>
              <input
                readonly
                class="form-control form--number"
                type="text"
                v-model="ActualIn1"
              />
            </td>
            <td>
              <input
                readonly
                class="form-control form--number"
                type="text"
                v-model="ActualOut1"
              />
            </td>
            <td>
              <input
                readonly
                class="form-control form--number"
                type="text"
                v-model="ActualIn2"
                id=""
              />
            </td>
            <td>
              <input
                readonly
                class="form-control form--number"
                type="text"
                v-model="ActualOut2"
              />
            </td>

            <!-- =========Proposed InDate1==================== -->
            <td>
              <date-picker
                id="date-picker"
                class="form-control default-input"
                v-model="item.StartDate"
                :elRef="'start-date' + key"
                autocomplete="off"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
                :disabled="mode == 'view'"
              ></date-picker>
              <!-- =========End Proposed InDate1==================== -->
            </td>

            <td>
              <input
                required
                class="form-control"
                type="time"
                v-model="item.StartTime"
                :readonly="mode == 'view'"
              />
            </td>
            <td>
              <date-picker
                id="date-picker"
                class="form-control default-input"
                v-model="item.EndDate"
                :elRef="'end-date' + key"
                autocomplete="off"
                :disabled="mode == 'view'"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>
            </td>
            <td>
              <input
                required
                class="form-control"
                type="time"
                v-model="item.EndTime"
                :readonly="mode == 'view'"
              />
            </td>
            <td>
              <input
                required
                type="text"
                class="form-control default-input"
                v-model="item.Reason"
                label="Reason"
                :readonly="mode == 'view'"
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
                class="text-danger"
              >
                <v-icon left> mdi-close </v-icon>
                Remove
              </v-btn> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { EventBus } from "../../../bus/bus";

import DatePicker from "@/components/DatePicker.vue";
import CRUD from "@/utils/CRUD";
import Decryption from "@/utils/Decryption";
import moment from "moment";
export default {
  props: {
    requestType: {
      type: String,
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
  mixins: [Decryption, CRUD],
  components: {
    DatePicker,
  },
  data() {
    return {
      reason: true,
      request: "",
      Shift: "",
      ActualIn1: "",
      ActualOut1: "",
      ActualIn2: "",
      ActualOut2: "",
      data: [
        {
          RequestID: null,
          StartDate: "",
          StartTime: "",
          EndDate: "",
          EndTime: "",
          Reason: "",
          ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data
            .Email,
        },
      ],
    };
  },

  created() {
    this.request = this.requestType;
    console.log(this.request);
    // console.log(this.mode);
    // console.log(this.clickData);
    if (this.timesheetDate == null) {
      this.data[0].StartDate = moment(moment().toDate()).format("MM/DD/YYYY");
    } else {
      this.data[0].StartDate = this.timesheetDate;
    }

    EventBus.$on("addRequest", (data) => {
      this.request = data.item[0];
      console.log("Overtime Form: " + this.request);
    });

    EventBus.$on("closeRequest", (data) => {
      console.log("close ot");
      if (data) {
        this.data = [];
        this.addNewRow();
      }
    });

    EventBus.$on(`submitForm${this.request}`, (data) => {
      if (data) {
        EventBus.$emit(`formData${this.request}`, {
          data: this.formattedData,
          valid: this.validateForm(),
        });
        console.log("in form: " + this.request);
      }
    });

    if (this.mode == "view") {
      this.data[0].StartDate = moment(this.clickData.StartDate).format("L");
      this.data[0].EndDate = moment(this.clickData.EndDate).format("L");
      this.data[0].StartTime = moment(this.clickData.StartTime, "HHmm").format(
        "HH:mm:ss"
      );
      this.data[0].EndTime = moment(this.clickData.EndTime, "HHmm").format(
        "HH:mm:ss"
      );
      this.data[0].Reason = this.clickData.Reason;
    }
    // console.log(this.convertTime12to24("12:00"));
    this.getShiftDetails();
  },

  computed: {
    formattedData() {
      if (!this.data || this.data.length === 0) return [];
      return this.data.map((item) => {
        return {
          ...item,
          Date: moment(item.Date).format("YYYY-MM-DD"),
          StartDate: moment(item.StartDate).format("YYYY-MM-DD"),
          EndDate: moment(item.EndDate).format("YYYY-MM-DD"),

          StartTime: moment(item.StartTime, "h:m:s A").format("HHmm"),
          EndTime: moment(item.EndTime, "h:m:s A").format("HHmm"),
        };
      });
    },
  },
  methods: {
    getTime(time) {
      console.log(moment(time, "DD/MM/YYYY").format("YYYY-MM-DD"));
    },

    convertTime12to24(time12h) {
      const [time, modifier] = time12h.split(" ");

      let [hours, minutes] = time.split(":");

      if (hours === "12") {
        hours = "00";
      }

      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours}${minutes}`;
    },
    addNewRow() {
      this.data.push({
        RequestID: null,
        StartDate: "",
        StartTime: "",
        EndDate: "",
        EndTime: "",
        Reason: "",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      });
    },

    validateForm() {
      let data;
      for (const item of this.data) {
        for (let [index, value] of Object.entries(item)) {
          if (index != "RequestID" && index != "ModifiedBy") {
            if ((value === "") | (value === null)) {
              data = false;
              break;
            } else {
              data = true;
            }
          }
        }
      }
      return data;
    },

    deleteRow(index, item) {
      var idx = this.data.indexOf(item);
      console.log(idx, index);
      if (idx > -1) {
        this.data.splice(idx, 1);
      }
    },
    getShiftDetails: async function () {
      let response = await this.$store.dispatch("getShiftDetails");
      let decrypteddata = response.data.ciphertext;
      let data = await this.decrypt(decrypteddata, "setShiftDetails");
      let finalData = this.parseData(data.data).data;

      // set input value
      this.Shift = finalData[0]["ShiftName"];
      this.ActualIn1 = finalData[0]["In1"];
      this.ActualOut1 = finalData[0]["Out1"];
      this.ActualIn2 = finalData[0]["In2"];
      this.ActualOut2 = finalData[0]["Out2"];
    },

    parseData(data) {
      if (!data) return {};
      if (typeof data === "object") return data;
      if (typeof data === "string") return JSON.parse(data);

      return {};
    },
  },
};
</script>

<style scoped>
.b-form-btn-label-control.form-control {
  height: 40px;
  padding: 0;
  background-image: none;
  text-align: center;
}
.default-input {
  width: 120px;
}

.form--number {
  width: 60px;
}
.--table {
  overflow-y: auto;
  width: 100%;
}

td input {
  font-size: 12px;
}

::-webkit-calendar-picker-indicator {
  margin-left: 0px;
}

.th {
  background-color: rgba(0, 0, 0, 0.08);
}

.th1 {
  background-color: #d5ecff;
}
.disableInput {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
