<template>
  <!-- <div>
    <b-alert show>Default Alert</b-alert>

    <b-alert variant="success" show>Success Alert</b-alert>

    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      Dismissible Alert!
    </b-alert>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button>
    <b-button @click="showDismissibleAlert=true" variant="info" class="m-1">
      Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
    </b-button>
  </div> -->
  <div class="alert-cont">
    
    <v-alert
      v-if="response=='success'"
      dense
      text
      type="success"
      class="alert"
    >
      
      {{message}}
    </v-alert>
    <v-alert
    v-if="response=='warning'"
      dense
      border="left"
      type="warning"
      class="alert"
    >
     {{message}}
    </v-alert>
    <v-alert
    v-if="response=='error'"
      dense
      outlined
      type="error"
      class="alert"
    >
      {{message}}
    </v-alert>

  </div>
</template>

<script>
  export default {
    props: ["response","message"],
    data() {
      return {
        dismissSecs: 10,
        dismissCountDown: 0,
        showDismissibleAlert: false
      }
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>

<style scoped>
  .alert-cont{
    max-width: 36%;
    position: absolute;
    border: none;
    z-index: 1;
    word-wrap: break-word;
    top: 0;
    right: 0;
    margin: 10px;
  }
  .alert{
    border: none;
  }
</style>