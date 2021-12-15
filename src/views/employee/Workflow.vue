<template>
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="workFlow"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
    ></DefaultDataTable>

    <DefaultForm
      v-else
      class="emp-d-container"
      :inputConfig="inputConfig"
      :model="editedItem"
      :defaultInputItem="defaultItem"
      :edit="edit"
      ref="workflowForm"
    >
      <template v-slot:StartDate>
        <v-menu
          ref="startDate"
          v-model="startDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Start Date')]"
              required
              solo
              dense
              v-model="editedItem.StartDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="startDateMenuValue = parseDate(editedItem.StartDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDateMenuValue"
            no-title
            @input="startDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

      <template v-slot:EndDate>
        <v-menu
          ref="endDate"
          v-model="endDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              solo
              dense
              v-model="editedItem.EndDate"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="endDateMenuValue = parseDate(editedItem.EndDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDateMenuValue"
            no-title
            @input="endDate = false"
          ></v-date-picker>
        </v-menu>
      </template>

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
      </template></DefaultForm
    >
  </v-app>
</template>

<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
import { EventBus } from "@/bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import Validation from "@/utils/Validation";
import { mapState } from "vuex";
import Alert from "@/components/Alert.vue";

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      response:"",
      message:"",
      openForm: false,
      loading: true,
      savingChanges: false,
      headers: [
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Username", value: "Username" },
        { text: "Email Address", value: "Email" },
        { text: "Email Type", value: "EmailType" },
        { text: "Rater", value: "RaterID" },
        { text: "Approval", value: "ApproverID" },
        { text: "Max Approver", value: "MaxApprover" },
        { text: "Workflow", value: "ApprovalGroupID" },
        { text: "Primary Flag", value: "PrimaryFlag" },
        { text: "Send Credentials Email Flag", value: "SendCredsEmailFlag" },
        { text: "User Name Matching", value: "UserNameMatchingFlag"  },
        { text: "Actions", value: "actions", sortable: false },
      ],
      workFlow: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.date(v, "Start Date")],
        },
        {
          inputLabel: "Approver",
          inputType: "select",
          inputModel: "ApproverID",
          rules: [(v) => Validation.required(v, "Approver")],
          selectionItems: this.$store.getters.allApproverAndRater.map(
            (item) => {
              return {
                ...item,
                name: item.FullName,
              };
            }
          ),
        },
        {
          inputLabel: "End Date",
          inputType: "date",
          inputModel: "EndDate",
        },
        {
          inputLabel: "Max Approver",
          inputType: "number",
          inputModel: "MaxApprover",
          rules: [(v) => Validation.required(v, "Max Approver")],
        },
        {
          inputLabel: "Username",
          inputType: "text",
          inputModel: "Username",
          rules: [(v) => Validation.required(v, "Username")],
        },
        {
          inputLabel: "Workflow",
          inputType: "select",
          inputModel: "ApprovalGroupID",
          selectionItems: this.$store.getters.allApprovalGroups.map(
            (item) => {
              return {
                ...item,
                name: item.Description,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Workflow")],
        },
        {
          inputLabel: "Email Address",
          inputType: "text",
          inputModel: "Email",
          rules: [(v) => Validation.required(v, "Email Address")],
          // inputModel: "Email",
        },
        {
          inputLabel: "Primary Flag",
          inputType: "radio",
          inputModel: "PrimaryFlag",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          rules: [(v) => Validation.required(v, "Primary Flag")],
        },
        {
          inputLabel: "Email Type",
          inputType: "text",
          inputModel: "EmailType",
        },
        {
          inputLabel: "Send Credentials Email Flag",
          inputType: "text",
          inputModel: "SendCredsEmailFlag",
        },
        {
          inputLabel: "Rater",
          inputType: "select",
          inputModel: "RaterID",
          selectionItems: this.$store.getters.allApproverAndRater.map(
            (item) => {
              return {
                ...item,
                name: item.FullName,
              };
            }
          ),
          rules: [(v) => Validation.required(v, "Rater")],
        },
        {
          inputLabel: "User Name Matching Flag",
          inputType: "text",
          inputModel: "UserNameMatchingFlag",
        },
 
      ],
      editedItem: {
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        Username: null,
        Email: null,
        EmailType: null,
        PrimaryFlag: null,
        SendCredsEmailFlag: null,
        UserNameMatchingFlag: null,
        RaterID: null,
        ApproverID: null,
        MaxApprover: null,
        ApprovalGroupID: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        StartDate: null,
        EndDate: null,
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        Username: null,
        Email: null,
        EmailType: null,
        PrimaryFlag: null,
        SendCredsEmailFlag: null,
        UserNameMatchingFlag: null,
        RaterID: null,
        ApproverID: null,
        MaxApprover: null,
        ApprovalGroupID: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    startDateMenuValue(val) {
      console.log(val);
      this.editedItem.StartDate = this.formatDate(this.startDateMenuValue);
    },
    endDateMenuValue(val) {
      console.log(val);
      this.editedItem.EndDate = this.formatDate(this.endDateMenuValue);
    },
  },

  computed: mapState(["allApprovalGroups"]),

  created() {
    // approval group data change watcher
    this.$store.watch(
      (state, getters) => getters.allApprovalGroups,
      (newValue) => {
        if (newValue) {
          this.inputConfig[5].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allApproverAndRater,
      (newValue) => {
        if (newValue) {
          this.inputConfig[1].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.FullName,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allApproverAndRater,
      (newValue) => {
        if (newValue) {
          this.inputConfig[10].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.FullName,
            };
          });
        }
      }
    );
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
        Object.assign(this.workFlow[this.editedIndex], props.item);
      } else {
        this.workFlow.push(props.item);
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
    this.initializeRelationalDatas();
  },

  methods: {
    saveItem(data) {
      if (this.$refs.workflowForm.validateForm()) {
        const parseData = { ...data };
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        parseData.EndDate = this.formatDateForBe(data.EndDate);
        console.log(parseData);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
        }
      }
    },
    retrieveData: async function() {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveAllWorkflows",
          "setWorkFlowData",
          "allWorkFlowData"
        );
        this.workFlow = getdata ? getdata : [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    createNewItem: async function(data) {
      this.savingChanges = true;
      let create = await this.create(data, "createWorkFlow");
      this.workFlow = this.$store.getters.allWorkFlowData;
      if (create) {
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Added";
        
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      }
      this.savingChanges = false;

        
    },
    updateItem: async function(data) {
      for (var item in this.editedItem) {
        if (item === "ModifiedBy") {
          this.editedItem[item] = JSON.parse(
            localStorage.getItem("user_details")
          ).data.Email;
        }
      }
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateWorkFlow",
        "allWorkFlowData"
      );

      if (update) {
        this.workFlow = update;
        this.close();

        this.response = "success";
        this.message = "Successfully Updated";
     
      } else {
        this.workFlow = [];
 
        

      }
      this.savingChanges = false;
      await this.retrieveData();

      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
    },

    deleteItem: async function(data) {
      this.savingChanges = true;
      let del = await this.delete(data, "deleteWorkflow");
      if (del) {
        await this.retrieveData();
        this.response = "success";
        this.message = "Successfully Deleted";
        
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } 
      this.savingChanges = false;
  
      
    },

    // Methods for relational datas
    initializeRelationalDatas: async function() {
      try {
        await this.retrieveApproverGroup();
        await this.retrieveApproverAndRater();
      } catch (error) {
        this.showWarningResponse("OOps", "An error encountered!");
      }
    },

    retrieveApproverGroup: async function() {
      return await this.retrieve(
        "retrieveApprovalGroup",
        "setApprovalGroups",
        "allApprovalGroups"
      );
    },

    retrieveApproverAndRater: async function() {
      return await this.retrieve(
        "retrieveApproverAndRater",
        "setApproverAndRater",
        "allApproverAndRater"
      );
    },
    // End of methods for relational datas

    close() {
      this.openForm = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    formatDate(date) {
      if (!date) return false;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return false;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    getDefaultDate() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
    formatDateForBe(date) {
      console.log("BEFORE DATE", date);
      if (!date) return null;

      const [month, day, year] = date.split("/");
      console.log(year, month, day);
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped>
#alert{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  margin-top: -5rem;
  word-wrap: break-word;
}
</style>
