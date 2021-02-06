//防抖/节流函数，防止监听item图片函数多次调用refresh()
export function debounce(func,delay) {
  let timer=null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}
