<template>
    <div class="card mb-3 text-bg-info bg-opacity-25 mt-4 shadow">
        <div class="row g-0">
            <div class="col">
                <div class="card-body">
                    <h5 class="card-title">{{ userName }}</h5>
                    <p class="card-text">
                        <b>Role:</b> {{ userJobRole }}<br>
                        <b>Department:</b> {{ userDepartment }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: [ "userName", "userJobRole", "userDepartment" ]
    }

</script>

<style scoped>

</style>