<script setup>
import { useAuth } from '../composables/features/auth.js';
const { user } = useAuth()

</script>

<template>
    <div>Dashboard
        <div v-if="user"> Ahoj {{ user.name }}!</div>
    </div>

</template>

<style scoped>
</style>
