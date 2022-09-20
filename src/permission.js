
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
router.beforeEach(async(to, from, next) => {
  Nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有token，看访问的地址
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      // 只有放过的时候才去获取用户资料
      // 是每次都能获取码
      // 如果当前vuex中由用户的资料id表示，已经有资料了，不需要获取了，如果没有id才需要获取
      if (!store.state.user.userInfo.userId) {
        // 如果没有代表没有获取国
        await store.dispatch('getUserInfo')
        // 如果说有后续，需要根据用户资料获取数据的话，这里必须改成同步
      }
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

