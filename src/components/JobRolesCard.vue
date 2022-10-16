<template>
    <div class="container">
        <div class="row">
            <div class="col-12">


                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title fw-semibold">Job Roles Filter</h5>

                        <div class="row">
                            <div class="col-8">
                                <!-- search job role filter -->
                                <div class="form-floating">
                                    <input type="search" class="form-control" id="floatingInput"
                                        placeholder="Enter Role Name.." v-model="searchQuery" @input="filterRoles">
                                    <label for="floatingInput">Search for role...</label>
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="dropdown w-100 h-100">
                                    <button class="btn btn-large btn-secondary dropdown-toggle w-100 h-100" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Department
                                    </button>
                                    <ul class="dropdown-menu" >
                                        <li><a class="dropdown-item" v-for="department in this.store.departments" :key="department">{{ department }}</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>


            </div>
            
            <!-- <section class="dropdown-wrapper col">
                <div @click="isVisible = !isVisible" class="selected-roles">
                    <span v-if="selectedRole"> {{selectedRole.Job_Role}}</span>
                    <span v-else> Select User</span>
                    <svg :class="isVisible ? 'dropdown' : ''" class="drop-down-icon" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
                    </svg>
                </div>
                <div :class="isVisible ? 'visible' : 'invisible'" class="dropdown-popover">
                    <input v-model="searchQuery" type="text" placeholder="Search for roles">
                    <span v-if="filterRoles.length == 0">No Data Available</span>
                    <div class="options">
                        <ul>
                            <li @click="selectRoles(jobRole)" v-for="jobRole in filterRoles" :key="jobRole.Job_ID">
                                {{jobRole.Job_Role}}</li>
                        </ul>
                    </div>
                </div>
            </section> -->
            <div class="col">
                <div
                    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-lg-3 justify-content-center align-content-center">
                    <div v-for="jobRole in this.jobRoles" :key="jobRole.Job_ID" class="col">
                        <router-link class="router-link"
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
                    </div>
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
        },
        selectRoles(jobRole) {
            this.selectedRole = jobRole;
            this.isVisible = false;
        },
        viewAllRoles() {
            this.isVisible = !this.isVisible
        },
        filterRoles() {
            const query = this.searchQuery.toLowerCase();
            if (this.searchQuery == "") {
                this.jobRoles = this.store.jobRoles;
            }
            this.jobRoles = this.allJobRoles.filter((jobRole) => {
                return Object.values(jobRole).some((word) =>
                    String(word).toLowerCase().includes(query)
                );
            });
        },

    },
    data() {
        return {
            searchQuery: "",
            selectedRole: null,
            isVisible: false,
            jobRoles: [...this.store.jobRoles],
            departments: [...this.store.departments]
        };
    },
    watch: {
        searchQuery: function () {
            this.jobRoles = this.store.jobRoles.filter((jobRole) =>
                jobRole.Job_Role.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },

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

.dropdown-wrapper {
    max-width: 350px;
    position: relative;
    margin: 0 auto;

    .selected-roles {
        height: 40px;
        border: 2px solid lightgray;
        border-radius: 5px;
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: 400;

        .drop-down-icon {
            transform: rotate(0eg);
            transition: all 0.4s ease;

            &.dropdown {
                transform: rotate(180deg);
            }
        }
    }

    .dropdown-popover {
        position: absolute;
        border: 2px solid lightgray;
        top: 46px;
        left: 0;
        right: 0;
        background-color: #fff;
        width: 100%;
        padding: 10px;
        visibility: hidden;
        transition: all 0.5s linear;
        max-height: 0px;
        overflow: hidden;

        &.visible {
            max-height: 450px;
            visibility: visible;
        }

        input {
            width: 90%;
            height: 30px;
            border: 2px solid lightgray;
            font-size: 16px;
            padding-left: 8px;
        }

        .options {
            width: 100%;

            ul {
                list-style: none;
                text-align: left;
                padding-left: 8px;
                max-height: 180px;
                overflow-y: scroll;
                overflow-x: hidden;

                li {
                    width: 100%;
                    border-bottom: 1px solid lightgray;
                    padding: 10px;
                    background-color: #f1f1f1;
                    cursor: pointer;
                    font-size: 16px;

                    &:hover {
                        background: #70878a;
                        color: #fff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>