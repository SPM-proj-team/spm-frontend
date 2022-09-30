<template>
    <div class="card mb-3 text-bg-info bg-opacity-25 mt-4 shadow">
        <div class="row g-0">
            <div class="col">
                <div class="card-body">
                    <h5 class="card-title">{{ store.name }}</h5>
                    <p class="card-text">
                        <b>Role:</b> {{ store.userJobRole }}<br>
                        <b>Department:</b> {{ store.department }}
                    </p>
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

</style>