<template>
    <div>
        <div class="card">
            <div class="card-header fw-bold text-center">
                Selected Job Role
            </div>
            <div class="card-body">
                <h5 class="card-title text-center">{{ SelectedJobRole.Job_Role }}</h5>
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