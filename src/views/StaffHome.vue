<template>
  <div class="container mt-3">
    <div class="container">
      <UserProfile :userName="store.name" :userJobRole="store.userJobRole" :userDepartment="store.department" />
      <h2 class="text-secondary fw-bold mt-4 mb-3">My Learning Journey </h2>
      <div class="d-grid">
        <router-link to="/CreateLearningJourney" class="btn btn-primary btn-lg fw-bold shadow ">+ Start New Learning
          Journey</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue';
import { userStore } from '@/store';

export default {
  setup() {
    const store = userStore();
    return { store }
  },
  components: {
    UserProfile
  },

}



</script>
