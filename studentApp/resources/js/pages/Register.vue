<script setup>
import FormInput from '../components/FormInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/features/auth.js'
const { register } = useAuth()


const router = useRouter()
const errors = ref(null)
const form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
}
const submit = async () => {
    await register(form)
    router.push({
        name: 'dashboard',
    })
}
</script>

<template>
    <div>
        <form @submit.prevent="submit">
            <FormInput name="name" v-model="form.name" :errMsg="errors?.name?.[0]" />
            <FormInput name="email" type="email" v-model="form.email" :errMsg="errors?.email?.[0]" />
            <FormInput name="password" type="password" v-model="form.password" :errMsg="errors?.password?.[0]" />
            <FormInput name="password confirmation" type="password" v-model="form.password_confirmation" />
            <button type="submit" class="hover:border-2 disabled:text-gray-200 cursor-pointer border p-2 m-2 rounded">
                Register
            </button>
        </form>
    </div>
</template>

<style scoped>

</style>
