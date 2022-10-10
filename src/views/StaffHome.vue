<template>
  <div class="container mt-3">
    <div class="container">
      <UserProfile :userName="store.name" :userJobRole="store.userJobRole" :userDepartment="store.department" />
      <h2 class="text-secondary fw-bold mt-4 mb-3">My Learning Journey </h2>
      <div class="d-grid mb-4">
        <router-link to="/CreateLearningJourney" class="btn btn-primary btn-lg fw-bold shadow ">+ Start New Learning
          Journey</router-link>
      </div>
      <div class="container p-0">
      <MyLearningJourneys :learningJourneys="learningJourneys"/>
      </div>
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
    MyLearningJourneys,
    
},  
  data(){
    return{
      learningJourneys: []
    }
  },
  mounted(){
    this.getLearningJourney()
  },
  methods:{
  // Get all available learning journeys
  getLearningJourney(){
      const path = 'http://127.0.0.1:5000/learning_journey';
      axios.post(path,{
          "Staff_ID":1
      })
        .then((res) => {
          this.learningJourneys = res.data.data;
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
