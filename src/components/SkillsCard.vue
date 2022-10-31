<template>
    <div class="form-check p-0">
        <template v-for="Skill in Skills" :key="Skill.Skill_ID" >
            <div class="accordion mb-3 my-lg-3 shadow" :id="'panelsStayOpen-heading'+Skill.Skill_ID">
                <div class="accordion-item">
                    <h2 class="accordion-header" :id="'panelsStayOpen-heading'+Skill.Skill_ID">
                        <button class="accordion-button fw-bold" 
                        type="button" 
                        data-bs-toggle="collapse"
                        :data-bs-target="'#panelsStayOpen-collapse'+Skill.Skill_ID"
                        aria-expanded="false"
                        :class="{ 'collapsed': checkSelectedCourses(Skill.Courses)==0}"
                        :aria-controls="'panelsStayOpen-collapse'+Skill.Skill_ID">
                            {{Skill.Name}}
                            <span class="mx-2" v-if="checkSelectedCourses(Skill.Courses)">[ {{ checkSelectedCourses(Skill.Courses) }} Selected ]</span>
                        </button>
                        
                    </h2>
                    <div :id="'panelsStayOpen-collapse'+Skill.Skill_ID" 
                    class="accordion-collapse collapse"
                    :aria-labelledby="'panelsStayOpen-heading'+Skill.Skill_ID"
                    :class="{ 'show': checkSelectedCourses(Skill.Courses)>0}"
                    >
                        <div class="accordion-body p-0">
                            <ul class="list-group list-group-flush ">
                                <li class="list-group-item" v-for="Course in Skill.Courses" :key="Course.Course_ID">
                                    <div class="container ms-3 my-3">
                                        <input @change="mapCourses(this.checkedCourses)" class="form-check-input" type="checkbox" :value='Course.Course_ID'
                                            :id="'check'+Skill.Skill_ID+Course.Course_ID" v-model="checkedCourses" >
                                        <label class="form-check-label" :for="'check'+Skill.Skill_ID+Course.Course_ID">
                                            <p class="fw-semibold"> {{Course.Course_ID}} - {{Course.Course_Name}} </p>
                                            <div class="my-3 small">
                                                <b>Course Status:</b> {{ Course.Course_Status }} |
                                                <b>Registration Status:</b> {{ mapRegistration(Course.Course_ID, 'registration') }} | 
                                                <b>Completion Status:</b> {{ mapRegistration(Course.Course_ID, 'completion') }}
                                                
                                            </div>
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
            checkedCourses: this.preSelectedCourses,
            skillCourseCounter:{},
            activeColor: 'bg-gray-100'
        }
    },
    
    props: {
        Skills: Object,
        mapCourses: Function,
        preSelectedCourses: Array,
        courseRegistration: Object
    },

    methods: {
        
        checkSelectedCourses(Courses){
            var courseCounter = 0;
            for (let Course of Courses){
                if (this.checkedCourses.includes(Course.Course_ID)){
                    courseCounter++
                }
            }
            return courseCounter
        },

        mapRegistration(courseID, type){

            if (type === "registration"){

                for (let registration of this.courseRegistration){
                    if (registration.Course.Course_ID === courseID){
                        return registration.Reg_Status
                    }
                }
                
                return 'Not Registered';

            } else if (type === "completion"){


                for (let registration of this.courseRegistration){
                    if (registration.Course.Course_ID === courseID){
                        return registration.Completion_Status
                    }
                }


                return 'Not Completed';
            }
            
        }
        
    }
    
}

</script>
