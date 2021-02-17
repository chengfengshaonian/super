<template>
    <div class="Cart">
        <nav-bar class="nav-bar">
          <slot slot="center">购物车({{cartLength}})</slot>
        </nav-bar>
      <cart-list></cart-list>
      <CartBottomBar></CartBottomBar>
    </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
        components: {
          NavBar,
          CartList,
          CartBottomBar
        },
        computed: {
          ...mapGetters(['cartLength','cartList'])
        }

    }
</script>

<style scoped>
  .Cart {
    height: 100vh;
  }
  .nav-bar{
    background-color: #ff5777;
  }
</style>
