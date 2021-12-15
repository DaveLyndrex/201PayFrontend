<template>
  <!-- 10/07/2021 CN CRUBIO -->
  <!-- 10/07/2021 CN APRIL -->
  <v-app>
    <!-- <DefaultDataTable
      v-if="!openForm"
      :headers="headers"
      :items="basicInfo ? basicInfo : []"
      :editedItem="editedItem"
      :defaultItem="defaultItem"
      :dataLoading="loading"
    >
    
    </DefaultDataTable> -->
     <Alert :response="response" :message="message" id="alert" style="display: none"/>
    <b-container v-if="!openForm">
      <div>
        <b-row>
          <b-col>
            <p><strong>PERSONAL DATA</strong></p></b-col
          >
          <b-col cols="5">
            <b-button
              size="sm"
              variant="primary"
              @click="editInfo()"
              class="btn btn-primary mb-3 ml-15"
              >Edit Basic Information</b-button
            ></b-col
          >
        </b-row>
      </div>
      <b-row>
        <b-col class="border" cols="5">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{{ basicInfo.ID }}</td>
              </tr>
              <tr>
                <th>First Name</th>
                <td>{{ basicInfo.FirstName }}</td>
              </tr>
              <tr>
                <th>Middle Name</th>
                <td>{{ basicInfo.MiddleName }}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{{ basicInfo.LastName }}</td>
              </tr>
              <tr>
                <th>Suffix</th>
                <td>{{ basicInfo.SuffixID }}</td>
              </tr>
              <tr>
                <th>Prefix</th>
                <td>{{ basicInfo.PreffixID }}</td>
              </tr>
              <tr>
                <th>Nickname</th>
                <td>{{ basicInfo.Nickname }}</td>
              </tr>
              <tr>
                <th>Initials</th>
                <td>{{ basicInfo.Initials }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>

        <!-- Another Column ni sya -->
        <b-col class="border" cols="5">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Date of Birth</th>
                <td>{{ basicInfo.DateOfBirth }}</td>
              </tr>
              <tr>
                <th>Country of Birth</th>
                <td>{{ basicInfo.CountryOfBirth }}</td>
              </tr>
              <tr>
                <th>Place of Birth</th>
                <td>{{ basicInfo.PlaceOfBirth }}</td>
              </tr>
              <tr>
                <th>Blood Type</th>
                <td>{{ basicInfo.BloodTypeID }}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{{ basicInfo.SexID }}</td>
              </tr>
              <tr>
                <th>Civil Status</th>
                <td>{{ basicInfo.CivilStatus }}</td>
              </tr>
              <tr>
                <th>Religion</th>
                <td>{{ basicInfo.Religion }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <p class="mt-10"><strong>ACCOUNT NUMBER</strong></p>
      <b-row>
        <b-col class="border" cols="5">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>SSS</th>
                <td>{{ basicInfo.SSS }}</td>
              </tr>
              <tr>
                <th>PhilHealth</th>
                <td>{{ basicInfo.PhilHealth }}</td>
              </tr>
              <tr>
                <th>HDMF</th>
                <td>{{ basicInfo.HDMFNo }}</td>
              </tr>
              <tr>
                <th>TIN</th>
                <td>{{ basicInfo.TIN }}</td>
              </tr>
              <tr>
                <th>Community Tax</th>
                <td>{{ basicInfo.CommunityTax }}</td>
              </tr>
              <tr>
                <th>Unified Members ID</th>
                <td>{{ basicInfo.UnifiedMembersID }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>

        <!-- Another Column ni sya -->
        <b-col class="border" cols="5">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Payroll Acct</th>
                <td>{{ basicInfo.PayrollAcct }}</td>
              </tr>
              <tr>
                <th>Bank</th>
                <td>{{ basicInfo.BankID }}</td>
              </tr>
              <tr>
                <th>Maxicare Card No.</th>
                <td>{{ basicInfo.MaxicareCardNo }}</td>
              </tr>
              <tr>
                <th>Driver's License</th>
                <td>{{ basicInfo.DriversLicense }}</td>
              </tr>
              <tr>
                <th>Voter's ID</th>
                <td>{{ basicInfo.VotersID }}</td>
              </tr>
              <tr>
                <th>Passport</th>
                <td>{{ basicInfo.Passport }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <p class="mt-10"><strong>OTHERS</strong></p>
      <b-row>
        <b-col class="border" cols="5">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Service Year Recognition</th>
                <td>{{ basicInfo.FirstName }}</td>
              </tr>
              <tr>
                <th>BU Hire Date</th>
                <td>{{ basicInfo.BUHireDate }}</td>
              </tr>
              <tr>
                <th>Retirement Base Date</th>
                <td>{{ basicInfo.RetirementBaseDate }}</td>
              </tr>
              <tr>
                <th>Regularization Date</th>
                <td>{{ basicInfo.RegularizationDate }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>

        <!-- Another Column ni sya -->
        <b-col class="border" cols="5">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Regularization PA</th>
                <td>{{ basicInfo.RegularizationPA }}</td>
              </tr>
              <tr>
                <th>Name Of Spouse</th>
                <td>{{ basicInfo.NameOfSpouse }}</td>
              </tr>
              <tr>
                <th>Date Of Marriage</th>
                <td>{{ basicInfo.DateOfMarriage }}</td>
              </tr>
              <tr>
                <th>Occupation Of Spouse</th>
                <td>{{ basicInfo.OccupationOfSpouse }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>

    <template v-else>
      <v-form ref="basicInfoForm">
        <v-container class="container">
          <p><strong>PERSONAL DATA</strong></p>
          <v-row>
            <v-col cols="5">
              <v-row class="">
                <!-- <v-col cols="4"> ID </v-col> -->
                <v-col cols="10">
                  <label class="required">ID</label>
                  <v-text-field
                    solo
                    dense
                    value=""
                    v-model="basicInfo.ID"
                    type="text"
                    :rules="[(v) => validation.required(basicInfo.ID, 'ID')]"
                    required
                  />
                </v-col>
                <v-col cols="10">
                  <label class="required">First Name</label>
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.FirstName"
                    type="text"
                    :rules="[
                      (v) =>
                        validation.required(basicInfo.FirstName, 'First Name'),
                    ]"
                    required
                  />
                </v-col>
                <v-col cols="10">
                  <label class="required">Middle Name</label>
                  <v-text-field
                    solo
                    dense
                    class="allRow"
                    v-model="basicInfo.MiddleName"
                    type="text"
                    :rules="[
                      (v) =>
                        validation.required(
                          basicInfo.MiddleName,
                          'Middle Name'
                        ),
                    ]"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label class="required">Last Name</label>
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.LastName"
                    type="text"
                    :rules="[
                      (v) =>
                        validation.required(basicInfo.LastName, 'Last Name'),
                    ]"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label>Suffix</label>
                  <v-select
                    solo
                    dense
                    type="text"
                    v-model="basicInfo.SuffixID"
                    :items="
                      this.$store.getters.allSuffixMasterData.map((item) => {
                        return {
                          ...item,
                          name: item.Suffix,
                        };
                      })
                    "
                    item-text="name"
                    item-value="name"
                  >
                  </v-select>
                </v-col>
                <v-col cols="10">
                  <label>Prefix</label>
                  <v-select
                    solo
                    dense
                    type="text"
                    v-model="basicInfo.PreffixID"
                    :items="
                      this.$store.getters.allPrefixMasterData.map((item) => {
                        return {
                          ...item,
                          name: item.Prefix,
                        };
                      })
                    "
                    item-value="name"
                    item-text="name"
                  >
                  </v-select>
                </v-col>
                <v-col cols="10">
                  <label>Nickname</label>
                  <v-text-field
                    solo
                    dense
                    type="text"
                    v-model="basicInfo.Nickname"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label>Initials</label>
                  <v-text-field
                    solo
                    dense
                    type="text"
                    v-model="basicInfo.Initials"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="10">
                  <label class="required">Date Of Birth</label>
                  <v-menu
                    ref="dateOfBirth"
                    v-model="dateOfBirth"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[
                          (v) => validation.required(v, 'Date Of Birth'),
                        ]"
                        required
                        solo
                        dense
                        v-model="basicInfo.DateOfBirth"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          dateOfBirthMenuValue = parseDate(
                            basicInfo.DateOfBirth
                          )
                        "
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateOfBirthMenuValue"
                      no-title
                      @input="dateOfBirth = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="10">
                  <label>Country Of Birth</label>
                  <v-select
                    solo
                    dense
                    v-model="basicInfo.CountryOfBirth"
                    :items="
                      this.$store.getters.allCountriesMasterData.map((item) => {
                        return {
                          ...item,
                          name: item.CountryName,
                        };
                      })
                    "
                    item-value="name"
                    item-text="name"
                  />
                </v-col>

                <v-col cols="10">
                  <label class="required">Place Of Birth</label>
                  <v-text-field
                    solo
                    dense
                    :rules="[
                      (v) =>
                        validation.required(
                          basicInfo.PlaceOfBirth,
                          'Place Of Birth'
                        ),
                    ]"
                    required
                    v-model="basicInfo.PlaceOfBirth"
                    type="text"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label class="required">Blood Type</label>
                  <v-select
                    solo
                    dense
                    :rules="[
                      (v) =>
                        validation.required(
                          basicInfo.BloodTypeID,
                          'Blood Type'
                        ),
                    ]"
                    v-model="basicInfo.BloodTypeID"
                    required
                    :items="
                      this.$store.getters.allBloodTypeSetUpMasterData.map(
                        (item) => {
                          return {
                            ...item,
                            name: item.BloodType,
                          
                          };
                        }
                      )
                    "
                    item-text="name"
                    item-value="name"
                  >
                  </v-select>
                </v-col>
                <v-col cols="10">
                  <label class="required">Gender</label>
                  <v-select
                    solo
                    dense
                    v-model="basicInfo.SexID"
                    :rules="[
                      (v) => validation.required(basicInfo.SexID, 'Gender'),
                    ]"
                    required
                    :items="
                      this.$store.getters.allSexMasterData.map((item) => {
                        return {
                          ...item,
                          name: item.Sex,
          
                        };
                      })
                    "
                    item-text="name"
                    item-value="name"
                  >
                  </v-select>
                </v-col>
                <v-col cols="10">
                  <label class="required">Civil Status</label>
                  <v-select
                    solo
                    dense
                    v-model="basicInfo.CivilStatus"
                    :rules="[
                      (v) =>
                        validation.required(
                          basicInfo.CivilStatus,
                          'Civil Status'
                        ),
                    ]"
                    required
                    :items="
                      this.$store.getters.allCivilStatusMasterData.map(
                        (item) => {
                          return {
                            ...item,
                            name: item.CivilStatus,
                        
                          };
                        }
                      )
                    "
                    item-text="name"
                    item-value="name"
                  >
                  </v-select>
                </v-col>
                <v-col cols="10">
                  Religion
                  <v-text-field solo dense v-model="basicInfo.Religion">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>

        <hr />
        <v-container class="container">
          <p><strong>ACCOUNT NUMBER</strong></p>
          <v-row>
            <v-col cols="5">
              <v-row>
                <v-col cols="10">
                  <label class="required">SSS</label>
                  <v-text-field
                    solo
                    dense
                    :rules="[(v) => validation.required(basicInfo.SSS, 'SSS')]"
                    v-model="basicInfo.SSS"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label class="required">PhilHealth</label>
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.PhilHealth"
                    :rules="[
                      (v) =>
                        validation.required(
                          basicInfo.BloodTypeID,
                          'PhilHealth'
                        ),
                    ]"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label class="required">HDMF</label>
                  <v-text-field
                    solo
                    dense
                    :rules="[
                      (v) => validation.required(basicInfo.HDMFNo, 'HDMF'),
                    ]"
                    v-model="basicInfo.HDMFNo"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label class="required">TIN</label>
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.TIN"
                    :rules="[(v) => validation.required(basicInfo.TIN, 'TIN')]"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  Community Tax
                  <v-text-field solo dense v-model="basicInfo.CommunityTax">
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  Unified Members ID
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.UnifiedMembersID"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="10">
                  <label class="required">Payroll Acct</label>
                  <v-text-field
                    solo
                    dense
                    :rules="[
                      (v) =>
                        validation.required(
                          basicInfo.PayrollAcct,
                          'Payroll Acct'
                        ),
                    ]"
                    v-model="basicInfo.PayrollAcct"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <label class="required">Bank</label>
                  <v-select
                    solo
                    dense
                    :rules="[(v) => validation.required(v, 'Bank')]"
                    v-model="basicInfo.BankID"
                    required
                    :items="
                      this.$store.getters.allBankSetUpMasterData.map((item) => {
                        return {
                          ...item,
                          name: item.BankName,
    
                        };
                      })
                    "
                    item-value="name"
                    item-text="name"
                  >
                  </v-select>
                </v-col>
                <v-col cols="10">
                  Maxicare Card No.
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.MaxicareCardNo"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  Driver's License
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.DriversLicense"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  Voter's ID
                  <v-text-field solo dense v-model="basicInfo.VotersID">
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  Passport
                  <v-text-field solo dense v-model="basicInfo.Passport">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <hr />
        <v-container class="container">
          <p><strong>OTHERS</strong></p>
          <v-row>
            <v-col cols="5">
              <v-row>
                <v-col cols="10">
                  <label class="required">Service Year Recognition</label>
                  <v-menu
                    ref="serviceYearRecognition"
                    v-model="serviceYearRecognition"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[
                          (v) =>
                            validation.required(v, 'Service Year Recognition'),
                        ]"
                        required
                        solo
                        dense
                        v-model="basicInfo.ServiceYearRecognition"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          serviceYearRecognitionMenuValue = parseDate(
                            basicInfo.ServiceYearRecognition
                          )
                        "
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="serviceYearRecognitionMenuValue"
                      no-title
                      @input="serviceYearRecognition = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="10">
                  <label class="required">BU Hire Date</label>
                  <v-menu
                    ref="buHireDate"
                    v-model="buHireDate"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[(v) => validation.required(v, 'BU Hire Date')]"
                        required
                        solo
                        dense
                        v-model="basicInfo.BUHireDate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          buHireDateMenuValue = parseDate(basicInfo.BUHireDate)
                        "
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="buHireDateMenuValue"
                      no-title
                      @input="buHireDate = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="10">
                  <label class="required">Retirement Base Date</label>

                  <v-menu
                    ref="retirementBaseDate"
                    v-model="retirementBaseDate"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[
                          (v) => validation.required(v, 'Retirement Base Date'),
                        ]"
                        required
                        solo
                        dense
                        v-model="basicInfo.RetirementBaseDate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          retirementBaseDateMenuValue = parseDate(
                            basicInfo.RetirementBaseDate
                          )
                        "
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="retirementBaseDateMenuValue"
                      no-title
                      @input="retirementBaseDate = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="10">
                  <label class="required">Regularization Date</label>
                  <v-menu
                    ref="regularizationDate"
                    v-model="regularizationDate"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[
                          (v) => validation.required(v, 'Regularization Date'),
                        ]"
                        required
                        solo
                        dense
                        v-model="basicInfo.RegularizationDate"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          regularizationDateMenuValue = parseDate(
                            basicInfo.RegularizationDate
                          )
                        "
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="regularizationDateMenuValue"
                      no-title
                      @input="regularizationDate = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="10">
                  <label class="required">Regularization PA</label>
                  <v-select
                    solo
                    dense
                    :rules="[
                      (v) =>
                        validation.required(
                          basicInfo.RegularizationPA,
                          'Regularization PA'
                        ),
                    ]"
                    required
                    v-model="basicInfo.RegularizationPA"
                    :items="
                      this.$store.getters.allRegularizationPAMasterData.map(
                        (item) => {
                          return {
                            ...item,
                            name: item.Description,
                           
                          };
                        }
                      )
                    "
                    item-value="name"
                    item-text="name"
                  >
                  </v-select>
                </v-col>
                <v-col cols="10">
                  Name of Spouse
                  <v-text-field solo dense v-model="basicInfo.NameOfSpouse">
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  Date of Marriage
                  <v-menu
                    ref="dateOfMarriage"
                    v-model="dateOfMarriage"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[
                          (v) => validation.required(v, 'Date Of Marriage'),
                        ]"
                        required
                        solo
                        dense
                        v-model="basicInfo.DateOfMarriage"
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          dateOfMarriageMenuValue = parseDate(
                            basicInfo.DateOfMarriage
                          )
                        "
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateOfMarriageMenuValue"
                      no-title
                      @input="dateOfMarriage = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="10">
                  Occupation of Spouse
                  <v-text-field
                    solo
                    dense
                    v-model="basicInfo.OccupationOfSpouse"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-container>
        <v-btn
          class="mb-2 px-8 font-color button"
          color="whitesmoke"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          :loading="savingChanges"
          class="mb-2 px-8 space"
          dark
          color="blue"
          @click="saveItem(editedItem)"
        >
          Save
        </v-btn>
      </v-container>
    </template>
  </v-app>
