<template>
  <!-- <v-app>
    <v-container style="height: 100%">
      <div class="text-left"> -->
        <!-- <div class="display-1"> -->
          <!-- <BreadCrumb/> -->
          <!-- <span class="primary--text"> {{ $route.meta.title }} </span> -->
        <!-- </div> -->
      <!-- </div>
      <router-view />
    </v-container>
  </v-app> -->
   <v-app>
    <v-container>
        <BreadCrumb/>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import BreadCrumb from /* webpackChunkName: "Data Table" */ "@/components/BreadCrumbs.vue";
export default {
  name: "KioskMain",
  components:{
    BreadCrumb
  },
  created() {
    // const modifiedBy=JSON.parse(localStorage.getItem("user_details"));
    // console.log(modifiedBy);
  },
};
</script>
