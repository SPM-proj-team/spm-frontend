import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('userStore', () => {

  // state
  const staff_FName = ref('Oliver');
  const staff_LName = ref('Tan');
  const email = ref('Oliver.Tan@allinone.com.sg');
  const role = ref('User')
  const staff_id = ref('150165')
  const department = ref('Ops');
  const selectedJobRole = ref([]);

  // getter function
  // to add retrieval of all roles, skills to roles, courses to skill
  // e.g. const doubleCount = computed(() => count.value * 2);

  //actions
  function selectJobRole(jobRole){
      selectedJobRole.value = jobRole
  }

  return { 
    staff_FName, 
    staff_LName, 
    email,  
    role, 
    staff_id, 
    selectedJobRole, 
    department, 
    selectJobRole }
})
