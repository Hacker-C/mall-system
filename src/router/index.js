import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')
const Layout = () => import('../layout/Layout.vue')
const Category = () => import('../views/Category.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category',
        component: Category
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
