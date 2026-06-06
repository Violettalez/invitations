<script setup>
import { ref } from "vue";
const invitCode = ref("");
function viewInvitation() {
  if (invitCode.value.trim() !== "") {
    window.location.href = `/invitation/${invitCode.value}`;
  } else {
    alert("Please enter a valid invitation code");
  }
}
</script>

<template>
  <div class="bg-blue-dark w-full h-screen relative p-4">
    <div
      class="flex items-center justify-center bg-white-light w-full rounded-2xl max-w-7xl min-h-[90%] relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-[40px]"
    >
      <h1 class="font-letters font-extralight text-8xl text-center">
        Артур & Віолетта
      </h1>
      <p class="text-center font-subtitle font-extralight text-2xl">
        Запрошення на весілля
      </p>
      <div class="flex gap-3 items-center justify-center">
        <input
          type="text"
          placeholder="Enter your invitation code"
          v-model="invitCode"
          class="px-4 py-2 w-64 rounded-xl bg-white-light border border-blue-light text-blue-dark placeholder:text-blue-dark/60 focus:outline-none focus:ring-2 focus:ring-gold-dark) focus:border-gold-dark transition"
        />

        <button
          @click="viewInvitation"
          class="px-5 py-2 rounded-xl bg-gold-dark text-white font-medium hover:bg-gold-light hover:text-blue-dark active:scale-95 transition"
        >
          View Invitation
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
