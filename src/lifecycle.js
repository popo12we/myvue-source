import Watcher from "./observe/watcher"
import {patch} from "./vdom/patch"
export function lifecycleMixin(Vue){
    Vue.prototype._update=function(vnode){
         const vm = this
         vm.$el = patch(vm.$el, vnode) //创建的真实dom替换$el
    }
} 
export function mountComponent(vm,el){
    const options=vm.$options
    vm.$el=el
     callHook(vm, 'beforeMount')
    let updateComponent=()=>{
        // vm._render()生成虚拟dom
        // vm._update生成真实dom
        vm._update(vm._render())
    }
    //渲染更新watcher 渲染和更新都走这里
    new Watcher(vm,updateComponent,()=>{},true)
    callHook(vm, 'mounted')
}

export function callHook(vm, hook) {
  const handlers = vm.$options[hook] // [fn,fn,fn]
  if (handlers) {
    // 找到对应的钩子依次执行
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm)
    }
  }
}