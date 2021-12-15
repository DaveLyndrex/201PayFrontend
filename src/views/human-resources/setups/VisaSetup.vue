<template>
  <div class="container">
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
      :items="data"
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
      ref="form"
    >
      <template v-slot:actionBtns>
        <v-btn
          data-test="cancel"
          class="mb-2 px-8 font-color"
          data-testid="test"
          color="whitesmoke"
          @click="close"
        >
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
  </div>
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
    BreadCrumb,
    Alert,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      openForm: false,
      loading: true,
      savingChanges: false,
      response: "",
      message: "",
      index: 1,
      headers: [
        { text: "Visa Permit Type", value: "VisaPermitType" },
        { text: "Legislation Code", value: "LegislationCode" },
        { text: "Current Visa Permit", value: "CurrentVisaPermit" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      data: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Visa Permit Type",
          inputType: "text",
          inputModel: "VisaPermitType",
          rules: [(v) => Validation.required(v, "Visa Permit Type")],
        },

        {
          inputLabel: "Legislation Code",
          inputType: "text",
          inputModel: "LegislationCode",
          rules: [(v) => Validation.required(v, "Legislation Code")],
        },

        {
          inputLabel: "Current Visa Permit",
          inputType: "text",
          inputModel: "CurrentVisaPermit",
          rules: [(v) => Validation.required(v, "Current Visa Permit")],
        },
      ],
      editedItem: {
        ID: 0,
        VisaPermitType:null,
        LegislationCode:null,
        CurrentVisaPermit: null,
        ModifiedBy: null,
      },
      defaultItem: {
       VisaPermitType:null,
        LegislationCode:null,
        CurrentVisaPermit: null,
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
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], props.item);
      } else {
        this.data.push(props.item);
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
      if (this.$refs.form.validateForm()) {
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
          "getAllVisaSetup",
          "setVisaSetup",
          "allVisaSetup"
        );
        this.data = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },

    createNewItem: async function (data) {
      this.savingChanges = true;
      let create = await this.create(data, "visaSetupAction");
      if (create) {
        await this.retrieveData();
        this.savingChanges = false;
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
        "updateVisaSetup",
        "allVisaSetup"
      );

      if (update) {
        this.data = update;
        //  this.savingChanges = false;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";
        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          3000
        );
      } else {
        this.data = [];
      }
      this.savingChanges = false;
      // await this.retrieveData();
    },

    deleteItem: async function (data) {
      this.savingChanges = true;
      // let del = await this.delete(data, "deleteCostCenterSetup");
      try {
        let del = await this.$store.dispatch("deleteVisaSetup", {
          item: data.itemToDelete,
          id: data.itemToDelete.ID,
        });
        if (del) {
          this.response = "success";
          this.message = "Successfully Deleted";
          document.getElementById("alert").style.display = "block";
          setTimeout(
            () => (document.getElementById("alert").style.display = "none"),
            3000
          );
          await this.retrieveData();
        }
      } catch (error) {
        console.log(error);
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
#alert {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  word-wrap: break-word;
}
</style>

