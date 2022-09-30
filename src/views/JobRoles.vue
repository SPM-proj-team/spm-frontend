<template>
  <div class="container">
    <h1 class="my-5 text-center text-gray-500">Job Roles</h1>
    <JobRolesCard :jobRoles="jobRoles"/>
  </div>
</template>

<script>

import JobRolesCard from '../components/JobRolesCard.vue'
// import axios from 'axios'


export default {
  components: {
    JobRolesCard
  },
  // mounted(){
  //   this.getJobRoles()
  // },
  data () {
    return {
      jobRoles: [
        {Job_ID: 1, Job_Role: "CEO", Job_Title: 'The big boss'},
        {Job_ID: 2, Job_Role: "Operations Manager", Job_Title: 'Manager', Skills:[]},
        {Job_ID: 3, Job_Role: "Operations Slave", Job_Title: 'Executive', Skills:[]},
      ]
    }
  },
  // methods : {
  //   getJobRoles(){
  //     const path = 'http://localhost:5000';
  //     axios.get(path)
  //     .then((res) => {
  //       this.jobRoles = res.data;
  //     })
  //     .catch ((err) => {
  //       console.error(err);
  //     })
  //   }
  // }
}

</script>

<style lang="scss" scoped>

</style>