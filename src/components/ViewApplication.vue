<!-- 10/12/2021 CN JLAYAOG -->
<template>
  <div>
    <!-- <button @click="test()" class="btn btn-primary">Test</button> -->
    <b-dropdown
      toggle-class="text-light"
      id="dropdown-1"
      text="Add request"
      class="m-md-2"
      variant="primary"
    >
      <template #button-content class="addReqBtn">
        <span style="font-size: 15px" class="text-light mr-2">
          View Application</span
        >
      </template>
      <b-dropdown-item
        class="mx-auto mr-5 dropdown-content"
        v-for="(item, index) in menu"
        :key="index"
        @click="addRequestMethod(item.title)"
      >
        <span class="text-secondary">
          {{ item.title }}
          <b-icon-caret-down-fill
            :scale="0.6"
            v-if="item.children"
          ></b-icon-caret-down-fill
        ></span>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
import { EventBus } from "../bus/bus";
export default {
  data: () => ({
    request: [],
    menu: [
      { title: "COA" },
      { title: "OT" },
      {
        title: "Leave",
      },
      { title: "Shift" },
      { title: "All" },
    ],
  }),
  methods: {
    addRequestMethod(message) {
      this.redirectApplication(message);
    },
    redirectApplication(message) {
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
        case "All":
          if (this.$router.history.current.path == "/home/kiosk/awaiting-approval") {
            EventBus.$emit("closeRequest", true);
          } else {
            this.$router.push("/home/kiosk/awaiting-approval");
          }
          break;
      }
    },
  },
};
</script>
<style scoped>
.sub-menu {
  position: absolute;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  z-index: 99999;
}
</style>