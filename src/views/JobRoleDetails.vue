<template>
    <div class="container">
        <h1 class="my-5 text-center text-gray-500">Job Roles Details</h1>
        <p class="text-center">The job id is {{ id }}</p>
        <div class="container my-3">
            <SelectedJobRole :SelectedJobRole="store.selectedJobRole"></SelectedJobRole>
        </div>
        <div class="conatiner my-3">
            <SkillsCard :Skills="store.selectedJobRole.Skills"/>
        </div>
    </div>
</template>

<script>
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import SkillsCard from '@/components/SkillsCard.vue';
import { userStore } from '@/store';
   
export default {
    setup () {
        const store = userStore();
        return { store }
    },
    props: ['id', 'SelectedJobRole'],

    // or alternatively without props can use:
    // data(){
    //     return {
    //         id: this.$route.params.id
    //     }
    // }

    components: {
        SelectedJobRole,
        SkillsCard
    }
}
    

</script>

<style lang="scss" scoped>

</style>