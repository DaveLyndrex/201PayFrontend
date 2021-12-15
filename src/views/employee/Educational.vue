<template>
<!-- 10/13/2021 CN A.DIEZ -->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="educBackgroundsData"
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
      ref="educationalForm"
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
              :rules="[v => validation.required(v, 'Start Date')]"
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
import Alert from "@/components/Alert.vue"

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
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "School", value: "School" },
        { text: "Course", value: "Course" },
        { text: "Remarks", value: "Remarks" },
        { text: "Attachment", value: "Attachment" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      educBackgroundsData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [
            v => Validation.date(v, 'Start Date')
          ]
        },
        { 
          inputLabel: "Course", 
          inputType: "text", 
          inputModel: "Course",
          rules: [
            v => Validation.required(v, 'Course')
          ]
        },
        { 
          inputLabel: "End Date", 
          inputType: "date", 
          inputModel: "EndDate" 
        },
        { 
          inputLabel: "Remarks", 
          inputType: "text", 
          inputModel: "Remarks" 
        },
        { 
          inputLabel: "School", 
          inputType: "text", 
          inputModel: "School",
          rules: [
            v => Validation.required(v, 'School')
          ]
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
        EmpID: JSON.parse(sessionStorage.getItem('user_session')).empId,
        StartDate: null,
        EndDate: null,
        School: null,
        Course: null,
        Attachment: null,
        Remarks: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem('user_session')).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        School: null,
        Course: null,
        Attachment: null,
        Remarks: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
      validation: Validation
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
    }
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
        Object.assign(this.educBackgroundsData[this.editedIndex], props.item);
      } else {
        this.educBackgroundsData.push(props.item);
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
    // this.retrieveMasterData();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.educationalForm.validateForm()) {
      const parseData = {...data}
      parseData.StartDate = this.formatDateForBe(data.StartDate)
      parseData.EndDate = this.formatDateForBe(data.EndDate)
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
          "retrieveAllEducations",
          "setEducationData",
          "allEducationData"
        );
        this.educBackgroundsData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    createNewItem: async function (data) {
      let create = await this.create(data, "createEducationData");
      this.educBackgroundsData = this.$store.getters.allEducationData;
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
    },

    updateItem: async function (data) {
       for(var item in this.editedItem) {
        if(item === "ModifiedBy"){
          this.editedItem[item]= JSON.parse(localStorage.getItem("user_details")).data.Email
        }
      }
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateEducationData",
        "allEducationData"
      );

      if (update) {
        this.workFlow = update;
        this.close();
         await this.retrieveData();
        this.response = "success";
        this.message = "Successfully Updated";

      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
        
      } else {
        this.workFlow = [];
        this.response = "error";
        this.message = "Something went wrong!";
    
      }
      this.savingChanges = false;
     
    },
    deleteItem: async function (data) {
      this.savingChanges = true;
      let del = await this.delete(data, "deleteEducationData");
      if (del) {

        await this.retrieveData();

        this.response = "success";
        this.message = "Successfully Deleted";

        document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      
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
          .substr(0, 10)
      
    },
    formatDateForBe(date) {
      console.log('BEFORE DATE', date);  
      if (!date) return null;

      const [month, day, year] = date.split("/");
      console.log(year, month, day);
      return `${year}-${month}-${day}`;
    }
    
  },
};
</script>
<style scoped>
.font-color{
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