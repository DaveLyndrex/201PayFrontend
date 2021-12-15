<!-- 10/12/2021 CN JLAYAOG -->
<template>
  <div>
    <b-container flat class="mt-5">
      <v-card flat class="" color="transparent font-weight-bold">
        <b-icon scale="1" class="mr-2" icon="file-earmark-check"></b-icon>
        {{ requestType.toUpperCase() }}
        DETAILS {{ timesheetDate }}
      </v-card>
    </b-container>

    <div class="--table">
      <table class="table table-responsive" fixed-header>
        <thead>
          <tr class="border-bottom border-dark">
            <th width="13%">Date<span style="font-size:15px" class="text-danger">*</span> </th>
            <th width="13%">Shift<span style="font-size:15px" class="text-danger">*</span> </th>
            <th colspan="6">Reason<span style="font-size:15px" class="text-danger">*</span> </th>
            <th class="float-right border-0">
              <b-button
                variant="primary"
                :disabled="mode =='view'"
                @click="addNewRow"
                class="mt-4 text-center"
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
              <!-- <v-btn @click="addNewRow" elevation="0" class="text-primary">
                <v-icon left> mdi-plus </v-icon>
                Add
              </v-btn> -->
            </th>
          </tr>
        </thead>
        <tbody id="rows">
          <tr v-for="(item, key) in data" :key="key">
            <!-- ========= Date==================== -->

            <td>
              <date-picker
                style="font-size"
                id="date-picker"
                v-model="item.Date"
                :elRef="'date' + key"
                autocomplete="off"
                :disabled="mode =='view'"
                format="MM/DD/YYYY"
                :options="{ firstDay: 0, showWeekNumber: false }"
              ></date-picker>
            </td>
            <!-- =========End Date==================== -->

            <td>
              <b-form-select
                class="form-control font-size"
                v-model="item.Shift"
                :disabled="mode =='view'"
                :options="shift"
              ></b-form-select>
            </td>

            <td colspan="6" id="reason" class="divider-left">
              <input class="form-control" :disabled="mode =='view'" v-model="item.Reason" />
            </td>
            <td>
              <b-button
                variant="danger"
                :disabled="mode =='view'"
                @click="deleteRow(key, item)"
                class="float-right mr-2"
                size="sm"
              >
                <span class="">Remove</span>
              </b-button>
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
      type: [Object,Array],
      required: false,
    },
  },
  components: {
    DatePicker,
  },
  data() {
    return {
      Dates: "",
      reason: true,
      request: "",
      shift: ["Rest Day", "Regular Day"],
      data: [
        {
          RequestID: null,
          Date: "",
          Shift: "Rest Day",
          Reason: "",
          ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data
            .Email,
        },
      ],
    };
  },

  created() {
    if(this.timesheetDate == null) {
      this.data[0].Date = moment(moment().toDate()).format("MM/DD/YYYY");
    }else {
      this.data[0].Date = this.timesheetDate;
    }
     this.request = this.requestType;
    EventBus.$on("addRequest", (data) => {
      this.request = data.item[0];
       this.data=[];
      this.addNewRow()
    });
    EventBus.$on(`submitForm${this.request}`, (data) => {
      if (data) {
        // console.log(JSON.stringify(this.data));
        // console.log(this.data[0]);
        EventBus.$emit(`formData${this.request}`, {
          data: this.formattedData,
          valid: this.validateForm(),
        });

        // for(const item of this.data){
        //   console.log(item);
        // }
      }
    });

    EventBus.$on("HandleMessage", (data) => {
      if (data.code == 200) {
        this.data = [];
        this.addNewRow();
      }
    });

    if(this.mode=="view"){
       this.data[0].Date =moment( this.clickData.Date).format("L");
      this.data[0].Reason = this.clickData.Reason;
    }
  },

  computed: {
    formattedData() {
      if (!this.data || this.data.length === 0) return [];
      return this.data.map((item) => {
        return {
          ...item,
          Date: moment(item.Date).format("YYYY-MM-DD"),
        
        };
      });
    },
  },
  methods: {
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
        Shift: "Rest Day",
        Reason: "",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      });
    },

    // Get date today
    // new Date().toLocaleDateString()

    deleteRow(index, item) {
      var idx = this.data.indexOf(item);
      console.log(idx, index);
      if (idx > -1) {
        this.data.splice(idx, 1);
      }
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
  width: 150px;
}

.form--number {
  width: 60px;
}
::-webkit-calendar-picker-indicator {
  margin-left: 0px;
}
td input {
  font-size: 14px;
}
.font-size {
  font-size: 14px;
}

.v-input__slot {
  align-items: center;
  color: inherit;
  display: flex;
  margin-bottom: 0px;
  min-height: 33px;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1); 
  width: 100%;
}
.--table {
  overflow-y: auto;
  width: 100%;
}
.my-icon {
    padding-right: calc(1.5em + .75rem);
    background-image: url(../../../assets/images/calendar-check.svg);
    background-repeat: no-repeat;
    background-position: center right calc(.375em + .1875rem);
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
</style>
