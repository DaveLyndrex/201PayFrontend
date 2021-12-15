<template v-slot:activator="{ on, attrs }">
  <v-container>
    <div class="justify-center align-center" style="height: 100%">
      <v-form ref="form">
        <v-row>
          <v-col
            cols="6"
            v-for="(inputField, index) in inputConfig"
            :key="index"
          >
            <v-row v-if="inputField.inputType != 'string'">
              <!-- <v-col cols="3" class="d-flex align-center">
              <span class="gray--text font-weight">
                {{ inputField.inputLabel }}
              </span>
            </v-col> -->
              <v-col>
                <span
                  class="gray--text font-weight"
                  :class="
                    inputField.inputLabel === 'First Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'ID'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Middle Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Last Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Date of Birth'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Place of Birth'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Blood Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Gender'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Civil Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'SSS'
                      ? 'required'
                      : '' || inputField.inputLabel === 'PhilHealth'
                      ? 'required'
                      : '' || inputField.inputLabel === 'HDMF'
                      ? 'required'
                      : '' || inputField.inputLabel === 'TIN'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Payroll Acct'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Bank'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'Service Year Recognition'
                      ? 'required'
                      : '' || inputField.inputLabel === 'BU Hire Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Retirement Base Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Regularization Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Regularization PA'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Effective Start Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Company'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Department'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Location'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Position'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Union Member'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Job Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Job Level'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Employment Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Employment Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'DTR Source'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Monthly HDMF'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Payroll Group'
                      ? 'required'
                      : '' || inputField.inputLabel === 'DMAccount'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Tax Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Payroll Schedule'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Work Schedule'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Start Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Username'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Email Address'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Rater'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Approver'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Max Approver'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Workflow'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Address Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Address 1'
                      ? 'required'
                      : '' || inputField.inputLabel === 'City'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Province'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Postal Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Country'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Phone Number'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Relationship'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Address'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Field Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Description'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Pay Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Pay Rate'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Currency'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Amount'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Start Process Period'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Deduction'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Deduction Amount'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Total Amount'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Frequency'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Relation'
                      ? 'required'
                      : '' || inputField.inputLabel === 'School'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Course'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Designation'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Responsibilities'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Reason For Leaving'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Title'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Actual Duration'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Conducted By'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Program Fee'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Incidential Cost'
                      ? 'required'
                      : '' || inputField.inputLabel === 'License No'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Renewal Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Renewed'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Leave Credit Year'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'Leave Credit Start Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Leave Credit End Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Leave Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Beginning'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Carried Over'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Carried Over Expiry'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Legislation Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Citizenship Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Ethnicity'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Primary Flag'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'Highest Educational Level'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Bank Code'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'Bank Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Marital Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Marital Status Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Issue Date'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'National Identifier Type'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'National Identifier Number'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Primary Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Passport Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Passport Number'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Issuing Authority'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Issuing Country'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Issuing Location'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Country Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Area Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Phone Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Extension'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Date From'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Date To'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Visa Start Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Visa End Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Entry Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Cost Center Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Cost Center Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Legislation Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Holiday Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Citizenship Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Project Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Project Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Suffix'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Site'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Worker Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Timekeeping'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Description'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Default'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Visa Permit Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Current Visa Permit'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Civil Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Employment Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Department Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Department Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Effective End Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Classification Name'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel ===
                          'Classification Effective Date'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel ===
                          'Extra Info Effective Start Date'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel ===
                          'LeiInformationCategory Category'
                      ? 'required'
                      : '' || inputField.inputModel === 'SetCodeGrade'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Grade Rate Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Rate Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Currency Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Rate Frequency'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Annualization Factor'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Active Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Rate Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Minimum Amount'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Maximum Amount'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Mid Value Amount'
                      ? 'required'
                      : '' || inputField.inputLabel === ' End Date '
                      ? 'required'
                      : '' || inputField.inputLabel === 'Year'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Position Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Business Unit Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Job Set Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Location Set Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Active Status'
                      ? 'required'
                      : '' ||
                        inputField.inputModel === 'EffectiveEndDateDesignation'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Business Unit Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Division Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Division Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Job Category'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Job Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Reason'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Holiday Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Holiday Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Address Type'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Employee Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Level'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Coverage'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Company Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Company Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Effective Start Date'
                      ? 'required'
                      : '' ||
                        inputField.inputModel === 'EffectiveEndDateCompany'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Classification Name'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel ===
                          'Classification Effective Date'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel ===
                          'Extra Info Effective Start Date'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'LeiInformation Category'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Set Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Grade Step Name'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'Grade Step Effective Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Grade Step Sequence'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Ceiling Step Flag'
                      ? 'required'
                      : '' || inputField.inputModel === 'EffectiveEndDateGrade'
                      ? 'required'
                      : ''|| inputField.inputModel === 'SetCodeCompany'
                       ? 'required'
                      : '' || inputField.inputModel === 'Period ID'
                      ? 'required'
                      : '' || inputField.inputModel === 'Year'
                      ? 'required'
                      : '' || inputField.inputModel === 'Payroll Group'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Company Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Employee Status'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Level'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Coverage'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Company Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Company Name'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Effective Start Date'
                      ? 'required'
                      : '' ||
                        inputField.inputModel === 'EffectiveEndDateCompany'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Classification Name'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel ===
                          'Classification Effective Date'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel ===
                          'Extra Info Effective Start Date'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'LeiInformation Category'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Set Code'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Grade Step Name'
                      ? 'required'
                      : '' ||
                        inputField.inputLabel === 'Grade Step Effective Date'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Grade Step Sequence'
                      ? 'required'
                      : '' || inputField.inputLabel === 'Ceiling Step Flag'
                      ? 'required'
                      : '' || inputField.inputModel === 'EffectiveEndDateGrade'
                      ? 'required'
                      : '' || inputField.inputModel === 'ManagerType'
                      ? 'required'
                      : '' || inputField.inputModel === 'MinWage'
                      ? 'required'
                      : '' || inputField.inputModel === 'DeclarePersonNumber'
                      ? 'required'
                      : ''|| inputField.inputLabel === 'Location Code' 
                      ? 'required'
                      : ''|| inputField.inputLabel === 'Location Name' 
                      ? 'required'
                      : ''|| inputField.inputModel === 'EffectiveEndDateJobLevel' 
                      ? 'required'
                      : ''|| inputField.inputLabel === 'Job Function Code' 
                      ? 'required'
                      : '' || inputField.inputLabel === 'Regular/Temporary' 
                      ? 'required'
                      : ''|| inputField.inputLabel === 'Full/Part Time' 
                      ? 'required'
                      : ''|| inputField.inputLabel === 'Level' 
                      ? 'required'
                      : '' || inputField.inputLabel === 'Sex' 
                      ? 'required'
                      : '' || inputField.inputLabel === 'Job Family Name' 
                      ? 'required'
                      : '' || inputField.inputLabel === 'Action Reason Code' 
                      ? 'required'
                      : '' || inputField.inputLabel === 'Action Status' 
                      ? 'required'
                      : '' || inputField.inputLabel === 'Charge To' 
                      ? 'required'
                      : ''
                  "
                >
                  {{ inputField.inputLabel }}
                </span>
                <v-text-field
                  v-if="
                    inputField.inputType === 'text' ||
                    inputField.inputType === 'number' ||
                    inputField.inputType === 'time' ||
                    inputField.inputType === 'text'
                  "
                  :type="inputField.inputType"
                  :readonly="inputField.readonly"
                  v-model="model[inputField.inputModel]"
                  dense
                  :rules="inputField.rules"
                  solo
                  hide-details="auto"
                />
                <!-- <v-select
                v-if="model === 'SuffixID' && this.$route.fullPath.split('/')[3] == 'basic-information' 
                || this.$route.fullPath.split('/')[3] == 'employment-data' || this.$route.fullPath.split('/')[3] == 'cost-center' "
                v-model="model[inputField.inputModel]"
                :items="inputField.selectionItems"
                clearable
                item-value="ID"
                item-text="name"
                dense
                solo
                hide-details="auto"
                rounded
              /> -->
                <slot
                  v-if="inputField.inputType === 'date'"
                  :name="inputField.inputModel"
                >
                  <v-text-field
                    v-model="model[inputField.inputModel]"
                    :type="inputField.inputType"
                    dense
                    solo
                    hide-details="auto"
                  />
                </slot>
                <!-- v-model="model[inputField.inputModel]" -->
                <!-- <v-text-field type="date"></v-text-field> -->

                <!-- <v-date-picker
                v-model="date"
                width="290"
                class="mt-4"
              > <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn></v-date-picker> -->
                <!-- prefix="₱" -->
                <v-text-field
                  v-if="inputField.inputType === 'money'"
                  v-model="model[inputField.inputModel]"
                  ref="money"
                  dense
                  hide-details="auto"
                  solo
                  @change="formatMoney(inputField.inputModel)"
                />

                <!-- placeholder 0.00 for CarriedOver and Beginning -->

                <v-file-input
                  v-if="inputField.inputType === 'file'"
                  accept="image/png, image/jpeg, image/bmp"
                  ref="file"
                  dense
                  solo
                  clearable
                  hide-details="auto"
                  @change="pickFile"
                />

                <v-select
                  v-if="inputField.inputType === 'select'"
                  v-model="model[inputField.inputModel]"
                  inputField.inputType="select"
                  clearable
                  item-value="name"
                  item-text="name"
                  :rules="inputField.rules"
                  :items="inputField.selectionItems"
                  dense
                  solo
                />

               

                <datepicker
                  v-if="inputField.inputType === 'year'"
                  input-class="form-control bg-white border-0 shadow-none"
                  v-model="model[inputField.inputModel]"
                  inputField.inputType="year"
                  format="yyyy"
                  :rules="inputField.rules"
                  item-value="name"
                  item-text="name"
                  wrapper-class="yearPicker icon rounded"
                  calendar-class="size"
                  minimum-view="year"
                >
              
                </datepicker>
 

               
                <v-radio-group
                  v-if="inputField.inputType === 'radio'"
                  v-model="model[inputField.inputModel]"
                  row
                  hide-details="auto"
                  :rules="inputField.rules"
                >
                  <v-radio
                    v-for="(radio, rIndex) in inputField.selectionItems"
                    :key="rIndex"
                    :label="radio.label"
                    :value="radio.value"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row v-if="edit == true && inputField.inputType == 'string'">
              <v-col cols="4" class="d-flex align-center">
                <span class="primary--text font-weight-bold">
                  {{ inputField.inputLabel }}
                </span>
              </v-col>
              <v-col cols="8">
                <span class="font-weight-bold primary-text">{{
                  model[inputField.inputModel]
                }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="actionBtns" />
        </v-card-actions>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import moment from "moment";
import { EventBus } from "../bus/bus";
import Datepicker from "vuejs-datepicker";
export default {
  name: "DefaultForm",
  components: {
    Datepicker,
  },
  props: {
    inputConfig: {
      type: [Array,Object],
      required: true,
      default: () => {
        return [];
      },
    },
    model: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    defaultInputItem: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      attachmentFile: null,

      years: [],
      // dialogFile:false
      regions:[]
    };
  },

  created() {
    // this.getFullYear();
  },

  watch: {},

  methods: {
   
    validateForm() {
      return this.$refs.form.validate();
    },
    close() {
      EventBus.$emit("closeForm");
    },

    customFormatter(date) {
      console.log(date);
      return moment(date).format("MM/DD/YYYY");
    },

    save() {
      console.log(this.editedItem);
      EventBus.$emit("saveItem", { item: this.editedItem, index: -1 });
      this.close();
    },
    // formatDate(){
    //   return moment(this.defaultItem.value).format('MM-DD-YYYY')
    //   value = this.defaultItem.value;
    //   return moment(value).format('MM-DD-YYYY');
    // },
    getFileData(modelName) {
      console.log(modelName);
      console.log("am here", this.$refs.file[0].text[0]);
      const filename = this.$refs.file[0].text[0];
      if (filename) {
        EventBus.$emit("newFileName", { model: modelName, fileName: filename });

        this.model[modelName] = filename;
        console.log(this.model);
      }
    },

    pickFile(file) {
      let modelName;
      for (const item of this.inputConfig) {
        if (item.inputType === "file") {
          modelName = item.inputModel;
        }
      }
      if (file) {
        EventBus.$emit("newFileName", {
          model: modelName,
          fileName: file.name,
        });
        this.model[modelName] = file.name;
        EventBus.$emit("getFile", file);
        console.log(this.model);
      }
      console.log(file);
    },
    onFilePicked(e) {
      console.log(e.target.files[0]);
    },

    formatMoney(modelName) {
      const money = this.model[modelName];
      const newVal = Number(money);
      console
        .log(money + newVal)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      console.log(newVal);
      if (newVal) {
        EventBus.$emit("newMoney", { model: modelName, money: newVal });
        this.model[modelName] = newVal;
      }
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },

    returnValue(model) {
      return this.model[model];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 1vh 10vw;
}
.required:after {
  content: " *";
  color: red;
}
.yearPicker{
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    
     
}
.icon {
    padding-right: calc(1.5em + .75rem);
    background-image: url(../assets/images/mdi-calendar.svg);
    background-repeat: no-repeat;
    background-position: center right calc(.375em + .1875rem);
    background-size: calc(.75em + 1.375rem) calc(.75em + .675rem);
}

</style>
