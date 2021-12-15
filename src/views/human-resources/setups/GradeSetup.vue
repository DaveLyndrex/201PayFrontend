<template>
  <v-app>
    <b-container>
      <Alert :response="response" :message="message" id="alert" style="display: none"/>
      <BreadCrumb/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="grade"
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
      ref="gradeForm"
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
            @input="effectiveStartDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:EffectiveEndDateGrade>
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
              v-model="editedItem.EffectiveEndDateGrade"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="effectiveEndDateMenuValue = parseDate(editedItem.EffectiveEndDateGrade)"
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

       <template v-slot:GradeStepEffectiveDate>
        <v-menu
          ref="gradeStepEffectiveDate"
          v-model="gradeStepEffectiveDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Grade Step Effective Date')]"
              required
              solo
              dense
              v-model="editedItem.GradeStepEffectiveDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="gradeStepEffectiveDateMenuValue = parseDate(editedItem.GradeStepEffectiveDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="gradeStepEffectiveDateMenuValue"
            no-title
            @input="gradeStepEffectiveDate = false"
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
        { text: "Grade Step Name", value: "GradeStepName" },
        { text: "Grade Step Effective Date", value: "GradeStepEffectiveDate" },
        { text: "Grade Step Sequence", value: "GradeStepSequence" },
        { text: "Ceiling Step Flag", value: "CeilingStepFlag" },
        { text: "Set Code", value: "SetCode" },
        { text: "Active Status", value: "ActiveStatus" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      grade: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Grade Step Name",
          inputType: "text",
          inputModel: "GradeStepName",
            rules: [(v) => Validation.required(v, "Grade Step Name")],
         
        },
        {
          inputLabel: "Effective Start Date",
          inputType: "date",
          inputModel: "EffectiveStartDate",
           rules: [(v) => Validation.date(v, "Effective Start Date")],
        },
        {
          inputLabel: "Effective End Date",
          inputType: "date",
          inputModel: "EffectiveEndDateGrade",
           rules: [(v) => Validation.required(v, "EffectiveEndDateGrade")],
        },
        {
          inputLabel: "Set Code",
          inputType: "text",
          inputModel: "SetCode",
          rules: [(v) => Validation.required(v, "Set Code")],
        },
         {
          inputLabel: "Active Status",
          inputType: "select",
          inputModel: "ActiveStatus",
          selectionItems: ["Active", "Inactive"],
           rules: [(v) => Validation.required(v, "Active Status")],
        },
        {
          inputLabel: "Grade Step Effective Date",
          inputType: "date",
          inputModel: "GradeStepEffectiveDate",
           rules: [(v) => Validation.required(v, "Grade Step Effective Date")],
        },
       
       {
          inputLabel: "Grade Step Sequence",
          inputType: "text",
          inputModel: "GradeStepSequence",
            rules: [(v) => Validation.required(v, "Grade Step Sequence")],
        },
       
        {
          inputLabel: "Ceiling Step Flag",
          inputType: "text",
          inputModel: "CeilingStepFlag",
           rules: [(v) => Validation.required(v, "Ceiling Step Flag")],
        },
      ],
      editedItem: {
        ID: null,
        GradeStepName: null,
        EffectiveStartDate: null,
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        SetCode: null,
        ActiveStatus: null,
        GradeStepEffectiveDate: this.formatDate(this.getDefaultDate()),
        GradeStepSequence: null,
        CeilingStepFlag: null,
        ModifiedBy: null,
        EffectiveEndDateGrade: this.formatDate(this.getDefaultDate()),
        SetCodeGrade: null
      },
      defaultItem: {
         ID: null,
        GradeStepName: null,
        EffectiveStartDate: null,
        EffectiveEndDate: null,
        SetCode: null,
        ActiveStatus: null,
        GradeStepEffectiveDate: null,
        GradeStepSequence: null,
        CeilingStepFlag: null,
        ModifiedBy: null,
        EffectiveEndDateGrade: null,
        SetCodeGrade: null,
      },
      effectiveStartDateMenuValue: this.getDefaultDate(),
      effectiveEndDateMenuValue: this.getDefaultDate(),
      effectiveStartDate: false,
      effectiveEndDate: false,
      gradeStepEffectiveDateMenuValue: this.getDefaultDate(),
      gradeStepEffectiveDate: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
      if(this.edit === true){
          this.editedItem.EffectiveEndDateGrade = this.editedItem.EffectiveEndDate
          this.editedItem.SetCodeGrade = this.editedItem.SetCode
      }else{
          this.editedItem.EffectiveStartDate = ''
          this.editedItem.EffectiveEndDateGrade = ''
          this.editedItem.GradeStepEffectiveDate = ''
          
          
      }
    },
    effectiveStartDateMenuValue() {

      this.editedItem.EffectiveStartDate = this.formatDate(this.effectiveStartDateMenuValue);
    },
    effectiveEndDateMenuValue() {

      this.editedItem.EffectiveEndDateGrade = this.formatDate(this.effectiveEndDateMenuValue);
    },

    gradeStepEffectiveDateMenuValue() {
     
      this.editedItem.GradeStepEffectiveDate = this.formatDate(this.gradeStepEffectiveDateMenuValue);
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
        Object.assign(this.grade[this.editedIndex], props.item);
      } else {
        this.grade.push(props.item);
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
      if (this.$refs.gradeForm.validateForm()) {
        
        const parseData = {...data}  ;
        parseData.EffectiveStartDate = this.formatDateForBe(parseData.EffectiveStartDate);
        parseData.EffectiveEndDate = this.formatDateForBe(parseData.EffectiveEndDateGrade);
        parseData.GradeStepEffectiveDate = this.formatDateForBe(parseData.GradeStepEffectiveDate);
        parseData.SetCode =parseData.SetCodeGrade
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
          "getGrades",
          "setGrade",
          "allGradeSetup"
        );
        this.grade = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function (data) {
      console.log(data)
      this.savingChanges = true;
      let create = await this.create(data, "createGrade");
      this.grade = this.$store.getters.allGradeSetup;
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
        "updateGrade",
        "allGradeSetup"
      );

      if (update) {
        this.grade = update;
         await this.retrieveData();
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } else {
        this.grade = [];

      }
      this.savingChanges = false;
     
        },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data)
      let del = await this.delete(data, "deleteGrade");
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