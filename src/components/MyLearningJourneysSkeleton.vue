<template>
  <button
    class="btn btn-light card w-100 h-100 my-3 p-0 text-start"
    v-for="index in 6"
    :key="index"
  >
    
      <div class="row g-0 w-100 ">
        <div class="col">
            <div class="card-body shadow-sm">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-4"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-6"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-2"></span>
                <span class="placeholder col-7"></span>

              </p>
             
            </div>
          
        </div>
      </div>
    </button>
</template>

<script>

</script>

