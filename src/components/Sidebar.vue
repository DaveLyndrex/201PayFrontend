<template>
  <v-app>
    <AppBar />
    <v-navigation-drawer v-model="drawerState" class="sidebar-color" app>
      <v-card
        flat
        tile
        class="pt-6 sidebar-color "
        align="center"
        justify="center"
      >
        201 Pay<v-divider></v-divider>
      </v-card>
      <v-list class="">
        <template v-for="item in items">
          <v-list-item
            v-if="!item.subItems"
            :key="item.title"
            link
            exact
            :to="item.routerLink"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.icon"
            color="#3186f4"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.subItems"
              :key="child.text"
              :to="child.targetLink"
              @click="item.active = false"
            >
              <v-list-item-content>
                <v-list-item-title v-text="child.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>

 
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import AppBar from /* webpackChunkName: "App Bar" */ "@/components/AppBar.vue";
export default {
  components: {
    AppBar,
  },
  data() {
    return {
      items: [
        {
          title: "Employee",
          icon: "mdi-account-tie",
          active: false,
          subItems: [
            {
              text: "Basic Information",
              targetLink: "/home/employee/basic-information",
            },
            {
              text: "Employment Data",
              targetLink: "/home/employee/employment-data",
            },
            {
              text: "Payroll Data",
              targetLink: "/home/employee/payroll-data",
            },
            {
              text: "Cost Center",
              targetLink: "/home/employee/cost-center",
            },
            {
              text: "Workflow",
              targetLink: "/home/employee/workflow",
            },
            {
              text: "Address",
              targetLink: "/home/employee/address",
            },
            {
              text: "Emergency Contact",
              targetLink: "/home/employee/emergency-contact",
            },
            {
              text: "Other Data",
              targetLink: "/home/employee/other-data",
            },
            {
              text: "Pay Component",
              targetLink: "/home/employee/pay-component",
            },
            {
              text: "Deduction",
              targetLink: "/home/employee/deduction",
            },
            {
              text: "Dependent",
              targetLink: "/home/employee/dependent",
            },
            {
              text: "Educational",
              targetLink: "/home/employee/educational",
            },
            {
              text: "Job History",
              targetLink: "/home/employee/job-history",
            },
            {
              text: "Training",
              targetLink: "/home/employee/training",
            },
            {
              text: "License",
              targetLink: "/home/employee/license",
            },
            {
              text: "Leave Credits",
              targetLink: "/home/employee/leave-credits",
            },
            {
              text: "Citizenship",
              targetLink: "/home/employee/citizenship",
            },
            {
              text: "Ethnicity",
              targetLink: "/home/employee/ethnicity",
            },
            {
              text: "Legislative",
              targetLink: "/home/employee/legislative",
            },
            {
              text: "NID",
              targetLink: "/home/employee/nid",
            },
            {
              text: "Passport",
              targetLink: "/home/employee/passport",
            },
            {
              text: "Phone",
              targetLink: "/home/employee/phone",
            },
            {
              text: "Visa",
              targetLink: "/home/employee/visa",
            },
          ],
        },
       {
          title: "Kiosk",
          icon: "mdi-briefcase",
          routerLink: "/home/employee-kiosk",
          active: false,
          subItems: [
          
            {
              text: "Timesheet",
              targetLink: "/home/kiosk/timesheet",
            },
              {
              text: "Awaiting Approval",
              targetLink: "/home/kiosk/awaiting-approval",
            },
            {
              text: "Certificate of Attendant",
              targetLink: "/home/kiosk/certificate-of-attendant",
            },
            {
              text: "Overtime",
              targetLink: "/home/kiosk/overtime",
            },
            {
              text: "Leave",
              targetLink: "/home/kiosk/leave",
            },
            {
              text: "Shift",
              targetLink: "/home/kiosk/shift",
            },
            {
              text: "Leave Balances",
              targetLink: "/home/kiosk/leave-balances",
            },
          ],
        },
        // {
        //   title: "Time Keeping",
        //   icon: "mdi-clock-fast",
        //   routerLink: "/home/time-keeping",
        //   active: false,
        //   subItems: [
        //     {
        //       text: "Shift",
        //       targetLink: "/home/time-keeping/shift",
        //     },
        //   ],
        // },
         {
          title: "Time Keeping",
          icon: "mdi-clock-fast",
          routerLink:"/home/time-keeping",
        },
        {
          title: "Leave Application",
          icon: "mdi-briefcase-clock",
          routerLink: "/home/leave-application",
        },
        {
          title: "Human Resources",
          icon: "mdi-account-cog",
          routerLink: "/home/human-resource",
          active: false,
          subItems: [
          
            {
              text: "Setups",
              targetLink: "/home/human-resource/setups",
             
            },
              {
              text: "Notifications",
              targetLink: "/home/human-resource/Notifications",
            },
            {
              text: "Templates",
              targetLink: "/home/human-resource/Templates",
            },
            {
              text: "Import Employee",
              targetLink: "/home/human-resource/import-employee",
            },
            {
              text: "Reminders",
              targetLink: "/home/human-resource/Reminders",
            },
            {
              text: "Transfer Approver",
              targetLink: "/home/human-resource/transfer-approver",
            },
            {
              text: "Report",
              targetLink: "/home/human-resource/Report",
            },
            {
              text: "Leave Refresh",
              targetLink: "/home/human-resource/leave-refresh",
            },
          ],
        },
        {
          title: "Logs",
          icon: "mdi-clipboard-list-outline ",
          routerLink: "/home/logs",
          active: false,
          subItems: [
            {
              text: "Access Logs",
              targetLink: "/home/logs/access-logs",
            },
            {
              text: "Activity Logs",
              targetLink: "/home/logs/activity-logs",
            },
            {
              text: "Change Logs",
              targetLink: "/home/logs/change-logs",
            },
          ],
        },
      ],
    };
  },

  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
    },
  },
    computed: {
    drawerState: {
      get: function() { return this.$store.state.drawerState },
      set: () => null//function() { this.$store.commit('toggleDrawerState') }
    }
  }
};
</script>

<style scoped>
.v-list .v-list-item--active {
  color: #3186f4;
}
.sidebar{
  background-color: #f3f5f8;
}

.sidebar-color {
  background-color: #f3f5f8 !important;
}

</style>
