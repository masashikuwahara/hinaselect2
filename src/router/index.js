import { createRouter, createWebHistory } from 'vue-router';
import Top from '@/views/Top.vue';
import Question from '@/views/Question.vue';
import Result from '@/views/Result.vue';

const routes = [
  { path: '/', name: 'Top', component: Top },
  { path: '/question', name: 'Question', component: Question },
  { path: '/result', name: 'Result', component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
