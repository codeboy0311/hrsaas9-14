// 负责管理所有的自定义指令
export const imagerror = {
  // 指令对象,会在当前的dom元素插入到节点后在执行
  inserted(dom, options) {
    // options是指令中变量的解释，其中有一个属性叫做value
    // dom 表示当前指令的作用对象
    // dom就是图片
    // 当图片有地址，但地址没加载成功的时候，会触发图片的一个事件 => onerror
    dom.onerror = function() {
      // dom可以注册error事件
      dom.src = options.value // 这里不能写死
    }
  }
}
