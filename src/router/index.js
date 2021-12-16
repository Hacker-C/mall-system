import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Layout = () => import('../layout/Layout.vue')
const ProductList = () => import('../views/ProductList/ProductList.vue')
const About = () => import('../views/About.vue')
const Notice = () => import('../views/Notice.vue')
const Like = () => import('../views/like/Like.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Order = () => import('../views/Order.vue')
const Profile = () => import('../views/Profile.vue')
const Details = () => import('../views/details/Details.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Checkout = () => import('../views/checkout/Checkout.vue')

// 管理员界面
const Admin = () => import('../pages/admin/Admin.vue')

// 商家界面
const Shop = () => import('../pages/shop/Shop.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: 'home',
    requireAuth: false,
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          requireAuth: false,
          name: '首页'
        }
      },
      {
        path: '/product_list',
        component: ProductList,
        meta: {
          requireAuth: false,
          name: '商品列表'
        }
      },
      {
        path: '/about',
        component: About,
        meta: {
          requireAuth: false,
          name: '关于我们'
        }
      },
      {
        path: '/notice',
        component: Notice,
        meta: {
          requireAuth: false,
          name: '网站公告'
        }
      },
      {
        path: '/like',
        component: Like,
        meta: {
          requireAuth: false,
          name: '我的收藏夹'
        }
      },
      {
        path: '/cart',
        component: Cart,
        meta: {
          requireAuth: false,
          name: '购物车'
        }
      },
      {
        path: '/checkout',
        component: Checkout,
        meta: {
          requireAuth: false,
          name: '订单结算'
        }
      },
      {
        path: '/order',
        component: Order,
        meta: {
          requireAuth: false,

          name: '所有订单'
        }
      },
      {
        path: '/profile',
        component: Profile,
        meta: {
          requireAuth: false,
          name: '个人信息'
        }
      },
      {
        path: '/details',
        component: Details,
        meta: {
          requireAuth: false,
          name: '商品详情'
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      requireAuth: false,
      name: '欢迎登录！'
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      requireAuth: false,
      name: '欢迎注册！'
    }
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      requireAuth: true,
      roles: ['admin'],
      name: '管理'
    }
  },
  {
    path: '/shop',
    component: Shop,
    meta: {
      requireAuth: true,
      roles: ['shop'],
      name: '开店'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.name
  let userId = sessionStorage.getItem('userId')
  let role = sessionStorage.getItem('role')
  // 判断要去的路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断是否登录
    if (userId) {
      if (to.meta.roles.includes(role)) {
        // 此角色拥有该页面的权限
        next()
      } else {
        // 此角色不具有此权限则返回原来页面
        next({ path: from.fullPath })
      }
    } else {
      next({ path: '/login' })
    }
  } else {
    // 不需要权限的直接去往
    next()
  }
})

export default router
