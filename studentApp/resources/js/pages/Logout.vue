<script setup>
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    const logout = async () => {
        try {
            const response = await axios.post('/api/logout')
        } catch (e) {
            console.log('an error')
        }
            localStorage.setItem("isLogged", "false")
            if (route.name !== 'home') {
                router.push({
                    name: 'home',
                })
        }
    }
</script>

<template>
    To jest Logout
</template>

<style scoped>

</style>
