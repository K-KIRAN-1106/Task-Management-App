import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import AddTask from '../components/AddTaskForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/add-task',
    name: 'AddTask',
    component: AddTask,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;