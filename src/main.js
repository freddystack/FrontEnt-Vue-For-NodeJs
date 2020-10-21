import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate';
import moment from 'moment';
import VueMoment from 'vue-moment';
import { required } from 'vuelidate/lib/validators';


required('moment/locale/es');

Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(VueMoment, { moment });

//axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: function(h) { return h(App) }
}).$mount('#app')