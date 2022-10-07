<template>
    <div class="container">
        <h1 class="my-5 text-center text-gray-500">Job Roles Details</h1>
        <p class="text-center">The job id is {{ JobRoleID }}</p>
        <div class="container my-3">
            <SelectedJobRole :SelectedJobRole="jobRoleDetails"></SelectedJobRole>
        </div>
        <div class="container my-3">
            <SkillsCard :Skills="jobRoleDetails.Skills" />
        </div>
    </div>
</template>

<script>
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import SkillsCard from '@/components/SkillsCard.vue';
import { userStore } from '@/store';
import axios from 'axios'


export default {
    setup() {
        const store = userStore();
        return { store }
    },
    data() {
        return {
            jobRoleDetails: []
        }
    },
    mounted() {
        this.getJobDetails()
    },
    methods: {
        // Get individual job details based on route params (JobRole_ID)
        getJobDetails() {
            const path = 'http://127.0.0.1:5000/roles';
            axios.get(path)
                .then((res) => {
                    // console.log(res.data.data);
                    this.jobRoleDetails = res.data.data[this.JobRoleID - 1];
                    console.log(this.jobRoleDetails)
                })
                .catch((err) => {
                    console.log(err);
                    // this.$router.push({ name: 'NotFound404' });
                })
        }
    },
    props: ['JobRoleID'],

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