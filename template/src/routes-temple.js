exports.temple = `/* Automatic generated by './build/build-routes-entry.js' */
{{include}}

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    hidden: true,
  },
  {
    path: '/',
    component: HelloworldHello,
    name: 'hello',
    iconCls: 'py-icon-message', // 图标样式class
  },
  {
    path: '/404',
    component: NotFound,
    name: 'notFound',
    hidden: true,
  },
  {
    path: '/unopened',
    component: Unopened,
    name: 'unopened',
    hidden: true,
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' },
  },
];

export default routes;

`;
