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
                                        placeholder="name@example.com">
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="staff-id" placeholder="text">
                                    <label for="staff-id">Staff ID</label>
                                </div>

                                <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
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