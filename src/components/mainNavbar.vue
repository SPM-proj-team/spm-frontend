<template>
    <div class="container-fluid border-bottom border-warning border-5 bg-white">
        <div class="container container-md-fluid">
            <div class="row">
                <div class="col">
                    <nav class="navbar navbar-expand-lg mt-2">
                        <div class="logo text-teal-600 me-3">LJPS</div>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <form class="d-flex flex-fill py-3" role="search">
                                <input class="form-control me-2 border-dark" type="search" placeholder="Search anything" aria-label="Search">
                            </form>
                            <div class="text-center m-lg-4 mb-sm-3 fw-semibold">Welcome, {{ store.name }}</div>
                            <div class="d-grid">
                                <button type="button" class="btn bg-danger bg-opacity-75 fw-semibold text-white">Logout</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <nav class="navbar navbar-expand-sm">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item border-end border-2 px-3">
                                    <router-link to="/" class="nav-link router-link" exact>Home</router-link>
                                </li>
                                <li class="nav-item border-end border-2 px-3 ">
                                    <router-link to="/JobRoles" class="nav-link router-link" exact>View Roles</router-link>
                                </li>
                                <li class="nav-item px-3">
                                    <router-link to="/CreateLearningJourney" class="nav-link router-link" exact>Create Learning Journey</router-link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { userStore } from '@/store';


    export default {
    setup() {
        const store = userStore()
        return { store }
    }

    }

</script>

<style scoped>


.logo {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 5px;
}

.nav-item {
    font-size: 18px;
    letter-spacing: 0.5px;
}

.router-link-active{
    font-weight:bold
}

</style>