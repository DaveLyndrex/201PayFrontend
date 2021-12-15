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
          <tr>
            <th rowspan="2" colspan="">
              Date<span style="font-size: 15px" class="text-danger">*</span>
            </th>
            <th rowspan="2">Shift</th>
            <th colspan="4" class="text-center th">Actual</th>
            <th colspan="10" class="text-center th1">
              Proposed<span style="font-size: 15px" class="text-danger">*</span>
            </th>
          </tr>
          <tr class="text-center">
            <th class="border-secondary th">In</th>
            <th class="border-secondary th">Out</th>
            <th class="border-secondary th">In</th>
            <th class="border-secondary th">Out</th>
            <th class="border-secondary th1">In</th>
            <th class="border-secondary th1">In Date</th>
            <th class="border-secondary th1">Out</th>
            <th class="border-secondary th1">Out Date</th>
            <th class="border-secondary th1">In</th>
            <th class="border-secondary th1">In Date</th>
            <th class="border-secondary th1">Out</th>
            <th class="border-secondary th1">Out Date</th>
            <th class="border-secondary th1">Actions</th>
          </tr>
        </thead>
        <tbody id="rows">
          <tr v-for="(item, key) in data" :key="key">
            <!-- ========= Date==================== -->
            <td>
              <date-picker
                id="date-picker"
                class="form-control default-input"
                :elRef="'date' + key"
                v-model="item.Date"
                autocomplete="off"
                :disabled="mode == 'view'"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>

              <input
                colspan="4"
                type="text"
                :disabled="mode == 'view'"
                class="form-control mt-2"
                v-model="item.Reason"
                name=""
                placeholder="Reason"
                id=""
              />
            </td>

            <!-- =========End Date==================== -->
            <td>
              <input
                readonly
                class="form-control default-input"
                type="text"
                v-model="Shift"
                id=""
              />
            </td>
            <td>
              <input
                readonly
                class="form-control form--number"
                type="text"
                v-model="ActualIn1"
                id=""
              />
            </td>
            <td>
              <input
                readonly
                class="form-control form--number"
                type="text"
                v-model="ActualOut1"
                id=""
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
                id=""
              />
            </td>

            <!-- =========Proposed In1==================== -->
            <td>
              <input
                class="form-control af"
                type="time"
                v-model="item.StartTime"
                :disabled="mode == 'view'"
                id=""
              />
            </td>
            <!-- =========End Proposed In1==================== -->

            <!-- =========Proposed InDate1==================== -->
            <td>
              <date-picker
                id="date-picker"
                class="form-control default-input"
                v-model="item.StartTimeDate"
                :elRef="'start-date' + key"
                autocomplete="off"
                format="MM/DD/YYYY"
                :disabled="mode == 'view'"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>

              <!-- =========End Proposed InDate1==================== -->
            </td>

            <td>
              <input
                class="form-control"
                type="time"
                :disabled="mode == 'view'"
                v-model="item.EndTime"
                id=""
              />
            </td>
            <td>
              <date-picker
                id="date-picker"
                class="form-control default-input"
                v-model="item.EndTimeDate"
                :elRef="'end-date' + key"
                autocomplete="off"
                format="MM/DD/YYYY"
                :disabled="mode == 'view'"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>
            </td>
            <td>
              <input
                class="form-control"
                type="time"
                :disabled="mode == 'view'"
                v-model="item.StartTime2"
                id=""
              />
            </td>
            <td>
              <date-picker
                id="date-picker"
                class="form-control default-input"
                v-model="item.StartTimeDate2"
                :elRef="'start-date' + key"
                autocomplete="off"
                :disabled="mode == 'view'"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>
            </td>
            <td>
              <input
                class="form-control"
                type="time"
                :disabled="mode == 'view'"
                v-model="item.EndTime2"
                id=""
              />
            </td>
            <td>
              <date-picker
                id="date-picker"
                class="form-control default-input"
                v-model="item.EndTimeDate2"
                :elRef="'end-date' + key"
                autocomplete="off"
                :disabled="mode == 'view'"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>

              <!-- <v-text-field dense solo></v-text-field> -->
            </td>
            <td>
              <b-button
                variant="danger"
                @click="deleteRow(key, item)"
                class="float-right mr-2"
                :disabled="mode == 'view'"
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
    <!-- <button @click="getTime()" class="btn">afa</button> -->
    <!-- <v-toolbar v-if="reason" flat class="mt-4">
      <v-text-field label="Reason"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn @click="reason = false" elevation="0" class="text-primary">
        <v-icon left> mdi-close </v-icon>
        Remove
      </v-btn>
    </v-toolbar> -->
  </div>
