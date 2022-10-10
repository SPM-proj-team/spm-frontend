<template>
  <button
    class="btn btn-light card w-100 h-100 my-3 p-0 text-start"
    v-for="learningJourney in learningJourneys"
    :key="learningJourney.Learning_Journey_ID"
  >
    
      <div class="row g-0 w-100 ">
        <div class="col">
            <div class="card-body shadow-sm">
              <h5 class="card-title fw-semibold">
                {{ learningJourney.Learning_Journey_Name }}
              </h5>
              <p class="card-text">{{ learningJourney.Description }}</p>
              <p class="card-text">
                <small class="text-muted"
                  >{{Object.keys(learningJourney.Courses).length}} Courses</small
                >
              </p>
            </div>
          
        </div>
      </div>
    </button>
</template>

<script>
import { userStore } from "@/store";

export default {
  setup() {
    const store = userStore();
    return { store };
  },

  name: "MyLearningJourneys",
  props: {
    learningJourneys: Object
  },
};
</script>

<style scoped></style>
