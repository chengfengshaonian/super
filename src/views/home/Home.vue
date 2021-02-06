<template>
    <div id="home">
        <NavBar class="home_nav">
          <div slot="center">购物街</div>
        </NavBar>
        <Scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
                @pullingUp="loadmore"
                @scrollpo="contentscroll">
          <HomeSwiper :banners="banners"></HomeSwiper>
          <recommend-view :recommends="recommends"></recommend-view>
          <feature-view></feature-view>
          <TabControl :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabclick"></TabControl>
          <goods-list :goods="showgoods"></goods-list>

        </Scroll>
      <!--监听组件必须加上.native修饰符-->
      <back-top @click.native="backclick" v-show="BackTop"></back-top>
    </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import Scroll from "../../components/common/scroll/Scroll";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import BackTop from "../../components/content/backTop/BackTop";

    import {getHomeMultidata,getHomeGoods} from "../../network/home";
    import {debounce} from "../../common/utils";
    //import Swiper from "components/common/swiper/Swiper";
    //import SwiperItem from "components/common/swiper/SwiperItem";
    //import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "Home",
      components: {
          NavBar,
          HomeSwiper,
          RecommendView,
          FeatureView,
          TabControl,
          GoodsList,
          Scroll,
          BackTop
      },
      data() {
          return{
            banners: [],
            recommends: [],
            goods: {
              'pop': {page: 0,list: []},
              'new': {page: 0,list: []},
              'sell': {page: 0,list: []},
            },
            currentType: 'pop',
            BackTop: false
          }
      },
      created() {
          //1.请求多个数据
        this.getHomeMultidata()
        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      mounted() {
        //监听item图片加载完成
        const refresh= debounce(this.$refs.scroll.refresh,200)
        this.$bus.$on('itemimgLoad',() =>{
          refresh()
        })
      },
      computed: {
        showgoods(){
          return this.goods[this.currentType].list
        }
      },
      methods: {
        /*防抖/节流函数，防止监听item图片函数多次调用refresh()
        debounce(func,delay){
          let timer=null
          return function (...args) {
              if (timer) clearTimeout(timer)
              timer = setTimeout(() =>{
                func.apply(this,args)
              },delay)
          }
        },*/
          /*事件监听*/
        tabclick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
        },
        /*网络请求*/
        getHomeMultidata(){
          getHomeMultidata().then(res =>{
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          })
        },
        getHomeGoods(type){
          const page=this.goods[type].page + 1
          getHomeGoods(type,page).then(res =>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1
          })
        },
        //获取scroll组件调用scrollTo方法,传入参数到指定位置
        backclick(){
          console.log(this.BackTop)
          if (this.BackTop='true'){
            this.$refs.scroll.scrollTo(0,0,300)
          }
        },
        //回调方法,监听scroll滑动来隐藏backto位置
        contentscroll(position){
          //console.log(position.y);
          this.BackTop = position.y < -1000
        },
        loadmore(){
            this.getHomeGoods(this.currentType)
            this.$refs.scroll.finishPu()

            //this.$refs.scroll.scroll.refresh()
        }
      }
    }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    /*viewport height*/
    height: 100vh;
    position: relative;
  }
  .home_nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /*当滚动到top：44px时,会把position值改为fixed*/
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {
    height: calc(100% - 93px);
    margin-top: 44px;
  }*/
</style>
