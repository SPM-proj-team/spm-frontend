<template>
  <div class="container">
    <h1 class="my-5 text-center text-gray-500">Job Roles</h1>
    <JobRolesCard :jobRoles="jobRoles"/>
  </div>
</template>

<script>

import { assertExpressionStatement } from '@babel/types';
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
    getJobRoles(){
      const path = 'http://localhost:5000';
      axios.get(path)
      .then((res) => {
        this.jobRoles = res.data;
      })
      .catch ((err) => {
        console.error(error);
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>