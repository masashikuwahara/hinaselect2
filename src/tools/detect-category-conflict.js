// tools/detect-category-conflict.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import members from '../data/members.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 類似カテゴリ同士のスコアの "高スコア" と見なす閾値

const HIGH_SCORE_THRESHOLD = 0.3;
const CONFLICT_THRESHOLD = 0.3;


// メンバー全体を解析してカテゴリの重複ペアごとのスコア合計を出す
const categoryPairScores = {};

members.forEach((member) => {
  const categories = Object.keys(member.categories || {});

  for (let i = 0; i < categories.length; i++) {
    for (let j = i + 1; j < categories.length; j++) {
      const cat1 = categories[i];
      const cat2 = categories[j];
      const score1 = member.categories[cat1] || 0;
      const score2 = member.categories[cat2] || 0;

      if (score1 >= HIGH_SCORE_THRESHOLD && score2 >= HIGH_SCORE_THRESHOLD) {
        const key = [cat1, cat2].sort().join(' & ');
        if (!categoryPairScores[key]) categoryPairScores[key] = 0;
        categoryPairScores[key] += (score1 + score2) / 2;
      }
    }
  }
});

console.log('🔎 カテゴリ間のスコア重複チェック結果:');
console.log('---------------------------------------');
Object.entries(categoryPairScores)
  .sort((a, b) => b[1] - a[1])
  .forEach(([pair, score]) => {
    const mark = score >= CONFLICT_THRESHOLD ? '⚠️' : '';
    console.log(`${pair.padEnd(30)} → 重複スコア合計: ${score.toFixed(2)} ${mark}`);
  });
