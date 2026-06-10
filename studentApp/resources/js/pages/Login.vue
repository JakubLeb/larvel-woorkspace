<script setup>
import FormInput from '../components/FormInput.vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/features/auth.js'

const { login, isLogged, error, isLoading } = useAuth()
const router = useRouter()

const form = {
    email: null,
    password: null,
}

const submit = async () => {
    await login(form)
    if (isLogged) {
        router.push({
            name: 'dashboard',
        })
    }
}

</script>

<template>
    <div>
    <form @submit.prevent="submit" :class="isLoading ? 'animate-pulse' : ''">
        <FormInput name="email" type="email" v-model="form.email" :errMsg="error" />
        <FormInput name="password" type="password" v-model="form.password" />
        <button type="submit" class="hover:border-2 disabled:text-gray-200 cursor-pointer border p-2 m-2 rounded">
            Login
        </button>
    </form>
    </div>
</template>

<style scoped>

</style>
