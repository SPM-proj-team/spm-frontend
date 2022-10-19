<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row mb-3">
            <div class="col">
                <LearningJourneyInfo ref="ljInfo" :ljName='this.ljName'
                    :ljDescription='learningJourneyDetails.Description' v-if="learningJourneyDetails" formType='update'
                    @updateLearningJourney="updateLearningJourney" @deleteLearningJourney="deleteLearningJourney" />
            </div>
        </div>
        <div v-if="this.errors.courses.state" class="alert alert-danger" role="alert">
            {{ this.errors.courses.message }} <b>{{ this.errors.courses.details }}</b>
        </div>
        <div class="card text-bg-success mb-3 shadow">
            <div class="card-header fw-semibold">Courses and Skills</div>
        </div>
        <div class="row justify-content-center align-content-center g-1 g-xl-4">
            <div class="col-12 col-xl-4 order-2 order-xl-1">
                <SkillsFulfillment :Skills="jobRoleSkills" :MappedCourses="mappedCourses" :formType="'update'"
                    :SelectedCourses="selectedCourses" @updateLJbutton='updateLearningJourney' />
            </div>
            <div class="col-12 col-xl-8 order-1 order-xl-2">
                <div class="row justify-content-center align-items-center g-1 g-xl-0">
                    <div class="col-12 mb-3 mb-lg-0">
                        <SelectedJobRole :SelectedJobRole="jobRoleDetails" v-if="jobRoleDetails" />
                    </div>
                    <div class="col-12">
                        <SkillsCard ref="skillsCardComponent" :Skills="jobRoleDetails.Skills" :mapCourses="mapCourses"
                            :preSelectedCourses="selectedCourses" v-if="jobRoleDetails.Skills" />
                    </div>
                </div>

            </div>

        </div>

        <!-- Success Modal -->
        <Transition>
            <SuccessModal v-if="isModalVisible" @close="closeModal" @wheel.prevent @touchmove.prevent @scroll.prevent
                :modalTitle="this.modalTitle" :message="this.successModalMessage" :icon="this.modalIcon" />
        </Transition>

    </div>
</template>

<script>

import { userStore } from '@/store';
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SkillsFulfillment from '@/components/SkillFulfillment.vue'
import SkillsCard from '@/components/SkillsCard.vue';
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import LearningJourneyInfo from '@/components/LearningJourneyInfo.vue';
import SuccessModal from '@/components/SuccessModal.vue';
import { ref } from '@vue/reactivity';


