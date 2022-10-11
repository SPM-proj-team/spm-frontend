<template>
    <div class="container">
        <div
            class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-lg-3 justify-content-center align-content-center">
            <div v-for="jobRole in jobRoles" :key="jobRole.Job_ID" class="col">
                <router-link class="router-link" :to="{ name: 'JobRoleDetails', params: { JobRoleID: jobRole.Job_ID }}">
                    <button class="btn btn-light card w-100 h-100 shadow-sm" @click="selectJobRole(jobRole)">
                        <div class="card-body w-100 text-start">
                            <h5 class="card-title my-auto fw-semibold">{{jobRole.Job_Role}}</h5>
                            <p class="card-text my-auto"> {{jobRole.Department}}</p>
                            <p class="card-text my-auto"> {{jobRole.Job_Title}}</p>
                        </div>
                        <div class="ico-card">
                            <i>
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </i>
                        </div>
                    </button>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>

import { userStore } from '@/store';
import axios from 'axios'
import { ref } from 'vue';


export default {
    async setup() {
        const store = userStore();
        const jobRoles = ref(null);
        await getRoles();
        async function getRoles() {
            await axios.get('http://127.0.0.1:5000/roles').then((res) => {
                jobRoles.value = res.data.data;
                console.log(res.data.data)
            }).catch((err) => {
                console.log(err);
                this.$router.push({ name: 'NotFound404' });
                return
            })
        }


        return { store, jobRoles }
    },
    methods: {
        selectJobRole(selectedJobRole) {
            this.store.selectJobRole(selectedJobRole)
        }
    }
}


</script>

<style scoped>
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
    right: -30%;
    top: 40%;
    font-size: 5rem;
    line-height: 0;
    opacity: .07;
    color: rgb(146, 33, 33);
    z-index: 0;
}
</style>