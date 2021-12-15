<template>
  
  <v-data-table
    :headers="headers"
    :items="formattedItems"
    :search="search"
    :items-per-page="10"
    :loading="dataLoading"
    loading-text="Loading... Please wait."
    :class="
      `${
        $route.fullPath.split('/')[2] == 'employee-kiosk'
          ? 'table-kiosk'
          : 'default-table'
      }`
    "
    class="elevation-1 default-table"
    @click:row="handleClick"
  >
    <template v-slot:top>
      <div id="container" style="display: none">
        <Alert :response="response" :message="message" id="alert"/>
      </div>
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
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          v-if="
            $route.fullPath.split('/')[2] != 'logs' &&
              $route.fullPath.split('/')[2] != 'time-keeping' &&
              $route.fullPath.split('/')[2] != 'kiosk'
          "
          color="blue"
          dark
          class="mb-2 px-8 addButton"
          @click="addNewEvent(-1)"
        >
          Add New
        </v-btn>
        <!-- 
        <v-btn
          v-if="
            $route.fullPath.split('/')[2] != 'logs' &&
            $route.fullPath.split('/')[2] != 'time-keeping' &&
            $route.fullPath.split('/')[2] != 'kiosk'
          "
          color="blue"
          dark
          class="mb-2 px-8"
          @click="addNewEvent(-1)"
        >
          New Item
        </v-btn> -->
        <v-spacer
          v-if="$route.fullPath.split('/')[3] == 'awaiting-approval'"
        ></v-spacer>
        <!-- FOR AWAITING APPROVAL -->
        <v-btn
          v-if="
            $route.fullPath.split('/')[2] == 'kiosk' &&
              $route.fullPath.split('/')[3] == 'awaiting-approval'
          "
          color="primary"
          dark
          class="mb-2 px-8 mr-2"
          @click="addNewEvent(-1)"
        >
          <i class="mdi mdi-thumb-up"></i>
          Approve
        </v-btn>
        <v-btn
          v-if="
            $route.fullPath.split('/')[2] == 'kiosk' &&
            $route.fullPath.split('/')[3] == 'awaiting-approval'
          "
          class="mb-2 px-8 ml-2"
          @click="addNewEvent(-1)"
          dark
          color="danger"
        >
          <i class="mdi mdi-thumb-down"></i>
          Disapprove
        </v-btn>
        <!-- END OF AWAITING APPROVAL -->
        <v-dialog v-model="dialogDelete"  max-width="450px">
          <v-card class="p-2">
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mb-2 px-8"
                color="danger text-light"
                @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                class="mb-2 px-8"
                color="primary darken-1"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item, index }">
      <v-icon small id="edit" class="mr-2" @click="editItem(item, index)" color="primary">
        mdi-pencil
      </v-icon>

      <v-icon class="delete"  v-if="$route.fullPath.split('/')[2] == 'human-resource'" small @click.stop="deleteItem(item)" color="danger">
        mdi-delete
      </v-icon> 
    </template>
    <template v-slot:no-data>
      <v-btn
        class="mb-2 px-8"
        color="primary"
        @click="initialize"
        v-if="$route.fullPath.split('/')[2] != 'time-keeping'"
      >
        Reload
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { EventBus } from "../bus/bus.js";
import moment from "moment";
import PromptAlert from "@/utils/PromptAlert";
import Alert from "@/components/Alert.vue"

