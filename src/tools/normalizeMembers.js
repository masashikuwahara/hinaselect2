// normalizeMembers.js

const fs = require('fs');
const path = require('path');

// members.js を読み込む（CommonJS 用の require に変換）
const members = require('../data/members.js').members;

// 正規化関数
function normalizeWeights(categories) {
  const total = Object.values(categories).reduce((sum, val) => sum + val, 0);
  if (total === 0) return categories;

  const normalized = {};
  for (const [key, value] of Object.entries(categories)) {
    normalized[key] = parseFloat((value / total).toFixed(3));
  }
  return normalized;
}

// 各メンバーの categories を正規化
const normalizedMembers = members.map(member => {
  return {
    ...member,
    categories: normalizeWeights(member.categories),
  };
});

// 出力ファイルパス
const outputPath = path.join(__dirname, 'members.normalized.js');

// エクスポート形式で保存
const fileContent = `export const members = ${JSON.stringify(normalizedMembers, null, 2)};\n`;

fs.writeFileSync(outputPath, fileContent, 'utf8');

console.log('✅ 正規化済みの members.normalized.js を出力しました！');
