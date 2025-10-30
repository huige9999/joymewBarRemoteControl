import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/controller',
  },
  {
    path: '/controller',
    name: 'controller',
    component: () => import('@/views/v2/index.vue'),
    meta: {
      title: '遥控器',
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
