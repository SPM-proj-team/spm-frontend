<template>
    <div class="container px-3">
        <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
            <div class="col mb-3">
                <router-link to="/" class="router-link">
                    <div class="d-flex align-items-center mb-3 link-dark text-decoration-none">
                        <div class="logo text-teal-600 me-3">LJPS</div>
                    </div>
                </router-link>
                <p class="text-muted">© 2022</p>
            </div>

            <div class="col mb-3">
                <h6 class="fw-semibold">LJPS Team</h6>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2">Eric Ho</li>
                    <li class="nav-item mb-2">Faisal Samudra</li>
                    <li class="nav-item mb-2">Jowett Chg</li>
                    <li class="nav-item mb-2">Mukmin Pitoyo</li>
                    <li class="nav-item mb-2">Ryan Chan</li>
                </ul>
            </div>

            <div class="col mb-3">

            </div>

            <div class="col mb-3">
                <template v-if="store.role=='Admin'">
                    <h5 class="fw-semibold">Administration</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><router-link to="/CreateRole" class="nav-link p-0 text-muted">Create Role</router-link></li>
                        <li class="nav-item mb-2"><router-link to="/UpdateRoles" class="nav-link p-0 text-muted">Update Roles</router-link></li>
                        <li class="nav-item mb-2"><router-link to="/UpdateRoles" class="nav-link p-0 text-muted">Delete Roles</router-link></li>
                        <li class="nav-item mb-2"><a class="nav-link p-0 text-muted">Create Skills</a></li>
                        <li class="nav-item mb-2"><a class="nav-link p-0 text-muted">Update Skills</a></li>
                        <li class="nav-item mb-2"><a class="nav-link p-0 text-muted">Delete Skills</a></li>

                    </ul>
                </template>

            </div>

            <div class="col mb-3">
                <h5 class="fw-semibold">Site</h5>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2"><router-link to="/" class="nav-link p-0 text-muted">Home</router-link></li>
                    <li class="nav-item mb-2"><router-link to="/JobRoles" class="nav-link p-0 text-muted">View Roles</router-link></li>
                    <li class="nav-item mb-2"><router-link to="/CreateLearningJourney" class="nav-link p-0 text-muted">Create Learning Journey</router-link>
                    </li>
                </ul>
            </div>


        </footer>
    </div>
</template>

<script>

import { userStore } from '@/store';

export default {
    setup(){
        const store = userStore()
        return { store }
    }
}

</script>

<style lang="scss" scoped>

</style>