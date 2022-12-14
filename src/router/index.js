import { createRouter, createWebHistory } from 'vue-router'
import StaffHome from '../views/StaffHome.vue'
import JobRoleDetails from '../views/JobRoleDetails.vue'
import CreateLearningJourney from '../views/CreateLearningJourney.vue'
import NotFound404 from '../views/NotFound404.vue'

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
    path: '/Login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/JobRoles/:JobRoleID',
    name: 'JobRoleDetails',
    component: JobRoleDetails,
    props: true
  },
  {
    path: '/LearningJourney/:LJID',
    name: 'Learning Journey Details',
    component: () => import( '../views/LearningJourneyDetails.vue'),
    props: true
  },
  {
    path: '/CreateLearningJourney',
    name: 'Create Learning Journey',
    component: CreateLearningJourney
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import( '../views/AdminManagement.vue') 
  },
  {
    path: '/UpdateRoles',
    name: 'Update Roles',
    component: () => import( '../views/UpdateRoles.vue') 
  },
  {
    path: '/CreateRole',
    name: 'Create Roles',
    component: () => import( '../views/CreateRole.vue') 
  },
  {
    path: '/CreateSkill',
    name: 'Create Skills',
    component: () => import( '../views/CreateSkill.vue') 
  },
  {
    path: '/UpdateSkills',
    name: 'Update Skills',
    component: () => import( '../views/UpdateSkills.vue') 
  },
  // catchall 404
  {
    path: '/:catchAll(.*)',
    component: NotFound404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
