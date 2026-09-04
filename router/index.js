import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../layouts/HomeView.vue'
import Sobre from '../layouts/Sobre.vue'
import Contato from '../layouts/Contato.vue'
import Weather from '../layouts/Weather.vue'
import AIOTADS from '../layouts/AIOTADS.vue'

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
  },
    {
    path: '/Contato',
    name: 'Contato',
    component: Contato
  },
  {
    path: '/Weather',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/AIOTADS',
    name: 'AIOTADS',
    component: AIOTADS
  },
    {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router