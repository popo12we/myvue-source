import { mergeOptions } from '../util/index'
export function initGlobalAPI(Vue){
   Vue.mixin=function(mixin){
       this.options=mergeOptions(this.options,mixin)
   }
}