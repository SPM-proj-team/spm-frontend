<template>
  <UserProfile :userInfo="userInfo" />
  <div class="container mt-3" v-motion-fade>
    <h2 class="text-gray-500 display-5 fw-bold mt-5 mb-2">
      <font-awesome-icon icon="fa-solid fa-list-check" /> My Learning Journey
    </h2>
    <div class="d-lg-none d-grid mt-3">
      <router-link to="/CreateLearningJourney" class="btn btn-success btn-lg fw-bold shadow ">
        + Start New LearningJourney</router-link>
    </div>
    <div class="d-grid mb-4">
    </div>
    <div class="container p-0">
        <Suspense>
          <template #default>
            <MyLearningJourneys/>
          </template>
          <template #fallback>
            <MyLearningJourneysSkeleton />
          </template>
        </Suspense>
    </div>
  </div>

</template>

<script>
import UserProfile from '@/components/UserProfile.vue';
import { userStore } from '@/store';
import MyLearningJourneys from '../components/MyLearningJourneys.vue';
import MyLearningJourneysSkeleton from '@/components/MyLearningJourneysSkeleton.vue';


export default {
  setup() {
    const store = userStore();
    return { store }
  },
  components: {
    UserProfile,
    MyLearningJourneys,
    MyLearningJourneysSkeleton
  },
  data() {
    return {
      learningJourneys: [],
      userInfo: {
        fullName: this.store.staff_FName + " " + this.store.staff_LName,
        email: this.store.email,
        department: this.store.department,
        userRole: this.store.role,
        staff_id: this.store.staff_id
      }
    }
  },


}

</script>

<style lang="scss" scoped>

</style>
