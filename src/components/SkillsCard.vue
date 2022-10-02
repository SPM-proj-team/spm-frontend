<template>
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
                <div :id="'panelsStayOpen-collapse'+Skill.Skill_ID" class="accordion-collapse collapse text-left"
                    :aria-labelledby="'panelsStayOpen-heading'+Skill.Skill_ID">
                    <div class="accordion-body">
                        <div v-for="Course in Skill.Courses" :key="Course.ID">
                            {{Course.Course_Name}}
                        </div>
                        
                    </div>
                </div>
                <!-- <h2 class="accordion-header" :id="'panelsStayOpen-heading' + Skill.Skill_ID">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#panelsStayOpen-collapse' + Skill.Skill_ID" aria-expanded="false"
                        :aria-controls="'panelsStayOpen-collapse' + Skill.Skill_ID">
                        {{ Skill.name }}
                    </button>
                </h2>
                <div :id="'panelsStayOpen-collapse'+ Skill.Skill_ID" class="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        Courses to be added
                    </div>
                </div> -->
            </div>

        </div>
    </div>

</template>

<script>

export default {
    props: {
        Skills: Object
    }
}

</script>

<style lang="scss" scoped>

</style>