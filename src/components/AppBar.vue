<template>
  <v-app-bar app color="white" dark elevation="1">
    <v-icon size="30" class="text-secondary" dark @click="toggleDrawer()">
      mdi-menu
    </v-icon>
    <div class="display font-weight-bold">
      <span class="text-secondary ml-5">{{ $route.meta.title }}</span>
    </div>
    <v-spacer></v-spacer>
    <!-- <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="brown"
              size="48"
            >
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                :to="{name: 'profile'}"
              >
                Profile
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu> -->

    <p class="text-secondary pt-4">{{ FirstName + " " + LastName }}</p>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="" class="mr-5" v-bind="attrs" v-on="on">
          <v-icon dark size="30" color="gray"> mdi-account-circle </v-icon>
        </v-avatar>
      </template>
      <v-list>
          <v-list-item style="font-size:11px">You are sign in as &nbsp;&nbsp; <a href=""> {{ Email }} </a><v-icon class="ml-2"></v-icon></v-list-item
        >
        <v-list-item @click="$router.push({ path: '/login' })"
          >Change User <v-icon class="ml-2">mdi-account-plus</v-icon></v-list-item
        >

        <v-list-item @click="$router.push({ path: '/home/profile' })"
          >View profile <v-icon class="ml-4">mdi-account</v-icon>
        </v-list-item>

        <v-list-item color="danger" @click="logoutUser()">
          <span style="color:red;"> Logout </span><v-icon color="danger" class="ml-5 pl-7"> mdi-arrow-collapse-right</v-icon></v-list-item
        >
      </v-list>
    </v-menu>

    <!-- <p class="text-secondary pt-4">{{FirstName}}</p>
    <v-avatar color="" class="mr-2">
      <v-icon
        dark
        size="30"
        color="gray"
        @click="$router.push({ path: '/home/profile' })"
      >
        mdi-account-circle
      </v-icon>
    </v-avatar> -->
  </v-app-bar>
</template>
<script>
export default {
  //  data: () => ({
  //     user: {
  //       initials: 'JD',
  //       fullName: 'John Doe',
  //       email: 'john.doe@doe.com',
  //     },
  //   }),

  data() {
    return {
      FirstName: JSON.parse(localStorage.getItem("user_details")).data
        .FirstName,
      LastName: JSON.parse(localStorage.getItem("user_details")).data.LastName,
      Email: JSON.parse(localStorage.getItem("user_details")).data.Email,
    };
  },
  mounted() {
    // console.log(process.env.SERVER);
  },

  created() {
    console.log(JSON.parse(localStorage.getItem("user_details")));
    // created(){
    //console.log(JSON.parse(localStorage.getItem("user_details")));
  },
  methods: {
    toggleDrawer: function () {
      this.$store.commit("toggleDrawerState");
    },
    logoutUser() {
      this.$store.dispatch("logout");
     
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}

</style>