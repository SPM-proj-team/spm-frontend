<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row mb-3">
            <div class="col">
                <LearningJourneyInfo ref="childLJinfo" :ljName='learningJourneyDetails.Learning_Journey_Name'
                    :ljDescription='learningJourneyDetails.Description' v-if="learningJourneyDetails" />
            </div>
        </div>
        <div class="card text-bg-success mb-3 shadow">
            <div class="card-header fw-semibold">Courses and Skills</div>
        </div>
        <div class="row justify-content-center align-content-center g-1 g-xl-4">
            <div class="col-12 col-xl-4 order-2 order-xl-1">
                <SkillsFulfillment :Skills="jobRoleSkills" :MappedCourses="mappedCourses" :formType="'update'"
                    :SelectedCourses="selectedCourses" @updateLJbutton='updateLearningJourney'/>
            </div>
            <div class="col-12 col-xl-8 order-1 order-xl-2">
                <div class="row justify-content-center align-items-center g-1 g-xl-0">
                    <div class="col-12 mb-3 mb-lg-0">
                        <SelectedJobRole :SelectedJobRole="jobRoleDetails" v-if="jobRoleDetails"/>
                    </div>
                    <div class="col-12">
                        <SkillsCard ref="childCheckedCourses" :Skills="jobRoleDetails.Skills" :mapCourses="mapCourses"
                            :preSelectedCourses="selectedCourses" v-if="jobRoleDetails.Skills" />
                    </div>
                </div>

            </div>

        </div>

            <!-- Success Modal -->
    <Transition>
        <SuccessModal v-if="updatedLJ == true" @close="closeModal" @wheel.prevent @touchmove.prevent @scroll.prevent
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
        const childCheckedCourses = ref();
        const childLJinfo = ref();
        return { store, childCheckedCourses, childLJinfo }

        
    },
    data() {
        return {
            // to change the hardcoding to make it dynamic for staffID
            staff_ID: 1,
            role: [],
            jobRoleDetails: [],
            jobRoleSkills: [],
            learningJourneyName: '',
            selectedCourses: [],
            mappedCourses: [],
            preSelectedCourses: [],
            navObjects: [
                { navLabel: "Home", path: "/", isActive: false },
                { navLabel: "Learning Journey Details", path: "", isActive: true }
            ],

            learningJourneyDetails: null,
            updatedLJ: false,
            sharedItems: LearningJourneyInfo.data,
            sharedCourses: SkillsCard.data,
            successModalMessage: "Successfully updated Learning Journey!"


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

                    // get full details
                    this.learningJourneyDetails = res.data.data[0];
                    this.role = res.data.data[0].Role
                    this.learningJourneyName = this.learningJourneyDetails.Learning_Journey_Name;

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

        // close modal
        closeModal() {
            this.isModalVisible = false
            this.$router.go()
        },

        updateLearningJourney(){
            console.log("======= updateLearningJourney function running =======");
            const path = 'http://127.0.0.1:5000/learning_journey/' + this.LJID;
            console.log("Updating learning Journey details at " + path);

            // checker which course user has selected
            console.log(this.childCheckedCourses.checkedCourses);
            // checker for new Learning Journey description and name
            console.log(this.childLJinfo.name, this.childLJinfo.description);
            
            var newCourses = [];

            for (var courseid in this.childCheckedCourses.checkedCourses){
                newCourses.push(
                        {
                            "Course_ID": this.childCheckedCourses.checkedCourses[courseid]
                    }
                );
            }
            console.log(newCourses);


            let body = {
                "Staff_ID": this.staff_ID,
                "Learning_Journey": {
                    "Courses": newCourses,
                    "Description": this.childLJinfo.description,
                    "Learning_Journey_ID": this.LJID,
                    "Learning_Journey_Name": this.childLJinfo.name,
                    "Role": this.learningJourneyDetails.Role,
                    "Staff_ID": this.staff_ID
                }
            };

            axios.put(path, body)
                .then((res) => {

                    // get full details
                    this.learningJourneyDetails = res.data.data[0];
                    this.role = res.data.data[0].Role
                    this.learningJourneyName = this.learningJourneyDetails.Learning_Journey_Name;

                    console.log("New Learning Journey Details: ")
                    console.log(this.learningJourneyDetails)
                    console.log(this.role)

                    // get job role details of the learning journey
                    this.getJobDetails()

                    this.updatedLJ = true

                    // process
                    // this.getCourses()
                })
                .catch((err) => {
                    console.log(err);
                    // this.$router.push({ name: 'NotFound404' });
                })
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

</style>