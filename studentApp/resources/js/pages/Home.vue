<script setup>
import { inject } from "vue";
const popupService = inject("popupService");

const showPopup = async () => {
    const choice = await popupService(
        "Do You really want me?",
        {close: "CLOSE ME", stay: "STAY WITH ME"},
        "POPUP WINDOW"
    )
    if (choice === "close") {
        console.log("Nobody wants me :( because I'm hated popup notification!")
    }
}
</script>

<template>
    <div>
        <div>Home</div>
        <div>
            <button class="border-2 hover:bg-green-50 font-bold p-3 rounded" @click="showPopup()">
                show me popup
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
