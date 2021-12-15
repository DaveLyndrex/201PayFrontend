<template>
  <!-- 10/07/2021 CN CRUBIO -->
  <!-- 10/13/2021 CN A.DIEZ -->
  <!-- [10/14/2021] CN E.Patot -->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="costCenterData"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
      @click:row="rowClick(items)"
    ></DefaultDataTable>

    <template v-else>
      <v-container class="ml-5 pl-5">
        <v-form ref="costCenterForm">
          <span class="required w-50"> Type</span>
          <v-select
            solo
            dense
            class="shrink"
            :rules="[(val) => validation.required(val, 'Type')]"
            v-model="editedItem.TypeID"
            :items="
              this.$store.getters.allCostCenterSetup.map((item) => {
                return {
                  ...item,
                  name: item.Description,
                  ID: item.TypeID,
                };
              })
            "
            item-value="ID"
            item-text="name"
          ></v-select>
          <span class="required"> Start Date</span>
          <!-- <v-text-field
            filled
            dense
            type="date"
            class="shrink"
            :rules="[(v) => validation.date(val, 'Start Date')]"
            required
            v-model="editedItem.StartDate"
          /> -->
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
                class="shrink"
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
          <span>End Date</span>
          <!-- <v-text-field
            filled
            dense
            type="date"
            class="shrink"
          /> -->
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
                class="shrink"
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
          <v-spacer></v-spacer>

          <table>
            <thead>
              <tr>
                <th class="required">Company</th>
                <th class="required">Cost Center</th>
                <th class="required">Value</th>
                <th class="required">Primary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="tbody">
              <tr class="rowcol" v-for="(item, key) in data" :key="key">
                <td class="tdcol">
                  <v-select
                    outlined
                    dense
                    height="10px"
                    :rules="[(val) => validation.required(val, 'Company')]"
                    required
                    :items="
                      $store.getters.allCompanies.map((item) => {
                        return {
                          ...item,
                          name: item.CompanyName,
                          ID: item.CompanyID,
                        };
                      })
                    "
                    item-value="ID"
                    item-text="name"
                    v-model="item.CompanyID"
                  ></v-select>
                </td>
                <td class="tdcol">
                  <v-select
                    outlined
                    dense
                    height="10px"
                    :rules="[(val) => validation.required(val, 'Cost Center')]"
                    required
                    :items="
                      $store.getters.allCostCenter.map((item) => {
                        return {
                          ...item,
                          name: item.CostCenterName,
                          ID: item.CostCenterID,
                        };
                      })
                    "
                    item-value="ID"
                    item-text="name"
                    v-model="item.CostCenterID"
                  ></v-select>
                </td>
                <td class="tdcol">
                  <v-text-field
                    outlined
                    dense
                    type="number"
                    height="10px"
                    class="pr-3 mt-3"
                    :rules="[(val) => validation.required(val, 'Value')]"
                    required
                    v-model="item.Value"
                    @click="getValue()"
                    @keyup="getValue()"
                  />
                </td>
                <td class="tdcol">
                  <v-select
                    outlined
                    dense
                    height="10px"
                    :items="primary"
                    :rules="[(val) => validation.required(val, 'Primary')]"
                    required
                    v-model="item.PrimaryID"
                  ></v-select>
                </td>
                <td>
                  <a type="button" @click="addClmn"
                    ><v-icon>mdi-plus</v-icon>Add</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex mt-3">
            <span>Total Value (%): </span>

            <input
              type="number"
              solo
              dense
              class="w-25 border-secondary ml-2 text-align-center totaVal"
              readonly
              v-model="totalVal"
              outlined
            />
          </div>
          <div class="actionBtn d-flex mt-3">
            <v-btn
              class="mb-2 px-8 font-color"
              color="whitesmoke"
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn class="mb-2 px-8 ml-3" dark color="blue" @click="saveItem()">
              Save
            </v-btn>
          </div>
        </v-form>
      </v-container>
    </template>
  </v-app>
