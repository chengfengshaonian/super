<template>
  <div class="card-list">
    <scroll class="content" ref="scroll">
      <card-list-item v-for="(item,index) in cartList" :item-info="item" :key="index"></card-list-item>
    </scroll>
  </div>
</template>

<script>
  import CardListItem from "./CardListItem";


  import Scroll from "../../../components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'
    export default {
        name: "CartList",
        components: {
          Scroll,
          CardListItem
        },
        computed: {
          ...mapGetters(['cartList'])
        },
        activated() {
          this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
  .card-list{
    height: calc(100% - 44px - 49px - 44px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
