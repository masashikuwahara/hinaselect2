import { defineStore } from 'pinia';

export const useResultStore = defineStore('result', {
  state: () => ({
    scores: {},
  }),
  actions: {
    addScore(category, amount) {
      if (!this.scores[category]) {
        this.scores[category] = 0;
      }
      this.scores[category] += amount;
    },
    resetScores() {
      this.scores = {};
    },
    getTopCategory(rank = 1) {
      const sorted = Object.entries(this.scores)
        .sort((a, b) => b[1] - a[1]);
      return sorted[rank - 1]?.[0] || null;
    },
  },
});

