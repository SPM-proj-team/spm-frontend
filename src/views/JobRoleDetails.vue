<template>
    <div class="container">
        <h1 class="my-5 text-center text-gray-500">Job Roles Details</h1>
        <div class="container my-3">
            <SelectedJobRole :SelectedJobRole="jobRoleDetails"></SelectedJobRole>
            <div class="row justify-content-center g-2">
                <div class="col-4">
                    <SkillsRequirements :Skills="jobRoleDetails.Skills" />
                </div>
                <div class="col">
                    <SkillsCard :Skills="jobRoleDetails.Skills" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import SelectedJobRole from '@/components/SelectedJobRole.vue';
import SkillsRequirements from '@/components/SkillRequirements.vue'
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
            const path = 'http://127.0.0.1:5000/roles/' + this.JobRoleID;
            console.log(path)
            axios.get(path)
                .then((res) => {
                    // console.log(res.data.data);
                    this.jobRoleDetails = res.data.data[0];
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
        SkillsCard,
        SkillsRequirements
    }
}


</script>

<style lang="scss" scoped>

</style>