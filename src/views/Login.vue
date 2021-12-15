<template>
  <v-app>
    <v-content>
      <v-container class="container fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="7">
            <v-card class="elevation-12">
              <v-col>
                <v-card-text class="mt-5">
                  <h1 class="text-center " >LOG IN</h1>
               
               <v-form>
              <div class="row">
                <!-- <label for="username">Username</label> -->
                <v-text-field
                  label="Username"
                  v-model="credentials.username"
                  class="input"
                  name="username"
                  flat
                  filled
                  hide-details="auto"
                />
              </div>

          
            <div class="row">
              <!-- <label for="password">Password</label> -->
              <v-text-field
                label="Password"
                v-model="credentials.password"
                type="password"
                name="password"
                class="input"
                filled
                hide-details="auto"
              />
            </div>

            
            <div class="row">
              <!-- <label for="domain">Domain</label> -->
              <v-select
                label="Domain"
                class="input"
                :items="['Local User', 'cloudninja.com']"
                clearable
                filled
                hide-details="auto"
              />
            </div>

          </v-form>
            <div id="connectBtnDiv">
              <v-btn
                :loading="authenticating"
                class="mb-5 px-3"
                id="connectBtn"
                @click="login()"
                >Login</v-btn
              >
            </div>

            
            </v-card-text>
            <div class="text-center mt-1 googleSignIn">
              <!-- <div id="logInViaGoogleDiv"> -->
               <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
                :logoutButton= false
                :onFailure="onFailure"
              ></GoogleLogin>
              <!-- </div> -->
            </div>
          </v-col>
                          
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PromptAlert from "@/utils/PromptAlert";
import Decryption from "@/utils/Decryption";
import Encryption from "@/utils/Encryption";
import CRUD from "@/utils/CRUD";

import GoogleLogin from "vue-google-login";

export default {
  name: "Login",

  mixins: [PromptAlert, Decryption, Encryption, CRUD],

  components: {
    GoogleLogin,
  },

  data() {
    return {
      authenticating: false,
      credentials: {
        username: "",
        password: "",
        isGmail: 0,
      },

      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },

  methods: {
    
    login: async function () {
      this.authenticating = true;
      try {
        let encryptedData = await this.encrypt(this.credentials);

        if (encryptedData) {
          let addNew = await this.$store.dispatch(
            "loginLocally",
            encryptedData.data
          );

          let resData =
            typeof addNew.data === "object"
              ? addNew.data
              : JSON.parse(addNew.data);

          switch (addNew.status) {
            case 200: {
              console.log(resData)
              let tokenRes = JSON.parse(this.$store.getters.loggedUserToken);
              // console.log(tokenRes)
              if(tokenRes.error == 'invalid_grant'){
                 this.showWarningResponse("Log In Failed",tokenRes.error_description)
                  this.authenticating = false;
              }else{
                await this.retrieveProfile(),
                  this.$router.push({ path: "/home" });
                this.authenticating = false;
              }
              break;
            }

            case 500:
              this.showErrorResponse("Log In Failed", "Something went wrong");
              this.authenticating = false;
              break;

            default:
      //         if(result.data.error === 'invalid_grant'){
      //     this.showWarningResponse(result.data.error.error_description)
      //  }
              this.authenticating = false;
              break;
          }
        }
      } catch (error) {
        this.authenticating = false;
        return false;
      }
    },

    loginWithGoogle() {
  
      this.$auth.loginWithRedirect();
    },

    onSuccess: async function (googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      // console.log(googleUser.getBasicProfile());
          console.log(process.env.VUE_APP_CLIENT_ID)
      let googleUserProfile = googleUser.getBasicProfile();
      let data = {
        email: googleUserProfile.Tt,
        isGmail: 1,
      };
      this.authenticating = true;
      try {
        let encryptedData = await this.encrypt(data);

        if (encryptedData) {
          let addNew = await this.$store.dispatch(
            "loginUsingGoogle",
            encryptedData.data
          );

          let resData =
            typeof addNew.data === "object"
              ? addNew.data
              : JSON.parse(addNew.data);
          console.log(resData)
          console.log(addNew)
          switch (addNew.status) {
            case 200: {
              let tokenRes = JSON.parse(this.$store.getters.loggedUserToken);
              if (tokenRes.error)
                this.showWarningResponse(
                 `${tokenRes.error_description}`
                );
              if (tokenRes.access_token) {
                let getProf = await this.retrieveProfile();

                if (!getProf){
                    // this.showSuccessResponse("Success", "Welcome to 201Pay!");
                    break;
                }
                  
                this.$router.push({ path: "/home" });
              }
              this.authenticating = false;
              break;
            }

            case 500:
              this.showErrorResponse("Something went wrong");
              this.authenticating = false;
              break;

            default:
              this.showErrorResponse("Something went wrong");
              this.authenticating = false;
              break;
          }
        }
      } catch (error) {
        this.authenticating = false;
        return false;
      }
    },
  
    retrieveProfile: async function() {
      let getProfile = await this.$store.dispatch("retrieveUserData");

      switch (getProfile.status) {
        case 200: {
          return true;
          
        }
        case 500: {
          this.showWarningResponse(
            "Something went wrong!"
          );
          return false;
        }
        default:
          this.showWarningResponse(
            "Something went wrong!"
          );
          return false;
      }
    },

    onFailure() {
      console.log("Cannot authorize user");
    },
  },

  computed: {
    params() {
      return {
        client_id: process.env.VUE_APP_CLIENT_ID,
      };
    },
  },
};
</script>

<style scoped>
.container {
  width: 50%;
}

/* * {
  box-sizing: border-box;
} */
/* .app {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  
  font-family: "Helvetica";
} */
/* .card {
  font-size: 16px;
  color: #cbcbcb;
  height: auto; */
/* width: auto; */
/* width: 400px; */
/* background-color: white; --#f3f5f8
  padding: 50px 0;
  border-radius: 5px;
  font-style:arial;
  text-align: center;
  
} */
/* .parentContainer{
  padding: 25px 40px 25px 40px;
  background-color: #e8ebef;
  border-radius: 4%;
  height: auto;
  width: max-content;
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
}  */
/* .LogIn{
  color:black;
  text-align: left;
  display: inline-block;
  width: 50%;
  margin-left: 10%;
  font-weight: bolder;
} */
.row {
  margin: 3vh 0 4vh 0;
  /* display: inline-block; */
  width: 100%;
  /* text-align: center; */
}

/* label {
 text-align: left;
  font-size: 15px;
  margin-left: 10%;
} */

/* .input { */
/* padding: 10px; */
/* margin-left: auto;
  margin-right: auto;
  color:  #e8ebef; 
  text-align: center;
  display: inline-block; */
/* border-radius: 5px; */

/* width: 80%; */
/* width: auto; */
/* } */
/* hr {
  margin: 5% 10% 10%;
} */
#connectBtnDiv {
  /* display: inline-block; */
  /* width: 100%; */
  text-align: center;
  /* margin-left:auto;
  margin-right: auto; */
}

#connectBtn {
  padding: 8px 10px;
  width: 100%;
  margin-top: 15px;
  background-color: rgba(47, 110, 226, 0.856);
  border-radius: 5px;
  color: white;
}
#google-signin-btn-0 {
  padding: 10px 30px;
  /* background-color: #ff4342; */
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
}

/* .abcRioButtonContentWrapper {
  margin: auto;
  border-radius: 10px;
} */

/* #logInViaGoogleDiv { */
/* width: 80%; */
/* text-align: center; */
/* justify-content: space-around; */
/* margin-right: auto; */
/* margin-left: auto; */
/* } */


</style>
