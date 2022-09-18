
// 权限拦截在路由跳转，导航守卫
import router from './router'
import store from '@/store' // 引入store实例 和组件里的this.$store是一回事
import Nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'
// 不需要导出 因为只需要让代码执行即可
// 定义一个白名单
const witheList = ['/login', '/404']
// 前置守卫
// next是前置守卫必须要执行的钩子函数
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转某个地址
router.beforeEach((to, from, next) => {
  Nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有token，看访问的地址
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      next()
    }
  } else {
    if (witheList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  Nprogress.done() // 解决手动切换进度条地址不关闭问题
})
// 后置守卫
router.afterEach(() => {
  Nprogress.done() // 关闭进度条
})

