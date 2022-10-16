<template>
    <div class="col-12">
        <div class="card p-3 shadow">
            <div class="card-body">
                <h5 class="card-title fw-semibold fs-3 mb-3">{{ formTitle }}</h5>
                <form @submit.prevent="" action="#" class="row g-3" novalidate>
                    <div class="col-3 col-lg-2 " v-if='formType=="update"'>
                        <div class="form-floating">
                            <input v-model="job_id" type="text" class="form-control" id="Job_ID"
                                placeholder="Job Role ID" required disabled>
                            <label for="Job_ID">Job Role ID</label>
                            <div class="text-danger" v-if="errors.job_id.state">
                                {{ errors.job_id.message }}
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-4">
                        <div class="form-floating">
                            <input v-model="job_role" type="text" class="form-control" id="job_role"
                                placeholder="Job Role Name" required>
                            <label for="job_role">Job Role Name</label>
                            <div class="small text-danger" v-if="errors.job_role.state">
                                {{ errors.job_role.message }}
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-floating">
                            <input v-model="job_title" type="text" class="form-control" id="job_Title"
                                placeholder="Job Role Title" required>
                            <label for="job_Title">Job Role Title</label>
                            <div class="small text-danger" id="job_title-feedback" v-if="errors.job_title.state">
                                {{ errors.job_title.message }}
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-3">
                        <div class="form-floating">
                            <select class="form-select" id="department" aria-label="Floating label select example"
                                v-model="department">
                                <option selected disabled>...</option>
                                <option value="Executive Management">Executive Management</option>
                                <option value="Sales">Sales</option>
                                <option value="Operations">Operations</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                            </select>
                            <label for="department">Department</label>
                            <div class="small text-danger" v-if="errors.department.state">
                                {{ errors.department.message }}
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Job Description" id="description"
                                v-model="description" style="height: 200px"></textarea>
                            <label for="description">Job Description</label>
                            <div class="small text-danger" v-if="errors.description.state">
                                {{ errors.description.message }}
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="fw-semibold fs-3">Skills Information</div>
                        <div class="card shadow-sm mt-3" v-if="this.skills.length">
                            <div class="card-body p-0">
                                <table class="table table-sm table-hover mb-0">
                                    <thead class="table-info bg-opacity-25">
                                        <tr>
                                            <th scope="col" class="ps-4">Skills ID</th>
                                            <th scope="col">Skills Name</th>
                                            <th scope=""></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="skill in this.skills" :key="skill.Skill_ID">
                                            <td class="ps-4">{{skill.Skill_ID}}</td>
                                            <td>{{skill.Name}}</td>
                                            <td class="text-end"><button @click='removeSkill(skill.Skill_ID)'
                                                    type="button" class="btn badge text-bg-danger me-3">
                                                    <font-awesome-icon icon="fa-solid fa-trash" class="me-2" />
                                                    remove
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button @click="addSkills()" type="button" class="btn btn-warning w-100 fw-semibold shadow-sm" id="add-skills-btn">+
                            Add Skills</button>
                    </div>
                    <div class="col-12" v-if="addSkillsForm">

                        <div class="input-group">
                            <div class="form-floating">
                                <input v-model="skillSearchInput" type="search" class="form-control"
                                    id="jobRoleInputText" placeholder="Enter job role" @input="onQueryChangeSkill">
                                <label for="jobRoleInputText">Search for a skill name...</label>
                            </div>
                            <button class="btn btn-outline-primary" type="button" @click="viewAllSkills()">
                                <font-awesome-icon icon="fa-solid fa-chevron-down" class="me-2"
                                    v-show="!this.viewAllSKillsVisible" />
                                <font-awesome-icon icon="fa-solid fa-chevron-up" v-show="this.viewAllSKillsVisible"
                                    class="me-2" />
                                View All Skills
                            </button>
                        </div>


                        <div v-if="this.searchSkill.length">Showing {{ this.searchSkill.length }} of
                            {{
                            this.allSkills.length }}</div>
                        <div v-if="this.searchSkill.length" class="card shadow-sm">
                            <div class="card-body p-0">
                                <table class="table table-sm table-hover mb-0">
                                    <thead class="table-info bg-opacity-25">
                                        <tr>
                                            <th scope="col" class="ps-4">Skill ID</th>
                                            <th scope="col">Skill Name</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="">
                                        <tr v-for="skill in this.searchSkill" :key="skill.Skill_ID">
                                            <td class="ps-4">{{ skill.Skill_ID }}</td>
                                            <td>{{ skill.Name }}</td>
                                            <td class="text-end"><button @click='addSkill(skill)' type="button"
                                                    class="btn badge text-bg-primary me-3">
                                                    + Add
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-if="errors.skill.state">
                        <div class="alert alert-danger" role="alert">
                            {{ errors.skill.message }} <b>{{ errors.skill.details }}</b>
                        </div>

                    </div>

                    <div class="col-12 col-lg-3 text-center">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#resetJobInfoModal" id="reset-btn"
                            class="btn btn-lg btn-light fw-semibold w-100 shadow-sm" style="text-decoration: none">Reset</button>
                    </div>
                    <div class="col-12 col-lg-3" v-if="formType=='update'">
                        <button type="submit" class="btn btn-lg btn-danger me-3 fw-semibold w-100 shadow-sm"  id="delete-btn"
                            data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">Delete
                        </button>
                    </div>
                    <div class="col-12 col-lg-6" v-if='formType=="update"'>
                        <button type="submit" id="update-btn"
                            class="btn btn-lg btn-primary me-3 fw-semibold w-100 shadow-sm"
                            @click="formValidate('update')">Update</button>
                    </div>
                    <div class="col-12 col-lg-9"  v-if='formType=="create"'>
                        <button type="submit" id="create-btn"
                            class="btn btn-lg btn-primary me-3 fw-semibold w-100 shadow-sm"
                            @click="formValidate('create')">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <Transition>
        <SuccessModal v-if="this.isModalVisible" @close="closeModal" @wheel.prevent @touchmove.prevent @scroll.prevent
            :modalTitle="this.modalTitle" :message="this.successModalMessage"
            :icon="this.modalIcon" />
    </Transition>


    <!-- form reset modal -->
    <div class="modal fade" tabindex="-1" id="resetJobInfoModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Reset job information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>This will reset job information to it's original state. Are you sure you want to reset job
                        information?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="reset-close-btn">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" v-if="formType=='update'" id="reset-update-btn"
                        @click="resetJobInfo()">Reset</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="reset-create-btn"
                        @click="resetFormData()">Reset</button>
                </div>
            </div>
        </div>
    </div>

    <!-- delete confirmation modal  -->
    <div class="modal fade" tabindex="-1" id="deleteConfirmationModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Reset job information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>This will delete the selected role, proceed?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="formValidate('delete')">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import SuccessModal from '@/components/SuccessModal.vue'


