import fs from 'fs/promises';
import path from 'path';

// カテゴリごとのテンプレート
const categoryTemplates = {
  "スポーツ・アクティブ": [
    "体を動かす理由は？",
    "休日の過ごし方は？",
    "運動するときの気持ちは？"
  ],
  "ダンスが上手い": [
    "踊るときに意識することは？",
    "ダンスで表現する感情は？",
    "好きなダンススタイルは？"
  ],
  "癒し系": [
    "落ち着く時間は？",
    "癒される瞬間は？",
    "心が和むのはどんなとき？"
  ],
  "歌唱力が高い": [
    "歌うときに意識することは？",
    "歌で伝えたいことは？",
    "歌う前にすることは？"
  ],
  "天然": [
    "思わず笑ってしまう瞬間は？",
    "予想外の行動をしたときは？",
    "マイペースな一面が出るのは？"
  ],
  "知的・しっかり者": [
    "知的な印象を与える瞬間は？",
    "しっかり者だと言われる理由は？",
    "考えてから行動するのはどんなとき？"
  ],
  "王道アイドル": [
    "ファンにどう見られたい？",
    "アイドルらしい瞬間は？",
    "ステージでの理想の姿は？"
  ],
  "不思議系": [
    "周囲が不思議に思う行動は？",
    "独特な感性が出るのはどんなとき？",
    "ちょっと変わった趣味は？"
  ],
  "バラエティ": [
    "盛り上げるためにすることは？",
    "笑いを取る瞬間は？",
    "リアクションのこだわりは？"
  ],
  "モデル・ビジュアル": [
    "見た目を意識する瞬間は？",
    "ポーズのこだわりは？",
    "映えると思う場所は？"
  ],
  "歌唱力が高い": [
    "歌の魅力を引き出す方法は？",
    "歌っていて楽しい瞬間は？",
    "好きな歌のジャンルは？"
  ],
  "ぶりっ子": [
    "甘えるときの仕草は？",
    "可愛く見せるポイントは？",
    "ぶりっ子っぽいと思う瞬間は？"
  ]
};

// 出現回数カウント
function countCategories(questions) {
  const counts = {};
  for (const q of questions) {
    for (const opt of q.options) {
      counts[opt.category] = (counts[opt.category] || 0) + 1;
    }
  }
  return counts;
}

// ペア集計
function countPairs(questions) {
  const pairs = {};
  for (const q of questions) {
    const cats = q.options.map(o => o.category).sort();
    const key = cats.join(' & ');
    pairs[key] = (pairs[key] || 0) + 1;
  }
  return pairs;
}

// カテゴリ差し替え＋質問文更新
function replaceCategory(q, optionIndex, newCategory) {
  q.options[optionIndex].category = newCategory;
  if (categoryTemplates[newCategory]) {
    const templateList = categoryTemplates[newCategory];
    q.text = templateList[Math.floor(Math.random() * templateList.length)];
  }
}

// 均等化＋ペア分散
function balanceQuestions(questions) {
  if (!Array.isArray(questions)) {
    questions = Object.values(questions).flat();
  }

  const categories = Array.from(new Set(
    questions.flatMap(q => q.options.map(o => o.category))
  ));
  let counts = countCategories(questions);
  let target = Math.floor((questions.length * 2) / categories.length);
  let pairs = countPairs(questions);

  for (const q of questions) {
    let [cat1, cat2] = q.options.map(o => o.category);
    const pairKey = [cat1, cat2].sort().join(' & ');

    if (pairs[pairKey] > 1) {
      const replaceIndex = counts[cat1] > counts[cat2] ? 0 : 1;
      const replaceCat = categories.find(
        c => counts[c] < target && c !== cat1 && c !== cat2
      );
      if (replaceCat) {
        replaceCategory(q, replaceIndex, replaceCat);
        pairs[pairKey]--;
        counts[replaceCat]++;
        counts[replaceIndex === 0 ? cat1 : cat2]--;
      }
    }

    for (let i = 0; i < 2; i++) {
      if (counts[q.options[i].category] > target) {
        const newCat = categories.find(
          c =>
            counts[c] < target &&
            !q.options.map(o => o.category).includes(c)
        );
        if (newCat) {
          replaceCategory(q, i, newCat);
          counts[newCat]++;
          counts[q.options[i].category]--;
        }
      }
    }
  }

  return questions;
}

async function main() {
  try {
    const filePath = path.resolve('questions.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const questions = JSON.parse(data);

    const balancedQuestions = balanceQuestions(questions);

    const outputPath = path.resolve('questions_balanced.json');
    await fs.writeFile(outputPath, JSON.stringify(balancedQuestions, null, 2), 'utf-8');

    console.log('✅ 質問のバランス調整が完了しました。出力先:', outputPath);
  } catch (err) {
    console.error('❌ 処理中にエラーが発生しました:', err);
  }
}

main();