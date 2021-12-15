<!-- 10/12/2021 CN JLAYAOG -->
<template>
  <v-app class="lighten-5">
    <v-toolbar flat height="20">
      <p class="bg-light">
        <!-- {{requestType.item}} -->
        <b-icon class="mr-2" icon="layout-sidebar-inset-reverse"></b-icon>
        {{ modeType == "add" ? "New Request:" : "Request:" }}
        <span class="font-weight-bold formType">
          {{
            request[0] == "Leave" && request.length == 2
              ? request[0] + ": " + request[1]
              : request[0]
          }}
        </span>
      </p>
      <v-spacer></v-spacer>
      <Request v-if="modeType == 'add'" />
      <ViewApplication v-else />
    </v-toolbar>
    <Message></Message>
    <b-container class="mt-5">
      <v-card flat class="ml-2" color="transparent font-weight-bold">
        <b-icon scale="1.5" class="mr-2" icon="person"></b-icon> USER
        INFORMATION
      </v-card>
      <b-row>
        <b-col>
          <table class="table">
            <tbody>
              <tr
                v-for="(column, key, index) in this.info"
                :key="'column' + index"
              >
                <template v-if="index <= 3">
                  <th>{{ insertSpaces(key) }}</th>
                  <td
                    class="userInfoClass"
                    v-if="index != 0"
                    :class="
                      column == 'Loading... .' ? 'text-primary' : 'text-dark'
                    "
                  >
                    {{ column }}
                  </td>

                  <td v-if="index == 0 && loading && modeType == 'add'">
                    <v-progress-circular
                      class=""
                      indeterminate
                      color="red"
                      :width="2"
                      :size="25"
                    ></v-progress-circular>
                  </td>
                  <td v-if="index == 0 && requestID && modeType == 'add'">
                    {{ requestID[0] }}
                  </td>
                  <td v-if="index == 0 && modeType == 'view'">
                    {{ info.RequestID }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col>
          <table class="table">
            <tbody>
              <tr
                v-for="(columns, keys, index1) in this.info"
                :key="'columns' + index1"
              >
                <template v-if="index1 > 3">
                  <th>{{ insertSpaces(keys) }}</th>
                  <td
                    style="height: 40px"
                    :class="
                      columns == 'Loading... .' ||
                      columns == 'Loading.... .' ||
                      columns == 'Loading....'
                        ? 'text-primary'
                        : 'text-dark'
                    "
                  >
                    {{ columns }}

                    <b-link
                      @click="changeRequestCick"
                      v-if="index1 == 6 && modeType == 'add'"
                      variant="info"
                      size="sm"
                      class="ml-10"
                    >
                      <b-icon icon="arrow-repeat"></b-icon>
                      Change Requester</b-link
                    >
                  </td>

                  <ModalChangeRequest
                    class="d-none"
                    v-if="index1 == 6"
                  ></ModalChangeRequest>
                </template>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>

    <div class="p-2 ml-2 mt-5 font-weight-bold">
      <b-icon scale="1.5" class="mr-2" icon="check"></b-icon> APPROVAL WORKFLOW
    </div>

    <b-container>
      <b-table
        tdClass="font"
        hover
        responsive
        :busy="isBusy"
        :items="[workflow]"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </b-container>

    <AddCC v-if="modeType == 'add'" />
    <span
      v-if="modeType == 'add'"
      class="mt-4 border-secondary border-bottom"
    ></span>

    <COA
      v-if="request[0] == 'COA'"
      :request-type="request[0]"
      :timesheetDate="timesheetDate"
      :mode="modeType"
      :clickData="clickData"
    ></COA>

    <Overtime
      v-if="request[0] == 'OT'"
      :request-type="request[0]"
      :timesheetDate="timesheetDate"
      :mode="modeType"
      :clickData="clickData"
    ></Overtime>
    <Shift
      v-if="request[0] == 'Shift'"
      :request-type="request[0]"
      :timesheetDate="timesheetDate"
      :mode="modeType"
      :clickData="clickData"
    ></Shift>
    <Leave
      v-if="request[1] == 'Leave' || request[0] == 'Leave'"
      :request-type="request"
      :timesheetDate="timesheetDate"
      :mode="modeType"
      :clickData="clickData"
    ></Leave>

    <v-toolbar class="mt-16 mb-8" flat>
      <!--<v-file-input
        type="file"
        v-if="modeType == 'add'"
        @change="selectedFile"
        class="pt-5"
        accept=".x-png,.gif,.jpeg,.doc,.docx,.png,.txt,.pdf"
        show-size
        label="Choose File"
      >
        <template v-slot:selection="{ text }">
          <v-chip small label color="primary">
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>-->

      <input
        v-if="modeType == 'add'"
        class="form-control w-25"
        type="file"
      
        ref="file"
        accept=".x-png,.gif,.jpeg,.doc,.docx,.png,.txt,.pdf"
        @change="selectedFile($event)"
      />

      <v-spacer></v-spacer>
      <v-btn
        :color="modeType == 'view' ? 'primary' : 'danger'"
        dark
        class="px-8 mr-4"
        @click="back()"
      >
        {{ modeType == "view" ? "Go Back" : "Cancel" }}
      </v-btn>

      <v-btn
        v-if="modeType == 'add'"
        :loading="submitLoading"
        depressed
        color="primary"
        @click="submitRequestForm"
        class="float-right w-25"
      >
        Submit
      </v-btn>

      <div
        v-if="
          modeType == 'view' &&
          this.$router.history.current.path == '/home/kiosk/awaiting-approval'
        "
      >
        <v-btn color="primary" dark class="px-8 mr-2" @click="process(2)">
          <i class="mdi mdi-thumb-up"></i>
          Approve
        </v-btn>

        <v-btn class="px-8 ml-2" @click="process(3)" dark color="danger">
          <i class="mdi mdi-thumb-down"></i>
          Disapprove
        </v-btn>
      </div>
    </v-toolbar>
  </v-app>
</template>

<script>
import Request from /* webpackChunkName: "Data Table" */ "@/components/AddRequest.vue";
import ViewApplication from /* webpackChunkName: "Data Table" */ "@/components/ViewApplication.vue";
import ModalChangeRequest from "../views/kiosk/modal/ChangeRequester.vue";
import Message from "../views/kiosk/modal/HandleMessage.vue";

import COA from "../views/kiosk/request-view/Coa.vue";
import Shift from "../views/kiosk/request-view/Shift.vue";
import Leave from "../views/kiosk/request-view/Leave.vue";
import Overtime from "../views/kiosk/request-view/Overtime.vue";
import AddCC from "../views/kiosk/request-view/AddCC.vue";
import { EventBus } from "../bus/bus.js";
import moment from "moment";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
// import Overtime from '../views/kiosk/Overtime.vue';
// import { EventBus } from "../bus/bus";
export default {
  name: "RequestForm",
  props: {
    requestType: {
      type: [Object, String],
      required: false,
    },
    timesheetDate: {
      type: String,
      required: false,
    },
    clickData: {
      type: [Object, Array],
      required: false,
    },
    mode: {
      type: String,
      required: false,
      default: "add",
    },
  },
  // props: ["requestType",  "timesheetDate", "clickData"],
  components: {
    Request,
    ModalChangeRequest,
    COA,
    Shift,
    Leave,
    Overtime,
    AddCC,
    Message,
    ViewApplication,
    // Overtime,
  },
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data: function () {
    return {
      file: null,
      modeType: this.mode,
      isBusy: false,
      userEmpID: null,
      userData: null,
      workflowData: null,
      loading: true,
      loadingInfo: true,
      requestID: null,
      empRequestID: null,
      requesterEmpID: null,
      request: [],
      submitLoading: false,
      selectedCC: [],
      requestShiftDetails: null,
      requestDetails: null,
      sequence: null,
      leave: false,
      attachment: false,
      attachmentName: null,
      info: {
        RequestID: null,
        CreatedBy:
          JSON.parse(localStorage.getItem("user_details")).data.FirstName +
          " " +
          JSON.parse(localStorage.getItem("user_details")).data.LastName,
        Requester:
          JSON.parse(localStorage.getItem("user_details")).data.FirstName +
          " " +
          JSON.parse(localStorage.getItem("user_details")).data.LastName,
        Company: "Loading... .",
        Status: "Pending",
        DateCreated: moment().format("lll"),
        EmpID: "Loading....",
        DepartmentID: "Loading.... .",
      },
      headerDetails: {
        EmpID: null,
        FormID: null,
        LeaveType: "0",
        Paid: 0,
        Status: "Pending",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      requestCC: {
        RequestID: null,
        EmpID: null,
        Sequence: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      workflow: {
        layer: "cn test",
        type: "SEQUENTIAL",
        approver: "Loading.. . .",
        status: "For Approval",
        date: moment().format("lll"),
      },
      requestWorkflow: {
        RequestID: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      requester: {
        RequestID: null,
        EmpID: null,
        Sequence: null,
        ModifiedBy: null,
      },
      requestAttachment: {
        RequestID: null,
        Attachment: null,
        ModifiedBy: null,
      },
    };
  },

  watch: {},
  computed: {},
  created() {
    // console.log(this.mode);
    // console.log(this.clickData);

    // this.request = this.requestType.item;
    if (this.modeType == "add") {
      this.checkRequestLeave();
    } else {
      this.request = this.requestType.item;
    }

    console.log("line 374 " + this.request);

    EventBus.$on("requesterName", (data) => {
      this.info.EmpID = data.Description;
      console.log(data);
      this.requesterEmpID = data.EmpID;
      this.headerDetails.EmpID = data.EmpID;
      this.isBusy = true;
      this.info.Requester = data.Firstname + " " + data.Lastname;
      this.getKioskWorkflow(data.EmpID);
    });

    EventBus.$on("addCC", (data) => {
      this.selectedCC = data;
      console.log(data);
    });

    EventBus.$on("addRequest", (data) => {
      this.request = data.item;
      console.log(data.item);
      this.headerDetails.FormID = data.item[0];
      console.log("FormID " + this.headerDetails.FormID);
    });

    EventBus.$on("leaveHeaderDetails", (data) => {
      this.headerDetails.LeaveType = data.leaveType;
      this.headerDetails.Paid = data.isPaid;
    });

    EventBus.$on(`formData${this.request[0]}`, (data) => {
      console.log("sulod sa request form: " + this.request[0]);
      if (data.valid) {
        if (this.request[0] != "Leave") {
          this.headerDetails.LeaveType = "0";
          this.headerDetails.Paid = 0;
        }

        this.requestDetails = data.data;
        EventBus.$emit("HandleMessage", {
          message: this.request[0],
          success: null,
          code: 100,
          error: false,
        });
        this.addRequest(this.headerDetails);
      } else {
        this.submitLoading = false;
        this.showWarningResponse(
          "Form Error",
          "All " + this.request[0] + " fields are required"
        );
      }
    });

    this.userEmpID = JSON.parse(
      localStorage.getItem("user_details")
    ).data.EmployeeIDNo;
    this.headerDetails.EmpID = this.userEmpID;
    this.requesterEmpID = this.userEmpID;
    this.headerDetails.FormID = this.request[0];
    this.retrieveData();

    this.getKioskWorkflow(this.userEmpID);

    if (this.modeType == "view") {
      this.getUserInfo(this.clickData.EmpID);
      console.log(this.clickData);
      this.info.Requester = this.clickData.Requester;
      this.info.CreatedBy = this.clickData.Requester;
      this.setModeTypeData(
        this.clickData.Status,
        this.clickData.RequestID,
        this.clickData.CreatedDate,
        this.clickData.CreatedDate,
        this.clickData.Status
      );
    } else {
      this.getUserInfo(this.userEmpID);
    }
  },

  methods: {
    checkRequestLeave() {
      if (
        this.requestType.item[0] == "COA" ||
        this.requestType.item[0] == "OT" ||
        this.requestType.item[0] == "Shift"
      ) {
        this.request = this.requestType.item;
      } else {
        this.request = ["Leave", this.requestType.item[0]];
      }

      // return req
    },
    back() {
      EventBus.$emit("closeRequest", true);
    },
    insertSpaces(string) {
      string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
      string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
      return string;
    },
    //Models => Setters

    setModeTypeData(infoStatus, infoRID, infoDate, flowDate, flowStatus) {
      this.info.Status = infoStatus;
      this.info.RequestID = infoRID;
      this.info.DateCreated = moment(infoDate).format("L");
      this.workflow.date = moment(flowDate).format("L");
      this.workflow.status = flowStatus;
    },

    setWorkflow(model, data) {
      model.layer = data.Layer + " " + data.Description;
      model.approver = data.Fullname;
      model.type = data.Type;
    },

    setRequester(model) {
      model.RequestID = this.empRequestID[0];
      model.EmpID = this.requesterEmpID;
      model.Sequence = this.workflowData.Layer.charAt(0);
      model.ModifiedBy = JSON.parse(
        localStorage.getItem("user_details")
      ).data.Email;

      return model;
    },

    setRequestAttachment(model) {
      model.RequestID = this.empRequestID[0];
      model.Attachment = this.attachmentName;
      model.ModifiedBy = JSON.parse(
        localStorage.getItem("user_details")
      ).data.Email;

      return model;
    },

    setRequestCC(model, id) {
      model.RequestID = this.empRequestID[0];
      model.EmpID = id;
      model.Sequence = this.workflowData.Layer.charAt(0);
      model.ModifiedBy = JSON.parse(
        localStorage.getItem("user_details")
      ).data.Email;

      return model;
    },

    //End Of Models

    process: async function (Status) {
      let encrypteddata;
      let RequestID = this.clickData.RequestID;
      try {
        encrypteddata = await this.encrypt({ RequestID, Status });
        await this.$store.dispatch("processApproval", encrypteddata);

        if (encrypteddata) {
          // this.$router.push("/home/kiosk/awaiting-approval");
          this.back();
          this.showSuccessResponse("Success");
        }
      } catch (error) {
        console.log(error);
      }
    },

    addRequestCC: async function () {
      for (const ID of this.selectedCC) {
        try {
          await this.create(
            this.setRequestCC(this.requestCC, ID.EmpID),
            "addRequestCC"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },

    addRequestAttachment: async function () {
      try {
        await this.create(
          this.setRequestAttachment(this.requestAttachment),
          "addRequestAttachment"
        );
      } catch (error) {
        console.log(error);
      }
    },

    addDetails: async function (data) {
      let status;
      let err;

      for (const item of data) {
        try {
          status = await this.create(
            this.setRequestDetail(item),
            `addRequestDetail${this.request[0]}`
          );
        } catch (error) {
          status = false;
          console.log(error);
          err = error;
        }

        // this.addRequestDetail(this.setRequestDetail(item));
      }
      if (status) {
        console.log("success add details");
        EventBus.$emit("HandleMessage", {
          message: this.request[0],
          success: "Adding Workflow",
          code: 100,
          error: false,
        });
        if (this.selectedCC != []) {
          this.addRequestCC();
        } else {
          console.log("wala");
        }
        if (this.attachment) {
          this.addRequestAttachment();
          this.uploadFile();
        }
        this.addRequestWorkflow();
      } else {
        EventBus.$emit("HandleMessage", {
          message: this.request[0],
          success: err,
          code: 200,
          error: true,
        });
      }
    },
    addRequestWorkflow: async function () {
      try {
        let status = await this.create(
          this.requestWorkflow,
          "addRequestWorkflow"
        );
        if (status) {
          EventBus.$emit("HandleMessage", {
            message: this.request[0],
            success: "Success Filing Request",
            code: 200,
            error: false,
          });

          EventBus.$off("HandleMessage");
          EventBus.$off("formData" + this.request[0]);
        } else {
          EventBus.$emit("HandleMessage", {
            message: this.request[0],
            success: "err",
            code: 200,
            error: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    setRequestDetail(data) {
      data.RequestID = this.empRequestID[0];
      return data;
    },

    getFileName(e) {
      if (e) {
        this.attachment = true;
        console.log(e);
        this.attachmentName = e.name;
      } else {
        this.attachment = false;
        console.log(e);
      }
    },
    selectedFile(event) {
      console.log(event.target.files[0]);
      if (this.$refs.file.value != "") {
        this.attachment = true;
        this.file = event.target.files[0];
        this.attachmentName = event.target.files[0].name;
        // console.log(this.attachmentName);
        // console.log(this.attachment);
      } else {
        this.attachment = false;
      }
    },
    uploadFile() {
      let formData = new FormData();
      formData.append("fileName", this.attachmentName);
      formData.append("file", this.file);
      formData.append("path", "kiosk/");
      this.$store.dispatch("uploadFile", formData);
    },

    save(time) {
      this.$refs.menu.save(time);
    },

    changeRequestCick() {
      EventBus.$emit("clickChange", true);
    },

    addRequest: async function (data) {
      try {
        let create = await this.create(data, "addRequestHeader");
        if (create) {
          await this.retrieveRequestID();
          console.log("Success Getting RID");
          EventBus.$emit("HandleMessage", {
            message: this.request[0],
            success: "Adding Requester",
            code: 100,
            error: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    addRequestRequester: async function (data) {
      try {
        let create = await this.create(data, `addRequestRequester`);
        EventBus.$emit("HandleMessage", {
          message: this.request[0],
          success: "Adding Requester",
          code: 100,
          error: false,
        });
        if (create) {
          EventBus.$emit("HandleMessage", {
            message: this.request[0],
            success: "Adding " + this.request[0] + " Details",
            code: 100,
            error: false,
          });
          this.addDetails(this.requestDetails);

          console.log("Requester Success");
        }
      } catch (error) {
        EventBus.$emit("HandleMessage", {
          message: this.request[0],
          success: "Failed",
          code: 200,
          error: true,
        });
        console.log(error);
      }
    },

    retrieveRequestID: async function () {
      try {
        let getData = await this.$store.dispatch("retrieveRequestID", {
          id: this.requesterEmpID,
        });
        let decryptedInfo = await this.decrypt(
          getData.data.ciphertext,
          "setRequestID"
        );
        let id = JSON.parse(decryptedInfo.data).data;

        this.empRequestID = id;
        this.submitLoading = false;
        this.requestWorkflow.RequestID = this.empRequestID[0];
        if (getData) {
          this.addRequestRequester(this.setRequester(this.requester));
        }
      } catch (error) {
        console.log(error);
        this.submitLoading = false;
        this.showErrorResponse("Erorr", error);
      }
    },

    validateAll() {},

    submitRequestForm() {
      console.log(this.request[0]);
      EventBus.$emit(`submitForm${this.request[0]}`, true);
    },

    getUserInfo: async function (empID) {
      let userInfo = await this.$store.dispatch("retrieveUserInformation", {
        id: empID,
      });
      let decryptedInfo = await this.decrypt(
        userInfo.data.ciphertext,
        "setUserInfo"
      );
      // let resData = userInfo.data;

      this.userData = JSON.parse(decryptedInfo.data);
      console.log(this.userData.data);
      this.info.Company = this.userData.data[0].CompanyName;
      this.info.EmpID = this.userData.data[0].Description;
      this.info.DepartmentID = this.userData.data[0].DepartmentName;
      // this.info.CreatedBy=
      this.loadingInfo = false;
    },

    getKioskWorkflow: async function (empid) {
      let user = await this.$store.dispatch("retrieveKioskWorkflow", {
        id: empid,
      });

      let decryptedInfo = await this.decrypt(
        user.data.ciphertext,
        "setKioskWorkflow"
      );

      console.log(JSON.parse(decryptedInfo.data).data[0]);
      this.workflowData = JSON.parse(decryptedInfo.data).data[0];
      this.setWorkflow(this.workflow, this.workflowData);
      console.log(this.workflowData);
      this.isBusy = false;
    },

    retrieveData: async function () {
      try {
        this.requestID = await this.retrieve(
          "retrieveNewRequestID",
          "setNewRequestID",
          "newRequestID"
        );
        // this.info.RequestID = !this.requestID ? 1000 : this.requestID[0];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
tr:before {
  font-size: 1em;
  display: block;
  padding: 0.5em;
  position: relative;
  top: 1px;
  border-bottom: 1px solid #ccc;
}
a {
  text-decoration: none !important;
}
div.container td {
  font-size: 14px !important;
}
</style>