</template>
<script>
import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
// import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
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
    // DefaultForm,
    Alert,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      response: "",
      message: "",
      validation: Validation,
      primary: ["Yes", "No"],
      data: [
        {
          ID: null,
          EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
          TypeID: "",
          StartDate: "",
          EndDate: "",
          CompanyID: "",
          CostCenterID: "",
          Value: 0,
          PrimaryID: "",
          ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data
            .Email,
        },
      ],
      StartDate: null,
      EndDate: null,
      openForm: false,
      loading: true,
      savingChanges: false,
      edit: false,
      headers: [
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Type", value: "TypeID" },
        { text: "Company", value: "CompanyID" },
        { text: "Cost Center", value: "CostCenterID" },
        { text: "Value", value: "Value" },
        { text: "Primary", value: "PrimaryID" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      costCenterData: [],
      editedIndex: -1,

      totalVal: 0,
      editedItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        CostCenterID: null,
        TypeID: null,
        Value: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
        CompanyID: null,
      },

      defaultItem: {
        EmpID: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: null,
        EndDate: null,
        CostCenterID: null,
        TypeID: null,
        Value: null,
        CompanyID: null,
        PrimaryID: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      startDateMenuValue: this.getDefaultDate(),
      endDateMenuValue: this.getDefaultDate(),
      startDate: false,
      endDate: false,
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
  mounted() {
    EventBus.$on("newMoney", (props) => {
      this.editedItem[props.model] = props.money;
    });
  },
  created() {
    EventBus.$on("initializeData", () => {
      this.retrieveData();
    });

    EventBus.$on("addNewItem", (props) => {
      
      if (props.index != -1) {
        this.edit = true;
        this.openForm = true;
        this.editedItem = props.item;
        this.editedIndex = props.index;
      } else {
        this.edit = false;
      }

   
      if (this.edit) {
        // this.StartDate = data.item.StartDate;
        // this.EndDate = data.item.EndDate;
        // this.TypeID = data.item.TypeID;
        console.log(this.data[0]);
        this.data[0].CompanyID = props.item.CompanyID;
        this.data[0].Value = props.item.Value;
        this.data[0].CostCenterID = props.item.CostCenterID;
        this.data[0].PrimaryID = props.item.PrimaryID;
        // this.data[0].CompanyID = props.item.CompanyID
      } else {
        this.editedItem = props.item;
        this.editedIndex = props.index;
        this.openForm = true;
        this.editedItem.StartDate = "";
        this.editedItem.TypeID = "";
        this.editedItem.EndDate = "";
      }
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.costCenterData[this.editedIndex], props.item);
      } else {
        this.costCenterData.push(props.item);
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
    this.initializeRelationalData();
  },
  methods: {
    setCostCenter(model) {
      (model.ID = this.editedItem.ID),
        (model.StartDate = this.editedItem.StartDate);
      model.EndDate = this.editedItem.EndDate;
      model.TypeID = this.editedItem.TypeID;

      return model;
    },
    // haha() {
    //   console.log(this.editedItem.TypeID);
    // },
    editItem() {
      console.log("reached");
      this.openForm = true;
    },
    rowClick(items) {
      console.log("reached2");
      this.openForm = true;

      console.log(items);
    },
    addClmn() {
      console.log(this.edit);
      console.log(this.editedItem.TypeID);

      this.data.push({
        Company: "",
        costCenter: "",
        Value: 0,
        Primary: "",
      });
    },
    getTotalVal() {
      let total = 0;
      if (this.editedItem.TypeID === 2) {
        for (const item of this.data) {
          total += parseInt(item.Value);
        }
      } else {
        total = 0;
      }
      return total;
    },
    getValue() {
      this.totalVal = this.getTotalVal();
    },
    retrieveData: async function() {
      // for (var e in this.$store.getters) {
      //   console.log(e);
      // }
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveCostCenterData",
          "setCostCenterData",
          "allCostCenterData"
        );
        this.costCenterData = getdata ? getdata : [];
        console.log(this.costCenterData);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    getDataPercentage() {
      let data = [];
      for (const item of this.data) {
        data.push(this.setCostCenter(item));
      }
      return data;
    },

    saveItem() {
      let data = this.getDataPercentage();
      let parseData = data;
      console.log(data);
      if (this.editedItem.TypeID === "Fixed Amount") {
        let StartDate = this.formatDateForBe(data[0].StartDate);
        let EndDate = this.formatDateForBe(data[0].EndDate);

        for (let item of parseData) {
          item.StartDate = StartDate;
          item.EndDate = EndDate;

          if (this.$refs.costCenterForm.validate()) {
            if (this.editedIndex > -1) {
              this.updateItem(item);
            } else {
              this.createNewItem(item);
            }
          }
        }
        // data = this.getDataPercentage();
      } else {
        let StartDate = this.formatDateForBe(data[0].StartDate);
        let EndDate = this.formatDateForBe(data[0].EndDate);
        if (this.getTotalVal() === 100) {
          for (let item of parseData) {
            item.StartDate = StartDate;
            item.EndDate = EndDate;

            if (this.$refs.costCenterForm.validate()) {
              if (this.editedIndex > -1) {
                this.updateItem(item);
              } else {
                this.createNewItem(item);
              }
            }
          }
        } else {
          this.showWarningResponse(
            "The sum total of the Value field input should be equal to 100"
          );
        }
      }
    },

    createNewItem: async function(data) {
      this.savingChanges = true;
      this.loading =true
      let create = await this.create(data, "createCostCenterData");
      this.costCenterData = this.$store.getters.allCostCenterData;
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
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateCostCenterData",
        "allCostCenterData"
      );

      if (update) {
        this.costCenterData = update;
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      
      } else {
        this.costCenterData = [];
         
      }
      
      this.savingChanges = false;
    },
    initializeRelationalData: async function() {
      try {
        await this.retrieveCostCenter();
        await this.retrieveCostCenterSetup();
      } catch (error) {
        this.showWarningResponse(error);
      }
    },

    retrieveCostCenter() {
      return this.retrieve(
        "retrieveCostCenter",
        "setCostCenter",
        "allCostCenter"
      );
    },

    retrieveCostCenterSetup() {
      return this.retrieve(
        "retrieveCostCenterSetup",
        "setCostCenterSetup",
        "allCostCenterSetup"
      );
    },
    // retrieveCompanies() {
    //   return this.retrieve(
    //     "retrieveCompanies",
    //     "setCompany",
    //     "allCompany"
    //   );
    // },

    close() {
      this.data = [
        {
          Company: "",
          costCenter: "",
          Value: 0,
          Primary: "",
        },
      ];
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
.shrink {
  max-width: 30%;
}
.v-select {
  width: 100%;
  margin-top: 10px;
  padding-right: 15px;
}
.totalVal {
  width: 20%;
  height: auto;
  background-color: blue;
  border: solid red 10px;
}
table,
tr,
th,
td {
  border: 1px solid gray;
  padding: 10px;
}
.border {
  width: 4%;
  padding: 2px;
}
.actionBtn {
  margin-left: 60%;
  margin-right: auto;
}
.required:after {
  content: " *";
  color: red;
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
