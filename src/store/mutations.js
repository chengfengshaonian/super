import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default{
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  },
  subcart(state,payload){
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      payload.count--
    }
  }
}
