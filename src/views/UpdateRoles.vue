<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row g-3">
            <div class="col-12">
                <div class="card p-3">
                    <div class="card-body">
                        <div class="card-title fs-3 fw-semibold mb-3">Select A Role</div>
                        <div class="form-floating mb-3">
                            <input v-model="jobSearchInput" type="text" class="form-control" id="jobRoleInputText"
                                placeholder="Enter job role">
                            <label for="jobRoleInputText">Search for a job role...</label>
                        </div>
                        {{ this.jobSearchInput }}
                        <li>
                            Showing {{ this.searchJobRole.length }}
                        </li>
                        <li v-for="jobRole in this.jobRoles" :key="jobRole.Job_ID">
                            {{ jobRole.Job_Title }}
                        </li>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card p-3">
                    <div class="card-body">
                        <h5 class="card-title fw-semibold fs-3 mb-3">Role information</h5>
                        <form @submit.prevent="formValidate" class="row g-3" novalidate>
                            <div class="col-2">
                                <div class="form-floating">
                                    <input v-model="job_ID" type="text" class="form-control" id="Job_ID"
                                        placeholder="Job Role ID" required disabled>
                                    <label for="Job_ID">Job Role ID</label>
                                    <div class="invalid-feedback" id="Job-ID-feedback" v-if="errors[0]">
                                        <!-- {{ errors[0].message }} -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-floating">
                                    <input v-model="job_Title" type="text" class="form-control" id="job_Title"
                                        placeholder="Job Role Title" required>
                                    <label for="job_Title">Job Role Title</label>
                                    <div class="invalid-feedback" id="job-Title-feedback" v-if="errors[1]">
                                        <!-- {{ errors[1].message }} -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-floating">
                                    <select class="form-select" id="department"
                                        aria-label="Floating label select example" v-model="department">
                                        <option disabled value="0">...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                    <label for="department">Select a Department</label>
                                    <div class="invalid-feedback" id="department-feedback" v-if="errors[2]">
                                        <!-- {{ errors[2].message }} -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Job Description" id="jobDescription"
                                        style="height: 200px"></textarea>
                                    <label for="floatingTextarea">Job Description</label>
                                    <div class="invalid-feedback" id="Department-feedback" v-if="errors[3]">
                                        <!-- {{ errors[3].message }} -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-8 text-end">
                                <button @click="resetForm()" class="btn btn-lg btn-link fw-semibold" style="text-decoration: none">Reset</button>
                            </div>
                            <div class="col-12 col-lg-4">
                                <button type="submit" class="btn btn-lg btn-primary me-3 fw-semibold w-100">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import axios from 'axios'

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

            // form data / input
            job_ID: 1,
            job_Title: '',
            department: 0,
            jobRole: '',
            jobRole_skills: [],
            errors: []

        }
    },
    mounted() {
        // this.getRoles()
    },
    methods: {
        // get job roles
        getRoles() {
            const path = 'http://127.0.0.1:5000/roles'
            axios.get(path).then((res) => {
                console.log(res.data.data)
                this.jobRoles = res.data.data;
            }).catch((err) => {
                console.log(err);
                this.$router.push({ name: 'NotFound404' });
                return
            })
        },
        formValidate() {
            this.errors = []
            alert("form validation triggered")
        }
    },
    computed: {
        searchJobRole() {
            if (this.jobSearchInput === '') {
                return []
            }

            let matches = 0

            return this.jobRoles.filter(jobRole => {
                if (
                    jobRole.Department.toLowerCase().includes(this.jobSearchInput.value.toLowerCase())
                    && matches < 10
                ) {
                    matches++
                    return this.jobRole
                }
            })
        }

    },
    components: { Breadcrumbs }
}


</script>

<style lang="scss" scoped>

</style>