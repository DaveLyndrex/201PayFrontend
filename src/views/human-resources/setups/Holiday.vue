<template>
  <v-app>
    <b-container>
      <Alert :response="response" :message="message" id="alert" style="display: none"/>
      <BreadCrumb/>
      <DefaultDataTable
      class="default-table"
        v-if="!openForm"
        :headers="headers"
        :items="holiday"
        :editedItem="editedItem"
        :defaultItem="defaultItem"
        :dataLoading="loading"
      ></DefaultDataTable>

      <DefaultForm
       class="emp-d-container default-form"
        v-else
        :inputConfig="inputConfig"
        :model="editedItem"
        :defaultInputItem="defaultItem"
        :edit="edit"
        ref="holidayForm"
      >
        <template v-slot:Date>
          <v-menu
            ref="date"
            v-model="date"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="[(v) => validation.required(v, 'Date')]"
                required
                solo
                dense
                v-model="editedItem.Date"
                persistent-hint
                append-icon="mdi-calendar"
                v-bind="attrs"
                @blur="dateMenuValue = parseDate(editedItem.Date)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateMenuValue"
              no-title
              @input="date = false"
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
       <v-btn
      data-test="cancel"
      class="mb-2 px-8 font-color d-none"
      data-testid="test"
      color="whitesmoke"
      @click="close"
    >
      Cancel
    </v-btn>
    <v-btn
      data-test="save"
      :loading="savingChanges"
      class="mb-2 px-8 d-none"
      dark
      color="blue"
      @click="saveItem(editedItem)"
    >
      Save
    </v-btn>
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
      response: "",
      message: "",
      index:1,
      headers: [
        { text: "Date", value: "Date" },
        { text: "Holiday Type", value: "HolidayType" },
        { text: "Holiday Name", value: "HolidayName" },
        { text: "Location", value: "LocationID" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      holiday: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Date",
          inputType: "date",
          inputModel: "Date",
          rules: [(v) => Validation.required(v, "Date")],
        },
        {
          inputLabel: "Holiday Type",
          inputType: "select",
          inputModel: "HolidayType",
          selectionItems: this.$store.getters.allHolidayType.map(
            (item) => {
              return {
                ...item,
                name: item.HolidayType,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "HolidayType")],
        },
        {
          inputLabel: "Holiday Name",
          inputType: "text",
          inputModel: "HolidayName",
          rules: [(v) => Validation.required(v, "HolidayName")],
        },
        {
          inputLabel: "Location",
          inputType: "select",
          inputModel: "LocationID",
          selectionItems: this.$store.getters.allLocation.map(
            (item) => {
              return {
                ...item,
                name: item.Location,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Location")],
        },
      ],
      editedItem: {
        ID: null,
        Date: this.formatDate(this.getDefaultDate()),
        HolidayType: null,
        HolidayName: null,
        LocationID: null,
      },
      defaultItem: {
        ID: null,
        Date: null,
        HolidayType: null,
        HolidayName: null,
        LocationID: null,
      },
      dateMenuValue: this.getDefaultDate(),
      date: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    dateMenuValue(val) {
      console.log(val);
      this.editedItem.Date = this.formatDate(this.dateMenuValue);
    },
  },

  created() {
     this.$store.watch(
      (state, getters) => getters.allHolidayType,
      (newValue) => {
        if (newValue) {
          this.inputConfig[1].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.HolidayType,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allLocation,
      (newValue) => {
        if (newValue) {
          this.inputConfig[3].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name:item.Location,
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
        Object.assign(this.holiday[this.editedIndex], props.item);
      } else {
        this.holidaya.push(props.item);
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
    this.initializeRelationalDatas();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.holidayForm.validateForm()) {
        const parseData = {...data};
        parseData.Date = this.formatDateForBe(data.Date);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },
    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "getHoliday",
          "setHoliday",
          "allHoliday"
        );
        this.holiday = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function(data) {
      console.log(data);
      this.savingChanges = true;
      let create = await this.create(data, "createHoliday");
      this.holiday = this.$store.getters.allHoliday;
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
    updateItem: async function(data) {
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateHoliday",
        "allHoliday"
      );

      if (update) {
        this.holiday = update;
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
        this.holiday = [];
      }
      this.savingChanges = false;
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      console.log(data);
      let del = await this.delete(data, "deleteHoliday");
      if (del) {
        await this.retrieveData();
      }
      this.savingChanges = false;
    },
     // Methods for relational datas
    initializeRelationalDatas: async function() {
      try {
        await this.retrieveHolidayType();
        await this.retrieveLocationType();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },

    retrieveHolidayType: async function() {
      return this.retrieve(
        "getHolidayType",
        "setHolidayType",
        "allHolidayType"
      );
    },

    retrieveLocationType: async function() {
      return this.retrieve(
        "getLocation",
        "setLocation",
        "allLocation"
      );
    },

    close() {
       this.index++
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
