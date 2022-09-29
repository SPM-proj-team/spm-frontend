import { createRouter, createWebHistory } from 'vue-router'
import StaffHome from '../views/StaffHome.vue'
import JobRoleDetails from '../views/JobRoleDetails.vue'
import CreateLearningJourney from '../views/CreateLearningJourney.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StaffHome
  },
  {
    path: '/JobRoles',
    name: 'Job Roles',
    component: () => import( '../views/JobRoles.vue')
  },
  {
    path: '/JobRoles/:id',
    name: 'JobRoleDetails',
    component: JobRoleDetails,
    props: true
  },
  {
    path: '/CreateLearningJourney',
    name: 'Create Learning Journey',
    component: CreateLearningJourney
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
