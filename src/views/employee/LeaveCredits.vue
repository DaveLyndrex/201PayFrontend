<template>
<!-- 10/13/2021 CN A.DIEZ -->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="leaveCreditsData"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
    ></DefaultDataTable>

    <DefaultForm
      v-else
      :inputConfig="inputConfig"
      :model="editedItem"
      :defaultInputItem="defaultItem"
      :edit="edit"
      ref="leaveCreditsForm"
    >

    <template v-slot:StartDate>
        <v-menu
          ref="startDate"
          v-model="startDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
            :rules="[v => validation.required(v, 'Leave Credit Start Date')]"
              required
              solo
              dense
              v-model="editedItem.StartDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="startDateMenuValue = parseDate(editedItem.StartDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDateMenuValue"
            no-title
            @input="startDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:EndDate>
        <v-menu
          ref="endDate"
          v-model="endDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
            :rules="[v => validation.required(v, 'Leave Credit End Date')]"
              required
              solo
              dense
              v-model="editedItem.EndDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="endDateMenuValue = parseDate(editedItem.EndDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDateMenuValue"
            no-title
            @input="endDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

       <template v-slot:CarriedOverExpiry>
        <v-menu
          ref="carriedOverExpiry"
          v-model="carriedOverExpiry"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[v => validation.required(v, 'Carried Over Expiry')]"
              required
              solo
              dense
              v-model="editedItem.CarriedOverExpiry"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="carriedOverExpiryMenuValue = parseDate(editedItem.CarriedOverExpiry)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="carriedOverExpiryMenuValue"
            no-title
            @input="carriedOverExpiry = false"
          ></v-date-picker>
        </v-menu>
      </template>


      <template v-slot:actionBtns>
        <v-btn class="mb-2 px-8 font-color" color="whitesmoke" @click="close">
          Cancel
        </v-btn>
        <v-btn
          :loading="savingChanges"
          class="mb-2 px-8"
          dark
          color="blue"
          @click="saveItem(editedItem)"
        >
          Save
        </v-btn>
      </template>
    </DefaultForm>
  </v-app>
</template>
<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
import { EventBus } from "../../bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import Validation from "@/utils/Validation";
import CRUD from "@/utils/CRUD";
import Alert from "@/components/Alert.vue";
export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],

  data() {
    return {
      response:"",
      message:"",
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        { text: "Leave Credit Year", value: "LeaveCreditYear" },
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Leave Type", value: "LeaveType" },
        { text: "Beginning", value: "Beginning" },
        { text: "Carried Over", value: "CarriedOver" },
        { text: "Carried Over Expiry", value: "CarriedOverExpiry" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      leaveCreditsData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Leave Credit Year",
          inputType: "select",
          inputModel: "LeaveCreditYear",
          selectionItems: this.$store.getters.allLeaveCreditYears.map((item) => {
            return {
              ...item,
              name: item.Year,
            };
          }),
          rules: [
            v => Validation.required(v, 'Leave Credit Year')
          ]
        },
        {
          inputLabel: "Beginning",
          inputType: "money",
          inputModel: "Beginning",
          rules: [
            v => Validation.required(v, 'Beginning')
          ]
        },
        {
          inputLabel: "Leave Credit Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [
            v => Validation.date(v, 'Leave Credit Start Date')
          ]
        },
        {
          inputLabel: "Carried Over",
          inputType: "money",
          inputModel: "CarriedOver",
          rules: [
            v => Validation.required(v, 'Carried Over')
          ]
        },
        {
          inputLabel: "Leave Credit End Date",
          inputType: "date",
          inputModel: "EndDate",
          rules: [
            v => Validation.date(v, 'Leave Credit End Date')
          ]
        },
        {
          inputLabel: "Carried Over Expiry",
          inputType: "date",
          inputModel: "CarriedOverExpiry",
          rules: [
            v => Validation.date(v, 'Carried Over Expiry')
          ]
        },
        {
          inputLabel: "Leave Type",
          inputType: "select",
          inputModel: "LeaveType",
          selectionItems: this.$store.getters.allLeaveTypes.map((item) => {
            return {
              ...item,
              name: item.LeaveType,
            };
          }),
          rules: [
            v => Validation.required(v, 'Leave Type')
          ]
        },
        {
          inputType: "hidden",
          inputModel: "ModifiedBy",
        },
        {
          inputType: "hidden",
          inputModel: "EmpID",
          readonly: true,
        },
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        LeaveType: null,
        StartDate: null,
        EndDate: null,
        Beginning: null,
        CarriedOver: null,
        CarriedOverExpiry: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
        LeaveCreditYear: null,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        LeaveType: null,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        Beginning: null,
        CarriedOver: null,
        CarriedOverExpiry: this.formatDate(this.getDefaultDate()),
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
        LeaveCreditYear: null,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      carriedOverExpiryMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
      carriedOverExpiry: false,
      validation: Validation
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    startDateMenuValue(val) {
      console.log(val);
      this.editedItem.StartDate = this.formatDate(this.startDateMenuValue);
    },
    endDateMenuValue(val) {
      console.log(val);
      this.editedItem.EndDate = this.formatDate(this.endDateMenuValue);
    },
    carriedOverExpiryMenuValue(val) {
      console.log(val);
      this.editedItem.CarriedOverExpiry = this.formatDate(this.carriedOverExpiryMenuValue);
    }
  },

  

  created() {
      this.$store.watch(
      (state, getters) => getters.allLeaveTypes,
      (newValue) => {
        if (newValue) {
          this.inputConfig[6].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.LeaveType,
            };
          });
        }
      }
    );


    this.$store.watch(
      (state, getters) => getters.allLeaveCreditYears,
      (newValue) => {
        if (newValue) {
          this.inputConfig[0].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Year,
            };
          });
        }
      }
    );

    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });

    EventBus.$on("addNewItem", (props) => {
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.leaveCreditsData[this.editedIndex], props.item);
      } else {
        this.leaveCreditsData.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });


    this.retrieveData();
    this.initializeRelationalDatas();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.leaveCreditsForm.validateForm()) {
      const parseData = {...data}
      parseData.StartDate = this.formatDateForBe(data.StartDate)
      parseData.EndDate = this.formatDateForBe(data.EndDate)
      parseData.CarriedOverExpiry = this.formatDateForBe(data.CarriedOverExpiry)
      if (this.editedIndex > -1) {
        this.updateItem(parseData);
      } else {
        this.createNewItem(parseData);
      }
      }
    },
    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllLeaveCredits",
          "setLeaveCreditsData",
          "allLeaveCreditsData"
        );
        this.leaveCreditsData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    createNewItem: async function(data) {
      console.log(data)
      let create = await this.create(data, "createLeaveCreditsData");
      this.leaveCreditsData = this.$store.getters.allLeaveCreditsData;
      this.savingChanges = true;
      if (create) {
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Added";

        document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
 
      }
    
      this.savingChanges = false;

    },

    updateItem: async function(data) {
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateLeaveCreditsData",
        "allLeaveCreditsData"
      );

      if (update) {
        this.workFlow = update;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
     
      } else {
        this.workFlow = [];
      }
      this.savingChanges = false;
      await this.retrieveData();

      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
    },
    deleteItem: async function(data) {
      this.savingChanges = true;
      let del = await this.delete(data, "deleteLeaveCreditsData");
      if (del) {
        await this.retrieveData();
        this.response = "success";
        this.message = "Successfully Deleted";

        document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
  
      }
      
      this.savingChanges = false;
      
      
    },

     // Methods for relational datas
    initializeRelationalDatas: async function () {
      try {
        await this.retrieveLeaveTypesData();
        await this.retrieveLeaveCreditYearsData();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },

    retrieveLeaveTypesData: async function () {
      return  this.retrieve(
        "retrieveAllLeaveTypes",
        "setLeaveTypes",
        "allLeaveTypes"
      );
    },

    retrieveLeaveCreditYearsData: async function () {
      return  this.retrieve(
        "retrieveAllLeaveCreditYears",
        "setLeaveCreditYears",
        "allLeaveCreditYears"
      );
    },

    close() {
      this.openForm = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

     formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    getDefaultDate() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      
    },
    formatDateForBe(date) {
      console.log('BEFORE DATE', date);  
      if (!date) return null;

      const [month, day, year] = date.split("/");
      console.log(year, month, day);
      return `${year}-${month}-${day}`;
    }
  },
};
</script>

<style scoped>
#alert{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  margin-top: -5rem;
  word-wrap: break-word;
} 
</style>
