<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <b-link v-bind="attrs" v-on="on" variant="info" size="sm">
          <b-icon icon="arrow-repeat"></b-icon>
          Change Requester</b-link
        >
      </template>

      <v-card>
        <v-card-title class=""> Requester </v-card-title>

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
            :items-per-page="2"
            :headers="headers"
            :items="employees"
            :search="search"
            item-key="EmpID"
            loading-text="Loading... Please wait."
            show-select
            single-select
            :loading="loading"
          ></v-data-table>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="red" class="mb-2 mt-2" text @click="cancel">
            Cancel
          </v-btn>
          <v-btn
            depressed
            :disabled="this.selected == [] ? true : false"
            color="primary"
            class="mb-2 mt-2"
            text
            @click="save"
          >
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
  name: "ModalChangeRequest",
  mixins: [PromptAlert, Decryption, Encryption, CRUD],
  data() {
    return {
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
     EventBus.$on("clickChange", (data) =>{
       this.dialog=data;
     });
    this.getEmployees();
  },

  methods: {
    enterSelect() {
      console.log(this.selected.map((e) => e.ID)); // logs all the selected items.

      if (this.selected.length == this.itemsPerPage) {
        alert("selected all");
      }
    },

    getEmployees: async function () {
      let getData = await this.$store.dispatch("retrieveEmployees", {
        id: 0,
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
      EventBus.$emit(
        "requesterName",
       this.selected[0]
      );
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>