import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router';
import Start from '../../pages/StartPage.vue'
import Menu from '../../pages/MenuPage.vue'
import Game from '../../pages/GamePage.vue'
import Info from '../../pages/InfoPage.vue'
const routes = [
  {
    name:'start',
    path:"/",
    component:Start
  },
  {
    name: 'menu',
    path: "/menu",
    component:Menu
  },
  {
    name: 'game',
    path: "/game",
    component:Game
  },
  {
    name: 'info',
    path: "/info",
    component:Info
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;