</template>

<script>
// import DefaultDataTable from /* webpackChunkName: "Data Table" */ "@/components/DataTable.vue";
// import DefaultForm from /* webpackChunkName: "Form" */ "@/components/Form.vue";
// import DefaultForm from /* webpackChunkName: "Form" */ "@/components/BasicInformationForm.vue";
import { EventBus } from "../../bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
import Validation from "@/utils/Validation";
import Alert from "@/components/Alert.vue";
// import { mapState } from "vuex";
// import moment from "moment";

export default {
  components: {
    // DefaultDataTable,
    Alert,
    // DefaultForm,
  },

  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      response: "",
      message: "",
      date_of_birth: "",
      name: "basic-info",
      openForm: false,
      loading: true,
      edit: false,
      savingChanges: false,
      headers: [
        { text: "ID #", align: "start", value: "ID" },
        { text: "Employee Name", value: "FirstName" },
        { text: "SSS #", value: "SSS" },
        { text: "PhilHealth #", value: "PhilHealth" },
        { text: "HDMF #", value: "HDMFNo" },
        { text: "TIN", value: "TIN" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      basicInfo: [],
      editedIndex: -1,
      validation: Validation,
      editedItem: {
        ID: null,
        EmployeeIDNO: null,
        FirstName: null,
        MiddleName: null,
        LastName: null,
        SuffixID: null,
        PreffixID: null,
        DateOfBirth: this.formatDate(this.getDefaultDate()),
        PlaceOfBirth: null,
        SexID: null,
        Photo: null,
        SSSNo: null,
        PhilHealthNo: null,
        HDMFNo: null,
        TIN: null,
        BankID: null,
        PayrollAcct: null,
        RegularizationPA: null,
        BloodTypeID: null,
        GPAID: null,
        Nickname: null,
        Initials: null,
        Religion: null,
        UnifiedID: null,
        DriversLicense: null,
        VotersID: null,
        Passport: null,
        CityHealthCard: null,
        CountryOfBirth: null,
        DateOfDeath: null,
        NameOfSpouse: null,
        DateOfMarriage: this.formatDate(this.getDefaultDate()),
        Occupation: null,
        CivilStatus: null,
        Miscellaneous: null,
        ECID: null,
        CandidateID: null,
        CommunityTax: null,
        UnifiedMembersID: null,
        MaxicareCardNo: null,
        ServiceYearRecognition: this.formatDate(this.getDefaultDate()),
        BUHireDate: this.formatDate(this.getDefaultDate()),
        RetirementBaseDate: this.formatDate(this.getDefaultDate()),
        RegularizationDate: this.formatDate(this.getDefaultDate()),
        OccupationOfSpouse: null,
        ModifiedBy: JSON.parse(localStorage.getItem("user_details")).data.Email,
      },
      dateOfBirthMenuValue: this.getDefaultDate(),
      serviceYearRecognitionMenuValue: this.getDefaultDate(),
      buHireDateMenuValue: this.getDefaultDate(),
      retirementBaseDateMenuValue: this.getDefaultDate(),
      regularizationDateMenuValue: this.getDefaultDate(),
      dateOfMarriageMenuValue: this.getDefaultDate(),
      dateOfBirth: false,
      serviceYearRecognition: false,
      buHireDate: false,
      retirementBaseDate: false,
      regularizationDate: false,
      dateOfMarriage: false,
    };
  },

  // computed: mapState(["allSuffixMasterData"]),

  watch: {
    //  date_of_birth() {
    //    moment(this.date_of_birth, "DD.MM.YYYY").format("MM.DD.YYYY");
    //  },
    openForm(val) {
      val || this.close();
    },
    dateOfBirthMenuValue(val) {
      console.log(val);
      this.basicInfo.DateOfBirth = this.formatDate(this.dateOfBirthMenuValue);
    },
    serviceYearRecognitionMenuValue(val) {
      console.log(val);
      this.basicInfo.ServiceYearRecognition = this.formatDate(
        this.serviceYearRecognitionMenuValue
      );
    },
    buHireDateMenuValue(val) {
      console.log(val);
      this.editedItem.BUHireDate = this.formatDate(this.buHireDateMenuValue);
    },
    retirementBaseDateMenuValue(val) {
      console.log(val);
      this.basicInfo.RetirementBaseDate = this.formatDate(
        this.retirementBaseDateMenuValue
      );
    },
    regularizationDateMenuValue(val) {
      console.log(val);
      this.basicInfo.RegularizationDate = this.formatDate(
        this.regularizationDateMenuValue
      );
    },
    dateOfMarriageMenuValue(val) {
      console.log(val);
      this.basicInfo.DateOfMarriage = this.formatDate(
        this.dateOfMarriageMenuValue
      );
    },
  },

  async created() {
    // this.$store.watch(
    //   (state, getters) => getters.allSuffixMasterData,
    //   (newValue) => {
    //     if (newValue) {
    //       this.basicInfo.SuffixID.items = newValue.map((item) => {
    //         return {
    //           ...item,
    //           name: item.Suffix,
    //         };
    //       });
    //     }
    //   }
    // );

    // this.$store.watch(
    //   (state,getters) =>  getters.allCountriesMasterData,
    //   (newValue) => {
    //     if (newValue) {
    //       this.basicInfo.CountryOfBirth.items = newValue.map((item) => {
    //         return {
    //           ...item,
    //           name: item.CountryName
    //         };
    //       });
    //     }
    //   }
    // );
    // moment(this.date_of_birth, "DD.MM.YYYY").format("MM.DD.YYYY"),

    EventBus.$on("initializeData", () => {
      this.retrieveData();

      // console.log(this.basicInfo);
    });

    EventBus.$on("addNewItem", (props) => {
      
      props.item.DateOfBirth = this.formatDF(props.item.DateOfBirth);
      props.item.DateOfMarriage = this.formatDF(props.item.DateOfMarriage);
      if (props.index != -1) this.edit = true;
      else this.edit = false;
      this.editedItem = props.item;
      this.editedIndex = props.index;
      this.openForm = true;
    });

    EventBus.$on("saveItem", (props) => {
      if (this.editedIndex > -1) {
        Object.assign(this.basicInfo[this.editedIndex], props.item);
      } else {
        this.basicInfo.push(props.item);
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

    await this.retrieveData();
    await this.initializeRelationalDatas();
  },
  methods: {
    // format(value) {
    //   console.log("hello?");
    // return moment(value).format('MM/DD/YYYY')
    // },
    editInfo() {
      console.log(this.basicInfo.SuffixID)
      this.openForm = true;
      this.editedIndex = 0;
    },

    retrieveData: async function () {
      //  console.log(basicInfo.CountryOfBirth)
      // console.log(this.editedItem.SuffixID.items);
      console.log(document.getElementsByClassName("allRow"))
      this.loading = true;
      try {
        let getdata = await this.retrieve(
          "retrieveBasicInfoData",
          "setBasicInfoData",
          "allBasicInfoData"
        );
        this.basicInfo = getdata ? getdata[0] : {};
       
        // console.log('getdata' , getdata[0]);
        // console.log(this.basicInfo[0]['ID']);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    saveItem(data) {
      console.log(this.basicInfo.FirstName);
      data.EmpID = this.basicInfo.EmpID;
      data.ID = this.basicInfo.ID;
      data.FirstName = this.basicInfo.FirstName;
      data.MiddleName = this.basicInfo.MiddleName;
      data.LastName = this.basicInfo.LastName;
      data.SuffixID = this.basicInfo.SuffixID;
      data.PreffixID = this.basicInfo.PreffixID;
      data.DateOfBirth = this.basicInfo.DateOfBirth;
      data.SexID = this.basicInfo.SexID;
      data.Photo = this.basicInfo.Photo;
      data.SSS = this.basicInfo.SSS;
      data.PhilHealth = this.basicInfo.PhilHealth;
      data.HDMFNo = this.basicInfo.HDMFNo;
      data.TIN = this.basicInfo.TIN;
      data.BankID = this.basicInfo.BankID;
      data.PayrollAcct = this.basicInfo.PayrollAcct;
      data.RegularizationPA = this.basicInfo.RegularizationPA;
      data.BloodTypeID = this.basicInfo.BloodTypeID;
      data.CommunityTax = this.basicInfo.CommunityTax;
      data.ServiceYearRecognition = this.basicInfo.ServiceYearRecognition;
      data.PlaceOfBirth = this.basicInfo.PlaceOfBirth;
      data.BUHireDate = this.basicInfo.BUHireDate;
      data.RetirementBaseDate = this.basicInfo.RetirementBaseDate;
      data.RegularizationDate = this.basicInfo.RegularizationDate;
      data.Nickname = this.basicInfo.Nickname;
      data.Initials = this.basicInfo.Initials;
      data.Religion = this.basicInfo.Religion;
      data.UnifiedMembersID = this.basicInfo.UnifiedMembersID;
      data.DriversLicense = this.basicInfo.DriversLicense;
      data.VotersID = this.basicInfo.VotersID;
      data.Passport = this.basicInfo.Passport;
      data.MaxicareCardNo = this.basicInfo.MaxicareCardNo;
      data.CountryOfBirth = this.basicInfo.CountryOfBirth;
      data.NameOfSpouse = this.basicInfo.NameOfSpouse;
      data.DateOfMarriage = this.basicInfo.DateOfMarriage;
      data.OccupationOfSpouse = this.basicInfo.OccupationOfSpouse;
      data.CivilStatus = this.basicInfo.CivilStatus;
      console.log(data);
      const parseData = { ...data };
      parseData.DateOfBirth = this.formatDateForBe(data.DateOfBirth);
      parseData.RetirementBaseDate = this.formatDateForBe(
        data.RetirementBaseDate
      );
      parseData.ServiceYearRecognition = this.formatDateForBe(
        data.ServiceYearRecognition
      );
      parseData.BUHireDate = this.formatDateForBe(data.BUHireDate);
      parseData.RegularizationDate = this.formatDateForBe(
        data.RegularizationDate
      );
      parseData.DateOfMarriage = this.formatDateForBe(data.DateOfMarriage);
      if (this.$refs.basicInfoForm.validate()) {
        if (this.editedIndex > -1) {
          this.updateItem(parseData);
          // console.log( JSON.parse(localStorage.getItem("user_details")).data.Email)
        } else {
          console.log("here" + this.editedIndex);
          this.createNewItem(parseData);
        }
      }
    },

    createNewItem: async function (data) {
      console.log(data);
      this.savingChanges = true;
      let create = await this.create(data, "createBasicInfoData");
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

    updateItem: async function (data) {
      console.log(data);
      this.savingChanges = true;
      let update = await this.update(
        data,
        this.editedIndex,
        "updateBasicInfoData",
        "allBasicInfoData"
      );

      if (update) {
        this.basicInfo = update;
        this.close();
        await this.retrieveData();
        this.close();

        this.response = "success";
        this.message = "Successfully Updated";

        document.getElementById("alert").style.display = "block";
      setTimeout( () => (document.getElementById("alert").style.display = "none"), 3000);
      } 

      this.savingChanges = false;
    },

    //masterData
    initializeRelationalDatas: async function () {
      try {
        await this.retrieveSuffixMasterData();
        await this.retrievePrefixMasterData();
        await this.retrieveBankSetUpMasterData();
        await this.retrieveRegularizationPAMasterData();
        await this.retrieveBloodTypesMasterData();
        // await this.retrieveGPASMasterData();
        await this.retrieveCountriesMasterData();
        await this.retrieveCivilStatusMasterData();
        await this.retrieveSexMasterData();
      } catch (error) {
        this.showWarningResponse("Something went wrong!");
      }
    },

    retrieveSuffixMasterData() {
      return this.retrieve(
        "retrieveAllSuffixMasterData",
        "setSuffixMasterData",
        "allSuffixMasterData"
      );
    },

    retrievePrefixMasterData() {
      return this.retrieve(
        "retrieveAllPrefixMasterData",
        "setPrefixMasterData",
        "allPrefixMasterData"
      );
    },

    retrieveBankSetUpMasterData() {
      return this.retrieve(
        "retrieveAllBankSetUpMasterData",
        "setBankSetUpMasterData",
        "allBankSetUpMasterData"
      );
    },

    retrieveRegularizationPAMasterData() {
      return this.retrieve(
        "retrieveAllRegularizationPAMasterData",
        "SetRegularizationPAMasterData",
        "allRegularizationPAMasterData"
      );
    },

    retrieveBloodTypesMasterData() {
      return this.retrieve(
        "retrieveAllBloodTypesMasterData",
        "setBloodTypeSetUpMasterData",
        "allBloodTypeSetUpMasterData"
      );
    },

    // retrieveGPASMasterData() {
    //   return this.retrieve(
    //     "retrieveAllGPASMasterData",
    //     "setGpaSetUpMasterData",
    //     "allGpaSetUpMasterData"
    //   );
    // },

    retrieveCountriesMasterData() {
      return this.retrieve(
        "retrieveAllCountriesMasterData",
        "setCountriesMasterData",
        "allCountriesMasterData"
      );
    },

    retrieveCivilStatusMasterData() {
      return this.retrieve(
        "retrieveAllCivilStatusMasterData",
        "setCivilStatusMasterData",
        "allCivilStatusMasterData"
      );
    },

    retrieveSexMasterData() {
      return this.retrieve(
        "retrieveAllSexMasterData",
        "setSexMasterData",
        "allSexMasterData"
      );
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
    formatDF(date) {
      if (!date) return null;

      const [month, day, year] = date.split("-");
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
      if (!date) {
        return null;
      } else {
        const [month, day, year] = date.split("/");
        console.log(year, month, day);
        return `${year}-${month}-${day}`;
      }
    },
  },
  async mounted() {
    await console.log("asdasd", this.$store.getters.allSuffixMasterData);
  },
};
</script>
<style scoped>
.container {
  margin-left: 50px;
}
.font-color {
  color: blue;
}
.button {
  margin-left: 60%;
}
.space {
  margin-left: 10px;
}
.required:after {
  content: " *";
  color: red;
}
.margin {
  margin-right: 30px;
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
