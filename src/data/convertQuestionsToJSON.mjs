import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsPath = path.resolve(__dirname, './questions.js');
const questionsFileUrl = pathToFileURL(questionsPath).href + '?cache-bust=' + Date.now();

const { categorizedQuestions } = await import(questionsFileUrl);

const outputPath = path.resolve(__dirname, './questions.json');

fs.writeFileSync(outputPath, JSON.stringify(categorizedQuestions, null, 2), 'utf8');

console.log('questions.jsonに変換して保存しました:', outputPath);