export default {
    setup() {
        const store = userStore();
        const skillsCardComponent = ref();
        const ljInfo = ref();
        return { store, skillsCardComponent, ljInfo }
    },
    data() {
        return {
            // to change the hardcoding to make it dynamic for staffID
            navObjects: [
                { navLabel: "Home", path: "/", isActive: false },
                { navLabel: "Learning Journey Details", path: "", isActive: true }
            ],
            staff_ID: 1,
            role: [],
            jobRoleDetails: [],
            jobRoleSkills: [],
            ljName: '',
            selectedCourses: [],
            mappedCourses: [],
            preSelectedCourses: [],
            errors: {
                count: 0,
                courses: {
                    state: false,
                    message: '',
                    details: ''
                }
            },

            learningJourneyDetails: null,

            // Modal
            isModalVisible: false,
            successModalMessage: '',
            modalIcon: 'fa-solid fa-circle-check',
            modalTitle: ''

        }
    },
    mounted() {
        this.getLearningJourneyDetails()

    },
    methods: {
        // Get individual Learning Journey detail for staff
        getLearningJourneyDetails() {
            const path = 'http://127.0.0.1:5000/learning_journey/' + this.LJID;
            console.log("Retrieving learning Journey details from " + path)
            let params = {
                "Staff_ID": this.staff_ID
            };

            

            axios.post(path, params)
                .then((res) => {

                    if (res.data.data.length == 0) {
                        this.$router.push('/')
                        return
                    }

                    // get full details
                    this.learningJourneyDetails = res.data.data[0];
                    this.role = res.data.data[0].Role
                    this.ljName = this.learningJourneyDetails.Learning_Journey_Name;
                    this.ljDescription = this.learningJourneyDetails.Description

                    console.log("Learning Journey Details: ")
                    console.log(this.learningJourneyDetails)
                    console.log(this.role)

                    // get job role details of the learning journey
                    this.getJobDetails()

                    // process
                    // this.getCourses()
                })
                .catch((err) => {
                    console.log(err);
                    // this.$router.push({ name: 'NotFound404' });
                })
        },
        // Get individual job details based on route params (JobRole_ID)
        getJobDetails() {
            console.log(" fetching job role details");
            const path = 'http://127.0.0.1:5000/roles/' + this.role.Job_ID;
            console.log("Retrieving role detail from " + path)
            axios.get(path)
                .then((res) => {

                    // get full details
                    this.jobRoleDetails = res.data.data[0];
                    console.log("Job Role Details: ")
                    console.log(this.jobRoleDetails)

                    // process
                    this.getSkills()

                    // populate the courses
                    for (let Course of this.learningJourneyDetails.Courses) {
                        this.selectedCourses.push(Course.Course_ID)
                    }

                    this.preSelectedCourses = this.selectedCourses

                    console.log(this.selectedCourses)
                    this.mapCourses(this.selectedCourses)

                })
                .catch((err) => {
                    console.log(err);
                    // this.$router.push({ name: 'NotFound404' });
                })
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

        // process selected courses and map it accordingly
        mapCourses(selectedCourses) {

            // Log selected courses
            // this.selectedCourses = selectedCourses;
            console.log("User has selected the following courses;");
            console.log(selectedCourses);

            // Map selected courses to all relevant skills
            var temp_mappedCourses = [];
            console.log("Mapping selected courses to all relevant skills...");

            for (var Skill of this.jobRoleDetails.Skills) {

                // temp_mappedCourses[Skill.Skill_ID] = []
                for (var Course of Skill.Courses) {
                    if (selectedCourses.includes(Course.Course_ID)) {
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

        // open modal function
        showModal() {
            this.isModalVisible = true
        },

        // close modal function
        closeModal() {
            this.isModalVisible = false
            this.$router.go()
        },

        updateLearningJourney() {

            // perform form validation
            this.errors.count = 0

            // lj info 
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
                    this.errors.count++
                }
            }

            // skills validation
            if (this.skillsCardComponent.checkedCourses.length == 0) {
                this.errors.courses = {
                    state: true,
                    message: "Please select at least 1 course",
                    details: ''
                }
                this.errors.count++

            } else {

                this.errors.courses = {
                    state: false,
                    message: "Valid Skill",
                    details: ''
                }

            }

            if (this.errors.count != 0) {
                return
            }


            console.log("======= updateLearningJourney function running =======");
            const path = 'http://127.0.0.1:5000/learning_journey/' + this.LJID;
            console.log("Updating learning Journey details at " + path);

            // checker which course user has selected
            console.log(this.skillsCardComponent.checkedCourses);
            // checker for new Learning Journey description and name
            console.log(this.ljInfo.name, this.ljInfo.description);

            var newCourses = [];

            for (var courseid in this.skillsCardComponent.checkedCourses) {
                newCourses.push(
                    {
                        "Course_ID": this.skillsCardComponent.checkedCourses[courseid]
                    }
                );
            }
            console.log(newCourses);


            let body = {
                "Staff_ID": this.staff_ID,
                "Learning_Journey": {
                    "Courses": newCourses,
                    "Description": this.ljInfo.description,
                    "Learning_Journey_ID": this.LJID,
                    "Learning_Journey_Name": this.ljInfo.name,
                    "Role": this.learningJourneyDetails.Role,
                    "Staff_ID": this.staff_ID
                }
            };

            axios.put(path, body)
                .then((res) => {

                    // get full details
                    this.learningJourneyDetails = res.data.data[0];
                    this.role = res.data.data[0].Role
                    this.ljName = this.learningJourneyDetails.Learning_Journey_Name;

                    console.log("New Learning Journey Details: ")
                    console.log(this.learningJourneyDetails)
                    console.log(this.role)

                    this.modalTitle = 'Update Success'
                    this.modalIcon = 'fa-solid fa-circle-check'
                    this.successModalMessage = 'Learning journey has been successfully updated!'
                    this.showModal();

                    // process
                    // this.getCourses()
                })
                .catch((err) => {
                    console.log(err);
                    // this.$router.push({ name: 'NotFound404' });
                })
        },

        async deleteLearningJourney() {
            console.log("=== delete learning journey function is running ===");
            console.log("--- deleting learning journey ID: " + this.learningJourneyDetails.Learning_Journey_ID);
            const res = await this.store.deleteLearningJourney(this.learningJourneyDetails.Learning_Journey_ID);

            if (res.data.code == 200) {
                this.modalTitle = 'Delete Success'
                this.modalIcon = 'fa-solid fa-circle-check'
                this.successModalMessage = 'Learning journey has been successfully deleted!'
                this.showModal();
            }


        }





    },
    props: ['LJID'],

    components: {
        Breadcrumbs,
        SkillsFulfillment,
        SkillsCard,
        SelectedJobRole,
        LearningJourneyInfo,
        SuccessModal
    }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>