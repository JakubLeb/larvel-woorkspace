<template>
    <div v-if="data.btns" class="modal">
        <div class="modal-content">
            <div class="w-full text-right">
                <span @click.prevent="button(null)" class="cursor-pointer">[X]</span>
            </div>
            <div class="w-full text-center font-bold">{{ data.title }}</div>
            <div class="text-center">{{ data.info }}</div>
            <div class="flex flex-row justify-center items-center">
                <template v-for="(value, name) in data.btns" :key="name">
                    <button
                        @click.prevent="button(name)"
                        class="border-2 hover:bg-green-50 font-bold p-2 m-2 rounded"
                    >
                        {{ value }}
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import {inject, reactive} from "vue";

const data = reactive({
    title: null,
    info: null,
    btns: null,
});

let resolve = null;

const wait = async (info, btns, title) => {
    data.info = info || "???";
    data.btns = btns || { close: "Close" };
    data.title = title || "Attention!";

    return new Promise((res) => {
        resolve = res;
    });
};
const button = (name) => {
    resolve && resolve(name);
    Object.keys(data).forEach((key) => (data[key] = null));
};

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
defineExpose({ wait });
</script>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    z-index: 50;
}

.modal-content {
    background: #fff;
    border: 1px solid #999;
    border-radius: 6px;
    padding: 1.5rem;
    min-width: 320px;
    max-width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}
</style>
