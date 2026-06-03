<script setup>
import { useRouter, useRoute } from 'vue-router'
import {onMounted, ref} from 'vue'
import Popup from "./components/Popup.vue";
import { useTemplateRef } from "vue";

const router = useRouter()
const route = useRoute()
const popup = useTemplateRef("popup");
const choice = await popup.value.wait(
    "Do You really want me?",
    { close: "CLOSE ME", stay: "STAY WITH ME" },
    "POPUP WINDOW"
);

provide("popupService", async (info, options, title) => {
    return await popup.value.wait(info, options, title);
})


const isLogged = ref(localStorage.getItem('isLogged') === 'true')

const updateIsLogged = (value) => {
    isLogged.value = value
}

const logout = async () => {
    try {
        await axios.post('/api/logout')
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

onMounted(() => {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error?.response?.status === 401) {
                localStorage.setItem("isLogged", "false")
                updateIsLogged(false)
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
                <a @click.prevent="logout" href>Logout</a>
            </template>

            <template v-else>
                <router-link
                    :to="{ name: 'register' }"
                    active-class="underline"
                >Register</router-link>
                <router-link
                    :to="{ name: 'login' }"
                    active-class="underline"
                >Login</router-link>
            </template>
        </div>
        <Popup ref="popup" />
        <router-view @logged-in="updateIsLogged" />
    </div>
</template>

<style scoped>
</style>
