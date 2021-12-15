<template>
  <!--10/12/2021 CN A.DIEZ-->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="deductionData"
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
      ref="deductionForm"
    >
      <template v-slot:Date>
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
              :rules="[(v) => validation.required(v, 'Start Date')]"
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
import { EventBus } from "@/bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import Validation from "@/utils/Validation";
import CRUD from "@/utils/CRUD";
import Alert from "@/components/Alert.vue"

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert
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
        { text: "ID", align: "start", value: "EmpID" },
        { text: "Start Date", value: "Date" },
        { text: "Deduction", value: "Deduction" },
        { text: "Total Amount", value: "TotalAmount" },
        { text: "Deduction Amount", value: "DeductionAmount" },
        { text: "Frequency", value: "FrequencyID" },
        { text: "Status", value: "Status" },
        { text: "Remarks", value: "Remarks" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      deductionData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "ID",
          inputType: "number",
          inputModel: "EmpID",
          readonly: true,
        },
        {
          inputLabel: "Deduction Amount",
          inputType: "money",
          inputModel: "DeductionAmount",
          rules: [(v) => Validation.required(v, "Deduction Amount")],
        },
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "Date",
          rules: [(v) => Validation.date(v, "Start Date")],
        },
        {
          inputLabel: "Frequency",
          inputType: "select",
          inputModel: "FrequencyID",
          selectionItems: this.$store.getters.allPayFrequency.map((item) => {
            return {
              ...item,
              name: item.PayFrequency,
            };
          }),
          rules: [(v) => Validation.required(v, "Frequency")],
        },
        {
          inputLabel: "Deduction",
          inputType: "select",
          inputModel: "DeductionID",
          selectionItems: this.$store.getters.allDeductionMasterData.map(
            (item) => {
              return {
                ...item,
                name: item.DeductionName,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "DeductionID")],
        },
        {
          inputLabel: "Status",
          inputType: "select",
          inputModel: "Status",
          selectionItems: [
            {
              ID: "OPEN",
              name: "OPEN",
            },
            {
              ID: "DISCONTINUED ",
              name: "DISCONTINUED ",
            },
            {
              ID: "CLOSED",
              name: "CLOSED ",
            },
          ],
          rules: [(v) => Validation.required(v, "Status")],
        },
        {
          inputLabel: "Total Amount",
          inputType: "money",
          inputModel: "TotalAmount",
          rules: [(v) => Validation.required(v, "Total Amount")],
        },
        {
          inputLabel: "Remarks",
          inputType: "text",
          inputModel: "Remarks",
        },
        {
          inputType: "hidden",
          inputModel: "CreatedDate",
        },
        {
          inputType: "hidden",
          inputModel: "ModifiedDate",
        },
        {
          inputType: "hidden",
          inputModel: "ModifiedBy",
        },
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        DeductionID: null,
        TotalAmount: null,
        DeductionAmount: null,
        FrequencyID: null,
        Status: null,
        Remarks: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: null,
        DeductionID: null,
        TotalAmount: null,
        DeductionAmount: null,
        FrequencyID: null,
        Status: null,
        Remarks: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      startDateMenuValue: this.getDefaultDate(),
      startDate: false,
      validation: Validation,
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
  },

  created() {
    this.$store.watch(
      (state, getters) => getters.allPayFrequencyMasterData,
      (newValue) => {
        if (newValue) {
          this.inputConfig[3].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.PayFrequency,
            };
          });
        }
      }
    ),
      this.$store.watch(
        (state, getters) => getters.allDeductionMasterData,
        (newValue) => {
          if (newValue) {
            this.inputConfig[4].selectionItems = newValue.map((item) => {
              return {
                ...item,
                name: item.DeductionName,
              };
            });
          }
        }
      ),
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
        Object.assign(this.deductionData[this.editedIndex], props.item);
      } else {
        this.deductionData.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    EventBus.$on("deleteItem", (props) => {
      if (!this.savingChanges) {
        this.deleteItem(props);
      }
    });

    this.retrieveData();
    this.initializeRelationalDatas();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.deductionForm.validateForm()) {
        const parseData = { ...data };
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createDeductions");
      this.deductionData = this.$store.getters.allDeductionData;
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

    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveDeductions",
          "setDeductions",
          "allDeductionData"
        );
        this.deductionData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    updateItem: async function(data) {
      console.log(data);
      for (var item in data) {
        // console.log(item +data[item])s
        if (item === "ModifiedBy") {
          console.log(
            JSON.parse(localStorage.getItem("user_details")).data.Email
          );
          data[item] = JSON.parse(
            localStorage.getItem("user_details")
          ).data.Email;
        }
      }
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateDeductions",
        "allDeductionData"
      );

      if (update) {
        this.deductionData = update;
        this.close();

        this.response = "success";
        this.message = "Successfully Updated";

         await this.retrieveData();
      
      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      
      } else {
        this.deductionData = [];
   
      }
      this.savingChanges = false;
     
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      let del = await this.delete(data, "removeDeduction");
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
    initializeRelationalDatas: async function() {
      try {
        await this.retrieveDeductionsMasterData();
        await this.retrievePayFrequencyMasterData();
      } catch (error) {
        this.showWarningResponse("Something went wrong");
      }
    },

    retrieveDeductionsMasterData: async function() {
      return await this.retrieve(
        "retrieveDeductionsMasterData",
        "setDeductionsMasterData",
        "allDeductionMasterData"
      );
    },

    retrievePayFrequencyMasterData: async function() {
      return await this.retrieve(
        "retrievePayFrequencyMasterData",
        "setPayFrequencyMasterData",
        "allPayFrequencyMasterData"
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
        .substr(0, 10);
    },
    formatDateForBe(date) {
      console.log("BEFORE DATE", date);
      if (!date) return null;

      const [month, day, year] = date.split("/");
      console.log(year, month, day);
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
<style scoped>
.font-color {
  color: blue;
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
