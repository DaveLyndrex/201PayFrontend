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
        <b-icon icon="plus" scale="1.2"></b-icon>
        <span style="font-size: 15px" class="text-light mr-2">
          Add Request</span
        >
      </template>
      <b-dropdown-item
        class="mx-auto mr-5 dropdown-content"
        v-for="(item, index) in menu"
        :key="index"
        @mouseover.native="toogleItem(index)"
        @mouseout.native="toogleItem(index)"
        @click="addRequestMethod(item.title)"
      >
        <span class="text-secondary">
          {{ item.title }}
          <b-icon-caret-down-fill
            :scale="0.6"
            v-if="item.children"
          ></b-icon-caret-down-fill
        ></span>
        <div v-if="item.children" class="sub-menu" v-show="item.showSubMenu">
          <b-dropdown-item
            v-for="(item, index) in item.children"
            :key="index"
            @click="addRequestMethod(item.title)"
          >
            <span class="text-secondary">{{ item.title }}</span>
          </b-dropdown-item>
        </div>
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
        showSubMenu: false,
        children: [
          { title: "Sick" },
          { title: "Vacation" },
          { title: "Undertime" },
          { title: "Birthday" },
          { title: "Emergency" },
          { title: "Maternity" },
          { title: "Paternity" },
          { title: "Calamity" },
          { title: "Educational" },
          { title: "Earned" },
          { title: "Study" },
          { title: "Service Incentive" },
          { title: "Relocation" },
          { title: "Magna Carta" },
          { title: "Solo Parent" },
          { title: "Bereavement" },
          { title: "Others" },
        ],
      },
      { title: "Shift" },
    ],
  }),
  methods: {
    addNewEvent(itemIndex) {
      EventBus.$emit("addRequest", {
        item: this.request.reverse(),
        index: itemIndex,
      });
      // console.log(this.request.reverse());
    },
    toogleItem(index) {
      if (this.menu[index].children) {
        if (!this.menu[index].showSubMenu) {
          this.menu[index].showSubMenu = true;
        } else {
          this.menu[index].showSubMenu = false;
        }
      }
    },
    test() {
      this.addNewEvent(1);
    },
    addRequestMethod(message) {
      this.request.push(message);
      this.addNewEvent(-1);
      setTimeout(() => {
        this.request = [];
      }, 500);
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