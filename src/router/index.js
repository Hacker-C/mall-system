import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Layout = () => import('../layout/Layout.vue')
const ProductList = () => import('../views/ProductList/ProductList.vue')
const About = () => import('../views/About.vue')
const Notice = () => import('../views/Notice.vue')
const Like = () => import('../views/like/Like.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Order = () => import('../views/order/Order.vue')
const Profile = () => import('../components/Profile.vue')
const Details = () => import('../views/details/Details.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Checkout = () => import('../views/checkout/Checkout.vue')
const SubmitSuccess = () => import('../views/checkout/SubmitSuccess.vue')

// 商家注册
const ShopRegister = () => import('../views/ShopRegister.vue')

// 管理员界面
const Admin = () => import('../pages/admin/Admin.vue')
const Welcome = () => import('../pages/admin/welcome/Welcome.vue')
const AllUsers = () => import('../pages/admin/users/AllUsers.vue')
const AllShops = () => import('../pages/admin/users/AllShops.vue')
const AllRoles = () => import('../pages/admin/users/AllRoles.vue')
const AllProducts = () => import('../pages/admin/system/AllProducts.vue')
const HomeSet = () => import('../pages/admin/system/HomeSet.vue')
const AllOrder = () => import('../pages/admin/order/AllOrder.vue')
const NoticeAdmin = () => import('../pages/admin/notice/NoticeAdmin.vue')

// 商家界面
const Shop = () => import('../pages/shop/Shop.vue')
const WelcomeShop = () => import('../pages/shop/welcome/Welcome.vue')
const ShopProducts = () => import('../pages/shop/products/Product.vue')
const ShopOrders = () => import('../pages/shop/oders/Order.vue')
const Sold = () => import('../pages/shop/sold_data/Sold.vue')
const Data = () => import('../pages/shop/sold_data/Data.vue')

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
        path: '/submit_success',
        component: SubmitSuccess,
        meta: {
          requireAuth: true,
          roles: ['admin', 'user', 'shop'],
          name: '订单提交结果'
        }
      },
      {
        path: '/checkout',
        component: Checkout,
        meta: {
          requireAuth: true,
          name: '订单结算',
          roles: ['admin', 'user', 'shop']
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
    redirect: '/admin/welcome',
    meta: {
      requireAuth: true,
      roles: ['admin'],
      name: '管理'
    },
    children: [
      {
        path: '/admin/welcome',
        component: Welcome,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '欢迎！',
          title: '欢迎'
        }
      },
      {
        path: '/admin/all_users',
        component: AllUsers,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '所有用户',
        }
      },
      {
        path: '/admin/all_shops',
        component: AllShops,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '商家管理',
        }
      },
      {
        path: '/admin/all_roles',
        component: AllRoles,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '所有角色'
        }
      },
      {
        path: '/admin/home_set',
        component: HomeSet,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '首页管理'
        }
      },
      {
        path: '/admin/all_products',
        component: AllProducts,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '所有商品'
        }
      },
      {
        path: '/admin/orders',
        component: AllOrder,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '所有订单'
        }
      },
      {
        path: '/admin/profile',
        component: Profile,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '个人中心'
        }
      },
      {
        path: '/admin/notice',
        component: NoticeAdmin,
        meta: {
          requireAuth: true,
          roles: ['admin'],
          name: '公告栏管理'
        }
      }
    ]
  },
  {
    path: '/shop',
    component: Shop,
    redirect: '/shop/welcome',
    meta: {
      requireAuth: true,
      roles: ['shop'],
      name: '开店'
    },
    children: [
      {
        path: '/shop/welcome',
        component: WelcomeShop,
        meta: {
          requireAuth: true,
          roles: ['shop'],
          name: '欢迎'
        },
      },
      {
        path: '/shop/products',
        component: ShopProducts,
        meta: {
          requireAuth: true,
          roles: ['shop'],
          name: '所有商品'
        },
      },
      {
        path: '/shop/orders',
        component: ShopOrders,
        meta: {
          requireAuth: true,
          roles: ['shop'],
          name: '所有订单'
        },
      },
      {
        path: '/shop/profile',
        component: Profile,
        meta: {
          requireAuth: true,
          roles: ['shop'],
          name: '个人信息'
        }
      },
      {
        path: '/shop/sold',
        component: Sold,
        meta: {
          requireAuth: true,
          roles: ['shop'],
          name: '销售情况'
        }
      },
      {
        path: '/shop/data',
        component: Data,
        meta: {
          requireAuth: true,
          roles: ['shop'],
          name: '数据统计'
        }
      }
    ]
  },
  {
    path: '/shop/register',
    component: ShopRegister,
    meta: {
      requireAuth: false,
      name: '注册成为商家'
    },
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
  if (to.fullPath === '/submit_success') {
    if (from.fullPath === '/checkout') {
      next()
    } else {
      router.back()
    }
  }
  // 判断要去的路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断是否登录
    if (userId) {
      if (to.meta.roles.includes(role)) {
        // 此角色拥有该页面的权限
        next()
      } else {
        // 此角色不具有此权限则返回原来页面
        // next({ path: from.fullPath })
        router.back()
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
