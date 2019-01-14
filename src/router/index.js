import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index/index';
import demo from '@/components/demo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
});
