<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-for="(navObject, index) in navObjects" :key="index" style="--bs-breadcrumb-divider: '>';" class="breadcrumb-item link-primary" :class="{ active: navObject.isActive, 'text-decoration-underline': !navObject.isActive }"><RouterLink class="router-link" :to="navObject.path" exact>{{ navObject.navLabel }}</RouterLink></li>
        </ol>
    </nav>
</template>

<script>
export default {
    props: {
        navObjects: Array
    }
}

</script>

<style lang="scss" scoped>

.router-link {
  color: inherit
}

</style>