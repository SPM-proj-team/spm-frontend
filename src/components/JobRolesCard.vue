<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 g-lg-3 justify-content-center">
            <div v-for="jobRole in jobRoles" :key="jobRole.Job_ID" class="col">
                <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'JobRoleDetails', params: { id: jobRole.Job_ID }}">
                    <button class="btn btn-light card w-100 h-100">
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

export default {
    props: {
        jobRoles: {
            type: Array
        }
    }

}

</script>

<style scoped>

</style>