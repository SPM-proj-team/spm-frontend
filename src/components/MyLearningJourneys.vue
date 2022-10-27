<template>
  <button class="btn btn-light card w-100 h-100 my-3 p-0 text-start" v-for="learningJourney in store.learningJourneys"
    :key="learningJourney.Learning_Journey_ID">

    <div class="row g-0 w-100 ">
      <div class="col">

        <!-- create <router-link> '/LearningJourney/:LJID' -->
        <router-link class="router-link" :to="{name: 'Learning Journey Details', params: {LJID: learningJourney.Learning_Journey_ID}}">
          <div class="card-body shadow-sm">
            <h5 class="card-title fw-semibold">
              {{ learningJourney.Learning_Journey_Name }}
            </h5>
            <p class="card-text">{{ learningJourney.Description }}</p>
            <p class="card-text">
              <small class="text-muted">{{Object.keys(learningJourney.Courses).length}} Courses</small>
            </p>
          </div>
        </router-link>
        <!-- create router link </router-link> '/LearningJourney/:LJID' -->
      </div>
    </div>
  </button>
</template>

<script>
import { userStore } from "@/store";


export default {
  async setup() {
    const store = userStore();
    await store.getLearningJourney()
    
    return { store };
  }


};
</script>

<style scoped>

</style>
