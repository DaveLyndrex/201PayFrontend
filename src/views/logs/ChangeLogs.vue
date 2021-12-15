<template>
  <v-app>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="changeLogsData ? changeLogsData : []"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
    ></DefaultDataTable>
  </v-app>
</template>

<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import { EventBus } from "../../bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";

export default {
  components: {
    DefaultDataTable,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],

  data() {
    return {
      openForm: false,
      loading: true,
      savingChanges: false,
      headers: [
        {
          text: "Employee ID",
          align: "start",
          value: "EmpID",
        },
        { text: "Table", value: "Table" },
        { text: "Column", value: "Column" },
        { text: "Row", value: "Row" },
        { text: "Old Value", value: "OldValue" },
        { text: "New Value", value: "NewValue" },
        { text: "Action", value: "Action" },
      ],
      changeLogsData: [],
      editedItem: {
        EmpID: null,
        Table: null,
        Column: null,
        Row: null,
        OldValue: null,
        NewValue: null,
        Action: null,
        ModifiedBy: null,
      },
      defaultItem: {
        EmpID: null,
        Table: null,
        Column: null,
        Row: null,
        OldValue: null,
        NewValue: null,
        Action: null,
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

    EventBus.$on("closeForm", () => {
      this.close();
    });

    this.retrieveData();
  },

  methods: {
    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllChangeLogs",
          "setChangeLogs",
          "allChangesLogs"
        );
        this.changeLogsData = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    close() {
      this.openForm = false;
    },
  },
};
</script>
