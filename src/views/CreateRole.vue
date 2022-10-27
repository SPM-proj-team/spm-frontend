<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row">
            <JobRolesForm :formData="this.formData" :formType="'create'" :formTitle="'Create New Role'"/>
        </div>

    </div>
</template>

<script>
import JobRolesForm from '@/components/JobRolesForm.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'


export default {
    data(){
        return {
            navObjects: [
                { navLabel: "Admin Management", path: "/Admin", isActive: false },
                { navLabel: "Create Role", path: "", isActive: true }
            ],
            formData: {
                job_id: 0,
                job_role: '',
                job_title: '',
                department: '',
                description: '',
                skills: [],

                

            },
            
        }
    },
    components: {
        JobRolesForm,
        Breadcrumbs
    }

}

</script>

<style lang="scss" scoped>

</style>