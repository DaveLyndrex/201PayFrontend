<!-- 10/12/2021 CN JLAYAOG -->
<template>
  <div class="text-center">
    <!-- <v-dialog :persistent="code == 100" v-model="dialog" width="500">-->
    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-text class="text-h5 p-4 text-center lighten-2">
          <b-icon icon="exclamation-circle-fill" variant="info"></b-icon>
          {{ message }} Request
        </v-card-text>

        <v-card-text v-if="code == 100">
          <v-toolbar flat class="p-2 ml-12">
            <v-btn plain :loading="true">
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template></v-btn
            >
            <p class="pt-4" style="font-size: 20px">
              {{ success == null ? "Processing Request" : success }}
            </p>
          </v-toolbar>
        </v-card-text>

        <v-card-text v-if="code == 200">
          <p class="pt-4 text-center text-dark" style="font-size: 20px">
            {{ success == null ? "Processing Request" : success }}
          </p>
        </v-card-text>

        <v-card-text v-if="warning">
          <p class="pt-4 text-center text-dark" style="font-size: 20px">
            {{ warningMessage }}
          </p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="code == 100"
            text
            @click="okayBtn(message, code)"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from "../../../bus/bus";
export default {
  components: {},
  data() {
    return {
      type: "",
      warning: false,
      warningMessage: "",
      loader: null,
      message: "",
      error: false,
      code: 10,
      dialog: false,
      success: null,
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  created() {
    EventBus.$on("HandleMessage", (data) => {
      this.warning = false;
      this.dialog = data.error == false ? true : false;
      this.error = data.error;
      this.code = data.code;
      this.success = data.success;
      this.message = data.message;
    });

    EventBus.$on("HandleMessageLeave", (data) => {
      this.code = 0;
      this.warning = data.warning;
      this.dialog = data.warning;
      this.message = data.type;
      this.warningMessage = data.warningMessage;
   
    });
    console.log(this.$router.history.current.path);
  },

  methods: {
    okayBtn(message, code) {
      this.warning=false
      this.dialog=false
      if (code == 200) {
        switch (message) {
          case "COA":
            if (
              this.$router.history.current.path ==
              "/home/kiosk/certificate-of-attendant"
            ) {
              EventBus.$emit("closeRequest", true);
            } else {
              this.$router.push("/home/kiosk/certificate-of-attendant");
            }
            break;
          case "OT":
            if (this.$router.history.current.path == "/home/kiosk/overtime") {
              EventBus.$emit("closeRequest", true);
            } else {
              this.$router.push("/home/kiosk/overtime");
            }
            break;
          case "Leave":
            if (this.$router.history.current.path == "/home/kiosk/leave") {
              EventBus.$emit("closeRequest", true);
            } else {
              this.$router.push("/home/kiosk/leave");
            }
            break;
          case "Shift":
            if (this.$router.history.current.path == "/home/kiosk/shift") {
              EventBus.$emit("closeRequest", true);
            } else {
              this.$router.push("/home/kiosk/shift");
            }
            break;
        }
      } else {
        this.dialog = false;
      }
    },
  },
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>