    <!-- [11/03/2021 CN C.Rubio ] -->
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
      :items="civilStatus"
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
      ref="civilStatusForm"
    >
      <!-- ref="civilStatusForm" -->
      <template v-slot:actionBtns class="template-form">
        <v-btn type="submit"
          data-test="cancel"
          class="mb-2 px-8 font-color"
          data-testid="test"
          color="whitesmoke" 
          @click="close">
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
      validation: Validation,
      edit: false,
      loading: true,
      openForm: false,
      savingChanges: false,
      search: "",
      headers: [
        { text: "Civil Status", value: "CivilStatus" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      civilStatus: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Civil Status",
          inputType: "text",
          inputModel: "CivilStatus",
          rules: [(v) => Validation.required(v, "Civil Status")],
        },
      ],
      editedItem: {
        ID: null,
        CivilStatus: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: null,
        // ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },

      defaultItem: {
        ID: null,
        CivilStatus: null,
        CreatedDate: null,
        ModifiedDate: null,
        ModifiedBy: null,
        // ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      message: "",
      response: "",
      index: 1,
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
        Object.assign(this.civilStatus[this.editedIndex], props.item);
      } else {
        this.civilStatus.push(props.item);
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
    retrieveData: async function () {
      this.loading = true;
      let getdata = await this.retrieve(
        "retrieveAllCivilStatusMasterData",
        "setCivilStatusMasterData",
        "allCivilStatusMasterData"
      );

      this.civilStatus = getdata ? getdata : [];
      this.loading = false;
    },

    saveItem(data) {
      if (this.$refs.civilStatusForm.validateForm()) {
        const parseData = data;
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function (data) {
      this.savingChanges = true;
      let create = await this.create(data, "createCivilStatus");

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
        "updateCivilStatus",
        "allCivilStatus"
      );

      if (update) {
        this.civilStatus = update;
        this.close();
        this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          3000
        );
      } else {
        this.civilStatus = [];
      }

      this.savingChanges = false;
      await this.retrieveData();
    },

    deleteItem: async function (data) {
      this.savingChanges = true;
      let del = await this.delete(data, "deleteCivilStatus");
      if (del) {
        this.response = "success";
        this.message = "Successfully Deleted";

        document.getElementById("alert").style.display = "block";
        setTimeout(
          () => (document.getElementById("alert").style.display = "none"),
          1000
        );
      }
      this.savingChanges = false;
      await this.retrieveData();
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
 

