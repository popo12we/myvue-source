import { observe } from './observe/index.js'
import { proxy } from './util/index'
export function initState(vm) {
  let opts = vm.$options
  // vue的数据来源 属性 方法 数据 计算属性 watch
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethod(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps() {}

function initMethod() {}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data) //响应式原理
}

function initComputed() {}

function initWatch() {}
