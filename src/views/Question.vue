<template>
  <div class="h-screen bg-gradient-to-r from-[#7cc7e8] via-[#add8e6] to-[#7cc7e8]">
    <div class="p-4 sm:p-6 max-w-md sm:max-w-xl mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-center mb-6">
        質問 {{ currentIndex + 1 }} / {{ questions.length }}
      </h2>
      <transition name="fade" mode="out-in">
        <div
          :key="currentIndex"
          class="bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center"
        >
          <p class="text-base sm:text-lg font-semibold mb-4">
            {{ currentQuestion.text }}
          </p>
          <div class="space-y-3">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="answer(option.category)"
              class="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition text-base sm:text-lg"
            >
              {{ option.text }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useResultStore } from '@/stores/resultStore';
import { selectBalancedQuestions } from '@/utils/selectQuestions';

const router = useRouter();
const store = useResultStore();

const questions = selectBalancedQuestions(2); // 各カテゴリ2問
const currentIndex = ref(0);
const currentQuestion = computed(() => questions[currentIndex.value]);

const answer = (category) => {
  store.addScore(category, 1);
  if (currentIndex.value + 1 < questions.length) {
    currentIndex.value++;
  } else {
    router.push('/result');
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
  transform: scale(1);
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>