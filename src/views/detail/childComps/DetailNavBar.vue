<template>
  <div>
      <NavBar>
        <div slot="left" class="back" @click="backclick">
          <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles"
               class="title-item"
               :class="{active:currentIndex==index}"
                @click="itemclick(index)">
            {{item}}
          </div>
        </div>
      </NavBar>
  </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components: {
          NavBar
        },
        data(){
          return{
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
          }
        },
        methods: {
          itemclick(index){
            this.currentIndex=index
            this.$emit('navbarclick',index)
          },
          backclick(){
            this.$router.back()
          }
        },
    }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 14px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: pink;
  }
  .back img{
    margin-top: 10px;
  }
</style>
