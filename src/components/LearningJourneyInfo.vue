<template>
    <div class="card px-3 shadow">
        <div class="card-body">
            <h3 class="card-title fw-semibold my-3">Learning Journey Details</h3>
            <div class="form-floating mb-3 ">
                <input type="text" :class="{
                'is-invalid':errors.name.state
                }" class="form-control" id="name" placeholder="Learning Journey Name" v-model="this.name">
                <label for="lj-name">Name</label>
                <div class="small text-danger" v-if="errors.name.state">
                    {{ errors.name.message }}
                </div>
            </div>

            <div class="form-floating mb-3">
                <textarea type="search" id="desc" placeholder="Learning Journey Description" class="form-control"
                    style="height: 150px; max-height: 200px; min-height: 200px;" v-model="this.description" :class="{
                    'is-invalid':errors.desc.state
                    }" ref="lj_desc"></textarea>
                <label for="lj-description">Description</label>
                <div class="small text-danger" v-if="errors.desc.state">
                    {{ errors.desc.message }}
                </div>
            </div>
            <div class="row mb-3" v-if="formType=='create'">
                <div class="col-12">
                    <button type="reset" class="btn btn-primary btn-lg shadow w-100 fw-semibold"
                        @click="$emit('nextBtnClick')">Next
                        <font-awesome-icon icon="fa-solid fa-chevron-right" class="mx-3" />
                    </button>
                </div>
            </div>
            <div class="row mb-3" v-if="formType=='createFromViewRole'">
                <div class="col-12">
                    <button type="reset" class="btn btn-primary btn-lg shadow w-100 fw-semibold"
                        @click="$emit('createLearningJourney')">Create
                        <font-awesome-icon icon="fa-solid fa-chevron-right" class="mx-3" />
                    </button>
                </div>
            </div>
            <div class="row" v-if="formType=='update'">
                <div class="col-12 col-lg-6 mb-3">
                    <button type="button" class="btn btn-danger btn-lg shadow w-100 fw-semibold" id="delete-btn"
                    data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal"
                         >Delete</button>
                </div>
                <div class="col-12 col-lg-6 mb-3">
                    <button type="button" class="btn btn-primary btn-lg shadow w-100 fw-semibold"
                        @click="$emit('updateLearningJourney')">Update</button>
                </div>
            </div>
        </div>
    </div>

    <!-- delete confirmation modal  -->
    <div class="modal fade" tabindex="-1" id="deleteConfirmationModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete Learning Journey</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>This will delete selected learning journey, proceed?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="delete-modal-btn"
                        @click="$emit('deleteLearningJourney')">Delete</button>
                </div>
            </div>
        </div>
    </div>



</template>

<script>


export default {

    props: {
        ljName: {
            type: String,
            default: ''
        },
        ljDescription: {
            type: String,
            default: ''
        },
        formType: {
            type: String,
            default: 'update'
        }
    },

    data() {
        return {
            name: this.ljName,
            description: this.ljDescription,
            errors: {
                name: {
                    state: false,
                    message: ''
                },
                desc: {
                    state: false,
                    message: ''
                }
            }
        }
    },

    emits: ['nextBtnClick', 'updateLearningJourney', 'deleteLearningJourney']
}

</script>

<style lang="scss" scoped>

</style>