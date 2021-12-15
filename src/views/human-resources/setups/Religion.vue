<template>
  <v-app>
    <b-container>
      <Alert :response="response" :message="message" id="alert" style="display: none"/>
      <BreadCrumb/>
      <DefaultDataTable
      class="default-table"
        v-if="!openForm"
        :headers="headers"
        :items="religion"
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
        ref="religionForm"
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
      index: 1,
      headers: [
        { text: "Legislation Code", value: "LegislationCode" },
        { text: "Religion", value: "Religion" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      religion: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Legislation Code",
          inputType: "text",
          inputModel: "LegislationCode",
          rules: [(v) => Validation.required(v, "Legislation Code")],
        },
        {
          inputLabel: "Religion",
          inputType: "text",
          inputModel: "Religion",
          rules: [(v) => Validation.required(v, "Religion")],
        },
      ],
      editedItem: {
        ID: String,
        LegislationCode: "",
        Religion: "",
      },
      defaultItem: {
        ID: String,
        LegislationCode: "",
        Religion: "",
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
        Object.assign(this.religion[this.editedIndex], props.item);
      } else {
        this.religion.push(props.item);
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
      if (this.$refs.religionForm.validateForm()) {
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
        let getdata = await this.retrieve(
          "getReligion",
          "setReligion",
          "allReligion"
        );
        this.religion = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function(data) {
      console.log(data);
      this.savingChanges = true;
      let create = await this.create(data, "addReligion");
      // this.religion = this.$store.getters.allReligion;
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
        "updateReligion",
        "allReligion"
      );

      if (update) {
        this.religion = update;
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
        this.religion = [];
      }
      this.savingChanges = false;
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      try {
        let del = await this.delete(data, "deleteReligion");
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
