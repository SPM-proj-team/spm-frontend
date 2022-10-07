<template>
    <div class="form-check p-0">
        <div v-for="Skill in Skills" :key="Skill.Skill_ID" class="container my-3">
            <div class="accordion" :id="'panelsStayOpen-heading'+Skill.Skill_ID">
                <div class="accordion-item">
                    <h2 class="accordion-header" :id="'panelsStayOpen-heading'+Skill.Skill_ID">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#panelsStayOpen-collapse'+Skill.Skill_ID" aria-expanded="false"
                            :aria-controls="'panelsStayOpen-collapse'+Skill.Skill_ID">
                            {{Skill.Name}}
                        </button>
                    </h2>
                    <div :id="'panelsStayOpen-collapse'+Skill.Skill_ID" class="accordion-collapse collapse"
                        :aria-labelledby="'panelsStayOpen-heading'+Skill.Skill_ID">
                        <div class="accordion-body p-0">
                            <ul class="list-group list-group-flush ">
                                <li class="list-group-item" v-for="Course in Skill.Courses" :key="Course.ID">
                                    <div class="container ms-3 my-3">
                                        <input class="form-check-input " type="checkbox" :value="Course.Course_ID"
                                            :id="'check'+Skill.Skill_ID+Course.Course_ID" v-model="checkedCourses">
                                        <label class="form-check-label" :for="'check'+Skill.Skill_ID+Course.Course_ID">{{Course.Course_ID}} - {{Course.Course_Name}}</label>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

export default {
    data() {
        return {
            checkedCourses:[]
        }
    },
    props: {
        Skills: Object
    }
}

</script>

<style lang="scss" scoped>

</style>