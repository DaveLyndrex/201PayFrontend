<template>
  <v-app>
    <b-container>
      <Alert
        :response="response"
        :message="message"
        id="alert"
        style="display: none"
      />
      <BreadCrumb />
      <DefaultDataTable
        class="default-table"
        v-if="!openForm"
        :headers="headers"
        :items="location"
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
        ref="locationForm"
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
                required
                solo
                dense
                v-model="editedItem.EffectiveStartDate"
                persistent-hint
                append-icon="mdi-calendar"
                v-bind="attrs"
                @blur="
                  effectiveStartDateMenuValue = parseDate(
                    editedItem.EffectiveStartDate
                  )
                "
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

        <template v-slot:EffectiveEndDate>
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
                v-model="editedItem.EffectiveEndDate"
                persistent-hint
                append-icon="mdi-calendar"
                v-bind="attrs"
                @blur="
                  effectiveEndDateMenuValue = parseDate(
                    editedItem.EffectiveEndDate
                  )
                "
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
    BreadCrumb,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      openForm: false,
      loading: true,
      savingChanges: false,
      response: "",
      message: "",
      headers: [
        { text: "Actions", value: "actions", sortable: false },
        { text: "Location Name", value: "Location" },
        { text: "Effective Start Date", value: "EffectiveStartDate" },
        { text: "Effective End Date", value: "EffectiveEndDate" },
        { text: "Set Code", value: "SetCode" },
        { text: "Active Status", value: "ActiveStatus" },
        { text: "Main Phone Area Code", value: "MainPhoneAreaCode" },
        { text: "Main Phone Country Code", value: "MainPhoneCountryCode" },
        { text: "Main Phone Extension", value: "MainPhoneExtension" },
        { text: "Address Line 1", value: "AddressLine1" },
        { text: "Address Line 2", value: "AddressLine2" },
        { text: "Address Line 3", value: "AddressLine3" },
        { text: "Address Line 4", value: "AddressLine4" },
        { text: "Town/City", value: "City" },
        { text: "Province", value: "Province" },
        { text: "Country", value: "Country" },
        { text: "LeiInformation Category", value: "LeiInformationCategory" },
        { text: "Legislation Code", value: "LegislationCode" },
      ],
      location: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Location Code",
          inputType: "text",
          inputModel: "ID",
          rules: [(v) => Validation.required(v, "Location Code")],
        },
        {
          inputLabel: " Effective Start Date ",
          inputType: "date",
          inputModel: "EffectiveStartDate",
        },
        {
          inputLabel: " Effective End Date ",
          inputType: "date",
          inputModel: "EffectiveEndDate",
        },
        {
          inputLabel: " Set Code ",
          inputType: "text",
          inputModel: "SetCode",
        },
        {
          inputLabel: " Active Status ",
          inputType: "select",
          inputModel: "ActiveStatus",
          selectionItems: [
            {
              ID: "Active",
              name: "Active",
            },
            {
              ID: "Inactive",
              name: "Inactive",
            },
          ],
        },
        {
          inputLabel: "Main Phone Area Code",
          inputType: "text",
          inputModel: "MainPhoneAreaCode",
        },
        {
          inputLabel: "Main Phone Country Code",
          inputType: "text",
          inputModel: "MainPhoneCountryCode",
        },
        {
          inputLabel: "Main Phone Extension",
          inputType: "text",
          inputModel: "MainPhoneExtension",
        },
        {
          inputLabel: "Location Name",
          inputType: "text",
          inputModel: "Location",
          rules: [(v) => Validation.required(v, "Location Name")],
        },
        {
          inputLabel: "Address Line 1",
          inputType: "text",
          inputModel: "AddressLine1",
        },
        {
          inputLabel: "Address Line 2",
          inputType: "text",
          inputModel: "AddressLine2",
        },
        {
          inputLabel: "Address Line 3",
          inputType: "text",
          inputModel: "AddressLine3",
        },
        {
          inputLabel: "Address Line 4",
          inputType: "text",
          inputModel: "AddressLine4",
        },
        {
          inputLabel: "Town/City",
          inputType: "text",
          inputModel: "City",
        },
        {
          inputLabel: " Province ",
          inputType: "text",
          inputModel: "Province",
        },
        {
          inputLabel: " Country ",
          inputType: "select",
          inputModel: "Country",
          selectionItems: this.$store.getters.allCountries.map((item) => {
            return {
              ...item,
              name: item.CountryName,
            };
          }),
        },
        {
          inputLabel: " LeiInformation Category ",
          inputType: "text",
          inputModel: "LeiInformationCategory",
        },
        {
          inputLabel: " Legislation Code ",
          inputType: "text",
          inputModel: "LegislationCode",
        },
      ],
      editedItem: {
        ID: null,
        EffectiveStartDate: this.formatDate(this.getDefaultDate()),
        EffectiveEndDate: this.formatDate(this.getDefaultDate()),
        SetCode: null,
        ActiveStatus: null,
        MainPhoneAreaCode: null,
        MainPhoneCountryCode: null,
        MainPhoneExtension: null,
        Location: null,
        AddressLine1: null,
        AddressLine2: null,
        AddressLine3: null,
        AddressLine4: null,
        City: null,
        Province: null,
        Country: null,
        LeiInformationCategory: null,
        LegislationCode: null,
      },
      defaultItem: {
        ID: null,
        EffectiveStartDate: null,
        EffectiveEndDate: null,
        SetCode: null,
        ActiveStatus: null,
        MainPhoneAreaCode: null,
        MainPhoneCountryCode: null,
        MainPhoneExtension: null,
        Location: null,
        AddressLine1: null,
        AddressLine2: null,
        AddressLine3: null,
        AddressLine4: null,
        City: null,
        Province: null,
        Country: null,
        LeiInformationCategory: null,
        LegislationCode: null,
      },
      effectiveStartDateMenuValue: this.getDefaultDate(),
      effectiveEndDateMenuValue: this.getDefaultDate(),
      effectiveStartDate: false,
      effectiveEndDate: false,
      validation: Validation,
      index: 1,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    effectiveStartDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveStartDate = this.formatDate(
        this.effectiveStartDateMenuValue
      );
    },
    effectiveEndDateMenuValue(val) {
      console.log(val);
      this.editedItem.EffectiveEndDate = this.formatDate(
        this.effectiveEndDateMenuValue
      );
    },
  },

  created() {
    this.$store.watch(
      (state, getters) => getters.allCountries,
      (newValue) => {
        if (newValue) {
          this.inputConfig[15].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.CountryName,
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
        Object.assign(this.location[this.editedIndex], props.item);
      } else {
        this.location.push(props.item);
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
      if (this.$refs.locationForm.validateForm()) {
        const parseData = { ...data };
        parseData.EffectiveStartDate = this.formatDateForBe(
          data.EffectiveStartDate
        );
        parseData.EffectiveEndDate = this.formatDateForBe(
          data.EffectiveEndDate
        );
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
          "getLocation",
          "setLocation",
          "allLocation"
        );
        this.location = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function (data) {
      console.log(data);
      this.savingChanges = true;
      let create = await this.create(data, "createLocation");
      this.location = this.$store.getters.allLocation;
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
        "updateLocation",
        "allLocation"
      );

      if (update) {
        this.location = update;
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
        this.location = [];
      }
      this.savingChanges = false;
    },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data);
      let del = await this.delete(data, "deleteLocation");
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

    initializeRelationalDatas: async function () {
      try {
        await this.getCountries();
      } catch (error) {
        this.showWarningResponse("Something went wrong!");
      }
    },

    getCountries: async function () {
      let getdata = await this.$store.dispatch("getCountries");

      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setCountries");
          break;
        }

        case 500:
          this.showWarningResponse("Something went wrong!");
          break;

        default:
          break;
      }
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

<style scoped>
#alert {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  word-wrap: break-word;
}
</style>
