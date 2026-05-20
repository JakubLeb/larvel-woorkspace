<script setup>

</script>

<template>
    <div>
        <p>SPA app welcome!</p>
        <div class="space-x-3 bg-sky-50 font-bold">
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link to="/register">Register</router-link> Można również tak
            <router-link :to="{ name: 'login' }">Login</router-link>
        </div>
        <router-view />
    </div>
</template>

<style scoped>

</style>
