<template>
    <div>
        <TabBar>
            <TabBarItem path="/home">
                <img slot="item-icon" src="~/assets/img/tabbar/home.svg">
                <img slot="item-iconf" src="~/assets/img/tabbar/homef.svg">
                <div slot="item-text">首页</div>
            </TabBarItem>
            <TabBarItem path="/category">
                <img slot="item-icon" src="~/assets/img/tabbar/sort.svg">
                <img slot="item-iconf" src="~/assets/img/tabbar/sortf.svg">
                <div slot="item-text">分类</div>
            </TabBarItem>
            <TabBarItem path="/cart">
                <img slot="item-icon" src="~/assets/img/tabbar/shopcar.svg">
                <img slot="item-iconf" src="~/assets/img/tabbar/shopcarf.svg">
                <div slot="item-text">购物车</div>
            </TabBarItem>
            <TabBarItem path="/profile">
                <img slot="item-icon" src="~/assets/img/tabbar/me.svg">
                <img slot="item-iconf" src="~/assets/img/tabbar/mef.svg">
                <div slot="item-text">我的</div>
            </TabBarItem>
        </TabBar>
    </div>
</template>

<script>
    import TabBar from "components/common/tabbar/TabBar";
    import TabBarItem from "components/common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
        components: {
            TabBar,
            TabBarItem
        }

    }
</script>

<style scoped>

</style>
