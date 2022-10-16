import {
  defineStore
} from 'pinia'
// import {
//   ref
// } from 'vue'
import axios from 'axios';


export const userStore = defineStore('userStore', {

  // state
  state: () => ({
    

    // user information
    staff_FName: 'Oliver',
    staff_LName: 'Tan',
    email: 'Oliver.Tan@allinone.com.sg',
    role: 'Admin',
    staff_id: 1,
    department: 'Ops',

    // user learning journey
    learningJourneys: [],

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
          for (let jobRole of res.data.data){
              if (!this.departments.includes(jobRole.Department)){
                this.departments.push(jobRole.Department)
              }
          }
          console.log(res.data.data)
      }).catch((err) => {
          console.log(err);
          // this.$router.push({ name: 'NotFound404' });
          return
      })
      return
  }
  }




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
  // }
})