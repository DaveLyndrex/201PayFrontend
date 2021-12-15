<template>
  <v-app>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="accessLogsData ? accessLogsData : []"
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
          text: "Username",
          align: "start",
          value: "Username",
        },
        { text: "IP Address", value: "IPAddress" },
        { text: "Status", value: "Status" },
        { text: "Remarks", value: "Remarks" },
      ],
      accessLogsData: [],
      editedItem: {
        Username: null,
        IPAddress: null,
        Status: null,
        Remarks: null,
        ModifiedBy: null,
      },
      defaultItem: {
        Username: null,
        IPAddress: null,
        Status: null,
        Remarks: null,
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
          "retrieveAllAccessLogs",
          "setAccessLogs",
          "allAccessLogs"
        );
        this.accessLogsData = getdata ? getdata : [];
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
