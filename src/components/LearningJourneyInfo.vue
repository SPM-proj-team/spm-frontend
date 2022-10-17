<template>
    <div class="card px-3 shadow">
        <div class="card-body">
            <form>
                <h3 class="card-title fw-semibold my-3">Learning Journey Details</h3>
                <div class="form-floating mb-3">
                    <input type="text" readonly class="form-control-plaintext" id="lj-name"
                        placeholder="Learning Journey Name" v-model="this.name" @focusin="clickChangeInputType"
                        @focusout="clickChangeInputTypeReadOnly">
                    <label for="lj-name">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea type="search" class="form-control-plaintext" readonly id="lj-description"
                        placeholder="Learning Journey Description"
                        style="height: 150px; max-height: 200px; min-height: 200px;" v-model="this.description"
                        @focusin="clickChangeInputType" @focusout="clickChangeInputTypeReadOnly"></textarea>
                    <label for="lj-description">Description</label>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        ljName: String,
        ljDescription: String
    },
    data() {
        return {
            name: this.ljName,
            description: this.ljDescription
        }
    },
    methods: {
        clickChangeInputType(event) {
            if (event.target.classList.contains("form-control-plaintext")) {
                event.target.classList = ["form-control"]
                event.target.removeAttribute('readonly')
            }
        },
        clickChangeInputTypeReadOnly(event) {
            if (event.target.classList.contains("form-control")) {
                event.target.classList = ["form-control-plaintext"]
                event.target.addAttribute('readonly')
            }
        }
    }
}

</script>

<style lang="scss" scoped>

</style>