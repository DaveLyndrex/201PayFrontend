<template>
  <!-- 10/11/2021 CN A.DIEZ -->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="payrollData"
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
      ref="payrollDataForm"
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
          class="mb-2 px-8"
          dark
          color="blue"
          @click="saveItem(editedItem)"
        >
          Save
        </v-btn>
      </template>
    </DefaultForm>
  </v-app>
</template>

<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
import { EventBus } from "../../bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Validation from "@/utils/Validation";
import Encryption from "@/utils/Encryption";
import Alert from "@/components/Alert.vue";

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
  },
  mixins: [PromptAlert, Decryption, Encryption],
  data() {
    return {
      response:"",
      message:"",
      openForm: false,
      loading: true,
      edit: false,
      headers: [
        { text: "Effective Start Date", value: "StartDate" },
        { text: "Effective End Date", value: "EndDate" },
        { text: "Tax Status", value: "TaxStatusID" },
        { text: "Monthly HDMF", value: "HDMFContribution" },
        { text: "Payroll Schedule", value: "PayFrequencyID" },
        { text: "Payroll Group", value: "PayrollGroupID" },
        { text: "Work Schedule", value: "ShiftSetID" },
        { text: "DMAccount", value: "DMAccountID" },
        { text: "Remarks", value: "Remarks" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      payrollData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Effective Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.date(v, "Effective Start Date")],
        },
        {
          inputLabel: "Payroll Schedule",
          inputType: "select",
          inputModel: "PayFrequencyID",
          selectionItems: this.$store.getters.allPayFrequency.map((item) => {
            return {
              ...item,
              name: item.PayFrequency,
            };
          }),
          rules: [(v) => Validation.required(v, "Payroll Schedule")],
        },
        {
          inputLabel: "Effective End Date",
          inputType: "date",
          inputModel: "EndDate",
        },
        {
          inputLabel: "Payroll Group",
          inputType: "select",
          inputModel: "PayrollGroupID",
          selectionItems: this.$store.getters.allPayrollGroups.map((item) => {
            return {
              ...item,
              name: item.PayrollGroup,
            };
          }),
          rules: [(v) => Validation.required(v, "Payroll Group")],
        },
        {
          inputLabel: "DTR Source",
          inputType: "select",
          inputModel: "TimekeepingID",
          selectionItems: this.$store.getters.allTimeKeeping.map((item) => {
            return {
              ...item,
              name: item.Timekeeping,
            };
          }),
          rules: [(v) => Validation.required(v, "DTR Source")],
        },
        {
          inputLabel: "Work Schedule",
          inputType: "select",
          inputModel: "ShiftSetID",
          selectionItems: this.$store.getters.allShiftSet.map((item) => {
            return {
              ...item,
              name: item.ShiftSetName,
            };
          }),
          rules: [(v) => Validation.required(v, "Work Schedule")],
        },
        {
          inputLabel: "Tax Status",
          inputType: "select",
          inputModel: "TaxStatusID",
          selectionItems: this.$store.getters.allTaxStatus.map((item) => {
            return {
              ...item,
              name: item.TaxStatus,
            };
          }),
          rules: [(v) => Validation.required(v, "Tax Status")],
        },
        {
          inputLabel: "DM Account",
          inputType: "select",
          inputModel: "DMAccountID",
          rules: [(v) => Validation.required(v, "DM Account")],
          selectionItems: this.$store.getters.allDMAccount.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          }),
        },
        {
          inputLabel: "Monthly HDMF",
          inputType: "money",
          inputModel: "HDMFContribution",
          rules: [(v) => Validation.required(v, "Monthly HDMF")],
        },
        { inputLabel: "Remarks", inputType: "text", inputModel: "Remarks" },
        {
          inputType: "hidden",
          inputModel: "CreatedDate",
        },
        {
          inputType: "hidden",
          inputModel: "ModifiedDate",
        },
        {
          inputType: "hidden",
          inputModel: "ModifiedBy",
        },
        {
          inputType: "hidden",
          inputModel: "EmpID",
        },
      ],
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),

        HDMFContribution: "",
        PayrollGroupID: null,
        TimekeepingID: null,
        TaxStatusID: null,
        PayFrequencyID: null,
        ShiftSetID: null,
        DMAccountID: null,
        Remarks: "",
        CreatedDate: "",
        ModifiedDate: "",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        MonthlyHDMF: "",

        HDMFContribution: "",
        PayrollGroupID: null,
        TimekeepingID: null,
        TaxStatusID: null,
        PayFrequencyID: null,
        ShiftSetID: null,
        DMAccountID: null,
        Remarks: "",
        CreatedDate: "",
        ModifiedDate: "",
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
      console.log(val)
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

  created: async function() {
    this.$store.watch(
      (state, getters) => getters.allPayFrequency,
      (newValue) => {
        if (newValue) {
          this.inputConfig[1].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.PayFrequency,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allPayrollGroups,
      (newValue) => {
        if (newValue) {
          this.inputConfig[3].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.PayrollGroup,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allTimeKeeping,
      (newValue) => {
        if (newValue) {
          this.inputConfig[4].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Timekeeping,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allShiftSet,
      (newValue) => {
        if (newValue) {
          this.inputConfig[5].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.ShiftSetName,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allTaxStatus,
      (newValue) => {
        if (newValue) {
          this.inputConfig[6].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.TaxStatus,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allDMAccount,
      (newValue) => {
        if (newValue) {
          this.inputConfig[7].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          });
        }
      }
    );

    EventBus.$on("addNewItem", (props) => {
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.payrollData[this.editedIndex], props.item);
      } else {
        this.payrollData.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    EventBus.$on("deleteItem", (props) => {
      this.deleteItem(props);
    });

    await this.initialize();
  },

  mounted: async function() {
    await this.initializeRelationalDatas();
  },

  methods: {
    initialize: async function() {
      this.loading = true;
      try {
        this.loading = true;
        let getPayrollData = await this.$store.dispatch("getPayrollData");
        const ciphertext = getPayrollData.data.ciphertext;

        switch (getPayrollData.status) {
          case 200: {
            let decrypted = await this.$store.dispatch("decryptData", {
              mutation: "setPayrollData",
              data: ciphertext,
            });
            if (decrypted) {
              const decryptionData = JSON.parse(decrypted.data);
              if (decryptionData.code !== "404") {
                this.payrollData = this.$store.getters.allPayrollData;
              } else {
                this.payrollData = [];
                this.showWarningResponse(decryptionData.message);
              }
            }
            this.loading = false;
            break;
          }

          default:
            this.payrollData = [];
            break;
        }
      } catch (error) {
        this.loading = false;
        this.showWarningResponse("An error encountered!");
      }
    },

    saveItem(data) {
      console.log(data)
      if (this.$refs.payrollDataForm.validateForm()) {
        const parseData = { ...data };
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        parseData.EndDate = this.formatDateForBe(data.EndDate);
        data.HDMFContribution = Number.parseFloat(
          String(data.HDMFContribution).replace(/,/g, "")
        );
        if (this.editedIndex > -1) {
          this.editItem(parseData);
        } else {
          this.addNewItem(parseData);
        }
      }
    },

    addNewItem: async function(data) {
      console.log(data);
      let encryptedData = await this.encrypt(data);

      if (encryptedData) {
        let addNew = await this.$store.dispatch(
          "createPayroll",
          encryptedData.data
        );

        let resData =
          typeof addNew.data === "object"
            ? addNew.data
            : JSON.parse(addNew.data);
        console.log(addNew.status);

        switch (addNew.status) {
          case 200: {
            // this.showSuccessResponse("Success", resData.message);
            if(resData.code == '200') {

              await this.initialize();
              this.close();
        
              this.response = "success";
              this.message = "Successfully Added";

              document.getElementById("alert").style.display = "block";
              setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
             
            } 
            else if (resData.code == '404') {

              await this.initialize();
              this.close();
              this.showErrorResponse("Something went wrong");
       
              
            }
            document.getElementById("alert").style.display = "block";

            break;
          }
          case 400:
            this.showErrorResponse("Something went wrong");
            await this.initialize();
              this.close();

            break;
          case 500:
            this.showErrorResponse("An error on the server encountered!");
             await this.initialize();
              this.close();
      
            break;

          default:
            break;
        }
      }
    },

    editItem: async function(data) {
      for (var item in this.editedItem) {
        if (item === "ModifiedBy") {
          this.editedItem[item] = JSON.parse(
            localStorage.getItem("user_details")
          ).data.Email;
        }
      }
      let encryptedData = await this.encrypt(data);

      if (encryptedData) {
        let updateData = await this.$store.dispatch("updatePayroll", {
          index: this.editedIndex,
          ciphertext: encryptedData.data,
          editedData: data,
        });

        let resData =
          typeof updateData.data === "object"
            ? updateData.data
            : JSON.parse(updateData.data);

        switch (updateData.status) {
          case 200:
            if (resData.code === "404") {
              this.showErrorResponse(resData.message);
              await this.initialize();
              this.close();
 
              
            } else {
              this.payrollData = this.$store.getters.allPayrollData;

              await this.initialize();
              this.close();

              this.response = "success";
              this.message = "Successfully Updated";

              document.getElementById("alert").style.display = "block";
             setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
            
            }

            break;

          case 500:
            this.showErrorResponse("An error on the server encountered!");
              await this.initialize();
              this.close();

            break;

          default:
            break;
        }
      }
    },

    // deleteItem: async function (data) {
    //   let delPayroll = await this.$store.dispatch("deletePayroll", {
    //     item: data.itemToDelete,
    //     id: data.itemToDelete.ID,
    //   });
    //   let resData =
    //     typeof delPayroll.data === "object"
    //       ? delPayroll
    //       : JSON.parse(delPayroll.data);

    //   switch (delPayroll.status) {
    //     case 200:
    //       this.showSuccessResponse("Success!", resData.message);
    //       break;

    //     case 404:
    //       this.showWarningResponse( "Something went wrong!");
    //       break;

    //     case 500:
    //       this.showWarningResponse(
    //         "An error on the server encountered!"
    //       );
    //       break;

    //     default:
    //       break;
    //   }
    // },

    // Methods for relational datas
    initializeRelationalDatas: async function() {
      try {
        await this.getTimeKeeping();
        await this.getPayrollGroups();
        await this.getTaxStatus();
        await this.getShiftSet();
        await this.getDMAccount();
      } catch (error) {
        this.showWarningResponse("An error encountered!");
      }
    },

    getPayrollGroups: async function() {
      let getdata = await this.$store.dispatch("getPayrollGroups");
      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setPayrollGroups");
          break;
        }

        case 500:
          this.showWarningResponse("An error on the serve is encountered!");
          break;

        default:
          break;
      }
    },

    getTimeKeeping: async function() {
      let getdata = await this.$store.dispatch("getTimeKeeping");
      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setTimeKeeping");
          break;
        }

        case 500:
          this.showWarningResponse("An error on the serve is encountered!");
          break;

        default:
          break;
      }
    },

    getTaxStatus: async function() {
      let getdata = await this.$store.dispatch("getTaxStatus");
      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setTaxStatus");
          break;
        }

        case 500:
          this.showWarningResponse("An error on the serve is encountered!");
          break;

        default:
          break;
      }
    },

    getShiftSet: async function() {
      let getdata = await this.$store.dispatch("getShiftSet");
      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setShiftSet");
          break;
        }

        case 500:
          this.showWarningResponse("An error on the serve is encountered!");
          break;

        default:
          break;
      }
    },

    getDMAccount: async function() {
      let getdata = await this.$store.dispatch("getDMAccount");
      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setDMAccount");
          break;
        }

        case 500:
          this.showWarningResponse("An error on the serve is encountered!");
          break;

        default:
          break;
      }
    },
    // End of methods for relational datas

    close() {
      this.openForm = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

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
.font-color {
  color: blue;
}
#alert{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  margin-top: -5rem;
  word-wrap: break-word;
}
</style>
