import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: '#c20312',
            },
            dark: {
                primary: '#c20312',
            },
        },
    },
});