</template>
<script>
import { EventBus } from "../../../bus/bus";
import CRUD from "@/utils/CRUD";
import moment from "moment";
import DatePicker from "@/components/DatePicker.vue";
import Decryption from "@/utils/Decryption";
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
      inDate: false,
      coaDate: false,
      request: [],
      Shift: "",
      ActualIn1: "",
      ActualOut1: "",
      ActualIn2: "",
      ActualOut2: "",
      data: [
        {
          RequestID: null,
          Date: "",
          StartTime: null,
          StartTimeDate: null,
          EndTime: null,
          EndTimeDate: "",
          StartTime2: "",
          StartTimeDate2: "",
          EndTime2: null,
          EndTimeDate2: "",
          Reason: "",
          ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data
            .Email,
        },
      ],
      // inDate1:this.getDefaultDate(),
    };
  },

  created() {
    if (this.timesheetDate == null) {
      this.data[0].Date = moment(moment().toDate()).format("MM/DD/YYYY");
    } else {
      this.data[0].Date = this.timesheetDate;
    }

    this.request = this.requestType;
    EventBus.$on("addRequest", (data) => {
      this.request = data.item[0];
      this.data = [];
      this.addNewRow();
    });

    EventBus.$on(`submitForm${this.request}`, (data) => {
      if (data) {
        EventBus.$emit(`formData${this.request}`, {
          data: this.formattedData,
          valid: this.validateForm(),
        });
      }
    });

    if (this.mode == "view") {
      this.data[0].Date = moment(this.clickData.Date).format("L");
      this.data[0].StartTimeDate = moment(this.clickData.StartTimeDate).format("L");
      this.data[0].EndTimeDate = moment(this.clickData.EndTimeDate).format("L");
      this.data[0].StartTime = moment(this.clickData.StartTime,"HHmm").format("HH:mm:ss");
      this.data[0].EndTime = moment(this.clickData.EndTime,"HHmm").format("HH:mm:ss");

      this.data[0].StartTimeDate2 = moment(this.clickData.StartTimeDate2).format("L");
      this.data[0].EndTimeDate2 = moment(this.clickData.EndTimeDate2).format("L");
      this.data[0].StartTime2 = moment(this.clickData.StartTime2,"HHmm").format("HH:mm:ss");
      this.data[0].EndTime2 = moment(this.clickData.EndTime2,"HHmm").format("HH:mm:ss");

      this.data[0].Reason = this.clickData.Reason;
    }

    console.log(this.request);
    this.getShiftDetails();
  },

  computed: {
    formattedData() {
      if (!this.data || this.data.length === 0) return [];
      return this.data.map((item) => {
        return {
          ...item,
          Date: moment(item.Date).format("YYYY-MM-DD"),
          StartTimeDate: moment(item.StartTimeDate).format("YYYY-MM-DD"),
          EndTimeDate: moment(item.EndTimeDate).format("YYYY-MM-DD"),
          StartTimeDate2: moment(item.StartTimeDate2).format("YYYY-MM-DD"),
          EndTimeDate2: moment(item.EndTimeDate2).format("YYYY-MM-DD"),

          StartTime: moment(item.StartTime, "h:m:s A").format("HHmm"),
          EndTime: moment(item.EndTime, "h:m:s A").format("HHmm"),
          StartTime2: moment(item.StartTime2, "h:m:s A").format("HHmm"),
          EndTime2: moment(item.EndTime2, "h:m:s A").format("HHmm"),
        };
      });
    },
  },
  methods: {
    getTime(time) {
      console.log(moment(time).format("YYYY-MM-DD"));
    },

    // dateItem(idx) {
    //   for (let [index, val] of this.data.entries()) {
    //     if (index == idx) {
    //       val.Date = this.parseDate(this.formatDate(this.date));
    //     }
    //   }
    // },

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
    addNewRow() {
      this.data.push({
        RequestID: null,
        Date: "",
        StartTime: null,
        StartTimeDate: "",
        EndTime: null,
        EndTimeDate: "",
        StartTime2: "",
        StartTimeDate2: "",
        EndTime2: null,
        EndTimeDate2: "",
        Reason: "",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      });
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

      //    this.Shift = finalData[0]["ShiftName"];
      // this.ActualIn1 = moment(finalData[0]["In1"], "h:m:s A").format("HH:mm A");
      // this.ActualOut1 = moment(finalData[0]["Out1"], "h:m:s A").format("HH:mm P");
      // this.ActualIn2 = moment(finalData[0]["In2"], "h:m:s A").format("HH:mm A");
      // console.log( moment(finalData[0]["In2"], "hh:mm:s A").format("HH:mm:s A"));
      // this.ActualOut2 = moment(finalData[0]["Out2"], "h:m:s A").format("HH:mm A");
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
.datestyle {
  font-size: 12px;
  width: 100px;
  height: 40px;
}
</style>


