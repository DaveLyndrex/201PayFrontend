<template>
  <v-container>
    <div class="justify-center align-center" style="height: 100%">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="4" class="d-flex align-center">
              <span class="primary--text font-weight-bold">{{
                reversedMessage
              }}</span>
            </v-col>
            <!-- v-if="inputField.inputType === 'money'" -->
            <v-col cols="8">
              <v-text-field
                v-model="test"
                ref="money"
                dense
                hide-details="auto"
                solo
                rounded
                @keydown="press = true"
              />
              <!-- @change="formatMoney(inputField.inputModel)" -->
              <!-- placeholder="PHP 1,000,000.00" -->
              <!-- pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" -->
              <!-- @change="money(inputField.inputModel)" -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <br />
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actionBtns" />
      </v-card-actions>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Test",

  components: {},

  data() {
    return {
      test: "",
      press: false,
    };
  },

  methods: {},

  computed: {
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.test.split(" ").join(",");
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.app {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  background: #edf5e0;
  font-family: "Helvetica";
}
.card {
  color: white;
  position: absolute;
  height: auto;
  width: 500px;
  background: #2f2fa1;
  padding: 50px 0;
  border-radius: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.row {
  margin: 1vh 0 1vh 0;
  display: inline-block;
  width: 90%;
  text-align: center;
}

label {
  float: left;
  font-size: 20px;
  margin: 15px 0 0 80px;
}

.input {
  padding: 10px 20px;
  margin: 8px 0;
  /* background-color: white; */
  width: 50%;
  float: right;
}
hr {
  margin: 5% 10% 10%;
}
#connectBtnDiv {
  text-align: right;
  width: 90%;
}
#connectBtn {
  padding: 5px 10px;
  margin-top: 20px;
  background-color: #cbcbcb;
  border-radius: 5px;
  color: #848484;
}
#google-signin-btn-0 {
  padding: 10px 30px;
  /* background-color: #ff4342; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.abcRioButtonContentWrapper {
  margin: auto;
  border-radius: 10px;
}

#logInViaGoogleDiv {
  width: 100%;
  text-align: center;
  justify-content: space-around;
  align-content: center;
  align-items: center;
}
</style>
