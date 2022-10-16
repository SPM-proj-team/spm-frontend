<template>
    <div class="modal fade show" style="display: block;" tabindex="-1" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-semibold">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
                </div>
                <div class="modal-body my-2">
                    <div class="text-center my-4">
                        <font-awesome-icon :icon="icon" style="font-size:8rem" />
                    </div>
                    <p class="text-center my-3 fs-3"> {{ message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="$emit('close')">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        icon: String,
        modalTitle: String,
        message: String
    }

}
</script>

<style scoped>
.modal {
    width: 100%;
    height: 100%;
    padding-top: 100px;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>