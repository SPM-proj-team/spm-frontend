import { createRouter, createWebHistory } from 'vue-router'
import StaffHome from '../views/StaffHome.vue'

const routes = [
  {
    path: '/',
    name: 'Staff Home',
    component: StaffHome
  },
  {
    path: '/JobRoles',
    name: 'Job Roles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/JobRoles.vue')
  },
  {
    path: '/CreateLearningJourney',
    name: 'Create Learning Journey',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateLearningJourney.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
