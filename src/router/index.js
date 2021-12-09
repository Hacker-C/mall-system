import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Layout = () => import('../layout/Layout.vue')
const ProductList = () => import('../views/ProductList/ProductList.vue')
const About = () => import('../views/About.vue')
const Notice = () => import('../views/Notice.vue')
const Like = () => import('../views/Like.vue')
const Cart = () => import('../views/Cart.vue')
const Order = () => import('../views/Order.vue')
const Profile = () => import('../views/Profile.vue')

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
        component: Home,
        meta: {
          name: '首页'
        }
      },
      {
        path: '/product_list',
        component: ProductList
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/notice',
        component: Notice
      },
      {
        path: '/like',
        component: Like
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '/profile',
        component: Profile
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.name
  next()
})

export default router
