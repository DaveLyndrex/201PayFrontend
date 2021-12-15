<template>
  <v-app>
    <Alert
      :response="response"
      :message="message"
      id="alert"
      style="display: none"
    />
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="otherData"
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
      ref="otherDataForm"
    >
      <template v-slot:Date>
        <v-menu
          ref="date"
          v-model="date"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :rules="[(v) => validation.required(v, 'Date')]"
              required
              solo
              dense
              v-model="editedItem.Date"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="dateMenuValue = parseDate(editedItem.Date)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateMenuValue"
            no-title
            @input="date = false"
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
    <!-- <button class="btn" @click="download">download</button> -->
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
import CRUD from "@/utils/CRUD";
import Alert from "@/components/Alert.vue";

export default {
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  name: "other-data",
  data() {
    return {
      response: "",
      message: "",
      openForm: false,
      dialogDelete: false,
      edit: false,
      loading: true,
      headers: [
        { text: "FieldName", value: "FieldName" },
        { text: "Date", value: "Date" },
        { text: "Description", value: "Description" },
        { text: "Attachment", value: "Attachments" },
        { text: "Remarks", value: "Remarks" },
        { text: "Action", value: "actions", sortable: false },
      ],
      otherData: [],
      formData: new FormData(),
      editedIndex: -1,
      savingChanges: false,
      inputConfig: [
        {
          inputLabel: "Field Name",
          inputType: "select",
          inputModel: "FieldName",
          selectionItems: this.$store.getters.allCustomFields.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          }),
          rules: [(v) => Validation.required(v, "Field Name")],
        },
        {
          inputLabel: "Attachment",
          inputType: "file",
          inputModel: "Attachments",
        },
        {
          inputLabel: "Date",
          inputType: "date",
          inputModel: "Date",
          rules: [(v) => Validation.date(v, "Date")],
        },
        {
          inputLabel: "Remarks",
          inputType: "text",
          inputModel: "Remarks",
        },
        {
          inputLabel: "Description",
          inputType: "text",
          inputModel: "Description",
          rules: [(v) => Validation.required(v, "Description")],
        },
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
        Description: "",
        Date: this.formatDate(this.getDefaultDate()),
        Attachments: "",
        Remarks: "",
        FieldName: "",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        Description: "",
        Date: null,
        Attachments: "",
        Remarks: "",
        FieldName: "",
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      dateMenuValue: this.getDefaultDate(),
      date: false,
      validation: Validation,
    };
  },

  watch: {
    openForm(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dateMenuValue(val) {
      console.log(val);
      this.editedItem.Date = this.formatDate(this.dateMenuValue);
    },
  },

  created() {
    this.$store.watch(
      (state, getters) => getters.allCustomFields,
      (newValue) => {
        if (newValue) {
          this.inputConfig[0].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Description,
            };
          });
        }
      }
    ),
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
        Object.assign(this.otherData[this.editedIndex], props.item);
      } else {
        this.otherData.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    // EventBus.$on("deleteItem", (props) => {
    //   if (!this.savingChanges) {
    //     this.deleteItem(props);
    //   }
    // });
    EventBus.$on("getFile", (file) => {
      this.formData.append("fileName", file.name);
      this.formData.append("file", file);
      this.formData.append("path", "employee/other-data/");
    });

    this.retrieveData();
    this.initializeRelationalDatas();
  },

  methods: {

    download: async function () {
      let formData = new FormData();
      formData.append("fileName", "sung_jin_woo_by_hkiddo_ddsq3y4-pre.jpg");
      formData.append("file", this.file);
      formData.append("path", "employee/other-data/");
      this.$store.dispatch("downloadAttachment", formData);
    },

    retrieveData: async function () {
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveOtherDataById",
          "setOtherData",
          "allOtherData"
        );

        this.otherData = getdata ? getdata : [];
        // console.log(this.otherData)
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.showWarningResponse("", "Something went wrong");
        this.loading = false;
      }
    },

    saveItem(data) {
      if (this.$refs.otherDataForm.validateForm()) {
        const parseData = data;
        parseData.Date = this.formatDateForBe(data.Date);
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
        } else {
          this.createNewItem(parseData);
          this.$store.dispatch("uploadFile", this.formData);
        }
      }
    },
    createNewItem: async function (data) {
      let encryptedData = await this.encrypt(data);
      this.savingChanges = true;
      if (encryptedData) {
        let addNew = await this.$store.dispatch(
          "createOtherData",
          encryptedData.data
        );

        let resData =
          typeof addNew.data === "object"
            ? addNew.data
            : JSON.parse(addNew.data);
        switch (addNew.status) {
          case 200: {
            if (resData.code === "404" || resData.code === "500") {
              this.showErrorResponse("Something went wrong!");

              this.savingChanges = false;
            } else if (resData.code === "200") {
              this.otherData = this.$store.getters.allOtherData;
              this.retrieveData();

              this.response = "success";
              this.message = "Successfully Added";

              document.getElementById("alert").style.display = "block";
              setTimeout(
                () => (document.getElementById("alert").style.display = "none"),
                3000
              );
              this.close();
            }

            break;
          }

          case 500:
            this.showErrorResponse("Something went wrong");

            break;

          default:
            this.loading = false;
            this.showWarningResponse("Something went wrong!");

            break;
        }
      }
      this.savingChanges = false;
    },
    updateItem: async function (data) {
      this.savingChanges = true;

      let encryptedData = await this.encrypt(data);

      if (encryptedData) {
        let updateData = await this.$store.dispatch("updateOtherData", {
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
            if (resData.code === "404" || resData.code === "500") {
              this.showErrorResponse("Something went wrong!");
            } else {
              this.otherData = this.$store.getters.allOtherData;
              this.retrieveData();

              this.response = "success";
              this.message = "Successfully Updated";

              document.getElementById("alert").style.display = "block";
              setTimeout(
                () => (document.getElementById("alert").style.display = "none"),
                3000
              );

              this.close();
            }

            break;

          case 500:
            this.showErrorResponse("Something went wrong!");

            break;

          default:
            break;
        }
      }
      this.savingChanges = false;
    },

    initializeRelationalDatas: async function () {
      try {
        await this.getCustomFields();
      } catch (error) {
        this.showWarningResponse("Something went wrong!");
      }
    },

    getCustomFields: async function () {
      let getdata = await this.$store.dispatch("retrieveAllCustomFields");
      const ciphertext = getdata.data.ciphertext;

      switch (getdata.status) {
        case 200: {
          await this.decrypt(ciphertext, "setCustomFields");
          break;
        }

        case 500:
          this.showWarningResponse("Something went wrong");
          break;

        default:
          this.showWarningResponse("Something went wrong");
          break;
      }
    },

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
#alert {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  margin-top: -5rem;
  word-wrap: break-word;
}
</style>
