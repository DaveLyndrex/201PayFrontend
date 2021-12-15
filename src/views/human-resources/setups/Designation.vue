<template>
  <v-app>
    <b-container>
      <Alert :response="response" :message="message" id="alert" style="display: none"/>
      <BreadCrumb/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="designation"
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
      ref="designationForm"
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

      <template v-slot:EffectiveEndDateDesignation>
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
              @blur="effectiveEndDateMenuValue = parseDate(editedItem.EffectiveEndDateDesignation)"
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
        { text: "Designation", value: "Designation" },
        { text: "Position Code", value: "PositionCode" },
        { text: "Effective Start Date", value: "EffectiveStartDate" },
        { text: "Effective End Date", value: "EffectiveEndDate" },
        { text: "Business Unit Name", value: "BusinessUnitName" },
        { text: "Job Set Code", value: "JobSetCode" },
        { text: "Location Set Code", value: "LocationSetCode" },
        { text: "Entry Grade Set Code", value: "EntryGradeSetCode" },
        { text: "Active Status", value: "ActiveStatus" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      designation: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Designation",
          inputType: "text",
          inputModel: "Designation",
         
        },
        {
          inputLabel: "Position Code",
          inputType: "text",
          inputModel: "PositionCode",
          rules: [(v) => Validation.required(v, "Position Code")],
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
          inputModel: "EffectiveEndDateDesignation",
           rules: [(v) => Validation.required(v, "EffectiveEndDateDesignation")],
        },
        {
          inputLabel: "Business Unit Name",
          inputType: "text",
          inputModel: "BusinessUnitName",
          rules: [(v) => Validation.required(v, "Business Unit Name")],
        },
        {
          inputLabel: "Job Set Code",
          inputType: "text",
          inputModel: "JobSetCode",
           rules: [(v) => Validation.required(v, "Job Set Code")],
        },
        {
          inputLabel: "Location Set Code",
          inputType: "text",
          inputModel: "LocationSetCode",
           rules: [(v) => Validation.required(v, "Location Set Code")],
        },
       {
          inputLabel: "Entry Grade Set Code",
          inputType: "text",
          inputModel: "EntryGradeSetCode",
        },
        {
          inputLabel: "Active Status",
          inputType: "select",
          inputModel: "ActiveStatus",
           selectionItems: [
            {name: "Active",ID: "Active"},{name: "Inactive",ID: "Inactive"}
           ],
           rules: [(v) => Validation.required(v, "Active Status")],
        },
      ],
      editedItem: {
        ID: null,
        Designation: null,
        PositionCode: null,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        BusinessUnitName: null,
        JobSetCode: null,
        LocationSetCode: null,
        EntryGradeSetCode: null,
        ActiveStatus: null,
        ModifiedBy: null,
        EffectiveEndDateDesignation: this.formatDate(this.getDefaultDate()),
      },
      defaultItem: {
        ID: null,
        Designation: null,
        PositionCode: null,
        EffectiveStartDate: null,
        EffectiveEndDate: null,
        BusinessUnitName: null,
        JobSetCode: null,
        LocationSetCode: null,
        EntryGradeSetCode: null,
        ActiveStatus: null,
        ModifiedBy: null,
        EffectiveEndDateDesignation: this.formatDate(this.getDefaultDate()),
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
          this.editedItem.EffectiveEndDateDesignation = this.editedItem.EffectiveEndDate
      }
    },
    effectiveStartDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveStartDate = this.formatDate(this.effectiveStartDateMenuValue);
    },
    effectiveEndDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveEndDateDesignation = this.formatDate(this.effectiveEndDateMenuValue);
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
        Object.assign(this.designation[this.editedIndex], props.item);
      } else {
        this.designation.push(props.item);
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
        parseData.EffectiveEndDate = this.formatDateForBe(data.EffectiveEndDateDesignation);
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
          "getDesignation",
          "setDesignation",
          "allDesignation"
        );
        this.designation = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function (data) {
      console.log(data)
      this.savingChanges = true;
      let create = await this.create(data, "createDesignation");
      this.designation = this.$store.getters.allBanks;
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
        "updateDesignation",
        "allDesignation"
      );

      if (update) {
        this.designation = update;
         await this.retrieveData();
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } else {
        this.designation = [];

      }
      this.savingChanges = false;
     
        },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data)
      let del = await this.delete(data, "deleteDesignation");
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

