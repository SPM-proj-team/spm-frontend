<template>

    <div class="row">
        <div class="col-12">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title fw-semibold">Filters</h5>

                    <div class="row g-3">
                        <div class="col-12 col-md-5 col-xl-3">
                            <div class="dropdown w-100 h-100">
                                <button class="btn btn-large btn-outline-success dropdown-toggle w-100 h-100"
                                    type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                    aria-expanded="false" :class="{'disabled':this.searchQuery.length>0}">
                                    <font-awesome-icon icon="fa-solid fa-house-chimney-user" class="mx-3" />
                                    <template v-if="!this.selectedDepartment.length">Filter
                                        by Department </template><b v-if="this.selectedDepartment.length">[{{
                                        this.selectedDepartment.length }} selected] </b>
                                </button>
                                <form class="dropdown-menu p-4">
                                    <div class="form-check" v-for="department in this.store.departments"
                                        :key="department">
                                        <input class="form-check-input" type="checkbox"
                                            v-model="this.selectedDepartment" :value="department" :id="department">
                                        <label class="form-check-label" :for="department">
                                            {{ department }}
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="col-12 col-md-7 col-xl-9">
                            <!-- search job role filter -->
                            <div class="input-group">
                                <div class="form-floating">
                                    <input type="search" class="form-control" id="floatingInput"
                                        placeholder="Enter Role Name.." v-model="searchQuery"
                                        @click="this.selectedDepartment=[]"
                                        :disabled="this.selectedDepartment.length>0">
                                    <label for="floatingInput">Search for role... </label>
                                </div>

                            </div>

                        </div>

                    </div>


                </div>

            </div>


        </div>

        <div class="col">
            <div
                class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-lg-3 justify-content-start align-content-center">
                <div v-for="jobRole in this.jobRoles" :key="jobRole.Job_ID" class="col">
                    <router-link v-if="formType!='create'" class="router-link"
                        :to="{ name: 'JobRoleDetails', params: { JobRoleID: jobRole.Job_ID }}">
                        <button class="btn btn-light card w-100 h-100 shadow-sm" @click="selectJobRole(jobRole)">
                            <div class="card-body w-100 text-start">
                                <h5 class="card-title my-auto fw-semibold">{{jobRole.Job_Role}}</h5>
                                <p class="card-text my-auto"> {{jobRole.Department}}</p>
                                <p class="card-text my-auto"> {{jobRole.Job_Title}}</p>
                            </div>
                            <div class="ico-card">
                                <i>
                                    <font-awesome-icon icon="fa-solid fa-user" />
                                </i>
                            </div>
                        </button>
                    </router-link>
                    <template v-if="formType=='create'">
                        <button class="btn btn-light card w-100 h-100 shadow-sm" @click="selectJobRole(jobRole)">
                            <div class="card-body w-100 text-start">
                                <h5 class="card-title my-auto fw-semibold">{{jobRole.Job_Role}}</h5>
                                <p class="card-text my-auto"> {{jobRole.Department}}</p>
                                <p class="card-text my-auto"> {{jobRole.Job_Title}}</p>
                            </div>
                            <div class="ico-card">
                                <i>
                                    <font-awesome-icon icon="fa-solid fa-user" />
                                </i>
                            </div>
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>




</template>

<script>

import { userStore } from '@/store';

export default {
    async setup() {
        const store = userStore();
        await store.getRoles();
        return { store }
    },

    methods: {
        selectJobRole(selectedJobRole) {
            this.store.selectJobRole(selectedJobRole)
            if(this.formType == 'create') {
                this.$emit('selectJobRole')

            }
        },
        viewAllRoles() {
            this.isVisible = !this.isVisible
        },


    },
    data() {
        return {
            searchQuery: "",
            isVisible: false,
            jobRoles: [...this.store.jobRoles],
            departments: [...this.store.departments],
            selectedDepartment: []
        };
    },
    watch: {
        searchQuery: function () {

            if (this.searchQuery == "" && this.selectedDepartment.length == 0) {
                this.jobRoles = this.store.jobRoles;
            } else {
                this.jobRoles = this.store.jobRoles.filter((jobRole) =>
                    jobRole.Job_Role.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }



        },
        selectedDepartment: function () {
            this.searchQuery = ""
            if (this.selectedDepartment.length == 0) {
                this.jobRoles = this.store.jobRoles;
            } else {
                this.jobRoles = this.store.jobRoles.filter((jobRole) =>
                    this.selectedDepartment.includes(jobRole.Department))
            }

        }
    },
    props: {
        formType: {
            type: String,
            default: ''
        }
    }

}


</script>

<style scoped lang="scss">
.ico-card {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

i {
    position: relative;
    right: -30%;
    top: 40%;
    font-size: 5rem;
    line-height: 0;
    opacity: .07;
    color: rgb(146, 33, 33);
    z-index: 0;
}
</style>