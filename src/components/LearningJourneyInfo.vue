<template>
    <div class="card px-3 shadow">
        <div class="card-body">
            <form>
                <h3 class="card-title fw-semibold my-3">Learning Journey Details</h3>
                <div class="form-floating mb-3">
                    <input type="text"
                    :class="{
                    'form-control-plaintext': formType=='update' && !errors.name.state,
                    'form-control': formType=='create' || errors.desc.state,
                    'is-invalid':errors.name.state
                    }" 
                    id="name" 
                    placeholder="Learning Journey Name" 
                    v-model="this.name"
                        @focusin="clickChangeInputType" @focusout="clickChangeInputTypeReadOnly">
                    <label for="lj-name">Name</label>
                    <div class="small text-danger" v-if="errors.name.state">
                        {{ errors.name.message }}
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <textarea type="search" id="desc" placeholder="Learning Journey Description"
                        style="height: 150px; max-height: 200px; min-height: 200px;" v-model="this.description"
                        
                        :class="{
                        'form-control-plaintext': (formType=='update' && !errors.desc.state),
                        'form-control': formType=='create' || errors.desc.state ,
                        'is-invalid':errors.desc.state
                        }" @focusin="clickChangeInputType" @focusout="clickChangeInputTypeReadOnly"
                        ref="lj_desc"></textarea>
                    <label for="lj-description">Description</label>
                    <div class="small text-danger" v-if="errors.desc.state">
                        {{ errors.desc.message }}
                    </div>
                </div>
                <div class="row mb-3" v-if="formType=='create'">
                    <div class="col-12 ">
                        <button type="reset" class="btn btn-primary btn-lg shadow w-100 fw-semibold"
                            @click="$emit('nextBtnClick')">Next<font-awesome-icon icon="fa-solid fa-chevron-right" class="mx-3" /></button>
                    </div>
                </div>
                <div class="row mb-3" v-if="formType=='update'">
                    <div class="col-6 ">
                        <button type="button" class="btn btn-danger btn-lg shadow w-100 fw-semibold"
                           id="delete-btn" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">Delete Learning Journey</button>
                    </div>
                    <div class="col-6 ">
                        <button type="button" class="btn btn-primary btn-lg shadow w-100 fw-semibold"
                            @click="$emit('updateLearningJourney')">Update Learning Journey</button>
                    </div>
                </div>
            </form>
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                    @click="$emit('deleteLearningJourney')" >Delete</button>
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
            errors : {
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
    methods: {
        clickChangeInputType(event) {
            if (event.target.classList.contains("form-control-plaintext") && this.formType == 'update' && !this.errors[event.target.id].state) {
                event.target.classList = ["form-control"]
            }
        },
        clickChangeInputTypeReadOnly(event) {
            if (event.target.classList.contains("form-control") && this.formType == 'update' && !this.errors[event.target.id].state) {
                event.target.classList = ["form-control-plaintext"]
            }
        },

    }
}

</script>

<style lang="scss" scoped>

</style>