<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <b-link v-bind="attrs" v-on="on" variant="info" size="sm">
          <!-- <v-btn @click="reason = false" elevation="0" class="text-primary">
            <v-icon left> mdi-plus </v-icon>
            Add Employee List
          </v-btn> -->
           <b-button variant="primary" @click="reason = false" class="text-center" size="sm"> <b-icon icon="plus" class="pr-1" scale="1.8" aria-hidden="true"></b-icon>
                <span class="mr-2"> Add from Employee List</span> </b-button>
          </b-link
        >
      </template>

      <v-card>
        <v-card-title class=""> Add Employee </v-card-title>

        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :items-per-page="5"
            :headers="headers"
            :items="employees"
            :search="search"
            item-key="EmpID"
            loading-text="Loading... Please wait."
            show-select
            :loading="loading"
          ></v-data-table>
        </v-card>

        <!-- <v-divider></v-divider> -->

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="red" class="mb-2 mt-2" text @click="cancel">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" class="mb-2 mt-2" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from "../../../bus/bus";
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";
export default {
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
      userEmpID: null,
      selected: [],
      dialog: false,
      loading: true,
      search: "",
      employees: [],
      headers: [
        {
          text: "ID #",
          align: "start",
          filterable: false,
          value: "Description",
        },
        { text: "Employee", value: "Name" },
      ],
    };
  },

  created() {
    this.userEmpID = JSON.parse(
      localStorage.getItem("user_details")
    ).data.EmployeeIDNo;
    this.getEmployees();
  },

  methods: {
    getEmployees: async function () {
      let getData = await this.$store.dispatch("retrieveEmployees", {
        id: this.userEmpID,
      });
      let decryptedInfo = await this.decrypt(
        getData.data.ciphertext,
        "setEmployees"
      );
      this.employees = JSON.parse(decryptedInfo.data).data;

      this.loading = false;
      //  this.loadingInfo=false;
    },

    cancel() {
      this.dialog = false;
    },
    save() {
      this.dialog = false;
      EventBus.$emit("addCC", this.selected);
      // console.log(this.selected[0].Lastname+", "+this.selected[0].Firstname);
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>