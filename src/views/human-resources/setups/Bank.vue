<template>
  <v-app>
    <b-container>
      <Alert :response="response" :message="message" id="alert" style="display: none"/>
      <BreadCrumb/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="banks"
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
      ref="bankForm"
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
      headers: [
        { text: "Bank Code", value: "BankCode" },
        { text: "Bank Name", value: "BankName" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      banks: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Bank Code",
          inputType: "text",
          inputModel: "BankCode",
          rules: [(v) => Validation.required(v, "Bank Code")],
        },
        {
          inputLabel: "Bank Name",
          inputType: "text",
          inputModel: "BankName",
          rules: [(v) => Validation.required(v, "Bank Name")],
        },
      ],
      editedItem: {
        ID: null,
        BankCode: null,
        BankName: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: null,
      },
      defaultItem: {
        ID: null,
        BankCode: null,
        BankName: null,
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
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.banks[this.editedIndex], props.item);
      } else {
        this.banks.push(props.item);
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
      console.log(this.$refs.bankForm.validateForm())
      if (this.$refs.bankForm.validateForm()) {
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
        let getdata = await this.retrieve("getBanks", "setBanks", "allBanks");
        this.banks = getdata ? getdata : [];
      } catch (error) {
        // console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function(data) {
     
      this.savingChanges = true;
      let create = await this.create(data, "createBanks");
      this.banks = this.$store.getters.allBanks;
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
        "updateBanks",
        "allBanks"
      );

      if (update) {
        this.banks = update;
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
        this.banks = [];
      }
      this.savingChanges = false;
      
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      
      let del = await this.delete(data, "deleteBanks");
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

    close() {
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
