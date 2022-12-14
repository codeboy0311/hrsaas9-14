import Layout from '@/layout'
// 员工的路由规则
export default {
  // 路由规则
  path: '/employees', // 路由地址
  name: 'employees', // 给模块的以及路由加一个name属性，这个属性我们会在后面作权限的时候用到。
  component: Layout,
  children: [{
    path: '', // 二级路由什么都不屑的时候，此时她表示二级路由的默认路由
    component: () => import('@/views/employees'),
    // 路由元信息，其实就是存储数据的对象，我们可以在这里放置一些信息
    meta: {
      title: '员工管理',
      icon: 'people'// 这里为什么要用title，因为左侧导航读取了这里的title属性
    }
  },
  {
    path: 'detail/:id', // query传参 动态路由传参，加个？有也行，没有也行
    component: () => import('@/views/employees/detail'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情'
    }
  }
  ]
}
