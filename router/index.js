import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import Sobre from '../view/Sobre.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: HomeView
  },
  {
    path: '/Sobre',
    name: 'Sobre',
    component: Sobre
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router