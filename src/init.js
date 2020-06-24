import { initState } from './state'
import { compileToFuncion } from './compiler/index.js'
import {mountComponent} from './lifecycle.js'
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    //初始化状态
    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    // 顺序
    // 1render
    // 2template
    // 3el
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)

    //对模板进行编译
    if (!options.render) {
      //没有render就是template
      let template = options.template
      if (!options.template) {
        //如果还没有template就是el.outerHTML
        template = el.outerHTML
      }
      //把模板范围编译成render函数的具体方法
      const render = compileToFuncion(template)

      options.render = render
      //  render()
      mountComponent(vm,el)
    }
  }
}
