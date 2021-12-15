<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="licenseData"
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
      ref="licenseForm"
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

      <template v-slot:RenewalDate>
        <v-menu
          ref="renewalDate"
          v-model="renewalDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Renewal Date')]"
              required
              solo
              dense
              v-model="editedItem.RenewalDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="renewalDateMenuValue = parseDate(editedItem.RenewalDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="renewalDateMenuValue"
            no-title
            @input="renewalDate = false"
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
      renewedData: [],
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Description", value: "Description" },
        { text: "License No", value: "LicenseNo" },
        { text: "Renewal Date", value: "RenewalDate" },
        { text: "Renewed", value: "Renewed" },
        { text: "Remarks", value: "Remarks" },
        { text: "Legislation Code", value: "LegislationCode" },
        { text: "License Type", value: "LicenseType" },
        { text: "Issuing Authority", value: "IssuingAuthority" },
        { text: "Issuing Country", value: "IssuingCountry" },
        { text: "Issuing Location", value: "IssuingLocation" },
        { text: "License Suspended", value: "LicenseSuspended" },
        { text: "Attachment", value: "Attachment" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      licenseData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.date(v, "Start Date")],
        },
        {
          inputLabel: "Legislation Code",
          inputType: "text",
          inputModel: "LegislationCode",
          rules: [(v) => Validation.required(v, "Legislation Code")],
        },
        {
          inputLabel: "End Date",
          inputType: "date",
          inputModel: "EndDate",
        },
        {
          inputLabel: "License Type",
          inputType: "text",
          inputModel: "LicenseType",
        },
        {
          inputLabel: "Description",
          inputType: "text",
          inputModel: "Description",
          rules: [(v) => Validation.required(v, "Description")],
        },
        {
          inputLabel: "Issuing Authority",
          inputType: "text",
          inputModel: "IssuingAuthority",
          rules: [(v) => Validation.required(v, "SIssuing Authority")],
        },
        {
          inputLabel: "License No",
          inputType: "number",
          inputModel: "LicenseNo",
          rules: [(v) => Validation.required(v, "License No")],
        },
        {
          inputLabel: "Issuing Country",
          inputType: "text",
          inputModel: "IssuingCountry",
          rules: [(v) => Validation.required(v, "Issuing Country")],
        },
        {
          inputLabel: "Renewal Date",
          inputType: "date",
          inputModel: "RenewalDate",
          rules: [(v) => Validation.date(v, "Renewal Date")],
        },
        {
          inputLabel: "Issuing Location",
          inputType: "text",
          inputModel: "IssuingLocation",
          rules: [(v) => Validation.required(v, "Issuing Location")],
        },
        {
          inputLabel: "Renewed",
          inputType: "radio",
          inputModel: "Renewed",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          rules: [(v) => Validation.required(v, "Renewed")],
        },
        {
          inputLabel: "License Suspended",
          inputType: "text",
          inputModel: "LicenseSuspended",
        },
        {
          inputLabel: "Remarks",
          inputType: "text",
          inputModel: "Remarks",
        },
        {
          inputLabel: "Attachment",
          inputType: "file",
          inputModel: "Attachment",
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
        StartDate: null,
        EndDate: null,
        Description: null,
        LicenseNo: null,
        RenewalDate: null,
        Renewed: null,
        Remarks: null,
        LegislationCode: null,
        LicenseType: null,
        IssuingAuthority: null,
        IssuingCountry: null,
        IssuingLocation: null,
        LicenseSuspended: null,
        Attachment: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        Description: null,
        LicenseNo: null,
        RenewalDate: this.formatDate(this.getDefaultDate()),
        Renewed: null,
        Remarks: null,
        LegislationCode: null,
        LicenseType: null,
        IssuingAuthority: null,
        IssuingCountry: null,
        IssuingLocation: null,
        LicenseSuspended: null,
        Attachment: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      renewalDateMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
      renewalDate: false,
      validation: Validation,
    };
  },

  // computed: mapState(["allSuffixMasterData"]),

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
    renewalDateMenuValue(val) {
      console.log(val);
      this.editedItem.RenewalDate = this.formatDate(this.renewalDateMenuValue);
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
        Object.assign(this.licenseData[this.editedIndex], props.item);
      } else {
        this.licenseData.push(props.item);
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
    console.log(this.licenseData);
    // this.retrieveMasterData();
  },

  methods: {
    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveLicenseData",
          "setLicenseData",
          "allLicenseData"
        );
        this.licenseData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    saveItem(data) {
      if (this.$refs.licenseForm.validateForm()) {
        const parseData = { ...data };
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        parseData.EndDate = this.formatDateForBe(data.EndDate);
        parseData.RenewalDate = this.formatDateForBe(data.RenewalDate);
        console.log(parseData);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },
    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createLicense");
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
      console.log(data);
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateLicense",
        "allLicenseData"
      );
      console.log(update);
      if (update) {
        this.licenseData = update;
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
    
      } else {
        this.licenseData = [];
        
        
      }
      this.savingChanges = false;

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
