<template>
    <div>
        <div class="card justify-content-between">
            <div class="d-flex justify-content-between card-header fw-bold text-white bg-success">
                <div class="text-center w-100">Selected Job Role</div>
                <router-link to="/JobRoles">
                    <button class="btn-close btn-close-white"></button>
                </router-link>
            </div>

            <div class="card-body">
                <h5 class="card-title text-center ">{{ SelectedJobRole.Job_Role }}</h5>
                <p class="card-text  text-center">{{ SelectedJobRole.Job_Title }}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        SelectedJobRole: Object
    }
}

</script>

<style scoped>

</style>