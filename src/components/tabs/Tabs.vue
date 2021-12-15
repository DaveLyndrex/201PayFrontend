<template>
  <v-app>
    <v-tabs
      background-color="light"
      fixed-tabs
      center-active
      hide-slider
      show-arrows
      class="tabs"
      v-model="activeTab"
      height="60"
    >
      <v-tab
        style="margin: 8px 0 8px 0"
        v-for="(tab, index) in tabItems"
        :key="index"
        :href="'#' + tab.tabTarget"
        @click="close"
      >
        <span>{{ tab.text }}</span>
      </v-tab>
    </v-tabs>
    <v-container>
      <v-tabs-items v-model="activeTab">
        <v-tab-item value="basic-information">
          <BasicInfomation />
        </v-tab-item>

        <v-tab-item value="employment-data">
          <EmploymentData />
        </v-tab-item>

        <v-tab-item value="payroll-data">
          <PayrollData />
        </v-tab-item>

        <v-tab-item value="cost-center">
          <CostCenter />
        </v-tab-item>

        <v-tab-item value="workflow">
          <Workflow />
        </v-tab-item>

        <v-tab-item value="address">
          <Address />
        </v-tab-item>

        <v-tab-item value="emergency-contact">
          <EmergencyContact />
        </v-tab-item>

        <v-tab-item value="pay-component">
          <PayComponent />
        </v-tab-item>

        <v-tab-item value="deduction">
          <Deduction />
        </v-tab-item>

        <v-tab-item value="dependent">
          <Dependent />
        </v-tab-item>

        <v-tab-item value="educational">
          <Educational />
        </v-tab-item>

        <v-tab-item value="training">
          <Training />
        </v-tab-item>

        <v-tab-item value="other-data">
          <OtherData />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-app>
</template>

<script>
import BasicInfomation from /* webpackChunkName: "Basic Information" */ "@/views/employee/BasicInformation.vue";
import EmploymentData from /* webpackChunkName: "Employment Data" */ "@/views/employee/EmploymentData.vue";
import PayrollData from /* webpackChunkName: "Payroll Data" */ "@/views/employee/PayrollData.vue";
import CostCenter from /* webpackChunkName: "Cost Center" */ "@/views/employee/CostCenter.vue";
import Workflow from /* webpackChunkName: "Workflow" */ "@/views/employee/Workflow.vue";
import Address from /* webpackChunkName: "Address" */ "@/views/employee/Address.vue";
import EmergencyContact from /* webpackChunkName: "Emergency Contact" */ "@/views/employee/EmergencyContact.vue";
import PayComponent from /* webpackChunkName: "PayComponent" */ "@/views/employee/PayComponent.vue";
import Deduction from /* webpackChunkName: "Deduction" */ "@/views/employee/Deduction.vue";
import Dependent from /* webpackChunkName: "Dependent" */ "@/views/employee/Dependent.vue";
import Educational from /* webpackChunkName: "Educational" */ "@/views/employee/Educational.vue";
import Training from /* webpackChunkName: "Training" */ "@/views/employee/Training.vue";
import OtherData from /* webpackChunkName: "Other Data" */ "@/views/employee/OtherData.vue";
import { EventBus } from '../../bus/bus';

export default {
  name: "Tabs",
  components: {
    BasicInfomation,
    EmploymentData,
    PayrollData,
    CostCenter,
    Workflow,
    Address,
    EmergencyContact,
    PayComponent,
    Deduction,
    Dependent,
    Educational,
    Training,
    OtherData,
  },
  data() {
    return {
      activeTab: null,
      tabItems: [
        {
          text: "Basic Information",
          tabTarget: "basic-information",
        },
        {
          text: "Employment Data",
          tabTarget: "employment-data",
        },
        {
          text: "Payroll Data",
          tabTarget: "payroll-data",
        },
        {
          text: "Cost Center",
          tabTarget: "cost-center",
        },
        {
          text: "Workflow",
          tabTarget: "workflow",
        },
        {
          text: "Address",
          tabTarget: "address",
        },
        {
          text: "Emergency Contact",
          tabTarget: "emergency-contact",
        },
        {
          text: "Pay Component",
          tabTarget: "pay-component",
        },
        {
          text: "Deduction",
          tabTarget: "deduction",
        },
        {
          text: "Dependent",
          tabTarget: "dependent",
        },
        {
          text: "Educational",
          tabTarget: "educational",
        },
        {
          text: "Training",
          tabTarget: "training",
        },
        {
          text: "Other Data",
          tabTarget: "other-data",
        },
      ],
    };
  },

  methods: {
    close() {
      EventBus.$emit("closeForm");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-tab {
  margin: 0 15px;
  text-transform: none;

  span {
    color: #3939c6;
  }
}

.v-tab--active {
  background-color: #3939c6;
  border-radius: 50px;
  padding: 10px 30px 10px 30px;
}
.v-tab--active span {
  color: white;
}

.tabs {
  border-radius: 50px !important;
}
</style>
