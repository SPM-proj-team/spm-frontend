<template>
  <div class="container">
    <h1 class="display-5 text-center fw-bold my-xl-5 my-3 ">Create Learning Journey</h1>
    <StepProgress :steps="mySteps" :current-step="currentStep" active-color="#4F46E5" passive-color="#D1D5DB"
      :active-thickness="3" :passive-thickness="3" :line-thickness="3" icon-class="fa-solid fa-check" />
  </div>
  <div class="container my-5">
    <LearningJourneyInfo formType="create" @nextBtnClick="nextBtnClick()" ref='ljInfo' v-if="currentStep==0" />

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
      <div class="row g-3 mb-3">
        <div class="col-6 col-lg-6">
          <button class="btn btn-lg btn-secondary w-100 shadow fw-semibold" @click="prevBtnClick">
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="me-3" />Back
          </button>
        </div>
        <div class="col-6 ">
          <button class="btn btn-lg btn-primary w-100 shadow fw-semibold" @click="createLearningJourney()">
            Create
          </button>
        </div>
      </div>
      <Transition name="bounce">
        <div v-show="this.errors.ljName.state" class="alert alert-danger" role="alert">
          {{ this.errors.ljName.message }}
        </div>
      </Transition>

      <Transition name="bounce">
        <div v-show="this.errors.ljDesc.state" class="alert alert-danger" role="alert">
          {{ this.errors.ljDesc.message }}
        </div>
      </Transition>

      <Transition name="bounce">
        <div v-show="this.errors.courses.state" class="alert alert-danger" role="alert">
          {{ this.errors.courses.message }}
        </div>
      </Transition>

      <Transition name="bounce">
        <div v-show="this.errors.others.state" class="alert alert-danger" role="alert">
          {{ this.errors.others.message }}
        </div>
      </Transition>



      <div class="col-12">
        <div class="row justify-content-center align-content-center g-1 g-xl-4">
          <div class="col-12 col-xl-4 order-2 order-xl-1">
            <SkillsFulfillment :Skills="jobRoleSkills" :MappedCourses="mappedCourses" :SelectedCourses="selectedCourses"
              :preSelectedCourses="preSelectedCourses" :formType="'create'" @createLearningJourney="createLearningJourney" />
          </div>
          <div class="col-12 col-xl-8 order-1 order-xl-2">
            <div class="row justify-content-center align-items-center g-1 g-xl-0">
              <div class="col-12 mb-3 mb-lg-0">
                <SelectedJobRole :SelectedJobRole="jobRoleDetails" />
              </div>
              <div class="col-12">
                <SkillsCard :Skills="jobRoleDetails.Skills" :mapCourses="mapCourses"
                  :preSelectedCourses='preSelectedCourses' v-if="jobRoleDetails.Skills" ref="skillsCardComponent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="currentStep==3">+

      <div class="card p-5">
        <div class="card-body">
          <h5 class="card-title display-6 text-center">Learning Journey Created</h5>
          <div class="text-center my-5">
            <font-awesome-icon icon="fa-solid fa-circle-check" style="font-size:20rem; color:green" />
          </div>
          <h6 class="card-text text-center my-3 fs-5">Congratulations! Your learning journey has been created! </h6>
          <h6 class="card-text text-center my-3 fs-5"> Time to put in the effort to progress in your career. Good luck!
          </h6>
          <div class="text-center my-4">
            <router-link to="/" class="router-link"><button class="btn btn-primary btn-lg">Home</button></router-link>
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
    const ljInfo = ref();
    const skillsCardComponent = ref();
    return { ljInfo, store, skillsCardComponent }
  },
  mounted() {
    let faScript = document.createElement('script');
    faScript.setAttribute('src', 'https://kit.fontawesome.com/f85d503e77.js');
    faScript.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(faScript);
  },
  data() {
    return {
      // step component
      mySteps: ['Basic Info', 'Target Role', 'Add Courses', 'Complete'],

      // required
      currentStep: 0,
      ljName: '',
      ljDescription: '',
      jobRoleDetails: [],
      jobRoleSkills: [],
      selectedCourses: [],
      selectedJobRole: {},
      mappedCourses: [],
      preSelectedCourses: [],

      // form validation
      errors: {
        count: 0,
        ljName: {
          state: false,
          message: ''
        },
        ljDesc: {
          state: false,
          message: ''
        },
        courses: {
          state: false,
          message: ''
        },
        others: {
          state: false,
          message: ''
        }
      },


    }
  },
  methods: {
    nextBtnClick() {

      // do form validation for learning journey info
      if (this.currentStep == 0) {

        // lj name validation
        if (this.ljInfo.name.length == 0) {
          this.ljInfo.errors.name = {
            state: true,
            message: 'Invalid Name',
            details: this.ljInfo.name
          }

          this.errors.ljName = {
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

          this.errors.ljName = {
            state: false,
            message: 'Valid Name',
          }

        }

        // lj description validation
        if (this.ljInfo.description.length == 0) {
          this.ljInfo.errors.desc = {
            state: true,
            message: 'Invalid Description',
            details: this.ljInfo.description
          }

          this.errors.ljDesc = {
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

          this.errors.ljDesc = {
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

        this.ljName = this.ljInfo.name
        this.ljDescription = this.ljInfo.description

        this.currentStep++

      } else {
        this.currentStep++
      }

    },
    prevBtnClick() {


      // whenever user click back reset skill fulfillment
      if (this.currentStep == 2) {
        this.selectedCourses = [],
          this.mappedCourses = [],
          this.preSelectedCourses = []
        this.errors.courses = {
          state: false,
          message: ''
        };
        this.errors.others = {
          state: false,
          message: ''
        }
      }

      this.currentStep--
    },
    selectJobRole() {
      console.log("== User has selected a job role ==");
      console.log(this.store.selectedJobRole)
      this.selectedJobRole = {
        ...this.store.selectedJobRole
      };
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
    },

    async createLearningJourney() {

      // reset error counter
      this.errors.count = 0

      // ## validate form data

      // ### Lj name and information validation
      if (this.errors.ljName.state) {
        this.errors.count++
      }

      if (this.errors.ljDesc.state) {
        this.errors.count++
      }

      if (this.skillsCardComponent.checkedCourses.length == 0) {
        this.errors.count++
        this.errors.courses = {
          state: true,
          message: 'Please select at least 1 course'
        }
      } else {
        this.errors.courses = {
          state: false,
          message: 'Valid course'
        }
      }

      if (this.errors.count != 0) {
        return
      }



      // populate courses
      var newCourses = [];
      for (var courseid in this.skillsCardComponent.checkedCourses) {
        newCourses.push(
          {
            "Course_ID": this.skillsCardComponent.checkedCourses[courseid]
          }
        );
      }


      console.log("======= create function running =======");
      const path = 'http://127.0.0.1:5000/learning_journey/create';
      console.log("Creating learning Journey details at " + path);

      const res = await this.store.updateLearningJourney(
        newCourses,
        this.ljDescription,
        this.ljName,
        this.selectedJobRole)
      
      console.log(res);
      
      if (res.data.code == 200) {
        this.currentStep++
      } else {
        this.errors.others = {
          state: true,
          message: 'Unexpected error occurred, please contact system developer [error code ' + res.data.code + ']'
        }
      }

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
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>