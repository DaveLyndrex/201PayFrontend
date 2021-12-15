<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="visaData"
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
      ref="visaForm"
    >
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
              @blur="startDateMenuValue = parseDate(editedItem.EffectiveStartDate)"
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
              solo
              dense
              v-model="editedItem.EffectiveEndDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="endDateMenuValue = parseDate(editedItem.EffectiveEndDate)"
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

      <template v-slot:EntryDate>
        <v-menu
          ref="entryDate"
          v-model="entryDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Entry Date')]"
              required
              solo
              dense
              v-model="editedItem.EntryDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="entryDateMenuValue = parseDate(editedItem.EntryDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="entryDateMenuValue"
            no-title
            @input="entryDate = false"
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
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        { text: "Start Date", value: "EffectiveStartDate" },
        { text: "End Date", value: "EffectiveEndDate" },
        { text: "Visa Permit Type", value: "VisaPermitType" },
        { text: "Current Visa Permit", value: "CurrentVisaPermit" },
        { text: "Entry Date", value: "EntryDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      visaData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "EffectiveStartDate",
          rules: [(v) => Validation.date(v, "Start Date")],
        },
        {
          inputLabel: "Current Visa Permit",
          inputType: "text",
          inputModel: "CurrentVisaPermit",
        },
        {
          inputLabel: "End Date",
          inputType: "date",
          inputModel: "EffectiveEndDate",
          rules: [(v) => Validation.date(v, "End Date")],
        },
        {
          inputLabel: "Entry Date",
          inputType: "date",
          inputModel: "EntryDate",
          rules: [(v) => Validation.date(v, "Entry Date")],
        },
        {
          inputLabel: "Visa Permit Type",
          inputType: "select",
          inputModel: "VisaPermitType",
          selectionItems: this.$store.getters.allVisaPermitType.map((item) => {
            return {
              ...item,
              name: item.VisaPermitType,
            };
          }),
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
        VisaPermitType: null,
        CurrenVisaPermit: null,
        EntryDate: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        VisaPermitType: null,
        CurrenVisaPermit: null,
        EntryDate: this.formatDate(this.getDefaultDate()),
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      entryDateMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
      entryDate: false,
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
    entryDateMenuValue(val) {
      console.log(val);
      this.editedItem.EntryDate = this.formatDate(this.entryDateMenuValue);
    },
  },

  created() {
    this.$store.watch(
      (state, getters) => getters.allVisaPermitType,
      (newValue) => {
        if (newValue) {
          this.inputConfig[4].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.VisaPermitType,
            };
          });
        }
      }
    );
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
        Object.assign(this.visaData[this.editedIndex], props.item);
      } else {
        this.visaData.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    this.retrieveData();
    this.initializeRelationalDatas();
    // this.retrieveMasterData();
  },

  methods: {
    saveItem(data) {
      console.log(data)
      if (this.$refs.visaForm.$refs.form.validate()) {
        console.log("No ERROR");
        const parseData = data;
        parseData.EffectiveStartDate = this.formatDateForBe(data.EffectiveStartDate);
        parseData.EffectiveEndDate = this.formatDateForBe(data.EffectiveEndDate);
        parseData.EntryDate = this.formatDateForBe(data.EntryDate);
        if (this.editedIndex > -1) {
          this.updateItem(data);
        } else {
          this.createNewItem(data);
        }
      }
    },
    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllVisa",
          "setVisaData",
          "allVisaData"
        );
        this.visaData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    createNewItem: async function(data) {
      let create = await this.create(data, "createVisaData");
      this.visaData = this.$store.getters.allVisaData;
      this.savingChanges = true;
      if (create) {
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully  Added";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);

      } 
      this.savingChanges = false;

        
    },

    updateItem: async function(data) {
        (this.savingChanges = true);
      let update = await this.update(
        data,
        this.editedIndex,
        "updateVisaData",
        "allVisaData"
      );

      if (update) {
        this.workFlow = update;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
      } else {
        this.workFlow = [];
   
      }
      this.savingChanges = false;
      await this.retrieveData();
      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
    },

    initializeRelationalDatas: async function() {
      try {
        await this.retrieveVisaPermitType();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },

    retrieveVisaPermitType: async function() {
      return this.retrieve(
        "retrieveVisaPermitType",
        "setVisaPermitType",
        "allVisaPermitType"
      );
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

  submit() {
    this.formHasErrors = false;

    Object.keys(this.form).forEach((f) => {
      if (!this.form[f]) this.formHasErrors = true;

      this.$refs[f].validate(true);
    });
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
