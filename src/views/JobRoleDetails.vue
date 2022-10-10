<template>
    <div class="container">
        <h1 class="my-5 text-center text-gray-500 fw-bold">Job Roles Details</h1>
        <div class="container">
            <div class="row justify-content-center align-content-center g-0 g-xl-4">
                <div class="col-12 col-xl-4 order-2 order-xl-1">
                    <SkillsFulfillment :Skills="jobRoleSkills" :MappedCourses="this.mappedCourses" :SelectedCourses="this.selectedCourses"/>
                </div>
                <div class="col-12 col-xl-8 order-1 order-xl-2">
                    <div class="row justify-content-center align-items-center g-1 g-xl-0">
                        <div class="col-12"> <SelectedJobRole :SelectedJobRole="jobRoleDetails"/></div>
                        <div class="col-12"><SkillsCard :Skills="jobRoleDetails.Skills" :mapCourses="this.mapCourses" />
</div>
                    </div>
                   
                </div>
                
            </div>

        </div>
    </div>
</template>

<script>
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import SkillsFulfillment from '@/components/SkillFulfillment.vue'
import SkillsCard from '@/components/SkillsCard.vue';
import { userStore } from '@/store';
import axios from 'axios'


export default {
    setup() {
        const store = userStore();
        return { store }
    },
    data() {
        return {
            jobRoleDetails: [],
            jobRoleSkills: [],
            selectedCourses: [],
            mappedCourses: [],
        }
    },
    mounted() {
        this.getJobDetails()
    },
    methods: {
        // Get individual job details based on route params (JobRole_ID)
        getJobDetails() {
            const path = 'http://127.0.0.1:5000/roles/' + this.JobRoleID;
            console.log("Retrieving role detail from " + path)
            axios.get(path)
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
    props: ['JobRoleID'],

    // or alternatively without props can use:
    // data(){
    //     return {
    //         id: this.$route.params.id
    //     }
    // }

    components: {
        SelectedJobRole,
        SkillsCard,
        SkillsFulfillment
    }
}


</script>

<style lang="scss" scoped>

</style>