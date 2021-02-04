<template>
    <div class="tab-bar-item" @click="itemclick">
        <div v-if=isActive><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-iconf"></slot></div>
        <div :style="activestyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props: {
            path: String,
            activecolor: {
                type: String,
                default: 'pink'
            }
        },
        data(){
            return{
                //isActive: true
            }
        },
        computed: {
            isActive(){
                return this.$route.path.indexOf(this.path) == -1
            },
            activestyle(){
                return this.isActive ? {}:{color: this.activecolor}
            }
        },
        methods: {
            itemclick(){
                this.$router.replace(this.path)
                //console.log(this.$route)
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }
    .tab-bar-item img{
        width: 20px;
        height: 20px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
</style>
