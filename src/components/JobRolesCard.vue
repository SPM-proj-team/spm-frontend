<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 g-lg-3 justify-content-center">
            <div v-for="jobRole in jobRoles" :key="jobRole.Job_ID" class="col">
                <router-link class="router-link" :to="{ name: 'JobRoleDetails', params: { JobRoleID: jobRole.Job_ID }}">
                    <button class="btn btn-light card w-100 h-100 shadow-sm" @click="selectJobRole(jobRole)">
                        <div class="card-body w-100">
                            <h5 class="card-title ">{{jobRole.Job_Role}}</h5>
                            <p class="card-text"> {{jobRole.Job_Title}}</p>
                        </div>
                    </button>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>

import { userStore } from '@/store';

export default {
    setup() {
            const store = userStore()
            return { store }
        },
    props: {
        jobRoles: {
            type: Array
        }
    },
    methods: {
        selectJobRole(selectedJobRole){
            this.store.selectJobRole(selectedJobRole)
        }
    }

}

</script>

<style scoped>


</style>