<template>
    <div>
        <div class="card justify-content-between shadow">
            <div class="d-flex justify-content-between card-header fw-bold text-bg-dark">
                <div class="text-start w-100">Selected Job Role</div>
            </div>

            <div class="card-body">
                <h5 class="card-title text-start fw-semibold">{{ SelectedJobRole.Job_Role }}</h5>
                <div class="card-text text-start">Department: {{ SelectedJobRole.Department }} | Position: {{ SelectedJobRole.Job_Title }}</div>
                <div class="card-text text-start mt-3" v-if="SelectedJobRole.Description"><b>Role Description</b><br> {{ SelectedJobRole.Description }}</div>
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