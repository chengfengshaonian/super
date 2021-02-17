import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
  addcart(context,payload){
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER,oldProduct)
        resolve('商品数量加一')
      }else {
        payload.count = 1
        //state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加新的商品')
      }
    })
  }
}
