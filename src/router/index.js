import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../view/Main.vue';
import Home from '../view/Home.vue';
import Classify from '../view/Classify.vue';
import Shopping from '../view/Shopping.vue';
import User from '../view/User.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'classify',
        name: 'Classify',
        component: Classify,
      },
      {
        path: 'shopping',
        name: 'Shopping',
        component: Shopping,
      },
      {
        path: 'user',
        name: 'User',
        component: User,
      },
    ],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../view/Search.vue'),
  },
  {
    path: '*',
    component: Classify,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
