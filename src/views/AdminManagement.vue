<template>
    <div class="container-fuild bg-white mb-5">
        <div class="container col-xl-10 col-xxl-8 px-4 py-3">
            <div class="row align-items-center py-5">
                <div class="col-lg-7 text-center text-lg-start text-gray-500 justify-content-center">
                    <h1 class="display-4 fw-bold lh-1 mb-3">Admin Management</h1>
                    <p class="col-lg-10 fs-5">Manage Learning Journey Management System</p>
                </div>
                <div class="col-lg-4 offset-lg-1 p-0 align-content-start">
                    <img src="@/assets/illustration/Admin.gif"
                        class="d-lg-block d-none mx-lg-auto img-fluid float-center">
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row row-cols-xl-2 g-4">
            <div class="col-12 col-xl-6">
                <div class="card shadow p-3">
                    <div class="card-body">
                        <h3 class="card-title fw-bold">Role Management</h3>
                        <h6 class="card-subtitle mb-2 text-muted">Manage Roles</h6>
                        <div class="ico-card">
                            <i>
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </i>
                        </div>
                        <div class="row g-3">
                            <div class="col-12 col-lg-6">
                                <router-link to="/CreateRole" class="router-link">
                                <button class="btn btn-light shadow-sm text-start card p-0 w-100 h-100">
                                    <div class="card-body">
                                        <h5 class="card-title fw-semibold">Create New Roles</h5>
                                        <p class="card-text">Create New Role in Learning Journey Management System</p>
                                    </div>
                                </button>
                                </router-link>
                            </div>
                            <div class="col-12 col-lg-6">
                                <router-link to="/UpdateRoles" class="router-link">
                                <button class="btn btn-light shadow-sm text-start card p-0 w-100 h-100">
                                    <div class="card-body">
                                        <h5 class="card-title fw-semibold">Update & Delete Roles</h5>
                                        <p class="card-text">Update roles information and map skills to roles
                                        </p>
                                    </div>
                                </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-6">
                <div class="card shadow p-3">
                    <div class="card-body">
                        <h3 class="card-title fw-bold">Skills Management</h3>
                        <h6 class="card-subtitle mb-2 text-muted">Manage Skills</h6>
                        <div class="ico-card">
                            <i>
                                <font-awesome-icon icon="fa-solid fa-lightbulb" />
                            </i>
                        </div>
                        <div class="row g-3">
                            <div class="col-12 col-lg-6">
                                <!-- <router-link> -->
                                <button class="btn btn-light shadow-sm text-start card p-0 w-100 h-100">
                                    <div class="card-body">
                                        <h5 class="card-title fw-semibold">Create & Delete Skills</h5>
                                        <p class="card-text">Create New Skills or Delete existing Skills in LJPS</p>
                                    </div>
                                </button>
                                <!-- </router-link> -->
                            </div>
                            <div class="col-12 col-lg-6">
                                <!-- <router-link> -->
                                <button class="btn btn-light shadow-sm text-start card p-0 w-100 h-100">
                                    <div class="card-body">
                                        <h5 class="card-title fw-semibold">Update Skills</h5>
                                        <p class="card-text">Update existing skills information</p>
                                    </div>
                                </button>
                                <!-- </router-link> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.ico-card {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

i {
    position: relative;
    right: 5%;
    top: 40%;
    font-size: 14rem;
    line-height: 0;
    opacity: .05;
    color: rgb(146, 33, 33);
    z-index: 99;

}
</style>