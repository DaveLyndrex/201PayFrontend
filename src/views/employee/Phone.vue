<template>
  <!-- 10/13/2021 CN A.DIEZ -->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="phoneData"
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
      ref="phoneForm"
    >
      <template v-slot:DateFrom>
        <v-menu
          ref="dateFrom"
          v-model="dateFrom"
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
              v-model="editedItem.DateFrom"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="dateFromMenuValue = parseDate(editedItem.DateFrom)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateFromMenuValue"
            no-title
            @input="dateFrom = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:DateTo>
        <v-menu
          ref="dateTo"
          v-model="dateTo"
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
              v-model="editedItem.DateTo"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="dateToMenuValue = parseDate(editedItem.DateTo)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateToMenuValue"
            no-title
            @input="dateTo = false"
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
import CRUD from "@/utils/CRUD";
import Validation from "@/utils/Validation";
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
        { text: "Phone Number", value: "PhoneNumber" },
        { text: "Country Code", value: "CountryCode" },
        { text: "Area Code", value: "AreaCode" },
        { text: "Phone Type", value: "PhoneType" },
        { text: "Extension", value: "Extension" },
        { text: "Date From", value: "DateFrom" },
        { text: "Date To", value: "DateTo" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      phoneData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Phone Number",
          inputType: "number",
          inputModel: "PhoneNumber",
          rules: [(v) => Validation.required(v, "Phone Number")],
        },
        {
          inputLabel: "Extension",
          inputType: "text",
          inputModel: "Extension",
          rules: [(v) => Validation.required(v, "Extension")],
        },
        {
          inputLabel: "Country Code",
          inputType: "text",
          inputModel: "CountryCode",
          rules: [(v) => Validation.required(v, "Country Code")],
        },
        {
          inputLabel: "Date From",
          inputType: "date",
          inputModel: "DateFrom",
          rules: [(v) => Validation.date(v, "Date From")],
        },
        {
          inputLabel: "Area Code",
          inputType: "text",
          inputModel: "AreaCode",
          rules: [(v) => Validation.required(v, "Area Code")],
        },
        {
          inputLabel: "Date To",
          inputType: "date",
          inputModel: "DateTo",
          rules: [(v) => Validation.date(v, "Date To")],
        },
        {
          inputLabel: "Phone Type",
          inputType: "select",
          inputModel: "PhoneType",
          selectionItems: this.$store.getters.allPhoneType.map((item) => {
            return {
              ...item,
              name: item.PhoneType,
            };
          }),
          rules: [(v) => Validation.required(v, "Phone Type")],
        },
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        PhoneNumber: null,
        CountryCode: null,
        AreaCode: null,
        PhoneType: null,
        Extension: null,
        DateFrom: null,
        DateTo: null,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        PhoneNumber: null,
        CountryCode: null,
        AreaCode: null,
        PhoneType: null,
        Extension: null,
        DateFrom: this.formatDate(this.getDefaultDate()),
        DateTo: this.formatDate(this.getDefaultDate()),
      },

      dateFromMenuValue: this.getDefaultDate(),
      dateToMenuValue: this.getDefaultDate(),
      dateFrom: false,
      dateTo: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    dateFromMenuValue(val) {
      console.log(val);
      this.editedItem.DateFrom = this.formatDate(this.dateFromMenuValue);
    },
    dateToMenuValue(val) {
      console.log(val);
      this.editedItem.DateTo = this.formatDate(this.dateToMenuValue);
    },
  },

  created() {
    this.$store.watch(
      (state, getters) => getters.allPhoneType,
      (newValue) => {
        if (newValue) {
          this.inputConfig[6].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.PhoneType,
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
        Object.assign(this.phoneData[this.editedIndex], props.item);
      } else {
        this.phoneData.push(props.item);
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
    // this.retrieveMasterData();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.phoneForm.validateForm()) {
        const parseData = { ...data };
        parseData.DateFrom = this.formatDateForBe(data.DateFrom);
        parseData.DateTo = this.formatDateForBe(data.DateTo);
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
          "retrievePhoneData",
          "setPhoneData",
          "allPhoneData"
        );
        this.phoneData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    createNewItem: async function(data) {
      let create = await this.create(data, "createPhoneData");
      this.phoneData = this.$store.getters.allPhoneData;
      this.savingChanges = true;
      if (create) {
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfuly Added";

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
        "updatePhoneData",
        "allPhoneData"
      );

      if (update) {
        this.phoneData = update;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";

      } else {
        this.phoneData = [];

      }
      this.savingChanges = false;
      await this.retrieveData();

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
    },

    deleteItem: async function(data) {
      console.log(data);
      this.savingChanges = true;
      let del = await this.delete(data, "deletePhone");
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
        await this.retrievePhoneType();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },

    retrievePhoneType: async function() {
      return this.retrieve("retrievePhoneType", "setPhoneType", "allPhoneType");
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
