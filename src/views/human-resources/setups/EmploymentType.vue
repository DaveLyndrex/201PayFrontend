    <!-- [11/03/2021 CN C.Rubio ] -->
<template>
  <v-app>
    <b-container>
      <Alert :response="response" :message="message" id="alert" style="display: none"/>
      <BreadCrumb/>
      <DefaultDataTable
        class="default-table"
        v-if="!openForm"
        :headers="headers"
        :items="employmentType"
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
      ref="employmentTypeForm" 
    >
      <template v-slot:actionBtns class="template-form">
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
       validation: Validation,
       edit: false,
        loading: true,
        openForm: false,
        savingChanges: false,
        search: "",
        headers: [
          { text: "Employment Type", value: "EmploymentType" },
          {  text: "Actions", value: "actions", sortable: false },
        ],
        employmentType: [],
         editedIndex: -1,
         inputConfig: [
          {
            inputLabel: "Employment Type",
            inputType: "text",
            inputModel: "EmploymentType",
            rules: [(v) => Validation.required(v, "Employment Type")],
          },
        ],
        editedItem: {
          ID:null,
          EmploymentType: null,
          CreatedDate:null,
          ModifiedDate: null,
           ModifiedBy: null,
          
        },
 
        defaultItem: {
          ID:null,
          EmploymentType: null,
          CreatedDate:null,
          ModifiedDate: null,
           ModifiedBy: null,
          
        },
        message:"",
        response:"",
        index:1,
    }
  },
 
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
      console.log(props);
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });
 
    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.employmentType[this.editedIndex], props.item);
      } else {
        this.employmentType.push(props.item);
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
    retrieveData: async function () {
      this.employmentType =[],
      this.loading = true;
      let getdata = await this.retrieve(
        "getEmploymentTypes",
        "setEmploymentType",
        "allEmploymentTypeGetter"
      );
      console.log(getdata);
 
      this.employmentType = getdata ? getdata : [];
      this.loading = false;
    },

 
    saveItem(data) {
      if (this.$refs.employmentTypeForm.validateForm()) {
        const parseData = data 
          console.log(parseData);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },
 
    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createEmploymentType");
      console.log(create);
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
    updateItem: async function(data) {
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateEmploymentType",
        "allEmploymentTypeGetter"
      );
 
      if (update) {
        this.employmentType = update;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
 
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
     
      } else {
        this.employmentType = [];
     
      }
 
      this.savingChanges = false;
      await this.retrieveData();
    },
 

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data)
      let del = await this.delete(data, "deleteEmploymentType");
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
      this.index++;
      this.openForm = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
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
 

