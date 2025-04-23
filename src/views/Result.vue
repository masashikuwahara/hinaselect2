<script setup>
import { useResultStore } from '@/stores/resultStore';
import { useRouter } from 'vue-router';
import { calculateRecommendation } from '@/utils/calculateRecommendation';
import { categories } from '@/data/categories';

const store = useResultStore();
const router = useRouter();

const { top, second } = calculateRecommendation();

const getTopMemberCategory = (member) => {
  if (!member || !member.categories) return null;
  return Object.entries(member.categories)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
};

const topCategory = getTopMemberCategory(top);
const secondCategory = getTopMemberCategory(second);
const getCategoryInfo = (cat) => categories[cat] || { label: cat, color: '#ccc' };

const retry = () => {
  store.resetScores();
  router.push('/question');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#7cc7e8] via-white to-[#ccefff]">
    <div class="text-center p-6 max-w-xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">診断結果</h2>
      <transition name="fade-slow" appear>
        <h2 class="text-2xl font-bold mb-4">あなたにぴったりのメンバーは…</h2>
      </transition>

      <div v-if="top" class="mb-8 text-center">
        <div
          class="text-white text-xl font-bold py-4 px-6 rounded-2xl"
          :style="{ backgroundColor: getCategoryInfo(topCategory).color }"
        >
          {{ getCategoryInfo(topCategory).label }}
        </div>
        <img
          :src="top.image"
          :alt="top.name"
          class="w-48 h-48 object-cover rounded-full mx-auto my-4 border-4 border-blue-300"
        />
        <p class="text-3xl text-blue-600">{{ top.name }}</p>
        <p class="text-base text-gray-700">{{ top.description }}</p>
      </div>

      <transition name="fade" appear>
        <div v-if="second" class="text-center mt-8">
          <h4 class="text-lg font-medium">このメンバーもオススメ</h4>
          <div
            class="text-white py-2 px-4 rounded-xl inline-block mt-1"
            :style="{ backgroundColor: getCategoryInfo(secondCategory).color }"
          >
            {{ getCategoryInfo(secondCategory).label }}
          </div>
          <img
            :src="second.image"
            :alt="second.name"
            class="w-32 h-32 object-cover rounded-full mx-auto my-2 border-2 border-gray-400"
          />
          <p class="text-xl text-gray-700">{{ second.name }}</p>
        </div>
      </transition>

      <div class="flex gap-4 mt-8 justify-center">
        <button @click="retry" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          もう一度診断する
        </button>
        <router-link to="/">
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            トップに戻る
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<style>
.fade-slow-enter-active {
  transition: all 0.8s ease;
}
.fade-slow-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-active {
  transition: all 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
