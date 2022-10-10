<template>
  <div class="container-fuild bg-white mb-5">
    <div class="container col-xl-10 col-xxl-8 px-4 py-3">
      <div class="row align-items-center py-5 align-items-center ">
        <div class="col-lg-7 text-center text-lg-start text-gray-500">
          <h1 class="display-4 fw-bold lh-1 mb-3">Available Job Roles</h1>
          <p class="col-lg-10 fs-5">View all available roles in all in one and progress further in your career.</p>
        </div>
        <div class="col-lg-4 offset-lg-1 p-0">
          <img src="@/assets/illustration/roles.gif" class="d-lg-block d-none mx-lg-auto img-fluid float-center">
        </div>
      </div>
    </div>
  </div>


  <div class="container">
    <JobRolesCard :jobRoles="jobRoles" />
  </div>
</template>

<script>

import JobRolesCard from '../components/JobRolesCard.vue'
import axios from 'axios'


export default {
  components: {
    JobRolesCard
  },
  mounted() {
    this.getJobRoles()
  },
  data() {
    return {
      jobRoles: []
    }
  },
  methods: {
    // Get all available job roles
    getJobRoles() {
      const path = 'http://127.0.0.1:5000/roles';
      axios.get(path)
        .then((res) => {
          this.jobRoles = res.data.data;
          console.log(res.data.data)
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ name: 'NotFound404' });
        })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>