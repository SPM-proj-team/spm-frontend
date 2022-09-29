<template>
    <div class="container">
        <div class="row row-cols-md-3 g-2 g-lg-3 justify-content-center">
            <div v-for="jobRole in jobRoles" :key="jobRole.id" class="col ">
                <button class="btn btn-light card w-100 h-100">
                    <div class="card-body w-100">
                        <h5 class="card-title ">{{jobRole.role}}</h5>
                        <p class="card-text"> {{jobRole.position}}</p>
                    </div>
                </button>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    props: ['jobRoles']
    
}

</script>

<style scoped>

</style>