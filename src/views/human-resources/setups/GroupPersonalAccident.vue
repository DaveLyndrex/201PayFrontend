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
      :items="groupPersonalAccident"
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
      ref="groupPersonalAccidentForm"
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
      data-testid="test"
      color="whitesmoke"
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
      response: "",
      message: "",
      validation: Validation,
      openForm: false,
      loading: true,
      savingChanges: false,
      headers: [
        { text: "Level", value: "Level" },
        { text: "Coverage", value: "Amount" },     
        { text: "Actions", value: "actions", sortable: false },
      ],
      groupPersonalAccident: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Level",
          inputType: "text",
          inputModel: "Level",
          rules: [(v) => Validation.required(v, "Level")],
        },
        {
          inputLabel: "Coverage",
          inputType: "text",
          inputModel: "Amount",
          rules: [(v) => Validation.required(v, "Coverage")],
        },
       
      ],
      editedItem: {
        ID: null,
        Level: null,
        Amount: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: null,
      },
      defaultItem: {
        ID: null,
        Level: null,
        Amount: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: null,
      },
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
        Object.assign(this.groupPersonalAccident[this.editedIndex], props.item);
      } else {
        this.groupPersonalAccident.push(props.item);
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
      if (this.$refs.groupPersonalAccidentForm.validateForm()) {
        if (this.editedIndex > -1) {
        this.updateItem(data);
      } else {
        this.createNewItem(data);
      }  
    }  
      
    },
    retrieveData: async function () {
  
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllGPASMasterData",
          "setGpaSetUpMasterData",
          "allGpaSetUpMasterData"
        );
        this.groupPersonalAccident = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function (data) {
      console.log(data)
      this.savingChanges = true;
      let create = await this.create(data, "createGroupPersonalAccident");
      // this.groupPersonalAccident = this.$store.getters.allGpaSetUpMasterData;
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
    updateItem: async function (data) {
      
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateGroupPersonalAccident",
        "allGpaSetUpMasterData"
      );

      if (update) {
        this.groupPersonalAccident = update;
        this.close();

        this.response = "success";
        this.message = "Successfully updated!";

        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);

      } else {
        this.groupPersonalAccident = [];
      }
      this.savingChanges = false;
      await this.retrieveData();
    },

    deleteItem: async function (data) {
      this.savingChanges = true;
      console.log(data)
      let del = await this.delete(data, "deleteGroupPersonalAccident");
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

