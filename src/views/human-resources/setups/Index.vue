
<template>
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
  name: "HRSetupMain",
  components:{
    BreadCrumb
  },
  created() {
    // const modifiedBy=JSON.parse(localStorage.getItem("user_details"));
    // console.log(modifiedBy);
  },
};
</script>
