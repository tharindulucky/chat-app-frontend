import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/styles.css'

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert";
import multiguard from 'vue-router-multiguard';
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

import store from './stores/store';

import logger from './middleware/logger';
import authCheck from './middleware/auth-check';
import authCheckInverse from './middleware/auth-check-inverse';

import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Chat from './components/pages/Chat'
import NewChat from './components/pages/NewChat'

axios.defaults.baseURL = process.env.VUE_APP_APIHOST;
export const SocketInstance = io(process.env.VUE_APP_WSHOST);

console.log(process.env.VUE_APP_APIHOST)
console.log(process.env.VUE_APP_WSHOST)

Vue.use(VueRouter);
Vue.use(VueSimpleAlert);
Vue.use(SocketInstance);
Vue.use(new VueSocketIO({debug: true, connection: SocketInstance}));

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { 
      path: '/', 
      name: 'home',
      component: Home,
      beforeEnter: multiguard([authCheck.isLoggedIn]),
    },
    { 
      name: 'chat',
      path: '/sessions/:id/chat', 
      component: Chat,
      beforeEnter: multiguard([authCheck.isLoggedIn]),
    },
    { 
      name: 'new_session',
      path: '/sessions/new', 
      component: NewChat,
      beforeEnter: multiguard([authCheck.isLoggedIn]),
    },
    { 
      name: 'register',
      path: '/register', 
      component: Register,
      beforeEnter: multiguard([authCheckInverse.isNotLoggedIn]),
    },
    { 
      name: 'login',
      path: '/login', 
      component: Login, 
      beforeEnter: multiguard([authCheckInverse.isNotLoggedIn]), 
    },
    { 
      name: 'about',
      path: '/about', 
      component: About 
    },
  ]
});

router.beforeEach(logger.log);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
