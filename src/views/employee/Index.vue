<template>
  <v-app>
    <v-container>
        <BreadCrumb/>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import BreadCrumb from /* webpackChunkName: Bread Crumbs" */ "@/components/BreadCrumbs.vue";
export default {
  
  name: "EmployeeMain",
   components:{
    BreadCrumb
  }
};
</script>