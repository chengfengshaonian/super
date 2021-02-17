<template>
    <div id="home">
        <NavBar class="home_nav">
          <div slot="center">购物街</div>
        </NavBar>
        <TabControl :titles="['流行','新款','精选']"
                    @tabclick="tabclick"
                    ref="tabControl1"
                    class="tab-control"
                    v-show="isTabfixed"></TabControl>
        <Scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
                @pullingUp="loadmore"
                @scrollpo="contentscroll">
          <HomeSwiper :banners="banners" @swiperImageload="swiperImageload"></HomeSwiper>
          <recommend-view :recommends="recommends"></recommend-view>
          <feature-view></feature-view>
          <TabControl :titles="['流行','新款','精选']" @tabclick="tabclick"
                      ref="tabControl"></TabControl>
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
    import {itemListenerMixin} from "../../common/mixin";
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
      mixins: [itemListenerMixin],
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
            BackTop: false,
            tabOffsetTop: 0,
            isTabfixed: false,
            saveY: 0,
          }
      },
      destroyed() {
        console.log('home destroyed');
      },
      activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
      },
      deactivated() {
          //取消全局事件的监听
          this.$bus.$off('itemimgLoad',this.imgItemlistener)
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
      },
      computed: {
        showgoods(){
          return this.goods[this.currentType].list
        }
      },
      methods: {
        //监听轮播图的加载
        swiperImageload(){
          //获取tabControl的offsettop
          //所有组件都有都有一个属性$el，用于获取组件中的元素
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        },
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
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl.currentIndex = index

          if (this.isTabfixed){
            this.$refs.scroll.scrollTo(0,(-this.tabOffsetTop),300)
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
          if (this.BackTop='true'){
            this.$refs.scroll.scrollTo(0,0,300)
          }
        },
        //回调方法,监听scroll滑动来隐藏backto位置
        contentscroll(position){
          //判断backtop是否显示
          this.BackTop = position.y < -1000
          //决定tabcontrol是否吸顶（position：fixed）
          this.isTabfixed = (-position.y) > this.tabOffsetTop
          //保存y值
          this.saveY = position.y
        },
        loadmore(){
            this.getHomeGoods(this.currentType)
            this.$refs.scroll.finishPu()
            this.$refs.scroll.scroll.refresh()
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

  /*.tab-control {
    !*当滚动到top：44px时,会把position值改为fixed*!
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/
  .tab-control {
    position: relative;
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
