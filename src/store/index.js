import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        HTTP_URL: 'http://localhost:3000/api/',
        IsLogg: false,
    },
    mutations: {
        IsLoged(state) {
            if (localStorage.getItem('token')) {
                state.IsLogg = true;
            } else {
                state.IsLogg = false;
            }

        },
        LogOut() {
            const token = localStorage.getItem('token');
            if (token) {
                localStorage.removeItem('token');
            }
        },

    },

    actions: {

    },
    modules: {}
});