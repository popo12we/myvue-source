import {initMixin} from './init'
import {renderMixin} from './render'
import {lifecycleMixin} from './lifecycle.js'
import { initGlobalAPI } from './initGlobalAPI/index'
function Vue(options){
    //初始化
    this._init(options)
}

initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
initGlobalAPI(Vue)
export default Vue 