export function patch(oldvnode, vnode){
  const isRealElement=oldvnode.nodeType
  if(isRealElement){
      const oldElm = oldvnode
      const parentElm = oldvnode.parentNode
      let el=createEle(vnode)
      parentElm.insertBefore(el,oldElm.nextSibling)
      parentElm.removeChild(oldElm)
      return el
  }
}

function createEle(vnode){//根据虚拟节点创建真实dom节点
  let {tag,children,key,data,text}=vnode
  if(typeof tag==="string"){
     vnode.el=document.createElement(tag)
     updateProperties(vnode)
     children.forEach(child=>{
         vnode.el.appendChild(createEle(child))
     })
  }else{
      vnode.el=document.createTextNode(text)
  }
  return vnode.el
}

function updateProperties(vnode){
    let newProps=vnode.data
    let el=vnode.el
    
      for (let key in newProps) {
        if (key === 'style') {
          for (let styleName in newProps.style) {
            el.style[styleName] = newProps.style[styleName]
          }
        } else if (key === 'class') {
          el.className = newProps.class
        } else {
          el.setAttribute(key, newProps[key])
        }
      }
}