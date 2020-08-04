import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/styles.css'

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert";

import store from './stores/store';

import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Home from './components/pages/Home'
import About from './components/pages/About'

Vue.use(VueRouter);
Vue.use(VueSimpleAlert);

axios.defaults.baseURL = "http://localhost:8000";

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/about', component: About },
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