export default {
    props: {
        formTitle: {
            type: String
        },
        formData: {
            type: Object,
        },
        formType: {
            type: String
        },
        allJobRoles: {
            type: Array
        }
    },
    data() {
        return {
            allSkills: [],
            skillSearchInput: '',
            viewAllSKillsVisible: false,

            jobRoles: this.allJobRoles,

            // form data input
            job_id: this.formData.job_id,
            job_title: this.formData.job_title,
            department: this.formData.department,
            job_role: this.formData.job_role,
            description: this.formData.description,
            skills: this.formData.skills,
            errors: {
                job_id:
                {
                    state: false,
                    message: null,
                    details: null
                },
                job_role:
                {
                    state: false,
                    message: null,
                    details: null
                },
                job_title:
                {
                    state: false,
                    message: null,
                    details: null
                },
                department:
                {
                    state: false,
                    message: null,
                    details: null
                },
                description:
                {
                    state: false,
                    message: null,
                    details: null
                },
                skill:
                {
                    state: false,
                    message: null,
                    details: null
                }
            },


            // form data toggle
            addSkillsForm: false,

            // Modal
            isModalVisible: false,
            successModalMessage: '',
            modalIcon: 'fa-solid fa-circle-check',
            modalTitle: ''
            
        }
    },
    methods: {
        onQueryChangeSkill() {
            this.errors.skill = {
                state: false,
                message: null,
                details: null
            }
        },
        formValidate(submitType) {

            // reset error state
            this.resetErrorState()

            if (submitType == 'update') {

                // check for form inputs

                // Job id validation
                if (this.job_id.length == 0) {
                    this.errors.job_id = {
                        state: true,
                        message: 'Invalid Job ID',
                        details: this.job_id
                    }
                }

                // Job role validation
                if (this.job_role.length == 0) {
                    this.errors.job_role = {
                        state: true,
                        message: 'Invalid Job Role',
                        details: this.job_role
                    }
                }

                // Job title validation
                if (this.job_title.length == 0) {
                    this.errors.job_title = {
                        state: true,
                        message: 'Invalid Job Title',
                        details: this.job_title
                    }
                }

                // department validation
                if (this.department.length == 0) {
                    this.errors.department = {
                        state: true,
                        message: 'Invalid Department',
                        details: this.department
                    }
                }

                // description validation
                if (this.description.length == 0) {
                    this.errors.description = {
                        state: true,
                        message: 'Please enter a description',
                        details: this.description
                    }
                }

                // skill validation
                if (this.skills.length == 0) {
                    this.errors.skill = {
                        state: true,
                        message: 'Invalid skill, please select at least 1 skill',
                        details: null
                    }
                }

                // check if there's no error
                for (const errorType in this.errors) {
                    if (this.errors[errorType].state) {
                        return
                    }
                }


                console.log("sending put request...");

                // populate skill ID from front end
                let formDataSkills = []
                for (let skill of this.skills) {
                    formDataSkills.push(skill.Skill_ID)
                }

                const formData = {
                    "Job_ID": this.job_id,
                    "Job_Role": this.job_role,
                    "Job_Title": this.job_title,
                    "Department": this.department,
                    "Description": this.description,
                    "Skills": formDataSkills
                }

                console.log(formData);

                // if alls good then send put request to backend
                const path = 'http://127.0.0.1:5000/roles'

                axios.put(path, formData)
                    .then((res) => {
                        console.log(res)
                        console.log("put request success");
                        this.modalTitle = 'Update Success'
                        this.modalIcon = 'fa-solid fa-user-check',
                        this.successModalMessage = 'Roles has been successfully updated!'
                        this.showModal()
                    })
                    .catch((err) => {
                        console.log(err);
                        this.modalTitle = 'Update Error'
                        this.modalIcon = 'fa-solid fa-circle-xmark',
                        this.successModalMessage = 'Error! Unable to update role! please contact system developer'
                        this.showModal()
                    })

            } else if (submitType == 'create') {

                // check for form inputs


                // Job role validation
                if (this.job_role.length == 0) {
                    this.errors.job_role = {
                        state: true,
                        message: 'Invalid Job Role',
                        details: this.job_role
                    }
                }

                // Job title validation
                if (this.job_title.length == 0) {
                    this.errors.job_title = {
                        state: true,
                        message: 'Invalid Job Title',
                        details: this.job_title
                    }
                }

                // department validation
                if (this.department.length == 0) {
                    this.errors.department = {
                        state: true,
                        message: 'Invalid Department',
                        details: this.department
                    }
                }

                // description validation
                if (this.description.length == 0) {
                    this.errors.description = {
                        state: true,
                        message: 'Please enter a description',
                        details: this.description
                    }
                }

                // skill validation
                if (this.skills.length == 0) {
                    this.errors.skill = {
                        state: true,
                        message: 'Invalid skill, please select at least 1 skill',
                        details: null
                    }
                }

                // check if there's no error
                for (const errorType in this.errors) {
                    if (this.errors[errorType].state) {
                        return
                    }
                }


                console.log("sending put request...");

                // populate skill ID from front end
                let formDataSkills = []
                for (let skill of this.skills) {
                    formDataSkills.push(skill.Skill_ID)
                }

                const formData = {
                    "Job_Role": this.job_role,
                    "Job_Title": this.job_title,
                    "Department": this.department,
                    "Description": this.description,
                    "Skills": formDataSkills
                }

                console.log(formData);

                // if alls good then send put request to backend
                const path = 'http://127.0.0.1:5000/roles'

                axios.post(path, formData)
                    .then((res) => {
                        console.log(res)
                        console.log("put request success");
                        this.modalTitle = 'Create Success'
                        this.modalIcon = 'fa-solid fa-user-check'
                        this.successModalMessage = 'Roles has been successfully created!'
                        this.showModal();
                    })
                    .catch((err) => {
                        console.log(err);
                        this.modalTitle = 'Create Error'
                        this.modalIcon = 'fa-solid fa-circle-xmark',
                        this.successModalMessage = 'Error! Unable to create role! please contact system developer'
                        this.showModal()
                    })

            }

            else {

                // delete role by sending delete request
                console.log("Deleting role " + this.job_id);

                const path = 'http://127.0.0.1:5000/roles/' + this.job_id
                axios.delete(path)
                    .then((res) => {
                        console.log(res)
                        console.log("Delete success");
                    })
                    .catch((err) => {
                        console.log(err);
                        return
                    })

            }


        },
        resetErrorState() {
            this.errors = {
                job_id:
                {
                    state: false,
                    message: null,
                    details: null
                },
                job_role:
                {
                    state: false,
                    message: null,
                    details: null
                },
                job_title:
                {
                    state: false,
                    message: null,
                    details: null
                },
                department:
                {
                    state: false,
                    message: null,
                    details: null
                },
                description:
                {
                    state: false,
                    message: null,
                    details: null
                },
                skill:
                {
                    state: false,
                    message: null,
                    details: null
                }
            }
        },
        resetFormData() {
            this.job_id = 0,
            this.job_title = '',
            this.department = '',
            this.job_role = '',
            this.description = '',
            this.skills = [],
            this.skillSearchInput = ''
            this.addSkillsForm = false
            this.resetErrorState()
        },
        resetJobInfo() {
            // reset error state
            this.resetErrorState()

            this.jobRoles.filter(jobRole => {
                if (jobRole.Job_ID == this.job_id) {
                    this.job_role = jobRole.Job_Role
                    this.job_title = jobRole.Job_Title
                    this.department = jobRole.Department
                    this.skills = [...jobRole.Skills]
                    this.description = jobRole.Description
                }
            })
        },
        removeSkill(skill_ID) {
            console.log(skill_ID + "has been removed");
            for (let i = 0; i < this.skills.length; i++) {
                if (skill_ID == this.skills[i].Skill_ID) {
                    this.skills.splice(i, 1)
                }
            }
        },
        addSkills() {
            this.addSkillsForm = true
            const path = 'http://127.0.0.1:5000/allskills'
            axios.get(path).then((res) => {
                console.log("skills data loaded")
                this.allSkills = [...res.data.data];
            }).catch((err) => {
                console.log("Unable to retrieve skill from /allskills");
                console.log(err);
                return
            })
        },
        addSkill(skill) {
            // reset skill error
            this.errors.skill = {
                state: false,
                message: null,
                details: null
            }

            // check if skills is already added
            for (const roleSkill of this.skills) {
                if (skill.Skill_ID == roleSkill.Skill_ID) {
                    this.errors.skill = {
                        state: true,
                        message: 'Unable to add existing skill: ',
                        details: skill.Name

                    }
                    return false
                }
            }

            // otherwise add skill
            this.skills.push(skill)
        },
        viewAllSkills() {
            this.viewAllSKillsVisible = !this.viewAllSKillsVisible

            if (this.viewAllSKillsVisible) {
                this.skillSearchInput = 'All'
                return
            }

            this.skillSearchInput = ''

        },
        showModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
            this.$router.go()
        },
    },
    computed: {
        searchSkill() {
            if (this.skillSearchInput === '') {
                return []
            } else if (this.skillSearchInput.toLowerCase() == 'all') {
                return this.allSkills
            }

            let matches = 0

            return this.allSkills.filter(skill => {
                if (
                    skill.Name.toLowerCase().includes(this.skillSearchInput.toLowerCase())
                    && matches < 10
                ) {
                    matches++
                    return skill
                }
            })
        }

    },
    components: {
        SuccessModal
    }
}

</script>

<style lang="scss" scoped>

</style>