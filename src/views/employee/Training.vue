<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="trainings"
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
      ref="trainingForm"
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
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],

  data() {
    return {
      reponse:"",
      message:"",
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        { text: "Title", value: "Title" },
        { text: "Description", value: "Description" },
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Actual Duration", value: "ActualDuration" },
        { text: "Type", value: "TypeID" },
        { text: "Location", value: "Location" },
        { text: "Conducted By", value: "ConductedBy" },
        { text: "With Certification", value: "WithCertification" },
        { text: "Program Fee", value: "ProgramFee" },
        { text: "Incidential Cost", value: "IncidentialCost" },
        { text: "Remarks", value: "Remarks" },
        { text: "Attachment", value: "Attachments" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      trainings: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Title",
          inputType: "text",
          inputModel: "Title",
          rules: [(v) => Validation.required(v, "Title")],
        },
        {
          inputLabel: "Conducted By",
          inputType: "text",
          inputModel: "ConductedBy",
          rules: [(v) => Validation.required(v, "Conducted By")],
        },
        {
          inputLabel: "Description",
          inputType: "text",
          inputModel: "Description",
          rules: [(v) => Validation.required(v, "Description")],
        },
        {
          inputLabel: "With Certification",
          inputType: "radio",
          inputModel: "WithCertification",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          rules: [(v) => Validation.required(v, "With Certification")],
        },
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.date(v, "Start Date")],
        },
        {
          inputLabel: "Program Fee",
          inputType: "money",
          inputModel: "ProgramFee",
          rules: [(v) => Validation.required(v, "Program Fee")],
        },
        {
          inputLabel: "End Date",
          inputType: "date",
          inputModel: "EndDate",
        },
        {
          inputLabel: "Incidential Cost",
          inputType: "money",
          inputModel: "IncidentialCost",
          rules: [(v) => Validation.required(v, "Incidential Cost")],
        },
        {
          inputLabel: "Actual Duration",
          inputType: "text",
          inputModel: "ActualDuration",
          rules: [(v) => Validation.required(v, "Actual Duration")],
        },
        {
          inputLabel: "Remarks",
          inputType: "text",
          inputModel: "Remarks",
        },
        {
          inputLabel: "Type",
          inputType: "select",
          inputModel: "TypeID",
          selectionItems: this.$store.getters.allTrainingTypes.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          }),
          rules: [(v) => Validation.required(v, "Type")],
        },
        {
          inputLabel: "Attachments",
          inputType: "file",
          inputModel: "Attachments",
        },
        {
          inputLabel: "Location",
          inputType: "text",
          inputModel: "Location",
          rules: [(v) => Validation.required(v, "Location")],
        },
    
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        Title: null,
        Description: null,
        StartDate: null,
        EndDate: null,
        ActualDuration: null,
        TypeID: null,
        Location: null,
        ConductedBy: null,
        Attachments: null,
        Remarks: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
        WithCertification: null,
        ProgramFee: null,
        IncidentialCost: null,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        Title: null,
        Description: null,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        ActualDuration: null,
        TypeID: null,
        Location: null,
        ConductedBy: null,
        Attachments: null,
        Remarks: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
        WithCertification: null,
        ProgramFee: null,
        IncidentialCost: null,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
      validation: Validation,
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
    },
  },

  created() {
    this.$store.watch(
      (state, getters) => getters.allTrainingTypes,
      (newValue) => {
        if (newValue) {
          this.inputConfig[10].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          });
        }
      }
    ),
      EventBus.$on("initializeData", async () => {
        await this.retrieveData();
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
        Object.assign(this.trainings[this.editedIndex], props.item);
      } else {
        this.trainings.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    EventBus.$on("deleteItem", (props) => {
      if (this.savingChanges === false) {
        this.deleteItem(props);
      }
    });

    this.retrieveData();
    this.retrieveMasterData();
  },

  mounted() {
    EventBus.$on("newFileName", (props) => {
      this.editedItem[props.model] = props.fileName;
    });
    EventBus.$on("newMoney", (props) => {
      this.editedItem[props.model] = props.money;
    });
  },
  methods: {
    saveItem(data) {
      if (this.$refs.trainingForm.validateForm()) {
        const parseData = { ...data };
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        parseData.EndDate = this.formatDateForBe(data.EndDate);
        console.log(
          "ProgramFee",
          data.ProgramFee,
          "IncidentialCost",
          data.IncidentialCost
        );
        data.ProgramFee = Number.parseFloat(
          String(data.ProgramFee).replace(/,/g, "")
        );
        data.IncidentialCost = Number.parseFloat(
          String(data.IncidentialCost).replace(/,/g, "")
        );
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createNewEmpTraining");
      if (create) {
        this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Added";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      }
     
      this.savingChanges = false;

      
    },

    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllTrainings",
          "setTrainings",
          "allTrainings"
        );
        this.trainings = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    updateItem: async function(data) {
      for (var item in this.editedItem) {
        if (item === "ModifiedBy") {
          this.editedItem[item] = JSON.parse(
            localStorage.getItem("user_details")
          ).data.Email;
        }
      }
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateTraining",
        "allTrainings"
      );

      if (update) {
        this.trainings = update;
        this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Updated";
        
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } else {
        this.trainings = [];
      
        

      }
      this.savingChanges = false;
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      let del = await this.delete(data, "deleteTraining");
      if (del) {
        await this.retrieveData();

        this.response = "success";
        this.message = "Successfully Deleted";
        
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      }
  
      this.savingChanges = false;

    
    },

    // master file relational data integration
    retrieveMasterData: async function() {
      try {
        await this.retrieveAllTrainingTypes();
      } catch (error) {
        this.showWarningResponse("Something went wrong!");
      }
    },

    retrieveAllTrainingTypes: async function() {
      await this.retrieve(
        "retrieveAllTrainingTypes",
        "setTrainingTypes",
        "allTrainingTypes"
      );
    },
    // end of master file relational data integration

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
