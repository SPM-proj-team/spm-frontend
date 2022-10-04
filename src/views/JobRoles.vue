<template>
  <div class="container">
    <h1 class="my-5 text-center text-gray-500 fw-bold">Job Roles</h1>
    <JobRolesCard :jobRoles="jobRoles"/>
  </div>
</template>

<script>

import JobRolesCard from '../components/JobRolesCard.vue'
import axios from 'axios'


export default {
  components: {
    JobRolesCard
  },
  mounted(){
    this.getJobRoles()
  },
  data () {
    return {
      jobRoles: []
    }
  },
  methods : {
    // Get all available job roles
    getJobRoles(){
      const path = 'http://127.0.0.1:5000/roles';
      axios.get(path)
      .then((res) => {
        this.jobRoles = res.data.data;
        console.log(res.data.data)
      })
      .catch ((err) => {
        console.log(err);
        this.$router.push({ name: 'NotFound404'});
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>