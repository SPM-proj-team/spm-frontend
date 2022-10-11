<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-lg-3 justify-content-center align-content-center">
            <div v-for="index in 12" :key="index" class="col">
                    <div class="card w-100 h-100 shadow-sm">
                        <div class="card-body w-100 text-start ">
                            <h5 class="card-title my-auto fw-semibold placeholder-glow"><span class="placeholder w-75"></span></h5>
                            <p class="card-text my-auto placeholder-glow"> <span class="placeholder w-50"></span></p>
                            <p class="card-text my-auto placeholder-glow"> <span class="placeholder w-25"></span></p>
                        </div>
                        <div class="ico-card">
                            <i>
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </i>
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
    right: -30%;
    top: 40%;
    font-size: 5rem;
    line-height: 0;
    opacity: .03;
    color: rgb(146, 33, 33);
    z-index: 0;
}

</style>