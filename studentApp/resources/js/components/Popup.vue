<script setup>
import { reactive } from "vue";
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
defineExpose({ wait });
</script>

<template>
    <div v-if="data.btns" class ="model">
        <div class="model-content">
            <div class="w-full text-right">
                <span @click.prevent="button(null)" class="cursor-pointer">[X]</span>
            </div>
            <div class="w-full text-center font-bold">{{ data.title }}</div>
            <div>{{ data.info }}</div>
            <div class="flex flex-row justify-center items-center">
                <template v-for="(value, name) in data.btns" :key="name">
                    <button
                        @click.prevent="button(name)"
                        class="border-2 hover:bg-green-50 font-bold p-2 m-2 rounded">
                        {{value}}
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
    modal {
        overflow: auto
    }
    .modal-content {

    }
</style>
