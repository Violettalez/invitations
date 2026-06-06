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
  <div
    class="bg-[url('/home-bg1.jpg')] bg-cover bg-center w-full h-screen relative p-4"
  >
    <div
      class="relative flex flex-col items-center justify-center w-full max-w-4xl min-h-[90%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-[40px] rounded-2xl overflow-hidden bg-white"
    >
      <div
        class="absolute inset-0 bg-[url(/home-bg22.jpg)] md:bg-[url(/home-bg2.jpg)] bg-cover bg-center blur-[6px] md:blur-[2px] pointer-events-none"
      ></div>
      <h1 class="font-home-title font-medium text-8xl text-center z-50">
        Arthur & Violetta
      </h1>
      <p class="text-center font-subtitle font-light text-2xl mb-4 z-50">
        Запрошення на весілля
      </p>
      <div
        class="flex flex-col md:flex-row gap-3 items-center justify-center z-50"
      >
        <input
          type="text"
          placeholder="Введіть код запрошення"
          v-model="invitCode"
          class="px-4 py-2 w-64 rounded-xl bg-white-light border border-blue-dark2 text-blue-dark2 placeholder:text-blue-dark2 focus:border-gold-dark transition"
        />

        <button
          @click="viewInvitation"
          class="w-full md:w-max px-5 py-2 rounded-xl bg-gold-dark text-white font-medium hover:bg-gold-dark active:scale-95 transition"
        >
          Переглянути запрошення
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
