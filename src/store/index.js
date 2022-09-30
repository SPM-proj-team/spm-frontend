import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('userStore', () => {
  // state
  const name = ref('Faisal Samudra');
  const userJobRole = ref('Analytics Executive');
  const department = ref('Operations');
  const selectedJobRole = ref([])


  // getter function
  // to add retrieval of all roles, skills to roles, courses to skill
  // e.g. const doubleCount = computed(() => count.value * 2);

  //actions
  function selectJobRole(){
      selectedJobRole.value.push(this.selectedJobRole)
  }

  return { name, userJobRole, selectedJobRole, department, selectJobRole }
})
