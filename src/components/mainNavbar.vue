<template>
    <div class="container container-md-fluid">
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg bg-light mt-4">
                    <div class="logo text-teal-600 me-3">LJPS</div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex flex-fill py-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        </form>
                        <div class="d-grid">
                            <button type="button" class="btn btn-danger">Logout</button>
                        </div>
                    </div>

                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg bg-light">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item border-end">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Create Learning Journey</a>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        </div>
    </div>
    <hr>


</template>

<script>

</script>

<style scoped>
.logo {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 5px;
}

.nav-text {
    font-size: 18px;
    letter-spacing: 5px;
}

hr {
    border-top: 5px solid #F59E0B
}
</style>