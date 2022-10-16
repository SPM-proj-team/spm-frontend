<template>
    <div class="card px-3 shadow">
        <div class="card-body">
            <h3 class="card-title fw-semibold my-3">Learning Journey Details</h3>
            <div class="form-floating mb-3">
                <input type="search" class="form-control" id="lj-name" placeholder="Learning Journey Name"
                    v-model="this.name">
                <label for="lj-name">Name</label>
            </div>
            <div class="form-floating mb-3">
                <textarea type="search" 
                class="form-control" 
                id="lj-description" placeholder="Learning Journey Description" 
                style="height: 150px; max-height: 200px; min-height: 100px;"
                    v-model="this.description"></textarea>
                <label for="lj-description">Description</label>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        ljName: String,
        ljDescription: String
    },
    data(){
        return{
            name: this.ljName,
            description: this.ljDescription
        }
    }
}

</script>

<style lang="scss" scoped>

</style>