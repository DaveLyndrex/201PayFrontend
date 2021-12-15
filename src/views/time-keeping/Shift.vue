<template>
  <div>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="shifts"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
    ></DefaultDataTable>

    <DefaultForm
      v-else
      :inputConfig="inputConfig"
      :model="editedItem"
      :defaultInputItem="defaultItem"
      :edit="edit"
    >
      <template v-slot:actionBtns>
        <v-btn class="mb-2 px-8" rounded color="danger darken-1" @click="close">
          Cancel
        </v-btn>
        <v-btn
          :loading="savingChanges"
          class="mb-2 px-8"
          rounded
          color="primary darken-1"
          @click="saveItem(editedItem)"
        >
          Save
        </v-btn>
      </template>
    </DefaultForm>
  </div>
</template>

<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
import { EventBus } from "@/bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],

  data() {
    return {
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        {
          text: "Shift Code.",
          align: "start",
          value: "ShiftCode",
        },
        { text: "Shift Name", value: "ShiftName" },
        { text: "In (Morning)", value: "In1" },
        { text: "Out (Morning)", value: "Out1" },
        { text: "Number of Hours (Morning)", value: "NumHrs1" },
        { text: "In (Afternoon)", value: "In2" },
        { text: "Out (Afternoon)", value: "Out2" },
        { text: "Number of Hours (Afternoon)", value: "NumHrs2" },
        { text: "Overtime Start ", value: "OTStart" },
        { text: "Maximum Overtime", value: "MaxOT" },
        { text: "Maximum Undertime ", value: "MaxUndertime" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      shifts: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Shift Code",
          inputType: "text",
          inputModel: "ShiftCode",
          // selectionItems: ["111111", "111112", "111113", "111114", "111115"],
        },
        {
          inputLabel: "Shift Name",
          inputType: "text",
          inputModel: "ShiftName",
        },
        {
          inputLabel: "In (Morning)",
          inputType: "text",
          inputModel: "In1",
        },
        {
          inputLabel: "Out (Morning)",
          inputType: "text",
          inputModel: "Out1",
        },
        { inputLabel: "Number of Hours (Morning)", inputType: "number", inputModel: "NumHrs1" },

        {
          inputLabel: "In (Afternoon)",
          inputType: "text",
          inputModel: "In2",
        },
        {
          inputLabel: "Out (Afternoon)",
          inputType: "text",
          inputModel: "Out2",
        },
        { inputLabel: "Number of Hours (Afternoon)", inputType: "number", inputModel: "NumHrs2" },
        {
          inputLabel: "Overtime Start",
          inputType: "text",
          inputModel: "OTStart",
        },
        {
          inputLabel: "Mid Required",
          inputType: "number",
          inputModel: "MidRequired",
        },
        { inputLabel: "Max Overtime", inputType: "number", inputModel: "MaxOT" },
        {
          inputLabel: "Max Undertime",
          inputType: "number",
          inputModel: "MaxUndertime",
        },
        {
          inputLabel: "Rounded To",
          inputType: "number",
          inputModel: "RoundedTo",
        },
        {
          inputLabel: "Grace Period Daily",
          inputType: "number",
          inputModel: "GracePeriodDaily",
        },
        {
          inputLabel: "Grace Period Weekly",
          inputType: "number",
          inputModel: "GracePeriodWeekly",
        },
        {
          inputLabel: "Grace Period Semi-Monthly",
          inputType: "number",
          inputModel: "GracePeriodSemiMonthly",
        },
        {
          inputLabel: "Grace Period Monthly",
          inputType: "number",
          inputModel: "GracePeriodMonthly",
        },
        {
          inputLabel: "Created Date",
          inputType: "string",
          inputModel: "CreatedDate",
        },
        {
          inputLabel: "Modified Date",
          inputType: "string",
          inputModel: "ModifiedDate",
        },
        {
          inputLabel: "Modified By",
          inputType: "string",
          inputModel: "ModifiedBy",
        },
      ],
      editedItem: {
        ShiftCode: null,
        ShiftName: null,
        In1: null,
        Out1: null,
        NumHrs1: null,
        In2: null,
        Out2: null,
        NumHrs2: null,
        OTStart: null,
        MidRequired: null,
        MaxOT: null,
        MaxUndertime: null,
        RoundedTo: null,
        GracePeriodDaily: null,
        GracePeriodWeekly: null,
        GracePeriodSemiMonthly: null,
        GracePeriodMonthly: null,
        ModifiedBy: "Tope",
      },
      defaultItem: {
        ShiftCode: null,
        ShiftName: null,
        In1: null,
        Out1: null,
        NumHrs1: null,
        In2: null,
        Out2: null,
        NumHrs2: null,
        OTStart: null,
        MidRequired: null,
        MaxOT: null,
        MaxUndertime: null,
        RoundedTo: null,
        GracePeriodDaily: null,
        GracePeriodWeekly: null,
        GracePeriodSemiMonthly: null,
        GracePeriodMonthly: null,
        ModifiedBy: "Tope",
      },
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
  },

  created() {
    EventBus.$on("initializeData", async () => {
      await this.retrieveData();
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
        Object.assign(this.shifts[this.editedIndex], props.item);
      } else {
        this.shifts.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    EventBus.$on("deleteItem", (props) => {
      if (this.savingChanges === false) {
        this.deleteItem(props);
      }
    });

    this.retrieveData();
  },

  mounted() {
    EventBus.$on("newFileName", (props) => {
      this.editedItem[props.model] = props.fileName;
    });
  },

  methods: {
    saveItem(data) {
      if (this.editedIndex > -1) {
        this.updateItem(data);
      } else {
        this.createNewItem(data);
      }
    },

    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createShift");
      if (create) {
        this.retrieveData();
        this.close();
      }
      this.savingChanges = false;
    },

    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveShifts",
          "setShifts",
          "allShifts"
        );
        this.shifts = getdata ? getdata : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    updateItem: async function(data) {
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateShift",
        "allShifts"
      );

      if (update) {
        this.shifts = update;
        this.close();
      } else {
        this.shifts = [];
      }
      this.savingChanges = false;
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      let del = await this.delete(data, "deleteShift");
      if (del) {
        await this.retrieveData();
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
