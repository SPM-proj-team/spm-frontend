<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row">
            <div class="col-12 mb-3">
                <div class="card p-3 shadow">
                    <div class="card-body">
                        <div class="card-title fs-3 fw-semibold mb-3">Select A Skill</div>
                        <div class="input-group">
                            <div class="form-floating mb-0">
                                <input v-model="skillSearchInput" type="search" class="form-control" id="skillInputText"
                                    placeholder="Enter Skill" @input="onQueryChange">
                                <label for="skillInputText">Search for a Skill name...</label>
                            </div>
                            <button class="btn btn-outline-primary" type="button" @click="viewAllSkills()">
                                <font-awesome-icon icon="fa-solid fa-chevron-down" class="me-2"
                                    v-show="!this.viewAllSkillsVisible" />
                                <font-awesome-icon icon="fa-solid fa-chevron-up" v-show="this.viewAllSkillsVisible"
                                    class="me-2" />
                                View All Skills
                            </button>
                        </div>

                        <div v-if="this.searchSkill.length" class="mt-3">Showing {{ this.searchSkill.length }} of {{
                        this.skills.length }}</div>
                        <div v-if="this.searchSkill.length" class="card shadow-sm">
                            <div class="card-body p-0">
                                <table class="table table-sm table-hover mb-0">
                                    <thead class="table-info bg-opacity-25">
                                        <tr>
                                            <th scope="col" class="ps-4">ID</th>
                                            <th scope="col">Skill Name</th>
                                            <th scope="col" class="text-center">Courses</th>
                                        </tr>
                                    </thead>
                                    <tbody class="">
                                        <tr v-for="skill in this.searchSkill" :key="skill.Job_ID"
                                            @click="selectSkill(skill)">

                                            <td class="ps-4">{{ skill.Skill_ID }}</td>
                                            <td>{{ skill.Name }}</td>
                                            <!-- <td>{{ skill.Department }}</td> -->
                                            <td class="text-center"><span class="badge bg-primary rounded-pill">{{
                                            skill.Courses.length }}
                                                    Courses</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SkillsForm v-if="this.selectedSkill.skill_id" :formData="this.selectedSkill" :formType="'update'"
                :allSkills='this.skills' :formTitle="'Skill Information'" />
        </div>
    </div>




</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import axios from 'axios'
import SkillsForm from '@/components/SkillsForm.vue'


export default {
    data() {
        return {

            // navigation objects for breadcrumbs
            navObjects: [
                { navLabel: "Admin Management", path: "/Admin", isActive: false },
                { navLabel: "Update Roles", path: "", isActive: true }
            ],

            // search input
            skillSearchInput: '',
            skills: [],
            viewAllSkillsVisible: false,

            selectedSkill: {
                skill_id: '',
                skill_name: '',
                courses: []
            },



        }
    },
    mounted() {
        this.getSkills()
    },
    methods: {
        // get skills
        getSkills() {
            const path = 'http://127.0.0.1:5000/skills'
            axios.get(path).then((res) => {
                console.log("Skills data loaded")
                this.skills = [...res.data.data];
            }).catch((err) => {
                console.log(err);
                this.$router.push({ name: 'NotFound404' });
                return
            })
        },

        // clear skills form whenever input is empty by calling resetFormData() from child
        onQueryChange(event) {
            if (event.target.value.trim().length === 0) {
                this.selectedSkill.skill_id = ''
                this.selectedSkill.skill_name = ''
                this.selectedSkill.courses = []
            }
        },

        selectSkill(skill) {
            this.skillSearchInput = skill.Name
            this.selectedSkill.skill_id = skill.Skill_ID
            this.selectedSkill.skill_name = skill.Name
            this.selectedSkill.courses = [...skill.Courses]
        },


        viewAllSkills() {
            this.viewAllSkillsVisible = !this.viewAllSkillsVisible

            if (this.viewAllSkillsVisible) {
                this.skillSearchInput = 'All'
                return
            }

            this.skillSearchInput = ''

        },

    },
    computed: {
        searchSkill() {

            // if null
            if (this.skillSearchInput === '') {
                return []
            }

            else if (this.skillSearchInput.toLowerCase() == 'all') {
                return this.skills
            }

            let matches = 0


            // with user input
            return this.skills.filter(skill => {
                if (
                    skill.Name.toLowerCase().includes(this.skillSearchInput.toLowerCase())
                    && matches < 10
                ) {
                    matches++
                    return skill
                }
            })
        },



    },
    components: { Breadcrumbs, SkillsForm }
}


</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>