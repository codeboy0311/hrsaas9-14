// 该文件负责所有的公共组件的全局注册
import pageTools from '@/components/pageTools/index.vue'
export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
  }
}
