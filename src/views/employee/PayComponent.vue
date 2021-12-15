<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="payComponent"
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
      ref="payComponentForm"
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

      <template v-slot:actionBtns>
        <v-btn class="mb-2 px-8 font-color" color="whitesmoke" @click="close">
          Cancel
        </v-btn>
        <v-btn
          class="mb-2 px-8"
          dark
          color="blue"
          @click="saveItem(editedItem)"
        >
          Save
        </v-btn>
      </template></DefaultForm
    >
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
      modifiedBy: JSON.parse(localStorage.getItem("user_details")).data,
      openForm: false,
      loading: true,
      savingChanges: false,
      edit: false,
      headers: [
        { text: "Pay Code", value: "PayCodeID" },
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Pay Rate", value: "PayRateID" },
        { text: "Type", value: "TypeID" },
        { text: "Currency", value: "Currency" },
        { text: "Amount", value: "Amount" },
        { text: "Forex", value: "Forex" },
        { text: "Start Process Period", value: "StartProcessPeriod" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      payComponent: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Pay Code",
          inputType: "select",
          inputModel: "PayCodeID",
          selectionItems: this.$store.getters.allPayCodeMasterData.map(
            (item) => {
              return {
                ...item,
                name: item.PayName,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Pay Code")],
        },
        {
          inputLabel: "Currency",
          inputType: "select",
          inputModel: "Currency",
          selectionItems: this.$store.getters.allCurrencyMasterData.map(
            (item) => {
              return {
                ...item,
                name: item.Code,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Currency")],
        },
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.date(v, "Start Date")],
        },
        {
          inputLabel: "Amount",
          inputType: "money",
          inputModel: "Amount",
          rules: [(v) => Validation.required(v, "Amount")],
        },
        {
          inputLabel: "End Date",
          inputType: "date",
          inputModel: "EndDate",
        },
        {
          inputLabel: "Forex",
          inputType: "money",
          inputModel: "Forex",
        },
        {
          inputLabel: "Type",
          inputType: "select",
          inputModel: "TypeID",
          selectionItems: this.$store.getters.allPayComponentTypeMasterData.map(
            (item) => {
              return {
                ...item,
                name: item.PayComponentType,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Type")],
        },
        {
          inputLabel: "Start Process Period",
          inputType: "select",
          inputModel: "StartProcessPeriod",
          selectionItems: this.$store.getters.allPeriodIDMasterData.map(
            (item) => {
              return {
                ...item,
                name: item.StartProcessPeriod,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Start Process Period")],
        },
        {
          inputLabel: "Pay Rate",
          inputType: "select",
          inputModel: "PayRateID",
          selectionItems: this.$store.getters.allPayRateMasterData.map(
            (item) => {
              return {
                ...item,
                name: item.PayRate,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Pay Rate")],
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
        {
          inputType: "hidden",
          inputModel: "EmpID",
        },
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        PayCodeID: null,
        TypeID: null,
        Amount: null,
        PeriodID: null,
        Year: null,
        PayRateID: null,
        Currency: null,
        Forex: 0,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: null,
        EndDate: null,
        PayCodeID: null,
        TypeID: null,
        Amount: null,
        PeriodID: null,
        Year: null,
        PayRateID: null,
        Currency: null,
        Forex: 0,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
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
    endDateMenuValue(val) {
      console.log(val);
      this.editedItem.EndDate = this.formatDate(this.endDateMenuValue);
    },
  },
  mounted() {
    EventBus.$on("newMoney", (props) => {
      this.editedItem[props.model] = props.money;
    });
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.allPayCodeMasterData,
      (newValue) => {
        if (newValue) {
          this.inputConfig[0].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.PayCode,
            };
          });
        }
      }
    ),
      this.$store.watch(
        (state, getters) => getters.allCurrencyMasterData,
        (newValue) => {
          if (newValue) {
            this.inputConfig[1].selectionItems = newValue.map((item) => {
              return {
                ...item,
                name: item.Code,
              };
            });
          }
        }
      ),
      this.$store.watch(
        (state, getters) => getters.allPeriodIDMasterData,
        (newValue) => {
          if (newValue) {
            this.inputConfig[7].selectionItems = newValue.map((item) => {
              return {
                ...item,
                name: item.StartProcessPeriod,
              };
            });
          }
        }
      ),
      this.$store.watch(
        (state, getters) => getters.allPayRateMasterData,
        (newValue) => {
          if (newValue) {
            this.inputConfig[8].selectionItems = newValue.map((item) => {
              return {
                ...item,
                name: item.PayRate,
              };
            });
          }
        }
      ),
      this.$store.watch(
        (state, getters) => getters.allPayComponentTypeMasterData,
        (newValue) => {
          if (newValue) {
            this.inputConfig[6].selectionItems = newValue.map((item) => {
              return {
                ...item,
                name: item.PayComponentType,
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
      this.retrieveData();
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.payComponent[this.editedIndex], props.item);
      } else {
        this.payComponent.push(props.item);
      }
      this.retrieveData();
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
      if (this.$refs.payComponentForm.validateForm()) {
        const parseData = { ...data };
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        parseData.EndDate = this.formatDateForBe(data.EndDate);
        // console.log("Amount", data.Amount, "forex", data.Forex);
        data.Amount = Number.parseFloat(String(data.Amount).replace(/,/g, ""));
        data.Forex = Number.parseFloat(String(data.Forex).replace(/,/g, ""));
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
          "retrievePayComponent",
          "setPayComponentData",
          "allPayComponentData"
        );
        this.payComponent = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.showErrorResponse("Something went wrong!");
      }
    },

    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createPayComponent");
      if (create) {
        this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Added";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);

      } 
      this.savingChanges = false;

    
    },

    updateItem: async function(data) {
      for (var item in this.editedItem) {
        if (item === "ModifiedBy") {
          this.editedItem[item] = JSON.parse(
            localStorage.getItem("user_details")
          ).data.Email;
        }
      }
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updatePayComponent",
        "allPayComponentData"
      );

      if (update) {
        this.payComponent = update;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";

        await this.retrieveData();

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);

      } else {
        this.payComponent = [];
  

      }
      this.savingChanges = false;
      
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      let del = await this.delete(data, "removePayComponent");
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
        await this.retrievePayCodeMasterData();
        await this.retrievePeriodIDMasterData();
        await this.retrieveCurrencyMasterData();
        await this.retrievePayRateMasterData();
        await this.retrievePayComponentTypeMasterData();
      } catch (error) {
        console.log(error);
        this.showWarningResponse("Something went wrong!");
      }
    },

    retrievePayCodeMasterData: async function() {
      return await this.retrieve(
        "retrievePayCodeMasterData",
        "setPayCodeMasterData",
        "allPayCodeMasterData"
      );
    },
    retrievePeriodIDMasterData: async function() {
      return await this.retrieve(
        "retrievePeriodIDMasterData",
        "setPeriodIDMasterData",
        "allPeriodIDMasterData"
      );
    },
    retrieveCurrencyMasterData: async function() {
      return await this.retrieve(
        "retrieveCurrencyMasterData",
        "setCurrencyMasterData",
        "allCurrencyMasterData"
      );
    },
    retrievePayRateMasterData: async function() {
      return await this.retrieve(
        "retrievePayRateMasterData",
        "setPayRateMasterData",
        "allPayRateMasterData"
      );
    },
    retrievePayComponentTypeMasterData: async function() {
      return await this.retrieve(
        "retrievePayComponentTypeMasterData",
        "setPayComponentTypeMasterData",
        "allPayComponentTypeMasterData"
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
