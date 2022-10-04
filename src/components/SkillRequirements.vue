<template>
    <div class="card my-3">
        <div class="card-body">
            <h5 class="card-title mb-2">Skills Requirements</h5>
            <!-- <h6 class="card-subtitle mb-2 text-muted">Sub heading</h6> -->
        </div>
        <ul class="list-group list-group-numbered">
            <li class="list-group-item" v-for="Skill in Skills" :key="Skill.Skill_ID">
                {{ Skill.Name }}
            </li>
        </ul>




    </div>
</template>

<script>
export default {
    props: {
        Skills: Object
    }
}

</script>

<style scoped>

</style>