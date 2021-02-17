<template>
  <div id="detail">
    <!--详情页导航-->
    <detail-nav-bar class="detail-nav" @navbarclick="navbarclick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scrollpo="contentscroll" :probe-type="3">
      <detail-swiper :top-images="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailinfo" @imageLoad="imageload"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paraminfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentinfo"></detail-comment-info>
      <div class="tuijian">
        <span>热卖推荐</span>
      </div>
      <GoodsList :goods="recommends" ref="goodsList"></GoodsList>
    </scroll>
    <detail-bottom-bar @addCart="addtocard"></detail-bottom-bar>

    <back-top @click.native="backclick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import GoodsList from "../../components/content/goods/GoodsList";

    import {getDetails,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
    import {debounce} from "../../common/utils";
    import {itemListenerMixin,backTopMixin} from "../../common/mixin";


    export default {
        name: "Detail",
        components: {
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          Scroll,
          DetailGoodsInfo,
          DetailParamInfo,
          DetailCommentInfo,
          GoodsList,
          DetailBottomBar
        },
      mixins: [itemListenerMixin,backTopMixin],
        data(){
          return{
            iid: null,
            topImage: [],
            goods: {},
            shop: {},
            detailinfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getthemeTopYs: null,
            currentindex: 0
          }
        },
        created() {
          this.iid=this.$route.query.iid

          getDetails(this.iid).then(res =>{
              //获取顶部轮播数据
              const data = res.result
              this.topImage = data.itemInfo.topImages
              //获取商品信息
              this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
              //获取店铺信息
              this.shop = new Shop(data.shopInfo)
              //保存商品详情数据
              this.detailinfo = data.detailInfo

              //获取参数信息
              this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

              //获取评论信息
              if (data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
              }
          })
          getRecommend().then(res =>{
              this.recommends = res.data.list
          })
          //给 getthemeTopYs赋值,进行防抖操作
          this.getthemeTopYs = debounce(() =>{
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.paraminfo.$el.offsetTop)
            this.themeTopYs.push(this.$refs.commentinfo.$el.offsetTop)
            this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
          },100)
        },
      mounted() {
      },
      destroyed() {
        this.$bus.$off('itemimgLoad',this.imgItemlistener)
      },
      methods: {
          imageload(){
            this.$refs.scroll.refresh()
            this.getthemeTopYs()
          },
        navbarclick(index){
              this.$refs.scroll.scrollTo(0,(-this.themeTopYs[index]),300)
        },
        contentscroll(position){
          //判断backtop是否显示
          this.showBackTop = position.y < -1000

          let positiony = -position.y
          let length = this.themeTopYs.length
          for (let i=0;i<length-1;i++){
            if (this.currentIndex !== i && ((i<length-1 && positiony>=this.themeTopYs[i] && positiony<this.themeTopYs[i+1]))){
                this.currentIndex = i
                this.$refs.navbar.currentIndex =  this.currentIndex
            }
          }
          /*for (let i=0;i<length;i++){
            if (this.currentIndex !== i && ((i<length-1 && positiony>=this.themeTopYs[i] && positiony<this.themeTopYs[i+1]) ||
              (i===length-1 && positiony>=this.themeTopYs[i]))){
                this.currentIndex = i
                this.$refs.navbar.currentIndex =  this.currentIndex
            }
          }*/
          /*if (positiony>=this.themeTopYs[0]&&positiony<this.themeTopYs[1]){
            this.currentIndex = 0
          }else if(positiony>=this.themeTopYs[1]&&positiony<this.themeTopYs[2]){
            this.currentIndex = 1
          }else if (positiony>=this.themeTopYs[2]&&positiony<this.themeTopYs[3]){
            this.currentIndex = 2
          }else if (positiony>=this.themeTopYs[3]){
            this.currentIndex = 3
          }
          console.log(this.currentIndex)*/
        },
        addtocard(){
            //获取购物车所需要信息
          const product = {}
          product.image = this.topImage[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.realPrice
          product.iid = this.iid
          //将商品添加到购物车
          //this.$store.commit('addcart',product)
          this.$store.dispatch('addcart',product).then(res =>{
            console.log('dd');
            this.$toast.show(res,2000)
          })
        }
        }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 44px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .tuijian {
    text-align: center;
    border-radius: 8px;
  }

</style>
