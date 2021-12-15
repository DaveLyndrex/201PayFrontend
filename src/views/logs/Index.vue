<template>
  <v-app>
    <v-container>
      <div class="text-left">
        <div class="display-1">
          <span class="primary--text"> {{ $route.meta.title }} </span>
        </div>
      </div>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "LogsMain",
};
</script>
