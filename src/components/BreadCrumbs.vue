<template>
  <div>
    <b-breadcrumb
      v-if="$route.fullPath.split('/')[2] != 'human-resource'"
      class="sticky bg-white"
    >
      <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
      <b-breadcrumb-item
        v-for="item in items.slice(1, -1)"
        :key="item.path"
        :to="item.path"
      >
        {{ item.name }}</b-breadcrumb-item
      >
      <b-breadcrumb-item active>{{ $route.meta.title }}</b-breadcrumb-item>
    </b-breadcrumb>

    <b-breadcrumb v-else class="sticky bg-white">
      <b-breadcrumb-item
        v-for="(item, index) in data"
        :key="item.path"
        @click="data.length - 1 != index ? redirect(item.path) : ''"
        :active="item.name.toLowerCase() === $route.meta.title.toLowerCase()"
      >
        {{ item.name }}
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>
<script>
import { EventBus } from "@/bus/bus";
export default {
  data() {
    return {
      items: [],
      hr: [],
      data: [],
      temp: "",
      temp2: "",
    };
  },
  watch: {
    $route() {
      this.getRoute();
    
    },
  },
  methods: {
    redirect(path) {
      EventBus.$off("deleteItem");
      let routes = this.items[this.items.length - 1].path.split("/");
      routes.pop();
      if (
        path.split("/")[path.split("/").length - 1] != routes[routes.length - 1]
      ) {
        this.$router.push(path);
      }
    },
    getRoute() {
     
      this.items = this.$route.matched;
        console.log(this.items);
      // this.items.shift();
      // console.log(window.location);
    },
    setCharAt(str, index, chr) {
      if (index > str.length - 1) return str;
      return str.substring(0, index) + chr + str.substring(index + 1);
    },

    upperCaseFirstChar(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },

  created() {
    this.getRoute();
    this.hr = this.$route.fullPath.split("/");
    for (let item of this.hr) {
      let name = "name";
      let path = "path";
      this.temp2 = this.temp + "/" + item;
      this.temp = this.temp2;
      if (item != "") {
        this.data.push({
          [name]: item
            .replace(/(^|-)(\S)/g, (s) => s.toUpperCase())
            .replace(/-/g, " "),
          [path]: this.setCharAt(this.temp, 0, ""),
        });
      }
    }
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.sticky {
  position: sticky;
  top: 60px;
  z-index: 2;
  /* padding: 0px 100px; */
  padding-top: 20px;
  background-color: white !important;
  padding-bottom: 20px;
}
</style>
