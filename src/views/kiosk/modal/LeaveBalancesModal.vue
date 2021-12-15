<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1100">
      <v-card>
        <v-card-title class="grey lighten-2">
          Leave Balances Details
        </v-card-title>
        <br />
        <v-card-text>
          <v-data-table :headers="headers" :items="leaveBalances">
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
            depressed
            color="red"
            class="btnStyle mb-2 mt-2"
            text
            @click="dialog = false"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from "../../../bus/bus";
import moment from "moment";

export default {
  //   props: ["modal"],
  data() {
    return {
      dialog: false,

      headers: [
        {
          text: "Leave Type",
          align: "start",
          value: "LeaveType",
        },

        { text: "Start Date", value: "StartDate" },
        { text: "End Date", value: "EndDate" },
        { text: "Carried Over Expiry", value: "CarriedOverExpiry" },
        { text: "Beginning", value: "Beginning" },
        { text: "Carried Over", value: "CarriedOver" },
        { text: "Total Beginning Credits", value: "TotalBegCredits" },
        { text: "Availed", value: "Approved" },
        { text: "Expired Carried Over", value: "ExpiredCarriedOver" },
        { text: "Balance", value: "Balance" },
      ],
      dataItems: [],
    };
  },
  created() {
    EventBus.$on("leaveBalancesModal", (data) => {
      this.dialog = data;
    });
    EventBus.$on("LeaveBalancesData", (data)=> {
        this.dataItems=[];
        for (let index = 0; index < data.length; index++) {
            this.dataItems.push(data[index])    
        }
      
    })
  },

  computed: {
    leaveBalances() {
      if (!this.dataItems || this.dataItems.length === 0) return [];
      return this.dataItems.map((item) => {
        return {
          ...item,
          CarriedOverExpiry: moment(item.CarriedOverExpiry).format("L"),
          StartDate: moment(item.StartDate).format("L"),
          EndDate: moment(item.EndDate).format("L"),
        };
      });
    },
  },
};
</script>
<style scoped>
.btnStyle {
  margin-left: 92%;
  margin-right: auto;
}
</style>
