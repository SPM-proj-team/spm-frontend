<template>
  <UserProfile :userInfo="userInfo" />
  <div class="container mt-3">
    <h2 class="text-gray-500 display-5 fw-bold mt-5 mb-2"><font-awesome-icon icon="fa-solid fa-list-check" /> My Learning Journey </h2>
    <div class="d-grid mb-4">
    </div>
    <div class="container p-0">
      <MyLearningJourneys :learningJourneys="learningJourneys" />
    </div>
  </div>

</template>

<script>
import UserProfile from '@/components/UserProfile.vue';
import { userStore } from '@/store';
import MyLearningJourneys from '../components/MyLearningJourneys.vue';
import axios from 'axios';



export default {
  setup() {
    const store = userStore();
    return { store }
  },
  components: {
    UserProfile,
    MyLearningJourneys
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
  mounted() {
    this.getLearningJourney()

  },
  methods: {
    // Get all available learning journeys
    getLearningJourney() {
      const path = 'http://127.0.0.1:5000/learning_journey';
      axios.post(path, {
        "Staff_ID": 1
      })
        .then((res) => {
          this.learningJourneys = res.data.data;
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
