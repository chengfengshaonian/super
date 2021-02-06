<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props: {
          probeType: {
            type: Number,
            default(){
              return 0
            }
          },
          pullUpLoad: {
            type: Boolean,
            default: false
          }
        },
        data(){
          return{
            scroll: null
          }
        },
      mounted() {
          this.initScroll()
        },
      methods: {
          //scroll到指定位置
        scrollTo(x,y,time){
          //console.log(x+y+time)
          this.scroll.scrollTo(x,y,time)
        },
        //下拉加载更多
        finishPu(){
          this.scroll.finishPullUp()
        },
        //刷新
        refresh(){
          this.scroll.refresh()
        },
        initScroll(){
          this.$nextTick(() =>{
            if(!this.$refs.wrapper){
              return
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
              click: true,
              probeType: this.probeType,
              taps: true,
              pullUpLoad: this.pullUpLoad
            })
            //发送滚动结束后坐标事件
            this.scroll.on('scrollEnd',(position) =>{
              this.$emit('scrollpo',position)
            })
            //发送下拉加载事件
            if (this.pullUpLoad){
              this.scroll.on('pullingUp',() =>{
                this.$emit('pullingUp')
              })
            }
          })
        }
      },

      /*watch: {
          scroll(){
            this.$nextTick(() =>{
              this.scroll.refresh()
            })
          }
      }*/
    }
</script>

<style scoped>

</style>
