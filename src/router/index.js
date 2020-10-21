import Vue from 'vue';
import VueRouter from 'vue-router';
//import Home from '../views/Home.vue';
import SignUp from "../components/signUp.components.vue";
import Signin from "../components/signin.components.vue";
import ListaUsuarios from "../components/listaUs.components.vue";
import Post from "../components/post.components.vue";
import News from "../components/news.components.vue";
import NuevoPost from "../components/newPost.components.vue";
import Home from '../components/home.component.vue';
//import home from '../components/home'

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signup/:id/:body',
        name: 'signup',
        component: SignUp

    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin

    },
    {
        path: '/listauser',
        name: 'listauser',
        component: ListaUsuarios,
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('token')) {
                next("/signin");
            } else {
                next();
            }
        }

    },
    {
        path: '/post',
        name: 'post',
        component: Post,
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('token')) {
                next("/signin");
            } else {
                next();
            }
        }

    },
    {
        path: '/news/:id',
        name: 'news',
        component: News,
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('token')) {
                next("/signin");
            } else {
                next();
            }
        }

    },
    {
        path: '/newpost/:id/:body',
        name: 'newpost',
        component: NuevoPost,
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('token')) {
                next("/signin");
            } else {
                next();
            }
        }

    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes


})


export default router