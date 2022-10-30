<template>
    <div class="container login-section h-100">
        <div class="d-flex justify-content-center align-content-center py-5 h-100">
            <div class="card shadow w-100 h-100">
                <div class="row g-0 h-100">
                    <div class="d-none d-lg-flex col col-lg-7 login-bg">
                        <img src="../assets/login.jpg" class="rounded-start" alt="...">
                    </div>
                    <div class="col col-lg-5 h-100">
                        <div class="card-body p-5 h-100" >
                            <div class="main-logo text-teal-600 mb-3  fw-semibold">LJPS</div>

                            <h6 class="card-title display-5">Welcome back!</h6>
                            <h6 class="card-title mb-5">Welcome! Please enter your details</h6>

                            <main class="w-100 m-auto">

                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput"
                                        v-model='this.email' placeholder="name@example.com">
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control" id="staff-id" placeholder="text" v-model='this.staff_id'>
                                    <label for="staff-id">Staff ID</label>
                                    <div class="alert alert-danger my-3" v-if="!isFound" role="alert">
                                        Invalid Email and Staff ID
                                    </div>
                                </div>

                                <button class="w-100 btn btn-lg btn-primary" type="button" @click="login()">Login</button>
                                <p class="mt-5 mb-3 text-muted">LJPS ©2022</p>

                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

import { userStore } from '@/store';

export default {
    setup(){
        const store = userStore();

        return { store }
    },
    mounted(){
        //check if user is logged in
        if (this.store.staff_id !== null){
            this.$router.push('/')
        }
    },
    data(){
        return {
            email: '',
            staff_id: null,
            isFound: true
        }
    },
    methods: {
        async login(){
            this.isFound = true
            console.log("=== login function is running ===");
            const res = await this.store.login();


            if (res.data.code == 200) {

                for (let staff of res.data.data) {
                    if (staff.Email.toLowerCase().trim() == this.email.toLowerCase() && staff.Staff_ID == this.staff_id){
                        this.isFound = true
                        console.log("user is found, login successful");
                        this.store.staff_id = staff.Staff_ID;
                        this.store.email = staff.Email
                        this.store.staff_FName = staff.Staff_FName
                        this.store.staff_LName = staff.Staff_LName
                        this.store.role = staff.Access_Role.Role_Name
                        this.store.department = staff.Dept
                        this.$router.push('/')
                        return
                    }
                }

                console.log("user is not found")
                this.isFound = false

                return

                
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.main-logo {
    font-size: 5rem;
    font-weight: 900;
    letter-spacing: 10px;
}

.login-bg {
    height: inherit;
    object-fit: cover;
    overflow: hidden;
}

</style>