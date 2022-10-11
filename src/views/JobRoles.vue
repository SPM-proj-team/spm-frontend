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

    <Suspense>
      <template #default>
        <JobRolesCard />
      </template>
      <template #fallback>
          <JobRolesSekelton />
      </template>
    </Suspense>


  </div>
</template>

<script>

import JobRolesCard from '../components/JobRolesCard.vue'
import JobRolesSekelton from '@/components/JobRolesSekelton.vue'


export default {
  components: {
    JobRolesCard,
    JobRolesSekelton
  },


  data() {
    return {
      jobRoles: []
    }
  },

}

</script>

<style lang="scss" scoped>

</style>