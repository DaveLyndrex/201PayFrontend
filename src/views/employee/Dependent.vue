<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="dependentsData"
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
      ref="dependentForm"
    >
      <template v-slot:BirthDate>
        <v-menu
          ref="birthDate"
          v-model="birthDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Birth Date')]"
              required
              solo
              dense
              v-model="editedItem.BirthDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="birthDateMenuValue = parseDate(editedItem.BirthDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="birthDateMenuValue"
            no-title
            @input="birthDate = false"
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
      name: "dependent",
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        { text: "Last Name", value: "Lastname" },
        { text: "First Name", value: "Firstname" },
        { text: "Middle Name", value: "Middlename" },
        { text: "Suffix", value: "SuffixID" },
        { text: "Date of Birth", value: "BirthDate" },
        { text: "Relation", value: "Relation" },
        { text: "WTax", value: "WTax" },
        { text: "Medical", value: "Medical" },
        { text: "GPA", value: "GPA" },
        { text: "Type", value: "DepType" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dependentsData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Last Name",
          inputType: "text",
          inputModel: "Lastname",
          rules: [(v) => Validation.required(v, "Last Name")],
        },
        {
          inputLabel: "Relation",
          inputType: "text",
          inputModel: "Relation",
          rules: [(v) => Validation.required(v, "Relation")],
        },
        {
          inputLabel: "First Name",
          inputType: "text",
          inputModel: "Firstname",
          rules: [(v) => Validation.required(v, "First Name")],
        },
        {
          inputLabel: "WTax",
          inputType: "radio",
          inputModel: "WTax",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          inputLabel: "Middle Name",
          inputType: "text",
          inputModel: "Middlename",
          rules: [(v) => Validation.required(v, "Middle Name")],
        },
        {
          inputLabel: "Medical",
          inputType: "radio",
          inputModel: "Medical",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          inputLabel: "Suffix",
          inputType: "select",
          inputModel: "SuffixID",
          selectionItems: this.$store.getters.allSuffixes.map((item) => {
            return {
              ...item,
              name: item.Suffix,
            };
          }),
        },
        {
          inputLabel: "GPA",
          inputType: "radio",
          inputModel: "GPA",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          inputLabel: "Date of Birth",
          inputType: "date",
          inputModel: "BirthDate",
          rules: [(v) => Validation.date(v, "Date of Birth")],
        },
        {
          inputLabel: "Type",
          inputType: "select",
          inputModel: "DepType",
          selectionItems: this.$store.getters.allDependentsType.map((item) => {
            return {
              ...item,
              name: item.DepType,
            };
          }),
        },
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        Lastname: null,
        Firstname: null,
        Middlename: null,
        SuffixID: null,
        BirthDate: this.formatDate(this.getDefaultDate()),
        Relation: null,
        WTax: null,
        Medical: null,
        GPA: null,
        DepType: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        Lastname: null,
        Firstname: null,
        Middlename: null,
        SuffixID: null,
        BirthDate: null,
        Relation: null,
        WTax: null,
        Medical: null,
        GPA: null,
        DepType: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      birthDateMenuValue: this.getDefaultDate(),
      birthDate: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    birthDateMenuValue(val) {
      console.log(val);
      this.editedItem.BirthDate = this.formatDate(this.birthDateMenuValue);
    },
  },

  created() {
    this.$store.watch(
      (state, getters) => getters.allSuffixes,
      (newValue) => {
        if (newValue) {
          this.inputConfig[6].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Suffix,
            };
          });
        }
      }
    ),
    this.$store.watch(
      (state, getters) => getters.allDependentsType,
      (newValue) => {
        if (newValue) {
          this.inputConfig[9].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.DepType,
            };
          });
        }
      }
    ),
      EventBus.$on("initializeData", () => {
        this.retrieveData();
      });

    EventBus.$on("addNewItem", (props) => {
      console.log(props.item);
      
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.dependentsData[this.editedIndex], props.item);
      } else {
        this.dependentsData.push(props.item);
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
    this.retrieveMasterData();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.dependentForm.validateForm()) {
        const parseData = {...data} ;
        parseData.BirthDate = this.formatDateForBe(data.BirthDate);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createDependent");
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

    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveDependents",
          "setDependents",
          "allDependents"
        );
        this.dependentsData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    updateItem: async function(data) {
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateDependent",
        "allDependents"
      );

      if (update) {
        this.dependentsData = update;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      
      } else {
        this.dependentsData = [];
     
      }

      this.savingChanges = false;
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      let del = await this.delete(data, "removeDependent");
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
        await this.retrieveAllSuffixess();
        await this.retrieveAllDependentsType();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },

    retrieveAllSuffixess: async function() {
      await this.retrieve("retrieveSuffix", "setSuffixDatas", "allSuffixes");
    },
     retrieveAllDependentsType: async function() {
      await this.retrieve("retrieveDependentsType", "setDependentsType", "allDependentsType");
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
