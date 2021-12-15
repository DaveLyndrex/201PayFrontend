<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="emergencyContact ? emergencyContact : []"
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
      ref="emergencyContactForm"
    >
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
  </v-app>
</template>
<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
import { EventBus } from "../../bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Validation from "@/utils/Validation";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import Alert from "@/components/Alert.vue"

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  name: "emergency-contact",
  data: () => ({
    response:"",
    message:"",
    openForm: false,
    dialogDelete: false,
    loading: true,
    edit: false,
    savingChanges: false,
    headers: [
      { text: "Name", value: "Name" },
      { text: "Phone Number", value: "PhoneNumber" },
      { text: "Alternative Number", value: "AlternateNumber" },
      { text: "Relationship", value: "Relationship" },
      { text: "Address", value: "Address" },
      { text: "Members of the Household", value: "MOTH" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    emergencyContact: [],
    editedIndex: -1,
    inputConfig: [
      {
        inputLabel: "Name",
        inputType: "text",
        inputModel: "Name",
        rules: [(v) => Validation.required(v, "Name")],
      },
      {
        inputLabel: "Relationship",
        inputType: "text",
        inputModel: "Relationship",
        rules: [(v) => Validation.required(v, "Relationship")],
      },
      {
        inputLabel: "Phone Number",
        inputType: "text",
        inputModel: "PhoneNumber",
        rules: [(v) => Validation.required(v, "Phone Number")],
      },
      {
        inputLabel: "Address",
        inputType: "text",
        inputModel: "Address",
        rules: [(v) => Validation.required(v, "Address")],
      },
      {
        inputLabel: "Alternate Number ",
        inputType: "text",
        inputModel: "AlternateNumber",
      },
      {
        inputLabel: "Members of the Household",
        inputType: "text",
        inputModel: "MOTH",
      },
    ],
    editedItem: {
      EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
      name: "",
      phoneNumber: "",
      alternativeNumber: "",
      relationship: "",
      address: "",
      MOTH: "",
      createdDate: "",
      modifiedDate: "",
      modifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
    },
    defaultItem: {
      EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
      name: "",
      phoneNumber: "",
      alternativeNumber: "",
      relationship: "",
      address: "",
      MOTH: "",
      createdDate: "",
      modifiedDate: "",
      modifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
    },
  }),

  watch: {
    openForm(val) {
      val || this.close();
    },
  },

  created() {
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
        Object.assign(this.emergencyContact[this.editedIndex], props.item);
      } else {
        this.emergencyContact.push(props.item);
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
    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "getEmergencyContactData",
          "setEmergencyContactData",
          "allEmergencyContactData"
        );
        this.emergencyContact = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    saveItem(data) {
      if (this.$refs.emergencyContactForm.validateForm()) {
        if (this.editedIndex > -1) {
          this.updateItem(data);
        } else {
          this.createNewItem(data);
        }
      }
    },

    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createEmergencyContactData");
      if (create) {
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Added";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      }
      this.savingChanges = false;
      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
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
        "updateEmergencyContactData",
        "allEmergencyContactData"
      );

      if (update) {
        this.emergencyContact = update;
        await this.retrieveData();
        this.close();

         this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } else {
        this.emergencyContact = [];
        await this.retrieveData();
        this.response = "error";
        this.message = "Something went wrong!";
      }
      this.savingChanges = false;
      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
    },

    deleteItem: async function(data) {
      let del = await this.$store.dispatch("deleteEmergencyContactData", {
        item: data.itemToDelete,
        id: data.itemToDelete.ID,
      });
      let resData = JSON.parse(del.data);
      switch (del.status) {
        case 200: {
          // this.showSuccessResponse("", resData.message);
             
             if(resData.code == '200') {

                this.response = "success";
                this.message = "Successfully Deleted";

                document.getElementById("alert").style.display = "block";
                setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);

             } else {
                this.showErrorResponse("Something went wrong! ")
             }
             break 
        }
        default:
          break;
      }
    },

    close() {
      this.openForm = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
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
