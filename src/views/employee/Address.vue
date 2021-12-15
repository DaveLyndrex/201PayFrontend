<template>
  <!-- 10/12/2021 CN A.DIEZ -->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="addressDatas"
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
      ref="addressForm"
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
import PromptAlert from "../../utils/PromptAlert";
import Validation from "@/utils/Validation";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import Alert from "@/components/Alert.vue";
// import LoggedSession from '@/utils/LoggedSession';

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
  },
  mixins: [PromptAlert, Decryption, Encryption],
  name: "Address",
  data() {
    return {
      response:"",
      message:"",
      openForm: false,
      dialogDelete: false,
      edit: false,
      loading: true,
      headers: [
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Address Type", value: "AddressTypeID" },
        { text: "Address1", value: "Address1" },
        { text: "Address2", value: "Address2" },
        { text: "Address3", value: "Address3" },
        { text: "Address4", value: "Address4" },
        { text: "City", value: "City" },
        { text: "Province", value: "Province" },
        { text: "Postal Code", value: "PostalCode" },
        { text: "Country", value: "Country" },
        { text: "Mobile Number", value: "MobileNumber" },
        { text: "Landline Number", value: "LandlineNumber" },
         { text: "Primary Flag", value: "PrimaryFlag" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      addressDatas: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.date(v, "Start Date")],
        },
        {
          inputLabel: "City",
          inputType: "text",
          inputModel: "City",
          rules: [(v) => Validation.required(v, "City")],
        },
        { inputLabel: "End Date", inputType: "date", inputModel: "EndDate" },
        {
          inputLabel: "Province",
          inputType: "text",
          inputModel: "Province",
          rules: [(v) => Validation.required(v, "Province")],
        },
        {
          inputLabel: "Address Type",
          inputType: "select",
          inputModel: "AddressTypeID",
          selectionItems: this.$store.getters.allAddressTypes.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          }),
          rules: [(v) => Validation.required(v, "Address Type")],
        },
        {
          inputLabel: "Postal Code",
          inputType: "text",
          inputModel: "PostalCode",
          rules: [(v) => Validation.required(v, "Postal Code")],
        },
        {
          inputLabel: "Address 1",
          inputType: "text",
          inputModel: "Address1",
          rules: [(v) => Validation.required(v, "Address 1")],
        },
        {
          inputLabel: "Country",
          inputType: "select",
          inputModel: "Country",
          rules: [(v) => Validation.required(v, "Country")],
          selectionItems: this.$store.getters.allCountries.map((item) => {
            return {
              ...item,
              name: item.CountryName,
            };
          }),
        },
        {
          inputLabel: "Address 2",
          inputType: "text",
          inputModel: "Address2",
        },
        {
          inputLabel: "Mobile Number",
          inputType: "text",
          inputModel: "MobileNumber",
        },
        {
          inputLabel: "Address 3",
          inputType: "text",
          inputModel: "Address3",
        },
        {
          inputLabel: "Landline Number",
          inputType: "text",
          inputModel: "LandlineNumber",
        },
        {
          inputLabel: "Address 4",
          inputType: "text",
          inputModel: "Address4",
        },
        {
          inputLabel: "Primary Flag",
          inputType: "radio",
          inputModel: "PrimaryFlag",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          rules: [(v) => Validation.required(v, "Primary Flag")]
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
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        AddressTypeID: null,
        Address1: null,
        Address2: null,
        Address3: null,
        Address4: null,
        City: null,
        Province: null,
        Region: null,
        PostalCode: null,
        Country: null,
        MobileNumber: null,
        LandlineNumber: null,
        PrimaryFlag: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: null,
        EndDate: null,
        AddressTypeID: null,
        Address1: null,
        Address2: null,
        Address3: null,
        Address4: null,
        City: null,
        Province: null,
        Region: null,
        PostalCode: null,
        Country: null,
        MobileNumber: null,
        LandlineNumber: null,
        PrimaryFlag: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
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
    dialogDelete(val) {
      val || this.closeDelete();
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
      (state, getters) => getters.allAddressTypes,
      (newValue) => {
        if (newValue) {
          this.inputConfig[4].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allCountries,
      (newValue) => {
        if (newValue) {
          this.inputConfig[7].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.CountryName,
            };
          });
        }
      }
    );

    EventBus.$on("addNewItem", (props) => {
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (props.index > -1) {
        Object.assign(this.addressDatas[this.editedIndex], props.item);
      } else {
        this.addNewItem(props.item);
        // this.addressDatas.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    EventBus.$on("deleteItem", (props) => {
      this.deleteItem(props);
    });

     this.initialize();
     this.initializeRelationalDatas();
  },

  methods: {
    initialize: async function() {
      let getAddresses = await this.$store.dispatch("getAddressesData");
      const ciphertext = getAddresses.data.ciphertext;
      switch (getAddresses.status) {
        case 200: {
          await this.decrypt(ciphertext, "setAddresses");
          this.addressDatas = this.$store.getters.allAddresses;
          this.loading = false;
          break;
        }
        case 500: {
          this.loading = false;
          this.showWarningResponse("Something went wrong!");
          break;
        }
        case 404: {
          this.loading = false;
          this.showWarningResponse("Something went wrong!");
          break;
        }
        default:
          this.loading = false;
          break;
      }
    },

    saveItem(data) {
      
      if (this.$refs.addressForm.validateForm()) {
        const parseData = data 
        parseData.StartDate = this.parseDate(data.StartDate);
        parseData.EndDate = this.parseDate(data.EndDate);
        console.log(parseData);
        if (this.editedIndex > -1) {
          this.editItem(parseData);
        } else {
          this.addNewItem(parseData);
        }
      }
    },

    addNewItem: async function(data) {
      console.log(data);
      let encryptedData = await this.encrypt(data);

      if (encryptedData) {
        let addNew = await this.$store.dispatch(
          "createAddressData",
          encryptedData.data
        );

        let resData =
          typeof addNew.data === "object"
            ? addNew.data
            : JSON.parse(addNew.data);

        switch (addNew.status) {
          case 200: {
            this.initialize();
            this.close();
            this.addressDatas = this.$store.getters.allAddresses;
            console.log(resData);
            if(resData.code == '200') {
              this.initialize();
              this.close();
              
              this.response = "success";
              this.message = "Successfully Added";

              document.getElementById("alert").style.display = "block";
              setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
            } else {
              this.showErrorResponse("Something went wrong");
            }
            // this.showSuccessResponse("Success", resData.message);
           
            break;
          }

          case 500:
            this.response = "error";
            this.message = "Something went wrong!";
            break;

          default:
            this.loading = false;
            this.response = "error";
            this.message = "Something went wrong!";
            break;
        }
        document.getElementById('alert').style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      }
    },

    editItem: async function(data) {
      let encryptedData = await this.encrypt(data);

      if (encryptedData) {
        let updateData = await this.$store.dispatch("updateAddressData", {
          index: this.editedIndex,
          ciphertext: encryptedData.data,
          editedData: data,
        });

        let resData =
          typeof updateData.data === "object"
            ? updateData.data
            : JSON.parse(updateData.data);

        switch (updateData.status) {
          case 200:
            if (resData.code === "404") {
              this.response = "error";
              this.message = "Something went wrong!";
            } else {
              this.addressDatas = this.$store.getters.allAddresses;
              this.initialize();
              this.response = "success";
              this.message = "Successfully Updated";
              this.close();
            }
            break;

          case 500:
            this.response = "error";
            this.message = "Something went wrong!";
            break;
          default:
            break;
        }
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      }
    },

    // deleteItem: async function (data) {
    //   let delAddress = await this.$store.dispatch("deleteAddressData", {
    //     item: data.itemToDelete,
    //     id: data.itemToDelete.ID,
    //   });
    //   let resData = JSON.parse(delAddress.data);
    //   switch (delAddress.status) {
    //     case 200: {
    //       this.showSuccessResponse("", resData.message);
    //       break;
    //     }
    //     default:
    //       break;
    //   }
    // },

    // Methods for relational datas
    initializeRelationalDatas: async function() {
      try {
        await this.getAddressTypes();
        await this.getCountries();
      } catch (error) {
        this.showWarningResponse("Oops!", "An error encountered!");
      }
    },

    getCountries: async function() {
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

    getAddressTypes: async function() {
      let getdata = await this.$store.dispatch("getAddressTypes");
      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setAddressTypes");
          break;
        }

        case 500:
          this.showWarningResponse("Something went wrong!");
          break;

        default:
          this.showWarningResponse("Something went wrong!");
          break;
      }
    },

    // End of methods for relational datas

    close() {
      this.edit = false;
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
