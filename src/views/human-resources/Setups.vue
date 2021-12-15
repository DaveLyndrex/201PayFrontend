<template>
  <div>
    <BreadCrumb/>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header color="primary" class="text-light"
          >Master Files</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <b-row>
            <b-col>
              <v-card flat max-width="300">
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(item, i) in masterFiles.slice(0, 14)"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          class="border-bottom"
                          @click="redirect(item.path)"
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </b-col>

            <b-col>
              <v-card flat max-width="300">
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(item, i) in masterFiles.slice(14, 28)"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          class="border-bottom"
                          @click="redirect(item.path)"
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </b-col>

            <b-col>
              <v-card flat max-width="300">
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(item, i) in masterFiles.slice(28, 42)"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          class="border-bottom"
                          @click="redirect(item.path)"
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </b-col>
          </b-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
        <v-expansion-panel-content> Some content </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
        <v-expansion-panel-content> Some content </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>

import BreadCrumb from /* webpackChunkName: "Data Table" */ "@/components/BreadCrumbs.vue";
export default {
  components : {
BreadCrumb,
  },
  data: () => ({
    
    masterFiles: [
      {
        path: "/home/human-resource/Setups/address-type",
        text: "Address Type",
      },
      {
        path: "/home/human-resource/Setups/bank",
        text: "Bank",
      },
      {
         path: "/home/human-resource/Setups/blood-type",
        text: "Blood Type",
      },
      {
         path: "/home/human-resource/Setups/business-unit",
        text: "Business Unit",
      },
      {
         path: "/home/human-resource/Setups/citizenship",
        text: "Citizenship",
      },
      {
         path: "/home/human-resource/Setups/civil-status",
        text: "Civil Status",
      },
      {
         path: "/home/human-resource/Setups/company",
        text: "Company",
      },
      {
         path: "/home/human-resource/Setups/cost-center",
        text: "Cost Center",
      },
      {
         path: "/home/human-resource/Setups/department",
        text: "Department",
      },
      {
         path: "/home/human-resource/Setups/designation",
        text: "Designation",
      },
      {
         path: "/home/human-resource/Setups/division",
        text: "Division",
      },
      {
         path: "/home/human-resource/Setups/employee-status",
        text: "Employee Status",
      },
      {
        path: "/home/human-resource/Setups/employee-custom-fields",
        text: "Employee Custom Fields",
      },
      {
        text: "Employment Type",
        path: "/home/human-resource/Setups/employment-type",
      },
      {
        path: "/home/human-resource/Setups/gender",
        text: "Gender",
      },
      {
         path: "/home/human-resource/Setups/grade",
        text: "Grade",
      },
      {
        text: "Grade Rate",
        path: "/home/human-resource/Setups/grade-rate",
      },
      {
        path: "/home/human-resource/Setups/group-personal-accident",
        text: "Group Personal Accident (GPA)",
      },
      {
        path: "/home/human-resource/Setups/holiday",
        text: "Holiday",
      },
      {
        path: "/home/human-resource/Setups/holiday-type",
        text: "Holiday Type",
      },
      {
        path: "/home/human-resource/Setups/job-category",
        text: "Job Category",
      },
      {
        path: "/home/human-resource/Setups/job-code",
        text: "Job Code",
      },
      {
        path: "/home/human-resource/Setups/job-family-name",
        text: "Job Family Name",
      },
      {
        text: "Job Level",
         path: "/home/human-resource/Setups/job-level",
      },
      {
        text: "Leave Credit Year",
        path: "/home/human-resource/Setups/leave-credit-year",
      },
      {
        path: "/home/human-resource/Setups/leave-type",
        text: "Leave Type",
      },
      {
        path: "/home/human-resource/Setups/location",
        text: "Location",
      },
      {
        path: "/home/human-resource/Setups/manager-type",
        text: "Manager Type",
      },
      {
        path: "/home/human-resource/Setups/period",
        text: "Period",
      },
      {
        path: "/home/human-resource/Setups/ethnicitySetup",
        text: "Person Ethnicity",
      },
      {
        path: "/home/human-resource/Setups/person-visa",
        text: "Person Visa",
      },
      {
        path: "/home/human-resource/Setups/prefix",
        text: "Prefix",
      },
      {
         path: "/home/human-resource/Setups/project",
        text: "Project",
      },
      {
        path: "/home/human-resource/Setups/reason",
        text: "Reason",
      },
      {
        path: "/home/human-resource/Setups/religion",
        text: "Person Religion",
      },
      {
        path: "/home/human-resource/Setups/region",
        text: "Region",
      },
      {
         path: "/home/human-resource/Setups/regularization-pa",
        text: "Regularization PA",
      },
      {
         path: "/home/human-resource/Setups/site-location",
        text: "Site Location",
      },
      {
         path: "/home/human-resource/Setups/suffix",
        text: "Suffix",
      },
      {
         path: "/home/human-resource/Setups/timekeeping",
        text: "Timekeeping",
      },
      {
         path: "/home/human-resource/Setups/training",
        text: "Training Type",
      },
      {
         path: "/home/human-resource/Setups/worker-type",
        text: "Worker Type",
      },
    ],
  }),
  created() {},
  methods: {
    clear() {
      this.selection = [];
    },
    redirect(path) {
      this.$router.push(path);
    },
  },
};
</script>
