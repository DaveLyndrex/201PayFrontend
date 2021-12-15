<template>
  <v-app>
    <Alert
      :response="response"
      :message="message"
      id="alert"
      style="display: none"
    />
    <BreadCrumb />
    <div class="container">
      <DefaultDataTable
      class="default-table"
        v-if="!openForm"
        :headers="headers"
        :items="LeaveCreditYear"
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
        ref="LeaveCreditYearForm"
      >
        <template v-slot:actionBtns>
          <v-btn class="mb-2 px-8" color="danger text-light" @click="close">
            Cancel
          </v-btn>
          <v-btn
            :loading="savingChanges"
            class="mb-2 px-8"
            color="primary darken-1"
            @click="saveItem(editedItem)"
          >
            Save
          </v-btn>
        </template>

         <template v-slot:Year>
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
      <v-btn
      data-test="cancel"
      class="mb-2 px-8 font-color d-none"
      data-testid="test"
      color="whitesmoke"
      @click="close"
    >
      Cancel
    </v-btn>
    </div>
  </v-app>
</template>
 
<script>
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
import BreadCrumb from "@/components/BreadCrumbs.vue";

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
    BreadCrumb,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  props: {
    picker: {
    type: String,
    default: 'date',
    validator: type => ['date', 'month'].includes(type)
    },
  },
  data() {
    return {
      index: 1,
      date: null,
      menu: false,
      startDate: false,
      year: false,
      endDate: false,
      validation: Validation,
      edit: false,
      loading: true,
      openForm: false,
      savingChanges: false,
      search: "",
      headers: [
        { text: "Year", value: "Year" },
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      LeaveCreditYear: [],
      editedIndex: -1,
      inputConfig: [
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
          rules: [(v) => Validation.required(v, " Start Date")],
        },
        {
          inputLabel: " End Date ",
          inputType: "date",
          inputModel: "EndDate",
          rules: [(v) => Validation.required(v, " End Date ")],
        },
      ],
      editedItem: {
        ID: null,
        Year: null,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
      },

      defaultItem: {
        ID: null,
        Year: null,
        StartDate: null,
        EndDate: null,
      },
      message: "",
      response: "",
      StartDateMenuValue: this.getDefaultDate(),
      YearMenuValue: this.getDefaultDate(),
      EndDateMenuValue: this.getDefaultDate(),
    };
  },

  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
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
        Object.assign(this.LeaveCreditYear[this.editedIndex], props.item);
      } else {
        this.LeaveCreditYear.push(props.item);
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
    saveYear(year) {
      this.$refs.year.save(year);

      // Reset activePicker to type YEAR
      this.$refs.picker.activePicker = "YEAR";

      // Close the menu/datepicker
      this.year = false;
    },
    retrieveData: async function () {
      this.loading = true;
      let getdata = await this.retrieve(
        "retrieveAllLeaveCreditYears",
        "setLeaveCreditYears",
        "allLeaveCreditYears"
      );
      console.log(getdata);

      this.LeaveCreditYear = getdata ? getdata : [];
      this.loading = false;
    },

    saveItem(data) {
      console.log(data);
      console.log(this.editedIndex);

      if (this.$refs.LeaveCreditYearForm.validateForm()) {
        const parseData = { ...data };
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
      let create = await this.create(data, "createLeaveCreditsYear");
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
        "updateLeaveCreditYear",
        "allLeaveCreditYearGetters"
      );

      if (update) {
        this.LeaveCreditYear = update;
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
        this.LeaveCreditYear = [];
      }

      this.savingChanges = false;
    },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data);
      let del = await this.delete(data, "deleteLeaveCreditYear");
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
      console.log("BEFORE DATE", date);
      if (!date) return null;

      const [month, day, year] = date.split("/");
      console.log(year, month, day);
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

 

