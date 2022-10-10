<template>
    <div class="form-check p-0">
        <template v-for="Skill in Skills" :key="Skill.Skill_ID" >
            <div class="accordion mb-3 my-lg-3" :id="'panelsStayOpen-heading'+Skill.Skill_ID">
                <div class="accordion-item">
                    <h2 class="accordion-header" :id="'panelsStayOpen-heading'+Skill.Skill_ID">
                        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#panelsStayOpen-collapse'+Skill.Skill_ID" aria-expanded="false"
                            :aria-controls="'panelsStayOpen-collapse'+Skill.Skill_ID">
                            {{Skill.Name}}
                        </button>
                    </h2>
                    <div :id="'panelsStayOpen-collapse'+Skill.Skill_ID" class="accordion-collapse collapse"
                        :aria-labelledby="'panelsStayOpen-heading'+Skill.Skill_ID">
                        <div class="accordion-body p-0">
                            <ul class="list-group list-group-flush ">
                                <li class="list-group-item" v-for="Course in Skill.Courses" :key="Course.Course_ID">
                                    <div class="container ms-3 my-3">
                                        <input @change="mapCourses(this.checkedCourses)" class="form-check-input " type="checkbox" :value='Course.Course_ID'
                                            :id="'check'+Skill.Skill_ID+Course.Course_ID" v-model="checkedCourses">
                                        <label class="form-check-label" :for="'check'+Skill.Skill_ID+Course.Course_ID">
                                            <p class="fw-semibold"> {{Course.Course_ID}} - {{Course.Course_Name}} </p>
                                            <p>Course Status: <span class="badge bg-secondary m-auto">{{ Course.Course_Status}}</span></p>
                                            <p class="mb-0"> {{ Course.Course_Desc }} </p>
                                        </label>
                                        
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </template>
    </div>

</template>

<script>

export default {
    data() {
        return {
            checkedCourses:[],
            skillCourseCounter:{}
        }
    },
    mounted(){
        this.getSkillsCourseCounter()
    },
    props: {
        Skills: Object,
        mapCourses: Function
    },
    methods: {
        getSkillsCourseCounter(){
           
            console.log(this.Skills)
        }
    }
}

</script>

<style lang="scss" scoped>

</style>