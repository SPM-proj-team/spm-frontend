<template>
    <div class="container">
        <h1 class="my-5 text-center text-gray-500">Job Roles Details</h1>
        <p class="text-center">The job id is {{ id }}</p>
    </div>
</template>

<script>
export default {
    props: ['id'],

    // or alternatively without props can use:
    // data(){
    //     return {
    //         id: this.$route.params.id
    //     }
    // }
}

</script>

<style lang="scss" scoped>

</style>