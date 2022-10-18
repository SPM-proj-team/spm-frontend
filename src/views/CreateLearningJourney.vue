<template>
  <div class="container">
    <h1 class="display-5 text-center fw-bold my-xl-5 my-3 ">Create Learning Journey</h1>
    <StepProgress :steps="mySteps" :current-step="currentStep" active-color="#4F46E5" passive-color="#D1D5DB"
      :active-thickness="3" :passive-thickness="3" :line-thickness="3" icon-class="fa-solid fa-check" />
  </div>
  <div class="container my-5">
    <LearningJourneyInfo formType="create" @nextBtnClick="nextBtnClick" ref='ljInfo' v-if="currentStep==0" />

    <template v-if="currentStep==1">
      <div class="row g-3">
        <div class="col-12 mb-3">
          <button class="btn btn-lg btn-secondary w-100 shadow fw-semibold" @click="prevBtnClick">
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="me-3" />Back
          </button>
        </div>
      </div>
      <div class="col-12">
        <Suspense>
          <template #default>
            <JobRolesCard formType="create" @selectJobRole='selectJobRole' />
          </template>
          <template #fallback>
            <JobRolesSekelton />
          </template>
        </Suspense>
      </div>

    </template>

    <template v-if="currentStep==2">
      <div class="row g-3">
        <div class="col-12 mb-3">
          <button class="btn btn-lg btn-secondary w-100 shadow fw-semibold" @click="prevBtnClick">
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="me-3" />Back
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="row justify-content-center align-content-center g-1 g-xl-4">
          <div class="col-12 col-xl-4 order-2 order-xl-1">
            <SkillsFulfillment :Skills="jobRoleSkills" :MappedCourses="mappedCourses" :SelectedCourses="selectedCourses"
              :preSelectedCourses="preSelectedCourses" :formType="'create'" />
          </div>
          <div class="col-12 col-xl-8 order-1 order-xl-2">
            <div class="row justify-content-center align-items-center g-1 g-xl-0">
              <div class="col-12 mb-3 mb-lg-0">
                <SelectedJobRole :SelectedJobRole="jobRoleDetails" />
              </div>
              <div class="col-12">
                <SkillsCard :Skills="jobRoleDetails.Skills" :mapCourses="mapCourses"
                  :preSelectedCourses='preSelectedCourses' v-if="jobRoleDetails.Skills" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>


</template>

<script>
import { ref } from 'vue';
import StepProgress from 'vue-step-progress';
import 'vue-step-progress/dist/main.css';
import LearningJourneyInfo from '@/components/LearningJourneyInfo.vue';
import JobRolesCard from '@/components/JobRolesCard.vue';
import JobRolesSekelton from '@/components/JobRolesSekelton.vue';
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import SkillsFulfillment from '@/components/SkillFulfillment.vue'
import SkillsCard from '@/components/SkillsCard.vue';
import axios from 'axios'
import { userStore } from '@/store';


export default {
  setup() {
    const store = userStore();
    const ljInfo = ref()
    return { ljInfo, store }
  },
  mounted() {
    let faScript = document.createElement('script');
    faScript.setAttribute('src', 'https://kit.fontawesome.com/f85d503e77.js');
    faScript.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(faScript);
  },
  data() {
    return {
      mySteps: ['Basic Info', 'Target Role', 'Add Courses', 'Complete'],
      currentStep: 0,
      ljName: '',
      ljDescription: '',
      jobRoleDetails: [],
      jobRoleSkills: [],
      selectedCourses: [],
      mappedCourses: [],
      preSelectedCourses: []
    }
  },
  methods: {
    nextBtnClick() {

      // do form validation if it's at the first step
      if (this.currentStep == 0) {

        // lj name validation
        if (this.ljInfo.name.length == 0) {
          this.ljInfo.errors.name = {
            state: true,
            message: 'Invalid Name',
            details: this.ljInfo.name
          }
        } else {
          this.ljInfo.errors.name = {
            state: false,
            message: 'Valid Name',
            details: this.ljInfo.name
          }
        }

        // lj description validation
        if (this.ljInfo.description.length == 0) {
          this.ljInfo.errors.desc = {
            state: true,
            message: 'Invalid Description',
            details: this.ljInfo.description
          }
        } else {
          this.ljInfo.errors.desc = {
            state: false,
            message: 'Valid Description',
            details: this.ljInfo.description
          }
        }


        for (let errorType in this.ljInfo.errors) {
          if (this.ljInfo.errors[errorType].state) {
            return
          }
        }

        this.ljName = this.ljInfo.ljName
        this.ljDescription = this.ljInfo.ljDescription

        this.currentStep++

      } else {
        this.currentStep++
      }

    },
    prevBtnClick() {
      this.currentStep--
    },
    selectJobRole() {
      console.log("== User has selected a job role ==");
      console.log(this.store.selectedJobRole)
      this.getJobDetails()
      this.currentStep++
    },
    async getJobDetails() {
      const path = 'http://127.0.0.1:5000/roles/' + this.store.selectedJobRole.Job_ID;
      console.log("Retrieving role detail from " + path)
      await axios.get(path)
        .then((res) => {

          // get full details
          this.jobRoleDetails = res.data.data[0];
          console.log("Job Role Details: ")
          console.log(this.jobRoleDetails)

          // process
          this.getSkills()
        })
        .catch((err) => {
          console.log(err);
          // this.$router.push({ name: 'NotFound404' });
        })
    },

    // process selected courses and map it accordingly
    mapCourses(selectedCourses) {

      // Log selected courses
      this.selectedCourses = selectedCourses;
      console.log("User has selected the following courses;");
      console.log(this.selectedCourses);


      // Map selected courses to all relevant skills
      var temp_mappedCourses = [];
      console.log("Mapping selected courses to all relevant skills...");

      for (var Skill of this.jobRoleDetails.Skills) {
        // temp_mappedCourses[Skill.Skill_ID] = []
        for (var Course of Skill.Courses) {
          if (this.selectedCourses.includes(Course.Course_ID)) {
            temp_mappedCourses.push({
              'Skill_ID': Skill.Skill_ID,
              'Course_ID': Course.Course_ID,
              'Course_Name': Course.Course_Name,
              'Course_Desc': Course.Course_Desc,
              'Course_Status': Course.Course_Status,
            })
          }
        }
      }

      this.mappedCourses = temp_mappedCourses;
      console.log("Course(s) has been mapped to relevant skill(s). Details:")
      console.log(temp_mappedCourses)

    },

    // process skill from all details to reduce UI load
    getSkills() {
      var skills = []
      for (let skill of this.jobRoleDetails.Skills) {
        skills.push(skill);
      }

      // log
      console.log("All Skills:");
      console.log(skills)

      this.jobRoleSkills = skills
    }

  },
  components: {
    StepProgress,
    LearningJourneyInfo,
    JobRolesCard,
    JobRolesSekelton,
    SelectedJobRole,
    SkillsCard,
    SkillsFulfillment

  },
}

</script>

<style  scoped>

</style>