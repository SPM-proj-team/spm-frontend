<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row justify-content-center align-content-center g-1 g-xl-4">
            <div class="col-12 col-xl-4 order-2 order-xl-1">
                <SkillsFulfillment 
                :Skills="jobRoleSkills" 
                :MappedCourses="mappedCourses"
                :SelectedCourses="selectedCourses" 
                :preSelectedCourses="preSelectedCourses"
                :formType="'create'" />
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

        <!-- Success Modal -->
        <Transition>
            <SuccessModal v-if="isModalVisible" @close="closeModal" @wheel.prevent @touchmove.prevent @scroll.prevent
                :modalTitle="this.modalTitle" :message="this.LJModalMessage" :modalType="this.modalType"/>
        </Transition>

    </div>
</template>

<script>
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import SkillsFulfillment from '@/components/SkillFulfillment.vue'
import SkillsCard from '@/components/SkillsCard.vue';
import { userStore } from '@/store';
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SuccessModal from '@/components/SuccessModal.vue';
import { ref } from '@vue/reactivity';
// import CreateLearningJourney from '@/views/CreateLearningJourney.vue';


export default {
    setup() {
        const store = userStore();
        const LJinfoModal = ref();
        // const createLearningJourney = ref();
        return { store, LJinfoModal }
    },
    data() {
        return {
            jobRoleDetails: [],
            jobRoleSkills: [],
            selectedCourses: [],
            mappedCourses: [],
            preSelectedCourses: [],
            navObjects: [
                { navLabel: "View Roles", path: "/JobRoles", isActive: false },
                { navLabel: "Job Details", path: "", isActive: true }
            ],
            isModalVisible: false,
            LJModalMessage: '',
            modalTitle: '',
            modalIcon: 'fa-solid fa-circle-check',
            modalType: '',

            currentStep: 0,
            ljName: '',
            ljDescription: '',
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
        },

        // open modal function
        openModalForLJInfo() {
            console.log("======> openModalForLJInfo ======")
            this.isModalVisible = true
            this.LJModalMessage = "Please Enter Learning Journey Name and Description"
            this.modalTitle = "Create Learning Journey"
            this.modalType = 'createLJInfo'
        },

        // close modal function
        closeModal() {
            this.isModalVisible = false
            this.$router.go()
        },

        nextBtnClick() {
            console.log("======> nextBtnClick on JobRoleDetails.vue ======")
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
        SkillsFulfillment,
        Breadcrumbs,
        // CreateLearningJourney,
        SuccessModal
    }
}


</script>

<style lang="scss" scoped>

</style>