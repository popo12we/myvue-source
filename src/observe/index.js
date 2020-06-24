import { arrayMethods } from './array.js'
import { isObject, def } from '../util/index'
class Observer {
  constructor(value) {
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(data) {
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let value = data[key]
      defineReactive(data, key, value)
    }
  }
  observerArray(value){
     for(let i=0;i<value.length;i++){
       observe(value[i])
     }
  }
}

function defineReactive(data, key, value) {
  observe(value) // 递归实现深度检测
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newvalue) {
      if (value === newvalue) {
        return
      }
      observe(newValue) // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
      value = newvalue
    },
  })
}
export function observe(data) {
  let isObj = isObject(data)
  if (!isObj) {
    return
  }
  return new Observer(data) // 用来观测数据
}
