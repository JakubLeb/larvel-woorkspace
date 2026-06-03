<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()

const logout = async () => {
    try {
        const response = await axios.post('/api/logout')
    } catch (e) {
        console.log('an error')
    }
    localStorage.setItem("isLogged", "false")
    isLogged.value = false
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
            <router-link
                :to="{ name: 'home' }"
                active-class="underline"
                exact-active-class="underline"
            >Home</router-link>
            <template v-if="isLogged">
                <router-link
                    :to="{ name: 'dashboard' }"
                    active-class="underline"
                >Dashboard</router-link>
                <a v-if="isLogged()" @click.prevent="logout" href>Logout</a>
            </template>
            <template v-else>

            <router-link
                    :to="{ name: 'register' }"
                    active-class="underline"
                >Register</router-link>
            </template>
            <router-link
                :to="{ name: 'login' }"
                active-class="underline"
            >Login</router-link>
        </div>
        <router-view />
        <router-view @logged-in="updateIsLogged" />


    </div>
</template>

<style scoped>
</style>
