<template>
  <!-- 10/14/2021 CN A.DIEZ -->
  <v-app>
    <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="employmentData ? employmentData : []"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
    ></DefaultDataTable>
    
    <!--  :alertMessage="message"
      :alertResponse="response" -->
    <DefaultForm
      v-else
      :inputConfig="inputConfig"
      :model="editedItem"
      :defaultInputItem="defaultItem"
      :edit="edit"
      ref="employmentDataForm"
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
import { EventBus } from "@/bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import Validation from "@/utils/Validation";
import { mapState } from "vuex";
import Alert from "@/components/Alert.vue";

export default {
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  components: {
    DefaultDataTable,
    DefaultForm,
    Alert,
  },
  data() {
    return {
      response: "",
      message: "",
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Company", value: "company_id" },
        { text: "Job Level", value: "JobLevelID" },
        { text: "Business Unit", value: "BusinessUnitID" },
        { text: "Job Family Name", value: "JobFamilyNameID" },
        { text: "Division", value: "DivisionID" },
        { text: "Employment Status", value: "EmploymentStatusID" },
        { text: "Department", value: "department_id" },
        { text: "Employment Type", value: "EmploymentTypeID" },
        { text: "Section", value: "Section" },
        { text: "Grade", value: "GradeID" },
        { text: "Location", value: "LocationID" },
        { text: "Grade Rate", value: "GradeRateID" },
        { text: "Position", value: "PositionID" },
        { text: "Worker Type", value: "WorkerTypeID" },
        { text: "Union Member", value: "UnionMember" },
        { text: "Project", value: "ProjectID" },
        { text: "Job Code", value: "JobCodeID" },
        { text: "Site", value: "SiteID" },
        { text: "Job Type", value: "JobTypeID" },
        { text: "Reason", value: "ReasonID" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      employmentData: [],
      editedIndex: -1,
      inputConfig: [
        {
          inputLabel: "Effective Start Date",
          inputType: "date",
          inputModel: "StartDate",
          rules: [(v) => Validation.date(v, "Effective Start Date")],
        },
        {
          inputLabel: "Grade",
          inputType: "select",
          inputModel: "GradeID",
          selectionItems: this.$store.getters.allGrades.map((item) => {
            return {
              ...item,
              name: item.GradeStepName,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Effective End Date",
          inputType: "date",
          inputModel: "EndDate",
        },
        {
          inputLabel: "Grade Rate",
          inputType: "select",
          inputModel: "GradeRateID",
          selectionItems: this.$store.getters.allGradeRates.map((item) => {
            return {
              ...item,
              name: item.GradeRateName,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Company",
          inputType: "select",
          inputModel: "company_id",
          selectionItems: this.$store.getters.allCompanies.map((item) => {
            return {
              ...item,
              name: item.CompanyName,
            };
          }),
          rules: [(v) => Validation.required(v, "Company")],
        },
        {
          inputLabel: "Location",
          inputType: "select",
          inputModel: "LocationID",
          selectionItems: this.$store.getters.allJobLocations.map((item) => {
            return {
              ...item,
              name: item.Location,
              ID: item.ID,
            };
          }),
          rules: [(v) => Validation.required(v, "Location")],
        },
        {
          inputLabel: "Job Level",
          inputType: "select",
          inputModel: "JobLevelID",
          selectionItems: this.$store.getters.allJobLevels.map((item) => {
            return {
              ...item,
              name: item.JobLevel,
              ID: item.ID,
            };
          }),
          rules: [(v) => Validation.required(v, "Job Level")],
        },
        {
          inputLabel: "Position",
          inputType: "select",
          inputModel: "PositionID",
          selectionItems: this.$store.getters.allJobDesignations.map((item) => {
            return {
              ...item,
              name: item.Designation,
              ID: item.ID,
            };
          }),
          rules: [(v) => Validation.required(v, "Position")],
        },
        {
          inputLabel: "Business Unit",
          inputType: "select",
          inputModel: "BusinessUnitID",
          selectionItems: this.$store.getters.allJobBusinessUnits.map(
            (item) => {
              return {
                ...item,
                name: item.BUName,
                ID: item.ID,
              };
            }
          ),
        },
        {
          inputLabel: "Work Type",
          inputType: "select",
          inputModel: "WorkerTypeID",
          selectionItems: this.$store.getters.allWorkerTypes.map((item) => {
            return {
              ...item,
              name: item.WorkerType,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Job Family Name",
          inputType: "select",
          inputModel: "JobFamilyNameID",
          selectionItems: this.$store.getters.allJobFamilyNames.map((item) => {
            return {
              ...item,
              name: item.JobFamilyName,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Union Member",
          inputType: "radio",
          inputModel: "UnionMember",
          selectionItems: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          rules: [(v) => Validation.required(v, "Union Member")],
        },
        {
          inputLabel: "Division",
          inputType: "select",
          inputModel: "DivisionID",
          selectionItems: this.$store.getters.allDivisions.map((item) => {
            return {
              ...item,
              name: item.DivisonName,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Project",
          inputType: "select",
          inputModel: "ProjectID",
          selectionItems: this.$store.getters.allProjects.map((item) => {
            return {
              ...item,
              name: item.ProjectName,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Department",
          inputType: "select",
          inputModel: "department_id",
          selectionItems: this.$store.getters.allDepartments.map((item) => {
            return {
              ...item,
              name: item.DepartmentName,
              ID: item.ID,
            };
          }),
          rules: [(v) => Validation.required(v, "Department")],
        },
        {
          inputLabel: "Job Code",
          inputType: "select",
          inputModel: "JobCodeID",
          selectionItems: this.$store.getters.allJobCodes.map((item) => {
            return {
              ...item,
              name: item.JobCode,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Employment Status",
          inputType: "select",
          inputModel: "EmploymentStatusID",
          selectionItems: this.$store.getters.allEmployeeStatus.map((item) => {
            return {
              ...item,
              name: item.EmployeeStatus,
              ID: item.ID,
            };
          }),
          rules: [(v) => Validation.required(v, "Employment Status")],
        },
        {
          inputLabel: "Site",
          inputType: "select",
          inputModel: "SiteID",
          selectionItems: this.$store.getters.allJobSites.map((item) => {
            return {
              ...item,
              name: item.Site,
              ID: item.ID,
            };
          }),
        },
        {
          inputLabel: "Employment Type",
          inputType: "select",
          inputModel: "EmploymentTypeID",
          selectionItems: this.$store.getters.allEmploymentType.map((item) => {
            return {
              ...item,
              name: item.EmploymentType,
              ID: item.ID,
            };
          }),
          rules: [(v) => Validation.required(v, "Employment Type")],
        },
        {
          inputLabel: "Job Type",
          inputType: "select",
          inputModel: "JobTypeID",
          selectionItems: this.$store.getters.allJobCategories.map((item) => {
            return {
              ...item,
              name: item.JobCategory,
              ID: item.ID,
            };
          }),
          rules: [(v) => Validation.required(v, "Job Type")],
        },
        {
          inputLabel: "Section",
          inputType: "text",
          inputModel: "Section",
        },
        {
          inputLabel: "Reason",
          inputType: "select",
          inputModel: "ReasonID",
          selectionItems: this.$store.getters.allReasons.map((item) => {
            return {
              ...item,
              name: item.Reason,
              ID: item.ID,
            };
          }),
        },

        {
          inputType: "hidden",
          inputModel: "emp_id",
        },
      ],
      editedItem: {
        emp_id: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: this.formatDate(this.getDefaultDate()),
        EndDate: this.formatDate(this.getDefaultDate()),
        company_id: null,
        department_id: null,
        EmployeeStatusID: null,
        JobLevelID: null,
        JobCategoryID: null,
        DesignationID: null,
        LocationID: null,
        ProjectID: null,
        SiteID: null,
        ReasonID: null,
        SubDept: null,
        BusinessUnitID: null,
        Section: null,
        JobFamilyNameID: null,
        JobCodeID: null,
        JobTitle: null,
        JobType: null,
        EmploymentTypeID: null,
        UnionMember: null,
        DivisionID: null,
        GradeID: null,
        GradeRateID: null,
        WorkerTypeID: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      defaultItem: {
        emp_id: JSON.parse(sessionStorage.getItem("user_session")).empId,
        StartDate: null,
        EndDate: null,
        company_id: null,
        department_id: null,
        EmployeeStatusID: null,
        JobLevelID: null,
        JobCategoryID: null,
        DesignationID: null,
        LocationID: null,
        ProjectID: null,
        SiteID: null,
        ReasonID: null,
        SubDept: null,
        BusinessUnitID: null,
        Section: null,
        JobFamilyNameID: null,
        JobCodeID: null,
        JobTitle: null,
        JobType: null,
        EmploymentTypeID: null,
        UnionMember: null,
        DivisionID: null,
        GradeID: null,
        GradeRateID: null,
        WorkerTypeID: null,
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

  created() {
    // all companies
    this.$store.watch(
      (state, getters) => getters.allCompanies,
      (newValue) => {
        console.log(newValue);
        if (newValue) {
          this.inputConfig[4].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.CompanyName,
              ID: item.ID,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobCategories,
      (newValue) => {
        console.log(newValue);
        if (newValue) {
          this.inputConfig[19].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.JobCategory,
              ID: item.ID,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allDepartments,
      (newValue) => {
        if (newValue) {
          this.inputConfig[14].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.DepartmentName,
              ID: item.ID,
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allEmployeeStatus,
      (newValue) => {
        if (newValue) {
          this.inputConfig[16].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.EmployeeStatus,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobLevels,
      (newValue) => {
        if (newValue) {
          this.inputConfig[6].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.JobLevel,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobDesignations,
      (newValue) => {
        if (newValue) {
          this.inputConfig[7].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Designation,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allDivisions,
      (newValue) => {
        if (newValue) {
          this.inputConfig[12].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.DivisonName,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobLocations,
      (newValue) => {
        if (newValue) {
          this.inputConfig[5].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Location,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allProjects,
      (newValue) => {
        if (newValue) {
          this.inputConfig[13].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.ProjectName,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobSites,
      (newValue) => {
        if (newValue) {
          this.inputConfig[17].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Site,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allReasons,
      (newValue) => {
        if (newValue) {
          this.inputConfig[21].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.Reason,
              
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobBusinessUnits,
      (newValue) => {
        if (newValue) {
          this.inputConfig[8].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.BUName,
            
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobFamilyNames,
      (newValue) => {
        if (newValue) {
          this.inputConfig[10].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.JobFamilyName,
             
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allJobCodes,
      (newValue) => {
        if (newValue) {
          this.inputConfig[15].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.JobCode,

            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allEmploymentType,
      (newValue) => {
        if (newValue) {
          this.inputConfig[18].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.EmploymentType,
       
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allDivisions,
      (newValue) => {
        if (newValue) {
          this.inputConfig[12].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.DivisonName,
           
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allGrades,
      (newValue) => {
        if (newValue) {
          this.inputConfig[1].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.GradeStepName,
        
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allGradeRates,
      (newValue) => {
        if (newValue) {
          this.inputConfig[3].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.GradeRateName,
        
            };
          });
        }
      }
    );

    this.$store.watch(
      (state, getters) => getters.allWorkerTypes,
      (newValue) => {
        if (newValue) {
          this.inputConfig[9].selectionItems = newValue.map((item) => {
            return {
              ...item,
              name: item.WorkerType,
       
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
      this.editedIndex = props.index;
      if (this.editedIndex > -1) {
        Object.assign(this.employmentData[this.editedIndex], props.item);
      } else {
        this.employmentData.push(props.item);
      }
    });

    EventBus.$on("closeForm", () => {
      this.close();
    });

    this.initialize();
  },

  methods: {
    initialize: async function () {
      this.loading = true;
      let getdata = await this.retrieve(
        "getEmploymentData",
        "setEmploymentData",
        "allEmploymentData"
      );
      this.employmentData = getdata ? getdata : [];
      this.loading = false;
    },

    saveItem(data) {
      if (this.$refs.employmentDataForm.validateForm()) {
        const parseData = { ...data };
        parseData.StartDate = this.formatDateForBe(data.StartDate);
        parseData.EndDate = this.formatDateForBe(data.EndDate);
        if (this.editedIndex > -1) {
          this.editItem(parseData);
        } else {
          this.addNewItem(parseData);
        }
      }
    },

    addNewItem: async function (data) {
      data.StartDate = this.parseDate(this.editedItem.StartDate);
      data.EndDate = this.parseDate(this.editedItem.EndDate);
      this.savingChanges = true;
      let create = await this.create(data, "createEmploymentData");
      
      if (create) {

        await this.initialize();
        this.close();

        this.response = "success";
        this.message = "Successfully Save";
        
        document.getElementById("alert").style.display = "block";
        setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } 
     
      this.savingChanges = false;
    },

    editItem: async function (data) {
      data.StartDate = this.parseDate(this.editedItem.StartDate);
      data.EndDate = this.parseDate(this.editedItem.EndDate);
      console.log(data);
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateEmploymentData",
        "allEmploymentData"
      );

      if (update) {
        this.employmentData = update;
        await this.initialize();
        this.close();

        this.response = "success";
        this.message = "Successfully Save";

      document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
       
      }
    
     
      this.savingChanges = false;
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

  computed: mapState(["allCompanies"]),
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
