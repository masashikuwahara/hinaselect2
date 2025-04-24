<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#7cc7e8] via-[#add8e6] to-[#7cc7e8]">
    <h1 class="text-center text-4xl font-bold text-white mb-8">HINADX(beta)</h1>
    <router-link to="/question">
      <button
        @click="resetAndStart"
        class="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
      >
        はじめる
      </button>
    </router-link>
    <div class="mt-3 text-white">
      -更新履歴-
    </div>
    <div v-for="history in histories" :key="history.date" class="text-white">
      {{ history.date }} {{ history.content }}
    </div>
    <div class="mt-4 text-white">
      2.1.1-beta
    </div>
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
  { date: '2025.04.23', content: '設定値を変更' },
  { date: '2025.04.23', content: 'ベータ版' }
])
</script>
