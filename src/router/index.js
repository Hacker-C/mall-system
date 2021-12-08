import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: 'home',
    children: [
      {
        path: '/home',
        componen: Home
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
