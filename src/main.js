/* eslint-disable array-callback-return */
import Vue from 'vue';
import App from './App.vue';
import PYUI from 'pyff-vue/src/index';
import 'pyff-vue/src/styles/theme-default/lib/index.css';
import VueRouter from 'vue-router';
import store from './store/store';
import Vuex from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './routes';
import Mock from './mock';
import 'font-awesome/css/font-awesome.min.css';
import VueParticles from 'vue-particles';

Mock.bootstrap();

// 标识生产环境变量
const isProduction = process.env.NODE_ENV === 'production';
Vue.use(PYUI);
Vue.use(VueParticles);
Vue.use(VueRouter);
Vue.use(Vuex);

NProgress.configure({ showSpinner: true });

const router = new VueRouter({
  // mode: 'hash',
  // base: __dirname,
  routes,
});

const setRouteConfig = function (routeConfigs, item) {
  routeConfigs.push(item);
  if (item.children) {
    item.children.forEach(em => setRouteConfig(routeConfigs, em));
  }
};
const routeConfigs = [];
const initRouteConfig = function () {
  routes.forEach(item => setRouteConfig(routeConfigs, item));
};
initRouteConfig();

// 路由请求之前的处理
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  const user = sessionStorage.getItem('user');//JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

const findRouterName = function (item, route) {
  if (item.name === route.name) return true;
  if (item.children) {
    return item.children.some(em => findRouterName(em, route));
  }
  return false;
};
const findLeftMenus = function (item, routeName) {
  if (item.children) {
    if (item.children.some(em => em.name === routeName)) {
      return item.children;
    }
    let result = [];
    item.children.map((em) => {
      const finds = findLeftMenus(em, routeName);
      if (finds && finds.length > 0) result = finds;
    });
    return result;
  }
  return [];
};
const findRouteConfig = function (routeName) {
  const configs = routeConfigs.filter(item => (item.name === routeName));
  if (configs.length === 0) {
    console.error(`没能找到路由名称为${routeName}的路由`);
  } else if (configs.length === 1) {
    return configs[0];
  } else {
    console.warn(`找到多个路由名称为${routeName}的路由`);
    return configs[configs.length - 1];
  }
  return false;
};
const findLeftMenuName = function (route) {
  for (let i = route.matched.length - 1; i >= 0; i--) {
    const config = findRouteConfig(route.matched[i].name);
    if (!config.hidden) {
      return route.matched[i].name;
    }
  }
  return '';
};

// 路由请求之后的处理
router.afterEach((route) => {
  // //处理页面标题信息
  // const data = title[route.meta.lang];
  // for (let val in data) {
  //   if (new RegExp('^' + val, 'g').test(route.name)) {
  //     document.title = data[val];
  //     return;
  //   }
  // }
  // document.title = '品友前端框架';

  let activeName = '';
  routes.filter(item => findRouterName(item, route)).forEach((item, i) => {
    if (i === 0) {
      activeName = item.name;
      store.dispatch('setTopMenuActive', item.name);
    }
  });
  let leftMenus = [];
  const leftMenuName = findLeftMenuName(route);
  const breadcrumbs = [];
  if (activeName === 'platform') {
    routes.forEach((item) => {
      if (item.name === activeName) {
        leftMenus = item.children;
      }
    });
  } else {
    routes.forEach((item) => {
      if (item.name === activeName) {
        leftMenus = findLeftMenus(item, leftMenuName);
      }
    });
  }
  store.dispatch('setLeftMenus', leftMenus);
  // 更新面包屑
  route.matched.forEach((item) => {
    const config = findRouteConfig(item.name);
    // 当配置为''时，不显示子级
    if (config.path !== '') { breadcrumbs.push(config); }
  });
  store.dispatch('setBreadcrumbs', breadcrumbs);
  Vue.nextTick(() => {
    // DOM 更新再进行左侧的选中
    store.dispatch('setLeftMenuActive', leftMenuName);
  });
  NProgress.done();
});
// 定义全局可访问，只能在不能使用this引用的情况下使用
global.PYFF = new Vue({
  // el: '#app',
  // template: '<App/>',
  router,
  store,
  // components: { App }
  render: h => h(App),
}).$mount('#app');

