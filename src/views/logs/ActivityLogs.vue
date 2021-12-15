<template>
  <v-app>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="activityLogsData ? activityLogsData : []"
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
          text: "Action",
          align: "start",
          value: "Action",
        },
        { text: "Stored Procedure", value: "StoredProc" },
        { text: "IP Address", value: "IPAddress" },
        { text: "Status", value: "Status" },
        { text: "Remarks", value: "Remarks" },
      ],
      activityLogsData: [],
      editedItem: {
        Action: null,
        StoredProc: null,
        IPAddress: null,
        Status: null,
        Remarks: null,
        ModifiedBy: null,
      },
      defaultItem: {
        Action: null,
        StoredProc: null,
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
          "retrieveAllActivityLogs",
          "setActivityLogs",
          "allActivityLogs"
        );
        this.activityLogsData = getdata ? getdata : [];
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
