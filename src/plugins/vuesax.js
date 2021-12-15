import Vue from "vue";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css"; //Vuesax styles

const vuesax = Vue.use(Vuesax, {
  colors: {
    success: "rgb(23, 201, 100)",
    danger: "rgb(242, 19, 93)",
    warning: "rgb(255, 130, 0)",
    dark: "rgb(36, 33, 69)",
    primary: "#2F2FA1",
    secondary: "#EDF5E0",
    light: "#ffffff",
    gray: "#707070",
  },
});

export default vuesax;
