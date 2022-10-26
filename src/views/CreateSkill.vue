<template>
    <div class="container my-3">
        <Breadcrumbs :navObjects="navObjects" />
        <div class="row">
            <SkillsForm :formData="this.formData" :formType="'create'" :formTitle="'Create New Skill'"/>
        </div>

    </div>
</template>

<script>
import SkillsForm from '@/components/SkillsForm.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'


export default {
    data(){
        return {
            navObjects: [
                { navLabel: "Admin Management", path: "/Admin", isActive: false },
                { navLabel: "Create Role", path: "", isActive: true }
            ],
            formData: {
                // to remove job
                job_id: 0,
                job_role: '',
                job_title: '',
                department: '',
                description: '',
                skills: [],

                skill_id:'',
                skill_name:'',
                courses:[]
            },
            
        }
    },
    components: {
        SkillsForm,
        Breadcrumbs
    }

}

</script>

<style lang="scss" scoped>

</style>