import {initMixin} from './init'
import {renderMixin} from './render'
import {lifecycleMixin} from './lifecycle.js'
function Vue(options){
    //初始化
    this._init(options)
}

initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
export default Vue 