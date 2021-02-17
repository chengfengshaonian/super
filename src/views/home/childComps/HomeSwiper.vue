<template>
    <div>
      <swiper>
        <swiper-item v-for="item in banners">
          <a :href="item.link"><img :src="item.image" @load="imageload"></a>
        </swiper-item>
      </swiper>
    </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "HomeSwiper",
      components: {
        Swiper,
        SwiperItem
      },
      props: {
          banners: {
            type: Array,
            default(){
              return []
            }
          }
      },
      data(){
          return{
              isload: false
          }
      },
      methods: {
        imageload(){
          //只需要发送一次
          if (!this.isload){
            this.$emit('swiperImageload')
            this.isload=true
          }
        }
      }
    }
</script>

<style scoped>

</style>
