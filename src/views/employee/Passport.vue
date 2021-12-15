<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="passportData"
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
      ref="passportForm"
    >
      <template v-slot:IssueDate>
        <v-menu
          ref="issueDate"
          v-model="issueDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Issue Date')]"
              required
              solo
              dense
              v-model="editedItem.IssueDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="issueDateMenuValue = parseDate(editedItem.IssueDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="issueDateMenuValue"
            no-title
            @input="issueDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:ExpirationDate>
        <v-menu
          ref="expirationDate"
          v-model="expirationDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Expiration Date')]"
              required
              solo
              dense
              v-model="editedItem.ExpirationDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="
                expirationDateMenuValue = parseDate(editedItem.ExpirationDate)
              "
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="expirationDateMenuValue"
            no-title
            @input="expirationDate = false"
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
        { text: "Issue Date", value: "IssueDate" },
        { text: "Expiration Date", value: "ExpirationDate" },
        { text: "Legislation Code", value: "LegislationCode" },
        { text: "Passport Type", value: "PassportType" },
        { text: "Passport Number", value: "PassportNumber" },
        { text: "Issuing Authority", value: "IssuingAuthority" },
        { text: "Issuing Country", value: "IssuingCountry" },
        { text: "Issuing Location", value: "IssuingLocation" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      passportData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Issue Date",
          inputType: "date",
          inputModel: "IssueDate",
          rules: [(v) => Validation.date(v, "Issue Date")],
        },
        {
          inputLabel: "Passport Number",
          inputType: "number",
          inputModel: "PassportNumber",
          rules: [(v) => Validation.required(v, "Passport Number")],
        },
        {
          inputLabel: "Expiration Date",
          inputType: "date",
          inputModel: "ExpirationDate",
        },
        {
          inputLabel: "Issuing Authority",
          inputType: "text",
          inputModel: "IssuingAuthority",
          rules: [(v) => Validation.required(v, "Issuing Authority")],
        },
        {
          inputLabel: "Legislation Code",
          inputType: "text",
          inputModel: "LegislationCode",
          rules: [(v) => Validation.required(v, "Legislation Code")],
        },
        {
          inputLabel: "Issuing Country",
          inputType: "text",
          inputModel: "IssuingCountry",
          rules: [(v) => Validation.required(v, "Issuing Country")],
        },
        {
          inputLabel: "Passport Type",
          inputType: "text",
          inputModel: "PassportType",
          rules: [(v) => Validation.required(v, "Passport Type")],
        },
        {
          inputLabel: "Issuing Location",
          inputType: "text",
          inputModel: "IssuingLocation",
          rules: [(v) => Validation.required(v, "Issuing Location")],
        },
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        IssueDate: null,
        ExpirationDate: null,
        LegislationCode: null,
        PassportType: null,
        PassportNumber: null,
        IssuingAuthority: null,
        IssuingCountry: null,
        IssuingLocation: null,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        IssueDate: this.formatDate(this.getDefaultDate()),
        ExpirationDate: this.formatDate(this.getDefaultDate()),
        LegislationCode: null,
        PassportType: null,
        PassportNumber: null,
        IssuingAuthority: null,
        IssuingCountry: null,
        IssuingLocation: null,
      },
      issueDateMenuValue: this.getDefaultDate(),
      expirationDateMenuValue: this.getDefaultDate(),
      issueDate: false,
      expirationDate: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    issueDateMenuValue(val) {
      console.log(val);
      this.editedItem.IssueDate = this.formatDate(this.issueDateMenuValue);
    },
    expirationDateMenuValue(val) {
      console.log(val);
      this.editedItem.ExpirationDate = this.formatDate(
        this.expirationDateMenuValue
      );
    },
  },

  created() {
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
        Object.assign(this.passportData[this.editedIndex], props.item);
      } else {
        this.passportData.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    this.retrieveData();
    // this.retrieveMasterData();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.passportForm.validateForm()) {
        const parseData = { ...data };
        parseData.IssueDate = this.formatDateForBe(data.IssueDate);
        parseData.ExpirationDate = this.formatDateForBe(data.ExpirationDate);
        console.log(parseData);
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
          "retrieveAllPassport",
          "setPassportData",
          "allPassportData"
        );
        this.passportData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    createNewItem: async function(data) {
      let create = await this.create(data, "createPassportData");
      this.passportData = this.$store.getters.allPassportData;
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
      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
    },

    updateItem: async function(data) {
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updatePassportData",
        "allPassportData"
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
