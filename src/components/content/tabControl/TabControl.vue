<template>
    <div class="tab_control">
      <div v-for="(item,index) in titles" class="tab_control_item"
           :class="{active:index==currentIndex}" @click="itemclick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
          titles: {
            type: Array,
            default(){
              return []
            }
          }
        },
        data(){
          return {
            currentIndex: 0
          }
        },
      methods: {
        itemclick(index){
          this.currentIndex = index
          this.$emit('tabclick',index)
        }
      }
    }
</script>

<style scoped>
 .tab_control{
   display: flex;
   text-align: center;
   font-size: 15px;
   background-color: white;
 }
 .tab_control_item{
   flex: 1;
   height: 40px;
   line-height: 40px;
 }
 .tab_control_item span{
   padding: 5px;
 }
  .active {
    color: var(--color-high-text);

  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
