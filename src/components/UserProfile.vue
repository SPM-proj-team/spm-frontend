<template>
    <div class="container-fluid bg-info bg-opacity-50 w-100">
        <div class="container h-100 ">
            <div class="row d-flex justify-content-center h-100">
                <div class="col col-lg-12 w-100">
                    <div class="d-flex flex-row" style="height:200px;">
                        <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                                style="width: 150px; z-index: 1">
                        </div>
                        <div class="ms-3 align-self-end">
                            <h5 class="display-4 fw-bold">{{ this.userInfo.fullName }}</h5>
                            <p class="display-7 fw-semibold">{{ this.userInfo.department }}</p>
                        </div>
                    </div>
                    <div class="p-4 text-black rounded-top bg-light" >
                        <div class="d-lg-flex d-block justify-content-between text-start py-1">
                            <div>
                                <p class="small text-muted mb-0">Staff ID</p>
                                <p class="mb-1 h5 fw-semibold">{{ this.userInfo.staff_id }} </p>
                            </div>
                            <div class="px-lg-5">
                                <p class="small text-muted mb-0">Email</p>
                                <p class="mb-1 h5 fw-semibold">{{ this.userInfo.email }} </p>
                            </div>
                            <div>
                                <p class="small text-muted mb-0">User Access</p>
                                <p class="mb-1 h5 fw-semibold">{{ this.userInfo.userRole }} </p>
                            </div>
                            <div class="d-none d-lg-flex">
                                <router-link to="/CreateLearningJourney" class="btn btn-warning btn-lg fw-bold shadow ">
                                    + Start New Learning
                                    Journey</router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>

<script>

export default {
    props: { userInfo: Object }
}

</script>

<style scoped>

</style>