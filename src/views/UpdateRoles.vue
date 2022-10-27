<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row">
            <div class="col-12 mb-3">
                <div class="card p-3 shadow">
                    <div class="card-body">
                        <div class="card-title fs-3 fw-semibold mb-3">Select A Role</div>
                        <div class="input-group">
                            <div class="form-floating mb-0">
                                <input v-model="jobSearchInput" type="search" class="form-control" id="jobRoleInputText"
                                    placeholder="Enter job role" @input="onQueryChange">
                                <label for="jobRoleInputText">Search for a job role name...</label>
                            </div>
                            <button class="btn btn-outline-primary" type="button" @click="viewAllRoles()">
                                <font-awesome-icon icon="fa-solid fa-chevron-down" class="me-2"
                                    v-show="!this.viewAllRolesVisible" />
                                <font-awesome-icon icon="fa-solid fa-chevron-up" v-show="this.viewAllRolesVisible"
                                    class="me-2" />
                                View All Roles
                            </button>
                        </div>

                        <div v-if="this.searchJobRole.length" class="mt-3">Showing {{ this.searchJobRole.length }} of {{
                        this.jobRoles.length }}</div>
                        <div v-if="this.searchJobRole.length" class="card shadow-sm">
                            <div class="card-body p-0">
                                <table class="table table-sm table-hover mb-0">
                                    <thead class="table-info bg-opacity-25">
                                        <tr>
                                            <th scope="col" class="ps-4">Role ID</th>
                                            <th scope="col">Role Name</th>
                                            <th scope="col">Role Title</th>
                                            <th scope="col">Department</th>
                                            <th scope="col" class="text-center">Skills</th>
                                        </tr>
                                    </thead>
                                    <tbody class="">
                                        <tr v-for="jobRole in this.searchJobRole" :key="jobRole.Job_ID"
                                            @click="selectJobRole(jobRole)">
                                            <td class="ps-4">{{ jobRole.Job_ID }}</td>
                                            <td>{{ jobRole.Job_Role }}</td>
                                            <td>{{ jobRole.Job_Title }}</td>
                                            <td>{{ jobRole.Department }}</td>
                                            <td class="text-center"><span class="badge bg-primary rounded-pill">{{
                                            jobRole.Skills.length }}
                                                    Skills</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <JobRolesForm v-if="this.selectedJobRole.job_id" :formData="this.selectedJobRole" :formType="'update'"
                :allJobRoles='this.jobRoles' :formTitle="'Role Information'" />
        </div>
    </div>




</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import axios from 'axios'
import JobRolesForm from '@/components/JobRolesForm.vue'

// import { userStore } from '@/store';

export default {
    data() {
        return {

            // navigation objects for breadcrumbs
            navObjects: [
                { navLabel: "Admin Management", path: "/Admin", isActive: false },
                { navLabel: "Update Roles", path: "", isActive: true }
            ],

            // search input
            jobSearchInput: '',
            jobRoles: [],
            viewAllRolesVisible: false,

            selectedJobRole: {
                job_id: 0,
                job_role: '',
                job_title: '',
                department: '',
                description: '',
                skills: []
            },



        }
    },
    mounted() {
        this.getRoles()
    },
    methods: {
        // get job roles
        getRoles() {
            const path = 'http://127.0.0.1:5000/roles'
            axios.get(path).then((res) => {
                console.log("job roles data loaded")
                this.jobRoles = [...res.data.data];
            }).catch((err) => {
                console.log(err);
                this.$router.push({ name: 'NotFound404' });
                return
            })
        },

        // clear job roles form whenever input is empty by calling resetFormData() from child
        onQueryChange(event) {
            if (event.target.value.trim().length === 0) {
                this.selectedJobRole.job_id = ''
                this.selectedJobRole.job_role = ''
                this.selectedJobRole.job_title = ''
                this.selectedJobRole.department = ''
                this.selectedJobRole.description = ''
                this.selectedJobRole.skills = []
            }
        },

        selectJobRole(jobRole) {
            this.jobSearchInput = jobRole.Job_Role
            this.selectedJobRole.job_id = jobRole.Job_ID
            this.selectedJobRole.job_role = jobRole.Job_Role
            this.selectedJobRole.job_title = jobRole.Job_Title
            this.selectedJobRole.department = jobRole.Department
            this.selectedJobRole.description = jobRole.Description
            this.selectedJobRole.skills = [...jobRole.Skills]
        },


        viewAllRoles() {
            this.viewAllRolesVisible = !this.viewAllRolesVisible

            if (this.viewAllRolesVisible) {
                this.jobSearchInput = 'All'
                return
            }

            this.jobSearchInput = ''

        },

    },
    computed: {
        searchJobRole() {

            // if null
            if (this.jobSearchInput === '') {
                return []
            }

            else if (this.jobSearchInput.toLowerCase() == 'all') {
                return this.jobRoles
            }

            let matches = 0


            // with user input
            return this.jobRoles.filter(jobRole => {
                if (
                    jobRole.Job_Role.toLowerCase().includes(this.jobSearchInput.toLowerCase())
                    && matches < 10
                ) {
                    matches++
                    return jobRole
                }
            })
        },



    },
    components: { Breadcrumbs, JobRolesForm }
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