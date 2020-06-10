import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let baseRoute = [{
  path: '/',
  name: '登录',
  component: (resolve) => require(['../views/login.vue'], resolve)
}, {
    path: '/activeComp',
  name: '登录',
    component: (resolve) => require(['../views/activeComp.vue'], resolve)
},{
    path: '/matting',
  name: '抠图',
    component: (resolve) => require(['../views/matting.vue'], resolve)
}]

let router = new Router({
  routes: baseRoute
});

router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + 'webpack init';
  next();
});

export default router;