import Layout from '@/layout'
// 员工的路由规则
export default {
  // 路由规则
  path: '/social', // 路由地址
  name: 'social', // 给模块的以及路由加一个name属性，这个属性我们会在后面作权限的时候用到。
  component: Layout,
  children: [{
    path: '', // 二级路由什么都不屑的时候，此时她表示二级路由的默认路由
    component: () => import('@/views/social'),
    // 路由元信息，其实就是存储数据的对象，我们可以在这里放置一些信息
    meta: {
      title: '社保',
      icon: 'table' // 这里为什么要用title，因为左侧导航读取了这里的title属性
    }
  }]
}
