<!-- DAVE LYNDREX MILLAN -->
<template>
  <v-app>
    <b-container>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <BreadCrumb/>
      <DefaultDataTable
        class="tableStyle"
        v-if="!openForm"
        :headers="headers"
        :items="Period"
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
        ref="PeriodForm"
      >
        <!-- ref="PeriodForm" -->
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
              @blur="StartDateMenuValue = parseDate(editedItem.StartDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="StartDateMenuValue"
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
              :rules="[(v) => validation.required(v, 'End Date')]"
              required
              solo
              dense
              v-model="editedItem.EndDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="EndDateMenuValue = parseDate(editedItem.EndDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="EndDateMenuValue"
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
import Validation from "@/utils/Validation";
import moment from 'moment';

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
      // defaultItem: {},
      // editedItem: {},
      search: "",
      headers: [
        { text: "Period ID", value: "PeriodID" },
        { text: "Year", value: "Year" },
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Payroll Group", value: "PayrollGroup" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      Period: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Period ID",
          inputType: "text",
          inputModel: "PeriodID",
          rules: [(v) => Validation.required(v, "Period ID")],
        },
        {
          inputLabel: "Year",
          inputType: "year",
          inputModel: "Year",
          rules: [(v) => Validation.required(v, "Year")],
        },
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.required(v, "Start Date")],
        },
        {
          inputLabel: "End Date",
          inputType: "date",
          inputModel: "EndDate",
          rules: [(v) => Validation.required(v, "End Date")],
        },
        {
          inputLabel: "Payroll Group",
          inputType: "select",
          inputModel: "PayrollGroup",
          selectionItems: this.$store.getters.allPayrollGroups.map((item) => {
              console.log(item)
            return {
              ...item,
              name: item.PayrollGroup,
            };
          }),
          rules: [(v) => Validation.required(v, "Payroll Group")],
        },
      ],
      editedItem: {
        ID: null,
        PeriodID: null,
        Year: null,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        PayrollGroup: null,
        ModifiedDate: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },

      defaultItem: {
        ID: null,
        PeriodID: null,
        Year: null,
        StartDate: null,
        EndDate: null,
        PayrollGroup: null,
        ModifiedDate: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      message: "",
      response: "",
      StartDateMenuValue: this.getDefaultDate(),
      EndDateMenuValue: this.getDefaultDate(),
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
     StartDateMenuValue(val) {
      console.log(val);
      this.editedItem.StartDate = this.formatDate(this.StartDateMenuValue);
    },

    EndDateMenuValue(val) {
      console.log(val);
      this.editedItem.EndDate = this.formatDate(this.EndDateMenuValue);
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
        Object.assign(this.Period[this.editedIndex], props.item);
      } else {
        this.Period.push(props.item);
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
    this.$store.watch(
      (state, getters) => getters.allPayrollGroups,
      (newValue) => {
        if (newValue) {
          this.inputConfig[4].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.PayrollGroup,
            };
          });
        }
      }
    );

    this.retrieveData();

    
  },
 

  methods: {
    retrieveData: async function () {
      this.loading = true;
      let getdata = await this.retrieve(
        "getPeriods",
        "setPeriods",
        "allPeriodsGetters"
      );
      await this.retrieve("getPayrollGroups", "setPayrollGroups", "allPayrollGroups")
      console.log(getdata, "Dadsdsd");

      this.Period = getdata ? getdata : [];
      this.loading = false;
    },

   

    saveItem(data) {
      console.log(data);
      console.log(this.editedIndex);
      if (this.$refs.PeriodForm.validateForm()) {
        const parseData = { ...data};
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        parseData.EndDate = this.formatDateForBe(data.EndDate);
         parseData.Year = moment(data.Year).format('YYYY');
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function (data) {
      this.savingChanges = true;
      let create = await this.create(data, "createPeriod");
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
        "updatePeriod",
        "allPeriodsGetters"
      );

      if (update) {
        this.Period = update;
        this.close();
        
        this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          3000
        );
      } else {
        this.Period = [];
      }

      this.savingChanges = false;
      await this.retrieveData();
    },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data);
      let del = await this.delete(data, "deletePeriod");
      if (del) {
        
        this.response = "success";
        this.message = "Successfully Deleted";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          1000
        );
      }
      this.savingChanges = false;
      await this.retrieveData();
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
 

