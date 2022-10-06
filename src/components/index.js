// 该文件负责所有的公共组件的全局注册
import pageTools from '@/components/pageTools/index.vue'
import UploadExcel from '@/components/UploadExcel'
export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
