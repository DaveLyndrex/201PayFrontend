<template>
  <v-app>
    <v-container class="mainContainer">
      <p class="ml-5 pl-5 mt-5 ">Profile</p>
      <v-row>
        <v-col cols="5">
          <v-icon class="acc_icon" size="200"> mdi-account-box </v-icon>
        </v-col>
        <v-col class="mb-5 pb-5" cols="5">
          <v-row no-gutters>
            <v-col> Email: </v-col>
            <v-col> {{userData.Email}} </v-col>
          </v-row>
          <v-row>
            <v-col> Username: </v-col>
            <v-col> {{userData.Username}} </v-col>
          </v-row>
          <v-row>
            <v-col> Company: </v-col>
            <v-col> {{this.company}} </v-col>
          </v-row>
          <v-row>
            <v-col> Position: </v-col>
            <v-col>  </v-col>
          </v-row>
          <v-row>
            <v-col> First Name: </v-col>
            <v-col> {{userData.FirstName}} </v-col>
          </v-row>
          <v-row>
            <v-col> Middle Name: </v-col>
            <v-col> {{userData.MiddleName}} </v-col>
          </v-row>
          <v-row>
            <v-col> Last Name: </v-col>
            <v-col> {{userData.LastName}} </v-col>
          </v-row>
          <v-row>
            <v-col> Suffix: </v-col>
            <v-col></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "ProfileMain",
  data() {
    return {
      userData: null,
      update: false,
      editBasicInfo: false,
      settings: [],
      company:"",
    };
  },

  created() {
    let storedUserData = localStorage.getItem("user_details");
    this.userData = JSON.parse(storedUserData).data;
    console.log(this.userData);

    // // get Company
    let getCompany = this.$store.getters.allCompanies;
    this.company = getCompany[0].CompanyName ;
    
    // //get Suffix
    let suffix = this.$store.getters;
    console.log(suffix);
  },

  computed: {
    btnText() {
      return this.update === true ? "save" : "update";
    },
  },
};
</script>

<style lang="scss" scoped>
.acc_icon {
  height: 150px;
  width: 240px;
  color: lightgray;
}
.mainContainer {
  background-color: #f3f5f8;
  margin-top: 30px;
  margin-left: auto;
  width: 70%;
}

// .grid-container {
//   width: 100%;
//   display: grid;
//   grid-template-columns: 50% 50%;
//   grid-gap: 10px;
// }

// .item1 {
//   grid-row-start: 1;
//   grid-row-end: 3;
// }
</style>
