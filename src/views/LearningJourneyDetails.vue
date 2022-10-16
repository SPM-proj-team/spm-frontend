<template>
    <div class="container mt-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row justify-content-center align-content-center g-1 g-xl-4">
            <div class="col-12 col-xl-4 order-2 order-xl-1">
                <SkillsFulfillment
                :Skills="jobRoleSkills" 
                :MappedCourses="this.mappedCourses"
                :formType="'update'"
                :SelectedCourses="this.selectedCourses"
                />
            </div>
            <div class="col-12 col-xl-8 order-1 order-xl-2">
                <div class="row justify-content-center align-items-center g-1 g-xl-0">
                    <div class="col-12 mb-3 mb-lg-0">
                        <SelectedJobRole :SelectedJobRole="jobRoleDetails" />
                    </div>
                    <div class="col-12">
                        <SkillsCard 
                        :Skills="jobRoleDetails.Skills" 
                        :mapCourses="this.mapCourses"
                        :preSelectedCourses="this.selectedCourses" 
                        v-if="jobRoleDetails.Skills"/>
                    </div>
                </div>

            </div>

        </div>
        
    </div>
</template>

<script>

import { userStore } from '@/store';
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SkillsFulfillment from '@/components/SkillFulfillment.vue'
import SkillsCard from '@/components/SkillsCard.vue';
import SelectedJobRole from '@/components/SelectedJobRole.vue';


export default {
    setup() {
        const store = userStore();
        return { store }
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
                { navLabel: "Home", path: "/Home", isActive: false },
                { navLabel: "Learning Journey Details", path: "", isActive: true }
            ],

            learningJourneyDetails: null,


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

    },
    props: ['LJID'],

    components: {
        Breadcrumbs,
        SkillsFulfillment,
        SkillsCard,
        SelectedJobRole
    }
}
</script>

<style lang="scss" scoped>

</style>