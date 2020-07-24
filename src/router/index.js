import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Select from '../views/Select.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import CheckEmail from '../views/CheckEmail.vue';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import NotFound from '../views/NotFound.vue';
import About from '../views/About.vue';
import Messages from '../views/Messages.vue';
import Archive from '../views/Archive.vue';
import SendMessage from '../views/SendMessage.vue';
import SendEmail from '../views/SendEmail.vue';

Vue.use(VueRouter)
  
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/select',
    name: 'select',
    component: Select
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  },
  {
    path: '/checkemail',
    name: 'checkemail',
    component: CheckEmail
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/sendmessage',
    name: 'sendmessage',
    component: SendMessage
  },{
    path: '/sendemail',
    name: 'sendemail',
    component: SendEmail
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
