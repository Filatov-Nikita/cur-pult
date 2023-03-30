import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue'), name: 'main' },
      { path: 'category', component: () => import('pages/CategoryCreate.vue'), name: 'category.create' },
      { path: 'categories/:catId/items', component: () => import('pages/ItemsShow.vue'), name: 'items.show', props: true },
      { path: 'login', component: () => import('pages/LoginPage.vue'), name: 'login' },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
