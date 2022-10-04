<template>
    <div class="card my-3">
        <div class="card-body">
            <h5 class="card-title fw-bold mb-3">Skills Fulfillment</h5>
            <div class="card-subtitle mb-1 text-muted d-flex justify-content-start align-items-start">
                <h6 class="me-2"> {{ countSkillsMapped()}} / {{Skills.length}} Skills Mapped</h6>
                <span class="card-subtitle text-muted">|</span>
                <h6 class="me-auto ms-2">{{ SelectedCourses.length }} courses</h6>

            </div>
        </div>
        <ul class="list-group list-group-numbered list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-start" v-for="Skill in Skills"
                :key="Skill.Skill_ID">
                <div class="ms-2 me-auto">
                    <div class="fw-semibold">{{ Skill.Name }}</div>
                    <template v-for="course in MappedCourses" :key="course.Course_ID +'_'+Skill.Skill_ID">
                        <div v-if="course.Skill_ID==Skill.Skill_ID">
                            • {{ course.Course_ID }} - {{ course.Course_Name }}
                        </div>
                    </template>
                </div>
                <span class="badge bg-success rounded-pill fs-9"> {{ countCoursesPerSkill(Skill.Skill_ID) }}
                    Courses</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        Skills: Object,
        MappedCourses: Object,
        SelectedCourses: Array
    },

    mounted() {

    },
    methods: {
        countCoursesPerSkill(Skill_ID) {

            var courseCounter = 0
            for (var Course of this.MappedCourses) {
                if (Course.Skill_ID == Skill_ID) {
                    courseCounter++
                }
            }

            return courseCounter
        },

        countSkillsMapped() {

            var skillsCounter = {}
            
            for (var Course of this.MappedCourses) {
                if (Course.Skill_ID in skillsCounter){
                    skillsCounter[Course.Skill_ID]++
                } else {
                    skillsCounter[Course.Skill_ID] = 0
                }
               
            }

            return Object.keys(skillsCounter).length
        }

    }
}

</script>

<style scoped>

</style>