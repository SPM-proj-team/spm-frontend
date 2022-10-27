import {
  defineStore
} from 'pinia'
import { useStorage } from '@vueuse/core'

import axios from 'axios';


export const userStore = defineStore('userStore', {

  // state
  state: () => ({


    // user information
    staff_FName: useStorage('staff_FName',''),
    staff_LName: useStorage('staff_LName',''),
    email: useStorage('email',''),
    role: useStorage('role',''),
    staff_id: useStorage('staff_id',null),
    department: useStorage('department',''),

    // user learning journey
    learningJourneys: [],
    ljRole: [],

    // view roles data
    selectedJobRole: [],
    jobRoles: [],
    departments: [],


  }),
  actions: {
    //actions are methods - including async functions
    selectJobRole(jobRole) {
      this.selectedJobRole = jobRole
    },

    login(){
      const path = 'http://127.0.0.1:5000/staff';

      return new Promise((resolve, reject) => {
        axios.get(path)
          .then((res) => {
            console.log(res);
            resolve(res)
          }).catch((err) => {
            console.log(err);
            reject(err)
          })
      })

    },

    // get user's learning journey
    async getLearningJourney() {
      const path = 'http://127.0.0.1:5000/learning_journey';
      await axios.post(path, {
          "Staff_ID": this.staff_id
        })
        .then((res) => {
          console.log(res.data.data)
          this.learningJourneys = res.data.data
          // return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          // this.$router.push({ name: 'NotFound404' });
          return
        })
    },

    // get all available roles and departments
    async getRoles() {
      await axios.get('http://127.0.0.1:5000/roles').then((res) => {
        this.jobRoles = res.data.data;
        for (let jobRole of res.data.data) {
          if (!this.departments.includes(jobRole.Department)) {
            this.departments.push(jobRole.Department)
          }
        }
        console.log(res.data.data)
      }).catch((err) => {
        console.log(err);
        // this.$router.push({ name: 'NotFound404' });
        return
      })

    },

    // get specific learning journey



    // update learning journey
    updateLearningJourney(courses, ljDescription, ljName, role) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:5000/learning_journey/create', {
            "Staff_ID": this.staff_id,
            "Learning_Journey": {
              "Courses": courses,
              "Description": ljDescription,
              "Learning_Journey_Name": ljName,
              "Role": role,
              "Staff_ID": this.staff_id
            }
          })
          .then((res) => {
            console.log(res);
            resolve(res)
          }).catch((err) => {
            console.log(err);
            reject(err)
          })
      })

    },
    deleteLearningJourney(id) {
      return new Promise((resolve, reject) => {
        const path = "http://127.0.0.1:5000/learning_journey/" + id
        axios.delete(path, { data: { "Staff_ID": this.staff_id }})
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})


// getter function
// to add retrieval of all roles, skills to roles, courses to skill
// e.g. const doubleCount = computed(() => count.value * 2);



// return {
//   staff_FName,
//   staff_LName,
//   email,
//   role,
//   staff_id,
//   selectedJobRole,
//   department,
//   selectJobRole
// 