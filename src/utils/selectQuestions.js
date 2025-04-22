import { categorizedQuestions } from '@/data/questions';

export function selectBalancedQuestions(perCategory = 2) {
  const selected = [];

  for (const [category, questions] of Object.entries(categorizedQuestions)) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, perCategory));
  }

  // 全体をシャッフル（表示順をランダムに）
  return selected.sort(() => Math.random() - 0.5);
}
