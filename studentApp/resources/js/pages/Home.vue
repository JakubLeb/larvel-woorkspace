<script setup>
import { inject } from "vue"

const popupService = inject("popupService")

const prize = ["GOLD 1kg 💰", "NICE CAR 🚙", "A WHOLE LOT OF NOTHING 😜"]

const luckyDay = async () => {
    prize.sort(() => Math.random() - 0.5)

    const choice = await popupService(
        "Choose the right gate. It might change your life!",
        {
            gate1: "Gate nr 1",
            gate2: "Gate nr 2",
            gate3: "Gate nr 3",
        },
        "Pop-up Lottery in progress..."
    )

    if (!choice) return

    const index = { gate1: 0, gate2: 1, gate3: 2 }[choice]
    const gateNo = index + 1
    const won = prize[index]

    await popupService(
        `Gate nr ${gateNo}: You have what you've chosen!`,
        { ok: "Thanks" },
        `Your prize: ${won}`
    )
}
</script>

<template>
    <div>
        <div>Home</div>
        <div>
            <button
                class="border-2 hover:bg-green-50 font-bold p-3 rounded"
                @click="luckyDay()"
            >
                Lucky day?
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>
