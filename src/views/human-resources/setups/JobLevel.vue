<template>
  <v-app>
     <b-container>
       <BreadCrumb/>
       <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="jobLevel"
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
      ref="jobLevelForm"
    >
     <template v-slot:EffectiveStartDate>
        <v-menu
          ref="effectiveStartDate"
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

      <template v-slot:EffectiveEndDateJobLevel>
        <v-menu
          ref="effectiveEndDate"
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
              v-model="editedItem.EffectiveEndDateJobLevel"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="effectiveEndDateMenuValue = parseDate(editedItem.EffectiveEndDateJobLevel)"
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

       <template v-slot:ValidGradeEffectiveStartDate>
        <v-menu
          ref="validGradeEffectiveStartDate"
          v-model="validGradeEffectiveStartDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
             
              required
              solo
              dense
              v-model="editedItem.ValidGradeEffectiveStartDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="validGradeEffectiveStartDateMenuValue = parseDate(editedItem.ValidGradeEffectiveStartDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="validGradeEffectiveStartDateMenuValue"
            no-title
            @input="validGradeEffectiveStartDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:ValidGradeEffectiveEndDate>
        <v-menu
          ref="validGradeEffectiveEndDate"
          v-model="validGradeEffectiveEndDate"
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
              v-model="editedItem.ValidGradeEffectiveEndDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="validGradeEffectiveEndDateMenuValue = parseDate(editedItem.ValidGradeEffectiveEndDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="validGradeEffectiveEndDateMenuValue"
            no-title
            @input="validGradeEffectiveEndDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

<template v-slot:DateEvaluated>
        <v-menu
          ref="dateEvaluated"
          v-model="dateEvaluated"
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
              v-model="editedItem.DateEvaluated"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="dateEvaluatedMenuValue = parseDate(editedItem.DateEvaluated)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateEvaluatedMenuValue"
            no-title
            @input="dateEvaluated = false"
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
        { text: "Actions", value: "actions", sortable: false },
        { text: "Job Level", value: "JobLevel" },
        { text: "Level", value: "Level" },
        { text: "Effective Start Date", value: "EffectiveStartDate" },
        { text: "Effective End Date", value: "EffectiveEndDate" },
        { text: "Set Code", value: "SetCode" },
        { text: "Active Status", value: "ActiveStatus" },
        { text: "Full/Part Time", value: "FullPartTime" },
        { text: "Job Function Code", value: "JobFunctionCode" },
        { text: "Regular/Temporary", value: "RegularTemporary" },
        { text: "Benchmark Job Code", value: "BenchmarkJobCode" },
        { text: "Approval Authority", value: "ApprovalAuthority" },
        { text: "Actual Reason Code", value: "ActualReasonCode" },
        { text: "Valid Grade Effective Start Date", value: "ValidGradeEffectiveStartDate" },
        { text: "Valid Grade Effective End Date", value: "ValidGradeEffectiveEndDate" },
        { text: "Grade Code", value: "GradeCode" },
        { text: "Date Evaluated", value: "DateEvaluated" },
        { text: "Evaluation System", value: "EvaluationSystem" },
       
      ],
      jobLevel: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Job Level",
          inputType: "text",
          inputModel: "JobLevel",
            rules: [(v) => Validation.required(v, "Job Level")],
         
        },
        {
          inputLabel: "Level",
          inputType: "select",
          inputModel: "Level",
          selectionItems: [
            {name: 1,ID: 1},{ID: 2,name: 2},{ID: 3,name: 3},{ID: 4,name: 4},{ID: 5,name: 5},{ID: 6,name: 6},{ID: 7,name: 7},{ID: 8,name: 8},
            {ID: 9,name: 9},{ID: 10,name: 10},{ID: 11,name: 11},{ID: 12,name: 13},{ID: 14,name: 14},{ID: 15,name: 15},{ID: 16,name: 16},
            {ID: 17,name: 17},{ID: 18,name: 18},{ID: 19,name: 19},{ID: 20,name: 20},
          ],
          rules: [(v) => Validation.required(v, "Level")],
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
          inputModel: "EffectiveEndDateJobLevel",
       
           rules: [(v) => Validation.required(v, "EffectiveEndDateJobLevel")],
        },
        {
          inputLabel: "Set Code",
          inputType: "text",
          inputModel: "SetCode",
        
        },
        {
          inputLabel: "Active Status",
          inputType: "select",
          inputModel: "ActiveStatus",
          selectionItems: [
              {name: "Active", ID: "Active"},
              {name: "Inactive", ID: "Inactive"},
            ],
           rules: [(v) => Validation.required(v, "Active Status")],
        },
       {
          inputLabel: "Full/Part Time",
          inputType: "text",
          inputModel: "FullPartTime",
            rules: [(v) => Validation.required(v, "Full/Part Time")],
        },
        {
          inputLabel: "Job Function Code",
          inputType: "text",
          inputModel: "JobFunctionCode",
           rules: [(v) => Validation.required(v, "Job Function Code")],
        },
        {
          inputLabel: "Regular/Temporary",
          inputType: "text",
          inputModel: "RegularTemporary",
           rules: [(v) => Validation.required(v, "Regular/Temporary")],
        },
          {
          inputLabel: "Benchmark Job Code",
          inputType: "text",
          inputModel: "BenchmarkJobCode",
        },
          {
          inputLabel: "Progression Job Code",
          inputType: "text",
          inputModel: "ProgressionJobCode",
        },
          {
          inputLabel: "Approval Authority",
          inputType: "number",
          inputModel: "ApprovalAuthority",
        },
          {
          inputLabel: "Action Reason Code",
          inputType: "text",
          inputModel: "ActionReasonCode",
        },
          {
          inputLabel: "Valid Grade Effective Start Date",
          inputType: "date",
          inputModel: "ValidGradeEffectiveStartDate",
        },
          {
          inputLabel: "Valid Grade Effective End Date",
          inputType: "date",
          inputModel: "ValidGradeEffectiveEndDate",
        },
          {
          inputLabel: "Grade Code",
          inputType: "text",
          inputModel: "GradeCode",
        },
          {
          inputLabel: "Date Evaluated",
          inputType: "date",
          inputModel: "DateEvaluated",
        },
          {
          inputLabel: "EvaluationSystem",
          inputType: "text",
          inputModel: "EvaluationSystem",
        },
      ],
      editedItem: {
        ID: null,
        JobLevel: null,
        Level: null,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        SetCode: null,
        ActiveStatus: null,
        FullPartTime: null,
        JobFunctionCode: null,
        RegularTemporary: null,
        BenchmarkJobCode: null,
        ProgressionJobCode: null,
        ApprovalAuthority: 0,
        ActionReasonCode: null,
        ValidGradeEffectiveStartDate: this.formatDate(this.getDefaultDate()),
        ValidGradeEffectiveEndDate: this.formatDate(this.getDefaultDate()),
        GradeCode: null,
        DateEvaluated: this.formatDate(this.getDefaultDate()),
        EvaluationSystem: null,
        ModifiedBy: null,
        EffectiveEndDateJobLevel: this.formatDate(this.getDefaultDate()),
      },
      defaultItem: {
        ID: null,
        JobLevel: null,
        Level: null,
        EffectiveStartDate: null,
        EffectiveEndDate: null,
        SetCode: null,
        ActiveStatus: null,
        FullPartTime: null,
        JobFunctionCode: null,
        RegularTemporary: null,
        BenchmarkJobCode: null,
        ProgressionJobCode: null,
        ApprovalAuthority: 0,
        ActionReasonCode: null,
        ValidGradeEffectiveStartDate: null,
        ValidGradeEffectiveEndDate: null,
        GradeCode: null,
        DateEvaluated: null,
        EvaluationSystem: null,
        ModifiedBy: null,
        EffectiveEndDateJobLevel: null,
      },
      effectiveStartDateMenuValue: this.getDefaultDate(),
      effectiveEndDateMenuValue: this.getDefaultDate(),
      effectiveStartDate: false,
      effectiveEndDate: false,
      validGradeEffectiveStartDateMenuValue: this.getDefaultDate(),
      validGradeEffectiveEndDateMenuValue: this.getDefaultDate(),
      dateEvaluatedMenuValue: this.getDefaultDate(),
      validGradeEffectiveStartDate: false,
      validGradeEffectiveEndDate: false,
      dateEvaluated: false,
      validation: Validation,
    };
  },

  watch: {
      
    openForm(val) {
      val || this.close();
      if(this.edit === true){
          this.editedItem.EffectiveEndDateJobLevel = this.editedItem.EffectiveEndDate
      }else{
          this.editedItem.EffectiveStartDate = null
          this.editedItem.EffectiveEndDateJobLevel = null
          this.editedItem.ValidGradeEffectiveStartDate = null
          this.editedItem.ValidGradeEffectiveEndDate = null
          this.editedItem.DateEvaluated = null
      }
    },
    effectiveStartDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveStartDate = this.formatDate(this.effectiveStartDateMenuValue);
    },
    effectiveEndDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveEndDateJobLevel = this.formatDate(this.effectiveEndDateMenuValue);
    },

    validGradeEffectiveStartDateMenuValue(val) {
      console.log(val);
      this.editedItem.ValidGradeEffectiveStartDate = this.formatDate(this.validGradeEffectiveStartDateMenuValue);
    },
    validGradeEffectiveEndDateMenuValue(val) {
      console.log(val);
      this.editedItem.ValidGradeEffectiveEndDate = this.formatDate(this.validGradeEffectiveMenuValue);
    },
    dateEvaluatedMenuValue(val) {
      console.log(val);
      this.editedItem.DateEvaluated = this.formatDate(this.dateEvaluatedMenuValue);
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
        Object.assign(this.jobLevel[this.editedIndex], props.item);
      } else {
        this.jobLevel.push(props.item);
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
      if (this.$refs.jobLevelForm.validateForm()) {
        
        const parseData = {...data}  ;
        parseData.EffectiveStartDate = this.formatDateForBe(parseData.EffectiveStartDate);
        parseData.EffectiveEndDate = this.formatDateForBe(parseData.EffectiveEndDateJobLevel);
        parseData.ValidGradeEffectiveStartDate = this.formatDateForBe(parseData.ValidGradeEffectiveStartDate);
        parseData.ValidGradeEffectiveEndDate = this.formatDateForBe(parseData.ValidGradeEffectiveEndDate);
        parseData.DateEvaluated = this.formatDateForBe(parseData.DateEvaluated);
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
          "getJobLevel",
          "setJobLevel",
          "allJobLevel"
        );
        this.jobLevel = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function (data) {
      data.ApprovalAuthority === "" ? 0 : data.ApprovalAuthority
      this.savingChanges = true;
      let create = await this.create(data, "createJobLevel");
      this.jobLevel = this.$store.getters.allJobLevel;
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
      data.ApprovalAuthority == "" ? 0 : data.ApprovalAuthority
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateJobLevel",
        "allJobLevel"
      );

      if (update) {
        this.jobLevel = update;
         await this.retrieveData();
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } else {
        this.jobLevel = [];

      }
      this.savingChanges = false;
     
        },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data)
      let del = await this.delete(data, "deleteJobLevel");
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
#alert{
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  word-wrap: break-word;
}
</style>

