    
<!-- [11/03/2021 CN C.Rubio ] -->
<template>
  <v-app>  
  <b-container>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <BreadCrumb/>
      <DefaultDataTable
        class="tableStyle"
        v-if="!openForm"
        :headers="headers"
        :items="gradeRates"
        :editedItem="editedItem"
        :defaultItem="defaultItem"
        :dataLoading="loading"
      >
      </DefaultDataTable>
      <DefaultForm
        class="emp-d-container"
        v-else
        :inputConfig="inputConfig"
        :model="editedItem"
        :defaultInputItem="defaultItem"
        :edit="edit"
        ref="gradeRatesForm"
      >
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

        <template v-slot:EffectiveStartDate>
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
              :rules="[(v) => validation.required(v, 'Effective Start Date')]"
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
            @input="startDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:EffectiveEndDate>
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
              :rules="[(v) => validation.required(v, 'Effective End Date')]"
              required
              solo
              dense
              v-model="editedItem.EffectiveEndDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="effectiveEndDateMenuValue = parseDate(editedItem.EffectiveEndDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="effectiveEndDateMenuValue"
            no-title
            @input="endDate = false"
          ></v-date-picker>
        </v-menu>
      </template>
      </DefaultForm>
  </b-container>
  </v-app>
</template>
 
<script>
import BreadCrumb from /* webpackChunkName: "Data Table" */ "@/components/BreadCrumbs.vue";
import DefaultDataTable from "@/components/DataTable.vue";
import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
import CRUD from "@/utils/CRUD";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import { EventBus } from "../../../bus/bus";
import Alert from "@/components/Alert.vue";
// import moment from "moment";

import Validation from "@/utils/Validation";

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
      startDate:false,
      endDate:false,
       validation: Validation,
      edit: false,
      loading: true,
      openForm: false,
      savingChanges: false,
      search: "",
      headers: [
        { text: "Actions", value: "actions", sortable: false },
        { text: "Grade Rate Name", value: "GradeRateName" },
        { text: "Effective Start Date", value: "EffectiveStartDate" },
        { text: "Effective End Date", value: "EffectiveEndDate" },
        { text: "Legislative Data Group", value: "LegislativeDataGroup" },
        { text: "Rate Type", value: "RateType" },
        { text: "Currency Code", value: "CurrencyCode" },
        { text: "Rate Frequency", value: "RateFrequency" },
        { text: "Annualization Factor", value: "AnnualizationFactor" },
        { text: "Active Status", value: "ActiveStatus" },
        { text: "Rate Name", value: "RateName" },
        { text: "Minimum Amount", value: "MinAmount" },
        { text: "Maximum Amount", value: "MaxAmount" },
        { text: "Mid Value Amount", value: "MidValueAmount" },
        { text: "Set Code", value: "SetCode" },
        { text: "Grade Code", value: "GradeCode" },
        
      ],
      gradeRates: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Grade Rate Name",
          inputType: "text",
          inputModel: "GradeRateName",
          rules: [(v) => Validation.required(v, "Grade Rate Name")],
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
          inputModel: "EffectiveEndDate",
          rules: [(v) => Validation.required(v, "Effective End Date")],
        },
         {
          inputLabel: "Legislative Data Group",
          inputType: "text",
          inputModel: "LegislativeDataGroup",
        },
         {
          inputLabel: "Rate Type",
          inputType: "text",
          inputModel: "RateType",
          rules: [(v) => Validation.required(v, "Rate Type")],
        },
        {
          inputLabel: "Currency Code",
          inputType: "text",
          inputModel: "CurrencyCode",
          rules: [(v) => Validation.required(v, "Currency Code")],
        },
        {
          inputLabel: "Rate Frequency",
          inputType: "text",
          inputModel: "RateFrequency",
          rules: [(v) => Validation.required(v, "Rate Frequency")],
        },
         {
          inputLabel: "Annualization Factor",
          inputType: "text",
          inputModel: "AnnualizationFactor",
          rules: [(v) => Validation.required(v, "Annualization Factor")],
        },
        {
          inputLabel: "Active Status",
          inputType: "select",
          inputModel: "ActiveStatus",
          selectionItems: ["Active", "Inactive"],
          rules: [(v) => Validation.required(v, "Active Status")],
        },
        {
          inputLabel: "Rate Name",
          inputType: "text",
          inputModel: "RateName",
          rules: [(v) => Validation.required(v, "Rate Name")],
        },
         {
          inputLabel: "Minimum Amount",
          inputType: "text",
          inputModel: "MinAmount",
          rules: [(v) => Validation.required(v, "Minimum Amount")],
        },
         {
          inputLabel: "Maximum Amount",
          inputType: "text",
          inputModel: "MaxAmount",
          rules: [(v) => Validation.required(v, "Maximum Amount")],
        },
         {
          inputLabel: "Mid Value Amount",
          inputType: "text",
          inputModel: "MidValueAmount",
          rules: [(v) => Validation.required(v, "Mid Value Amount")],
        },
         {
          inputLabel: " Set Code ",
          inputType: "text",
          inputModel: "SetCode",
   
        },
         {
          inputLabel: "Grade Code",
          inputType: "text",
          inputModel: "GradeCode",
        
        },
      ],
      editedItem: {
        ID: null,
        GradeRateName: null,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        LegislativeDataGroup: null,
        RateType: null,
        CurrencyCode: null,
        RateFrequency: null,
        AnnualizationFactor: null,
        ActiveStatus: null,
        RateName: null,
        MinAmount: null,
        MaxAmount: null,
        MidValueAmount: null,
        SetCode: null,
        GradeCode: null,
      },

      defaultItem: {
        ID: null,
        GradeRateName: null,
        EffectiveStartDate: null,
        EffectiveEndDate: null,
        LegislativeDataGroup: null,
        RateType: null,
        CurrencyCode: null,
        RateFrequency: null,
        AnnualizationFactor: null,
        ActiveStatus: null,
        RateName: null,
        MinAmount: null,
        MaxAmount: null,
        MidValueAmount: null,
        SetCode: null,
        GradeCode: null,
      },
      message: "",
      response: "",
      effectiveStartDateMenuValue: this.getDefaultDate(),
      effectiveEndDateMenuValue: this.getDefaultDate(),
    };
  },


  watch: {
    openForm(val) {
      val || this.close();
    },

    effectiveStartDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveStartDate = this.formatDate(this.effectiveStartDateMenuValue);
    },

    effectiveEndDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveEndDate = this.formatDate(this.effectiveEndDateMenuValue);
    },
   
  },

  created() {
    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });

    EventBus.$on("addNewItem", (props) => {
      console.log(props);
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.gradeRates[this.editedIndex], props.item);
      } else {
        this.gradeRates.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    EventBus.$on("deleteItem", (props) => {
      console.log(props);
      if (!this.savingChanges) {
        this.deleteItem(props);
      }
    });

    this.retrieveData();
  },

  methods: {
    retrieveData: async function () {
      this.loading = true;
      let getdata = await this.retrieve(
        "getGradeRates",
        "setGradeRates",
        "allGradeRates"
      );
      console.log(getdata);

      this.gradeRates = getdata ? getdata : [];
      this.loading = false;
    },

    saveItem(data) {
      console.log(data);
      console.log(this.editedIndex);

      if (this.$refs.gradeRatesForm.validateForm()) {
       const parseData = {...data} ;
        parseData.EffectiveStartDate = this.formatDateForBe(data.EffectiveStartDate);
        parseData.EffectiveEndDate = this.formatDateForBe(data.EffectiveEndDate);
      
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function (data) {
      this.savingChanges = true;
      let create = await this.create(data, "createGradeRates");
      console.log(create);
      if (create) {
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Added";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          3000
        );
      }
      this.savingChanges = false;
    },
    updateItem: async function (data) {
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateGradeRatesData",
        "getAllGradeRates"
      );

      if (update) {
        this.gradeRates = update;
        await this.retrieveData();
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          3000
        );
      } else {
        this.gradeRates = [];
      }

      this.savingChanges = false;
      
    },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data);
      let del = await this.delete(data, "deleteGradeRates");
      if (del) {
        await this.retrieveData();

        this.response = "success";
        this.message = "Successfully Deleted";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          3000
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
.tableStyle {
  margin-top: 10vh;
}
#alert{
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  word-wrap: break-word;
}
</style>