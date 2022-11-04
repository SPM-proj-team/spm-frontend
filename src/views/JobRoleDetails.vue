<template>
    <div class="container my-3" v-motion-fade>
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row justify-content-center align-content-center g-1 g-xl-4">
            <div class="col-12 col-xl-4 order-2 order-xl-1"  v-motion-slide-left>
                <SkillsFulfillment :Skills="jobRoleSkills" :MappedCourses="mappedCourses"
                    :SelectedCourses="selectedCourses" :preSelectedCourses="preSelectedCourses"
                    :formType="'createFromViewRole'" 
                    :courseRegistration='courseRegistration'/>
            </div>
            <div class="col-12 col-xl-8 order-1 order-xl-2">
                <div class="row justify-content-center align-items-center g-1 g-xl-0" v-motion-slide-right>
                    <div class="col-12 mb-3 mb-lg-0">
                        <SelectedJobRole :SelectedJobRole="jobRoleDetails" />
                    </div>
                    <div class="col-12">
                        <SkillsCard :Skills="jobRoleDetails.Skills" :mapCourses="mapCourses" ref="skillsCardComponent"
                            :preSelectedCourses='preSelectedCourses' v-if="jobRoleDetails.Skills" :courseRegistration='courseRegistration'/>
                    </div>
                </div>
            </div>
        </div>

        

    </div>

    <!-- Lj Info Modal -->
    <div class="modal fade"  id="ljInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Create Learning Journey</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <h3 class="card-title fw-semibold my-3">Learning Journey Details</h3>
                        <div class="form-floating mb-3 ">
                            <input type="text" :class="{
                            'is-invalid':errors.ljName.state
                            }" class="form-control" id="name" placeholder="Learning Journey Name"
                                v-model="this.ljName">
                            <label for="lj-name">Name</label>
                            <div class="small text-danger" v-if="errors.ljName.state">
                                {{ errors.ljName.message }}
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea type="search" id="desc" placeholder="Learning Journey Description"
                                class="form-control" style="height: 150px; max-height: 200px; min-height: 200px;"
                                v-model="this.ljDescription" :class="{
                                'is-invalid':errors.ljDesc.state
                                }" ref="lj_desc"></textarea>
                            <label for="lj-description">Description</label>
                            <div class="small text-danger" v-if="errors.ljDesc.state">
                                {{ errors.ljDesc.message }}
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="createLearningJourney">Create Learning
                            Journey</button>
                    </div>
                </div>
            </div>
        </div>


    <!-- Success Modal -->
    <Transition>
        <SuccessModal v-if="this.isModalVisible" @close="closeModal" @wheel.prevent @touchmove.prevent @scroll.prevent
            :modalTitle="this.modalTitle" :message="this.successModalMessage" :icon="this.modalIcon" />
    </Transition>
</template>

<script>
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import SkillsFulfillment from '@/components/SkillFulfillment.vue'
import SkillsCard from '@/components/SkillsCard.vue';
import { userStore } from '@/store';
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { ref } from '@vue/reactivity';
import SuccessModal from '@/components/SuccessModal.vue'



export default {
    setup() {
        const store = userStore();
        const skillsCardComponent = ref();
        return { store, skillsCardComponent }
    },
    data() {
        return {
            jobRoleDetails: [],
            jobRoleSkills: [],
            selectedCourses: [],
            mappedCourses: [],
            preSelectedCourses: [],
            courseRegistration: [],
            navObjects: [
                { navLabel: "View Roles", path: "/JobRoles", isActive: false },
                { navLabel: "Job Details", path: "", isActive: true }
            ],

            currentStep: 0,


            // form data 
            ljName: '',
            ljDescription: '',

            errors: {
                count: 0,
                ljName: {
                    state: '',
                    message: '',
                },
                ljDesc: {
                    state: '',
                    message: ''
                }
            },

            // Modal
            isModalVisible: false,
            successModalMessage: '',
            modalIcon: 'fa-solid fa-circle-check',
            modalTitle: ''
        }
    },
    async mounted() {
        this.getJobDetails()
        const registrationRes = await this.store.getRegistrationStatus()
        if (registrationRes.data.code === 200) {
            this.courseRegistration = [...registrationRes.data.data]
        }

        
        
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

        // show modal function
        showModal() {
            this.isModalVisible = true
        },


        // close modal function
        closeModal() {
            this.isModalVisible = false
            window.location.href="/"
        },

        async createLearningJourney() {


            this.errors.count = 0

            // lj name validation
            if (this.ljName.length == 0) {
                this.errors.count++
                this.errors.ljName = {
                    state: true,
                    message: 'Invalid Name',
                }

            } else {
                
                this.errors.ljName = {
                    state: false,
                    message: 'Valid Name',
                }

            }

            // lj description validation
            if (this.ljDescription.length == 0) {
                this.errors.count++
                this.errors.ljDesc = {
                    state: true,
                    message: 'Invalid Description',
                }

            } else {

                this.errors.ljDesc = {
                    state: false,
                    message: 'Valid Description',
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
                this.jobRoleDetails)

            console.log(res);

            if (res.data.code == 200) {
                console.log("Post request success");
                this.modalTitle = 'Create Success'
                this.modalIcon = 'fa-solid fa-user-check',
                this.successModalMessage = 'Learning Journey has been successfully created!'
                this.showModal()
            } else {
                this.errors.others = {
                    state: true,
                    message: 'Unexpected error occurred, please contact system developer [error code ' + res.data.code + ']'
                }
            }

        }


    },
    watch: {
        JobRoleID: function() {
            this.$router.go()
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
        SuccessModal
    }
}


</script>

<style lang="scss" scoped>

</style>