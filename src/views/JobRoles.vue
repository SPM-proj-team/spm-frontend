<template>
  <div class="container">
    <h1 class="my-5 text-center text-gray-500">Job Roles</h1>
    <JobRolesCard :jobRoles="jobRoles"/>
  </div>
</template>

<script>

import JobRolesCard from '../components/JobRolesCard.vue'

export default {
  components: {
    JobRolesCard
  },
  data () {
    return {
      jobRoles: [
        {id:1, role: 'Analytics Executive', position: 'Executive'},
        {id:2, role: 'Business Development Manager', position: 'Manager'},
        {id:1, role: 'Analytics Executive', position: 'Executive'},
        {id:4, role: 'Business Development Manager', position: 'Manager'},
        {id:1, role: 'Analytics Executive', position: 'Executive'},
        {id:6, role: 'Business Development Manager', position: 'Manager'}
      ]
    }
  }
}

</script>

<style lang="scss" scoped>

</style>