export default {
  name: "DefaultDataTable",
  components: {
    Alert
  },
  mixins: [PromptAlert],
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    items: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    editedItem: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    defaultItem: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    dataLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      search: "",
      response:"",
      message:"",
      dialogDelete: false,
      editedIndex: -1,
      itemEdited: this.editedItem,
      selectedRow: [],
      tempVar: [],
    };
  },

  created() {},

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    initialize() {
      EventBus.$emit("initializeData");
    },
    currentDate() {
      const current = new Date();
      const date = moment(
        `${current.getMonth() +
          1}/${current.getDate()}/${current.getFullYear()}`
      ).format("MM/DD/YYYY");
      return date;
    },
    addNewEvent(itemIndex) {
      console.log(this.items.length)
      this.itemEdited.StartDate = ""
      this.itemEdited.EndDate = ""
      // console.log(this.$route.fullPath.split('/')[3])
      
      if (this.items.length > 0 &&
        this.$route.fullPath.split("/")[3] == "workflow" ||
        this.$route.fullPath.split("/")[3] == "address" ||
        this.$route.fullPath.split("/")[3] == "payroll-data" ||
        this.$route.fullPath.split("/")[3] == "employment-data" ||
        this.$route.fullPath.split("/")[3] == "pay-component" ||
        this.$route.fullPath.split("/")[3] == "leave-credits" ||
        this.$route.fullPath.split("/")[3] == "ethnicity" ||
        this.$route.fullPath.split("/")[3] == "legislative"  
      ) {
        if(this.items.length === 0){
          
        EventBus.$emit("addNewItem", {
          item: this.itemEdited,
          index: itemIndex,
        });
      }
        else{
        console.log(this.items.length == 0)
        if (this.items[this.items.length - 1].EndDate !== "undefined") {
          // console.log(true);
          if (
            moment(this.currentDate()).isBefore(
              this.items[this.items.length - 1].EndDate
            )
          ) {
            this.response = 'error',
            this.message = `Please Edit the value of the End Date first before adding new ${this.$route.meta.title}`;
            document.getElementById("container").style.display = "block";
          } else {
            EventBus.$emit("addNewItem", {
              item: this.itemEdited,
              index: itemIndex,
            });
          }
          this.response = 'error',
          this.message = `Please Edit the value of the End Date first before adding new ${this.$route.meta.title}`;
           document.getElementById("container").style.display = "block";
        }else if(this.items[this.items.length - 1].EffectiveEndDate !== "undefined"){
          if (
            moment(this.currentDate()).isBefore(
              this.items[this.items.length - 1].EffectiveEndDate
            )
          ) {
            this.response = 'error',
            this.message = `Please Edit the value of the End Date first before adding new ${this.$route.meta.title}`;
             document.getElementById("container").style.display = "block";
          } else {
            EventBus.$emit("addNewItem", {
              item: this.itemEdited,
              index: itemIndex,
            });
          }
        }else if(this.items[this.items.length - 1].end_date !== "undefined"){
            if (
            moment(this.currentDate()).isBefore(
              this.items[this.items.length - 1].EffectiveEndDate
            )
          ) {
            this.response = 'error',
            this.message = `Please Edit the value of the End Date first before adding new ${this.$route.meta.title}`;
             document.getElementById("container").style.display = "block";
          } else {
            EventBus.$emit("addNewItem", {
              item: this.itemEdited,
              index: itemIndex,
            });
          }
        }
      }
      document.getElementById("container").style.display = "block";
      setTimeout( () => (document.getElementById("container").style.display = "none"), 3000);
      } else{
         
        EventBus.$emit("addNewItem", {
          item: this.itemEdited,
          index: itemIndex,
        });
      }
    },



    editEvent(itemIndex) {
      EventBus.$emit("addNewItem", { item: this.itemEdited, index: itemIndex });
    },

    editItem(item, index) {
      this.edit =true
      console.log(item, index)
      item.TotalAmount = item.TotalAmount.replace(",", "")
      item.Value = item.Value.replace(",", "")
      item.Amount = item.Amount.replace(",", "")
      item.Forex= item.Forex.replace(",", "")
      item.ProgramFee= item.ProgramFee.replace(",", "")
      item.IncidentialCost= item.IncidentialCost.replace(",", "")
      item.HDMFContribution= item.HDMFContribution.replace(",", "")
      let toEditItem = item;
    //  for(const item of item.TotalAmount){
    //    console.log(item)
    //  }
    
      this.editedIndex = index;
      this.itemEdited = Object.assign(
        {},
        {
          ...toEditItem,
          start_date: moment(toEditItem.start_date).format("MM/DD/YYYY"),
          end_date: moment(toEditItem.end_date).format("MM/DD/YYYY"),
          StartDate: moment(toEditItem.StartDate).format("MM/DD/YYYY"),
          EndDate: moment(toEditItem.EndDate).format("MM/DD/YYYY"),
          DateFrom: moment(toEditItem.DateFrom).format("MM/DD/YYYY"),
          DateTo: moment(toEditItem.DateTo).format("MM/DD/YYYY"),
          MaritalStatusDate: moment(toEditItem.MaritalStatusDate).format(
            "MM/DD/YYYY"
          ),
          
          CarriedOverExpiry: moment(toEditItem.CarriedOverExpiry).format(
            "MM/DD/YYYY"
          ),
          IssueDate: moment(toEditItem.IssueDate).format("MM/DD/YYYY"),
          EntryDate: moment(toEditItem.EntryDate).format("MM/DD/YYYY"),
          ExpirationDate: moment(toEditItem.ExpirationDate).format(
            "MM/DD/YYYY"
          ),
          ServiceYear: moment(toEditItem.ServiceYear).format("MM/DD/YYYY"),
          BusinessUnitHoliday: moment(toEditItem.BusinessUnitHoliday).format(
            "MM/DD/YYYY"
          ),
          RestBirthday: moment(toEditItem.RestBirthday).format("MM/DD/YYYY"),
          Date: moment(toEditItem.Date).format("MM/DD/YYYY"),
          RestDay: moment(toEditItem.RestDay).format("MM/DD/YYYY"),
          DateOfDeath: moment(toEditItem.DateOfDeath).format("MM/DD/YYYY"),
          

          BirthDate: moment(toEditItem.BirthDate).format("MM/DD/YYYY"),
          CreatedDate:
            item.CreatedDate != null && item.CreatedDate != ""
              ? moment(item.CreatedDate).format("LL")
              : "N/A",
          ModifiedDate:
            item.ModifiedDate != null && item.ModifiedDate != ""
              ? moment(item.ModifiedDate).format("LL")
              : "N/A",

          // start_moneyTypeFormat,
          Value: String(
            Number(toEditItem.Value)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,")
           .replace(",", "")
            .trim(),
          Amount: String(
            Number(toEditItem.Amount)
              .toFixed(3)
              .slice(0, -1)
          ),
          Forex: String(
            Number(toEditItem.Forex)
              .toFixed(3)
              .slice(0, -1)
          ),
          HDMFContribution: String(
            Number(toEditItem.HDMFContribution)
              .toFixed(3)
              .slice(0, -1)
          ),
          TotalAmount: String(
            Number(toEditItem.TotalAmount)
              .toFixed(3)
              .slice(0, -1)
          )
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            .replace(",", "")
            .trim(),

          DeductionAmount: String(
            Number(toEditItem.DeductionAmount)
              .toFixed(3)
              .slice(0, -1)
          )
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            .replace(",", "")
            .trim(),
          ProgramFee: String(
            Number(item.ProgramFee)
              .toFixed(3)
              .slice(0, -1)
          ),
          
          IncidentialCost: String(
            Number(item.IncidentialCost)
              .toFixed(3)
              .slice(0, -1)
          ),
          //end_moneyTypeFormat
        }
      );
      this.editEvent(index);
      console.log(this.itemEdited)
    },

    handleClick(row) {
      this.formattedItems.map((item, index) => {
        item.selected = item === row;

        if (item.selected === true) {
          this.$set(this.formattedItems, index, item);
          this.editItem(item, index);
        }
      });
    },
    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.items.indexOf(item);
      this.itemEdited = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      EventBus.$emit("deleteItem", {
        itemToDelete: this.itemEdited,
        itemIndex: this.editedIndex,
      });
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.itemEdited = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },

  computed: {
  
    formattedItems() {
      if (!this.items || this.items.length === 0) return [];
      return this.items.map((item) => {
        return {
          ...item,
          GradeStepEffectiveDate: moment(item.Date).format("L"),
          EffectiveStartDate: item.EffectiveStartDate==""?"":moment(item.EffectiveStartDate).format("L"),
          EffectiveEndDate: item.EffectiveEndDate==""?"":moment(item.EffectiveEndDate).format("L"),
          Date: moment(item.Date).format("L"),
          CreatedDate: moment(item.date).format("L"),
          DateFrom: moment(item.DateFrom).format("LL"),
          MaritalStatusDate: moment(item.MaritalStatusDate).format("LL"),
          start_date: moment(item.start_date).format("L"),
          end_date: moment(item.end_date).format("L"),
          StartDate: moment(item.StartDate).format("L"),
          EndDate: moment(item.EndDate).format("L"),
          // DateOfBirth: moment(item.DateOfBirth).format("L"),
          BusinessUnitHoliday: moment(item.BusinessUnitHoliday).format("LL"),
          RestBirthday: moment(item.RestBirthday).format("LL"),
          RestDay: moment(item.RestDay).format("LL"),
          DateOfDeath: moment(item.DateOfDeath).format("LL"),
          DateOfMarriage: moment(item.DateOfMarriage).format("LL"),
          BirthDate: moment(item.BirthDate).format("LL"),
          // CarriedOverExpiry: moment(item.CarriedOverExpiry).format("ll"),
          IssueDate: moment(item.IssueDate).format("ll"),
          EntryDate: moment(item.EntryDate).format("ll"),
          ExpirationDate: moment(item.ExpirationDate).format("ll"),
          ServiceYear: moment(item.ServiceYear).format("ll"),

          //start decimal format
          Absent1: String(Number(item.Absent1).toFixed(2)),
          Tardy1: String(Number(item.Tardy1).toFixed(2)),
          Undertime1: String(Number(item.Undertime1).toFixed(2)),
          Absent2: String(Number(item.Absent2).toFixed(2)),
          Tardy2: String(Number(item.Tardy2).toFixed(2)),
          Undertime2: String(Number(item.Undertime2).toFixed(2)),
          RequestedOTHrs: String(Number(item.RequestedOTHrs).toFixed(2)),
          OTHrs: String(Number(item.OTHrs).toFixed(2)),
          OTHrsPaid: String(Number(item.OTHrsPaid).toFixed(2)),
          NDHrs: String(Number(item.NDHrs).toFixed(2)),

          Beginning: String(Number(item.Beginning).toFixed(2)),
          Balance: String(Number(item.Balance).toFixed(2)),
          TotalBegCredits: String(Number(item.TotalBegCredits).toFixed(2)),
          Approved: String(Number(item.Approved).toFixed(2)),
          ExpiredCarriedOver: String(
            Number(item.ExpiredCarriedOver).toFixed(2)
          ),
          CarriedOver: String(Number(item.CarriedOver).toFixed(2)),

          MinAmount:String(Number(item.MinAmount).toFixed(2)),
          MaxAmount:String(Number(item.MaxAmount).toFixed(2)),
          MidValueAmount:String(Number(item.MidValueAmount).toFixed(2)),
      
          //end decimal format

          //start_moneyTypeFormat
          MinWage: String(
            Number(item.MinWage)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          Value: String(
            Number(item.Value)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          Amount: String(
            Number(item.Amount)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          Forex: String(
            Number(item.Forex)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          HDMFContribution: String(
            Number(item.HDMFContribution)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          TotalAmount: String(
            Number(item.TotalAmount)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          DeductionAmount: String(
            Number(item.DeductionAmount)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          ProgramFee: String(
            Number(item.ProgramFee)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          IncidentialCost: String(
            Number(item.IncidentialCost)
              .toFixed(3)
              .slice(0, -1)
          ).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
          // end_moneyTypeFormat
          //   company_id: this.$store.getters.allCompanies.map((companyItem) => {
          //     return companyItem.ID === item.company_id && this.editedIndex === -1
          //       ? companyItem.CompanyName
          //       : item.company_id;
          //   }),
          //   department_id: this.$store.getters.allDepartments.map(
          //     (departmentItem) => {
          //       return departmentItem.ID === item.department_id
          //         ? departmentItem.DepartmentName
          //         : item.department_id;
          //     }
          //   ),
          //   EmployeeStatusID: this.$store.getters.allEmployeeStatus.map(
          //     (empStatusItem) => {
          //       return empStatusItem.ID === item.EmployeeStatusID
          //         ? empStatusItem.EmployeeStatus
          //         : item.EmployeeStatusID;
          //     }
          //   ),
          //   CompanyID: this.$store.getters.allCompanies.map((companyItem) => {
          //     console.log(companyItem)
          //     return companyItem.ID === item.CompanyID && this.editedIndex === -1
          //       ? companyItem.CompanyName
          //       : item.CompanyID;
          //   }),
          //   CostCenterID: this.$store.getters.allCostCenterSetUp.map(
          //     (costCenterItem) => {
          //       return costCenterItem.ID === item.CostCenterID
          //         ? costCenterItem.CostCenterName
          //         : item.CostCenterID;
          //     }
          //   ),
          //   Currency: this.$store.getters.allCurrencyMasterData.map(
          //     (currencyItem) => {
          //       return currencyItem.ID === item.Currency
          //         ? currencyItem.Code
          //         : item.Currency;
          //     }
          //   ),
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.default-table {
  margin-top: 3vh;
}
.table-kiosk {
  margin-top: 10px;
}

.btn-add {
  background-color: #5d28da;
}
.sub-menu {
  position: absolute;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
.menu {
  border-radius: 20px;
  padding: 2px;
  color: white !important;
  background-color: rgb(67, 44, 170);
}
.text-light {
  color: white !important;
}
.addButton {
  text-transform: none;
  font-size: 12px;
}
#alert{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  margin-top: -5rem;
  word-wrap: break-word;
}
</style>
