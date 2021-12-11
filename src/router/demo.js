
const routes = [
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: { requireAuth: true, roles: ['superadmin', 'admin', 'user'] }
  },
  {
    path: '/SuperAdmin',
    name: 'SuperAdmin',
    component: SuperAdmin,
    meta: { requireAuth: true, roles: ['superadmin'] }
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    meta: { requireAuth: true, roles: ['admin'] }
  },
  {
    path: '/User',
    name: 'User',
    component: User,
    meta: { requireAuth: true, roles: ['user'] }
  }]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //router.beforeEach一般用来做一些进入页面的限制
  console.log('上一个页面：', from)
  console.log('下一个页面：', to)
  let userToken = localStorage.getItem('userToken')
  let role = localStorage.getItem('role')
  if (to.meta.requireAuth) {      // 1)判断该路由是否需要登录权限
    if (userToken) {  // 2)判断本地是否存在token,有说明登录过
      if (to.meta.roles.length !== 0) {
        //下一个页面的rules是否与当前token相等
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (role === to.meta.roles[i]) {
            next()       //角色匹配已登录，正常进入to.meta.roles[i]的页面
            break
          } else if (i === to.meta.roles.length - 1) {
            next({ path: '/Error' })
          }
        }
      } else { next() }
    } else {
      next({ path: '/Login' })
    }
  } else { next() }
  /* 如果本地存在token,则不允许直接跳转到登录页面 */
  if (to.fullPath === '/Login') {
    if (userToken) {
      next({ path: from.fullPath })
    } else { next() }
  }
})
// 3.在登录页面中，登录请求成功之后，需要判断一下用户角色类型，根据不同的用户角色来跳转到不同的页面
if (role === 'superadmin') {
  login.vue
  that.$router.push({
    name: 'SuperAdmin'
  })
} else if (role === 'admin') {
  that.$router.push({
    name: 'Admin'
  })
} else if (role === 'user') {
  that.$router.push({
    name: 'User'
  })
}
