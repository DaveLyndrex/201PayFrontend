<!-- DAVE LYNDREX MILLAN -->
<template>
  <v-app>
    <b-container>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <BreadCrumb/> 
    <DefaultDataTable
    class="default-table"
      v-if="!openForm"
      :headers="headers"
      :items="employeeStatus"
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
      ref="employeeStatusForm"
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
        </template>
      </DefaultForm
    >
    <v-btn 
    type="submit"
    data-test="cancel"
    class="mb-2 px-8 font-color d-none" 
    color="whitesmoke" 
    data-testid="test"
    @click="close">
    Cancel
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
      index: 1,
      message: "",
      response: "",
      openForm: false,
      loading: true,
      savingChanges: false,
      headers: [
        { text: "Employee Status", value: "EmployeeStatus" },
       
        { text: "Actions", value: "actions", sortable: false },
      ],
      employeeStatus: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Employee Status",
          inputType: "text",
          inputModel: "EmployeeStatus",
          rules: [(v) => Validation.required(v, "Employee Status")],
        },
         
      ],
      editedItem: {
        ID: null,
        EmployeeStatus: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: null,
      },
      defaultItem: {
        ID: null,
        EmployeeStatus: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: null,
      },
       validation: Validation,
    };
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
      if(props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.EmployeeStatus[this.editedIndex], props.item);
      } else {
        this.EmployeeStatus.push(props.item);
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
    saveItem(data) {
      if (this.$refs.employeeStatusForm.validateForm()) {
        if (this.editedIndex > -1) {
        this.updateItem(data);
      } else {
        this.createNewItem(data);
      }
    }
      
    },

    //Retrieve Address Type
    retrieveData: async function () {
  
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "getEmployeeStatusData",
          "setEmployeeStatus",
          "allEmployeeStatus"
        );
        this.employeeStatus = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },

//CREATE Address Type
    createNewItem: async function (data) {
      console.log(data)
      this.savingChanges = true;
      let create = await this.create(data, "createEmployeeStatus");
      // this.employeeStatus = this.$store.getters.allEmployeeStatus;
      if (create) {
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully saved!";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      }
      this.savingChanges = false;
    },
    
//UPDATE Address Type
    updateItem: async function (data) {
      
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateEmployeeStatus",
        "allEmployeeStatusGetters"
      );

      if (update) {
        this.employeeStatus = update;
        this.close();

        this.response = "success";
        this.message = "Successfully updated!";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } else {
        this.employeeStatus = [];
      }
      this.savingChanges = false;
      await this.retrieveData();
    },

//DELETE Address Type
    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data)
      let del = await this.delete(data, "deleteEmployeeStatus");
      if (del) {
        await this.retrieveData();

        this.response = "success";
        this.message = "Successfully Deleted!";

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
