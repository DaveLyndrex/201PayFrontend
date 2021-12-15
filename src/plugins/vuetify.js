import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const theme = {
    primary: "#3186f4",
    secondary: "#EDF5E0",
    danger: "#df4759",
    white: "#ffffff",
    gray: "#707070"
};

export default new Vuetify({
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
    },
});