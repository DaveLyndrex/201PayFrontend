import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vuesax from "./plugins/vuesax";
import store from "./store";
import IdleVue from 'idle-vue';
import Axios from 'axios'
import "sweetalert2/dist/sweetalert2.min.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import JsoncSV from 'vue-json-csv';

import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    duration: 3000,
    position: 'top-right',
    // action: {
    //     text: 'Okay',
    //     onClick: (e, toastObject) => {
    //         toastObject.goAway(0);
    //     }
    // }
})

Vue.component('downloadCSV', JsoncSV)
    // Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

const eventsHub = new Vue();

Vue.use(IdleVue, {
    eventEmitter: eventsHub,
    store,
    idleTime: 1800000,
    startAtIdle: false,
})

new Vue({
    router,
    vuetify,
    vuesax,
    store,
    render: (h) => h(App),
}).$mount("#app");