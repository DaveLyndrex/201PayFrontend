    <!-- [11/03/2021 CN C.Rubio ] -->
<template>
  <v-app>  
  <b-container>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <BreadCrumb/>
      <DefaultDataTable
        class="default-table"
        v-if="!openForm"
        :headers="headers"
        :items="formattedData"
        :editedItem="editedItem"
        :defaultItem="defaultItem"
        :dataLoading="loading"
      >
      </DefaultDataTable>
      <DefaultForm
        class="emp-d-container default-form"
        v-else
        :inputConfig="inputConfig"
        :model="editedItem"
        :defaultInputItem="defaultItem"
        :edit="edit"
        ref="departmentForm"
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

      <template v-slot:ClassificationEffectiveDate>
        <v-menu
          ref="classificationEffectiveDate"
          v-model="classificationEffectiveDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Classification Effective Date')]"
              required
              solo
              dense
              v-model="editedItem.ClassificationEffectiveDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="classificationEffectiveDateMenuValue = parseDate(editedItem.ClassificationEffectiveDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="classificationEffectiveDateMenuValue"
            no-title
            @input="classificationEffectiveDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:ExtraInfoEffectiveStartDate>
        <v-menu
          ref="extraInfoEffectiveStartDate"
          v-model="extraInfoEffectiveStartDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Extra Info Effective Start Date')]"
              required
              solo
              dense
              v-model="editedItem.ExtraInfoEffectiveStartDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="extraInfoEffectiveStartDateMenuValue = parseDate(editedItem.ExtraInfoEffectiveStartDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="extraInfoEffectiveStartDateMenuValue"
            no-title
            @input="extraInfoEffectiveStartDate = false"
          ></v-date-picker>
        </v-menu>
      </template>
      </DefaultForm>
       <v-btn
      data-test="cancel"
      class="mb-2 px-8 font-color d-none"
      data-testid="test"
      color="whitesmoke"
      @click="close"
    >
      Cancel
    </v-btn>
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
import moment from "moment";

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
      index:1,
      extraInfoEffectiveStartDate:false,
      classificationEffectiveDate:false,
      startDate:false,
      endDate:false,
       validation: Validation,
      edit: false,
      loading: true,
      openForm: false,
      savingChanges: false,
      search: "",
      headers: [
        { text: "Department Code", value: "DepartmentCode" },
        { text: "Department Name", value: "DepartmentName" },
        { text: "Effective Start Date", value: "EffectiveStartDate" },
        { text: "Effective End Date", value: "EffectiveEndDate" },
        { text: "Classification Name", value: "ClassificationName" },
        { text: "Classification Effective Date", value: "ClassificationEffectiveDate" },
        { text: "Extra Info Effective Start Date", value: "ExtraInfoEffectiveStartDate" },
        { text: "Legislation Code", value: "LegislationCode" },
        { text: "LeiInformation Category", value: "LeiInformationCategory" },
        { text: "Set Code", value: "SetCode" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      department: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Department Code",
          inputType: "text",
          inputModel: "DepartmentCode",
          rules: [(v) => Validation.required(v, "Department Code")],
        },
         {
          inputLabel: "Department Name",
          inputType: "text",
          inputModel: "DepartmentName",
          rules: [(v) => Validation.required(v, "Department Name")],
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
          inputLabel: "Extra Info Effective Start Date",
          inputType: "date",
          inputModel: "ExtraInfoEffectiveStartDate",
          rules: [(v) => Validation.required(v, "Extra Info Effective Start Date")],
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
        DepartmentCode: null,
        DepartmentName: null,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        ClassificationName: null,
        ClassificationEffectiveDate: this.formatDate(this.getDefaultDate()),
        ExtraInfoEffectiveStartDate: this.formatDate(this.getDefaultDate()),
        LegislationCode: null,
        LeiInformationCategory: null,
        SetCode: null,
      },

      defaultItem: {
        ID: null,
        DepartmentCode: null,
        DepartmentName: null,
        EffectiveStartDate: null,
        EffectiveEndDate: null,
        ClassificationName: null,
        ClassificationEffectiveDate: null,
        ExtraInfoEffectiveStartDate: null,
        LegislationCode: null,
        LeiInformationCategory: null,
        SetCode: null,
      },
      message: "",
      response: "",
      effectiveStartDateMenuValue: this.getDefaultDate(),
      effectiveEndDateMenuValue: this.getDefaultDate(),
     classificationEffectiveDateMenuValue: this.getDefaultDate(),
      extraInfoEffectiveStartDateMenuValue: this.getDefaultDate(),
    };
  },

  computed: {
      formattedData() {
          if(!this.department || this.department.length === 0) return [];
          return this.department.map((item) => {
              return {
                  ...item,
                  EffectiveStartDate: moment(item.EffectiveStartDate).format("L"),
                  EffectiveEndDate: moment(item.EffectiveEndDate).format("L"),
                  ClassificationEffectiveDate: moment(item.ClassificationEffectiveDate).format("L"),
                  ExtraInfoEffectiveStartDate: moment(item.ExtraInfoEffectiveStartDate).format("L"),
              }
          });
      },
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
    classificationEffectiveDateMenuValue(val) {
      console.log(val);
      this.editedItem.ClassificationEffectiveDate = this.formatDate(this.classificationEffectiveDateMenuValue);
    },
    extraInfoEffectiveStartDateMenuValue(val) {
      console.log(val);
      this.editedItem.ExtraInfoEffectiveStartDate = this.formatDate(this.extraInfoEffectiveStartDateMenuValue);
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
        Object.assign(this.department[this.editedIndex], props.item);
      } else {
        this.department.push(props.item);
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
    retrieveData: async function () {
      this.loading = true;
      let getdata = await this.retrieve(
        "getDepartment",
        "setDepartment",
        "getAllDepartment"
      );

      this.department = getdata ? getdata : [];
      this.loading = false;
    },

    saveItem(data) {

      if (this.$refs.departmentForm.validateForm()) {
       const parseData = {...data} ;
        parseData.EffectiveStartDate = this.formatDateForBe(data.EffectiveStartDate);
        parseData.EffectiveEndDate = this.formatDateForBe(data.EffectiveEndDate);
        parseData.ClassificationEffectiveDate = this.formatDateForBe(data.ClassificationEffectiveDate);
        parseData.ExtraInfoEffectiveStartDate = this.formatDateForBe(data.ExtraInfoEffectiveStartDate);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function (data) {
      this.savingChanges = true;
      let create = await this.create(data, "createDepartment");

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
        "updateDepartmentData",
        "getAllDepartment"
      );

      if (update) {
        this.department = update;
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
        this.department = [];
      }

      this.savingChanges = false;
      
    },

    deleteItem: async function (data) {
      this.savingChanges = true;

      let del = await this.delete(data, "deleteDepartment");
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
      this.index++;
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
      if (!date) return null;
      const [month, day, year] = date.split("/");
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
 

