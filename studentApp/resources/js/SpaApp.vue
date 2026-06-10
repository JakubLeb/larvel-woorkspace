<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useAuth } from './composables/features/auth.js'
const { logout, isLogged, setUserState } = useAuth()
const router = useRouter()
const route = useRoute()
onMounted(() => {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error?.response?.status === 401) {
                setUserState(false)
                if (route.name !== 'login') {
                    router.push({
                        name: 'login',
                    })
                }
            }
            return Promise.reject(error);
        }
    );
})
const submit = async () => {
    logout()
    if (route.name !== 'home') {
        router.push({
            name: 'home',
        })
    }
}
</script>

<template>
    <div>
    <p>SPA app welcome!</p>
    <div class="space-x-3 bg-sky-50 font-bold">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <template v-if="isLogged">
            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
            <a @click.prevent="submit" href>Logout</a>
        </template>
        <template v-else>
            <router-link to="/register">Register</router-link>
            <router-link :to="{ name: 'login' }">Login</router-link>
        </template>
    </div>
    <router-view />
    </div>
</template>

<style scoped>
</style>
