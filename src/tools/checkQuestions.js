// checkQuestions.js
import { categorizedQuestions } from './questions.js';

// すべての質問をフラット化
const allQuestions = Object.values(categorizedQuestions).flat();

// 1. カテゴリ出現回数の集計
const categoryCount = {};
allQuestions.forEach(q => {
  q.options.forEach(opt => {
    categoryCount[opt.category] = (categoryCount[opt.category] || 0) + 1;
  });
});

// 出現回数の最大・最小
const counts = Object.values(categoryCount);
const maxCount = Math.max(...counts);
const minCount = Math.min(...counts);

console.log("📊 カテゴリ出現回数チェック");
console.log("---------------------------------------");
for (const [cat, count] of Object.entries(categoryCount)) {
  console.log(`${cat.padEnd(20)}: ${count}`);
}
if (maxCount === minCount) {
  console.log("✅ 全カテゴリの出現回数は完全に均等です！");
} else {
  console.log("⚠️ カテゴリの出現回数に差があります！");
}

// 2. カテゴリペア重複チェック
const pairSet = new Set();
const duplicates = [];

allQuestions.forEach(q => {
  const cats = q.options.map(o => o.category).sort();
  const pairKey = `${cats[0]} & ${cats[1]}`;
  if (pairSet.has(pairKey)) {
    duplicates.push(pairKey);
  } else {
    pairSet.add(pairKey);
  }
});

console.log("\n🔍 カテゴリペア重複チェック");
console.log("---------------------------------------");
if (duplicates.length === 0) {
  console.log("✅ 重複ペアはありません！");
} else {
  console.log("⚠️ 以下のペアが重複しています：");
  duplicates.forEach(p => console.log(` - ${p}`));
}
// checkQuestions.js
import { categorizedQuestions } from './questions.js';

// すべての質問をフラット化
const allQuestions = Object.values(categorizedQuestions).flat();

// 1. カテゴリ出現回数の集計
const categoryCount = {};
allQuestions.forEach(q => {
  q.options.forEach(opt => {
    categoryCount[opt.category] = (categoryCount[opt.category] || 0) + 1;
  });
});

// 出現回数の最大・最小
const counts = Object.values(categoryCount);
const maxCount = Math.max(...counts);
const minCount = Math.min(...counts);

console.log("📊 カテゴリ出現回数チェック");
console.log("---------------------------------------");
for (const [cat, count] of Object.entries(categoryCount)) {
  console.log(`${cat.padEnd(20)}: ${count}`);
}
if (maxCount === minCount) {
  console.log("✅ 全カテゴリの出現回数は完全に均等です！");
} else {
  console.log("⚠️ カテゴリの出現回数に差があります！");
}

// 2. カテゴリペア重複チェック
const pairSet = new Set();
const duplicates = [];

allQuestions.forEach(q => {
  const cats = q.options.map(o => o.category).sort();
  const pairKey = `${cats[0]} & ${cats[1]}`;
  if (pairSet.has(pairKey)) {
    duplicates.push(pairKey);
  } else {
    pairSet.add(pairKey);
  }
});

console.log("\n🔍 カテゴリペア重複チェック");
console.log("---------------------------------------");
if (duplicates.length === 0) {
  console.log("✅ 重複ペアはありません！");
} else {
  console.log("⚠️ 以下のペアが重複しています：");
  duplicates.forEach(p => console.log(` - ${p}`));
}

// node checkQuestions.jsで実行