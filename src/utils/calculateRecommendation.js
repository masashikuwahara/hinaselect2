import { useResultStore } from '@/stores/resultStore';
import { members } from '@/data/members';

export function calculateRecommendation() {
  const store = useResultStore();
  const userScores = store.scores;

  // 各メンバーに対してスコア計算
  const scoredMembers = members.map(member => {
    let totalScore = 0;

    for (const [category, weight] of Object.entries(member.categories)) {
      const userScore = userScores[category] || 0;
      totalScore += userScore * weight;
    }

    return {
      ...member,
      totalScore,
    };
  });

  // スコア順に並び替え
  const sorted = scoredMembers.sort((a, b) => b.totalScore - a.totalScore);

  return {
    top: sorted[0] || null,
    second: sorted[1] || null,
    ranked: sorted,
  };
}
