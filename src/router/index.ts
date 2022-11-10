import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import {createDiscreteApi} from "naive-ui";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    children: [
      {
        path: 'label',
        name: 'label',
        component: () => import('@/views/Label.vue'),
      },
      {
        path: 'review',
        name: 'review',
        component: () => import('@/views/Review.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const {loadingBar} = createDiscreteApi(['loadingBar'])

router.beforeEach((to,from ,next) => {
  loadingBar.start()
  next()
})

router.afterEach((to,from) => {
  loadingBar.finish()
})

export default router
