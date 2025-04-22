<template>
  <div class="flex flex-col items-center justify-center h-screen bg-blue-50">
    <h1 class="text-4xl font-bold mb-8">日向坂46 推しメン診断(beta)</h1>
    <router-link to="/question">
      <button
        @click="resetAndStart"
        class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition"
      >
        はじめる
      </button>
    </router-link>
    <div class="mt-3">
      -更新履歴-
    </div>
    <div v-for="history in histories">
      {{ history.date }} {{ history.content }}
    </div>
    1.0.0-beta
  </div>
</template>

<script setup>
import { useResultStore } from '@/stores/resultStore';
import { ref } from 'vue'

const store = useResultStore();

const resetAndStart = () => {
  store.resetScores();
};

const histories = ref([
  { date: '2025.04.23', content: 'ベータ版' }
])
</script>