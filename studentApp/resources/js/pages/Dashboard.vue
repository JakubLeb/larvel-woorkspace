<script setup>
import { useAuth } from "../composables/features/auth.js"
import { useResources } from "../composables/features/resources.js"
import {inject, onMounted} from "vue";
const { user } = useAuth()

const popupService = inject("popupService")
const { getAll: getStudents, items: students, isLoading, error, remove: removeStudent } = useResources(
    "students"
)
onMounted(() => {
    getStudents();
});
const removeStudentTBC = async (st) => {
    const choice = await popupService(
        `Remove ${st.first_name} ${st.last_name} (${st.index})?!`,
        { cancel: "NO", confirmed: "YES" },
        "CONFIRMATION REQUIRED"
    );
    if (choice === "confirmed") {
        removeStudent(st.id);
    }
};
</script>


<template>
<div>
<div v-if="user">Ahoj {{ user.name }}!</div>
<div v-if="error" class="bg-red-100 text-red-700 p-3 rounded font-bold">{{ error }}</div>
<div v-if="isLoading" class="animate-pulse">⏳Loading...</div>
<div v-else>
    <table class="w-3/4 text-center p-1 m-2">
        <thead>
        <tr class="border-b border-default">
            <th>First name</th>
            <th>Last name</th>
            <th>Index nr</th>
            <th>E-mail</th>
            <th>Age</th>
            <th>Payment</th>
            <th colspan="2">
                <button
                    @click=""
                    class="hover:bg-sky-100 cursor-pointer border p-2 m-2 rounded"
                >
                    ➕ADD
                </button>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="st in students" :key="st.id">
            <td>{{ st.first_name }}</td>
            <td>{{ st.last_name }}</td>
            <td>{{ st.index }}</td>
            <td>{{ st.email }}</td>
            <td>{{ st.age }}</td>
            <td>{{ st.paid ? "💰" : "🤞" }}</td>
            <td>
                <button
                    @click=""
                    class="hover:bg-sky-100 cursor-pointer border p-2 m-2 rounded"
                >
                    ✏️
                </button>
            </td>
            <td>
                <button
                    @click="removeStudentTBC(st.id)"
                    class="hover:bg-sky-100 cursor-pointer border p-2 m-2 rounded"
                >
                    🗑️
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</div>
</template>

<style scoped>
.router-link-active {
    border-bottom: 2px solid #42b983;
}
</style>
