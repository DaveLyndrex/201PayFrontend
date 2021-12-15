<template>
  <v-app>
    <b-container>
     <Alert :response="response" :message="message" id="alert" style="display: none"/>
      <BreadCrumb/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="company"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
    ></DefaultDataTable>

    <DefaultForm
      class="emp-d-container"
      v-else
      :inputConfig="inputConfig"
      :model="editedItem"
      :defaultInputItem="defaultItem"
      :edit="edit"
      ref="companyForm"
    >
     <template v-slot:EffectiveStartDate>
        <v-menu
          ref="startDate"
          v-model="effectiveStartDate"
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
              v-model="editedItem.EffectiveStartDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="effectiveStartDateMenuValue = parseDate(editedItem.EffectiveStartDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="effectiveStartDateMenuValue"
            no-title
            @input="effectiveStartDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:EffectiveEndDateCompany>
        <v-menu
          ref="endDate"
          v-model="effectiveEndDate"
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
              v-model="editedItem.EffectiveEndDateDesignation"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="effectiveEndDateMenuValue = parseDate(editedItem.EffectiveEndDateCompany)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="effectiveEndDateMenuValue"
            no-title
            @input="effectiveEndDate = false"
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
      </template></DefaultForm
    >
    </b-container>
  </v-app>
</template>

<script>
import BreadCrumb from /* webpackChunkName: "Data Table" */ "@/components/BreadCrumbs.vue";
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
import { EventBus } from "@/bus/bus";
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
    BreadCrumb
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      openForm: false,
      loading: true,
      savingChanges: false,
      response:"",
      message:"",
      headers: [
        { text: "Company Code", value: "CompanyCode" },
        { text: "Compnay Name", value: "CompanyName" },
        { text: "Effective Start Date", value: "EffectiveStartDate" },
        { text: "Effective End Date", value: "EffectiveEndDate" },
        { text: "Classification Name", value: "Classification Name" },
        { text: "Classification Effective Date", value: "ClassificationEffectiveDate" },
        { text: "Extra Info Effective Date", value: "ExtraInfoEffectiveDate" },
        { text: "Legislation Code", value: "LegislationCode" },
        { text: "LeiInformation Category", value: "LeiInformationCategory" },
        { text: "Set Code", value: "SetCode" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      company: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Company Code",
          inputType: "text",
          inputModel: "CompanyCode",
            rules: [(v) => Validation.required(v, "Company Code")],
         
        },
        {
          inputLabel: "Company Name",
          inputType: "text",
          inputModel: "Company Name",
          rules: [(v) => Validation.required(v, "Company Name")],
        },
         {
          inputLabel: "Effective Start Date",
          inputType: "date",
          inputModel: "EffectiveStartDate",
           rules: [(v) => Validation.required(v, "Effective Start Date")],
        },
        {
          inputLabel: "Effective End Date",
          inputType: "date",
          inputModel: "EffectiveEndDateCompany",
           rules: [(v) => Validation.required(v, "EffectiveEndDateCompany")],
        },
        {
          inputLabel: "Classification Name",
          inputType: "text",
          inputModel: "ClassificationName",
          rules: [(v) => Validation.required(v, "Classification Name")],
        },
        {
          inputLabel: "Classification Effective Date",
          inputType: "date",
          inputModel: "ClassificationEffectiveDate",
           rules: [(v) => Validation.required(v, "Classification Effective Date")],
        },
        {
          inputLabel: "Extra Info Effective Date",
          inputType: "date",
          inputModel: "ExtraInfoEffectiveDate",
           rules: [(v) => Validation.required(v, "Extra Info Effective Date")],
        },
       {
          inputLabel: "Legislation Code",
          inputType: "text",
          inputModel: "LegislationCode",
            rules: [(v) => Validation.required(v, "Legislation Code")],
        },
        {
          inputLabel: "LeiInformation Category",
          inputType: "text",
          inputModel: "LeiInformationCategory",
           rules: [(v) => Validation.required(v, "LeiInformation Category")],
        },
        {
          inputLabel: "Set Code",
          inputType: "text",
          inputModel: "SetCode",
           rules: [(v) => Validation.required(v, "Set Code")],
        },
      ],
      editedItem: {
        ID: null,
        CompanyCode: null,
        CompanyName: null,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        ClassificationName: null,
        ClassificationEffectiveDate: this.formatDate(this.getDefaultDate()),
        ExtraInfoEffectiveStartDate: this.formatDate(this.getDefaultDate()),
        LegislationCode: null,
        LeiInformationCategory: null,
        SetCode: null,
        ModifiedBy: null,
        EffectiveEndDateCompany: this.formatDate(this.getDefaultDate()),
      },
      defaultItem: {
        ID: null,
        CompanyCode: null,
        CompanyName: null,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        ClassificationName: null,
        ClassificationEffectiveDate: this.formatDate(this.getDefaultDate()),
        ExtraInfoEffectiveStartDate: this.formatDate(this.getDefaultDate()),
        LegislationCode: null,
        LeiInformationCategory: null,
        SetCode: null,
        ModifiedBy: null,
        EffectiveEndDateCompany: this.formatDate(this.getDefaultDate()),
      },
      effectiveStartDateMenuValue: this.getDefaultDate(),
      effectiveEndDateMenuValue: this.getDefaultDate(),
      effectiveStartDate: false,
      effectiveEndDate: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
      if(this.edit === true){
          this.editedItem.EffectiveEndDateCompany = this.editedItem.EffectiveEndDate
      }
    },
    effectiveStartDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveStartDate = this.formatDate(this.effectiveStartDateMenuValue);
    },
    effectiveEndDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveEndDateCompany = this.formatDate(this.effectiveEndDateMenuValue);
    },
  },


  created() {
  
    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });

    EventBus.$on("addNewItem", (props) => {
      if(props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.company[this.editedIndex], props.item);
      } else {
        this.company.push(props.item);
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

  },

  methods: {
    saveItem(data) {
      if (this.$refs.designationForm.validateForm()) {
        const parseData = data ;
        parseData.EffectiveStartDate = this.formatDateForBe(data.EffectiveStartDate);
        parseData.EffectiveEndDate = this.formatDateForBe(data.EffectiveEndDateCompany);
        console.log(parseData);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },
    retrieveData: async function () {
  
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "getCompany",
          "setCompany",
          "allCompany"
        );
        this.company = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function (data) {
      console.log(data)
      this.savingChanges = true;
      let create = await this.create(data, "createCompany");
      this.company = this.$store.getters.allCompany;
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
    updateItem: async function (data) {
      
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateCompany",
        "allCompany"
      );

      if (update) {
        this.company = update;
         await this.retrieveData();
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } else {
        this.company = [];

      }
      this.savingChanges = false;
     
        },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data)
      let del = await this.delete(data, "deleteCompany");
      if (del) {
        await this.retrieveData();
        this.response = "success";
        this.message = "Successfully Deleted";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          1000
        );
      }
      this.savingChanges = false;
    },

    close() {
      this.openForm = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    
    formatDate(date) {
      if (!date) return false;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return false;

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
#alert{
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  word-wrap: break-word;
}
</style>

