<template>
  <div>
      <div class="top">
<div class="top-item">
  <el-menu
  style="border:none;width:30%;height:auto;text-align:left"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(18,18,18)"
      text-color="#fff"
      active-text-color="#D351E1">
<el-menu-item index="1"><router-link to="/home">返回商城</router-link></el-menu-item>
<h4 style="color:#fff;margin-top:5.5%;">{{title.title}}</h4>
  </el-menu>
  <div style="width:50%"></div>
  <el-badge
      :value="$store.state.cartCount"
      :max="60"
      class="item"
      style="width: 7%; background: rgb(18, 18, 18)">
    <el-tabs >
      <router-link to="/shopcart"><a href="#"><span>购物车</span></a></router-link>
      <!--           <router-link to="/shopcart"><a href="#"><span>愿望清单</span></a></router-link>-->
    </el-tabs>

  </el-badge>
  <el-badge
      :value="$store.state.cartCount"
      :max="60"
      class="item"
      style="width: 7%; background: rgb(18, 18, 18)">
    <el-tabs >
      <!--            <router-link to="/shopcart"><a href="#"><span>购物车</span></a></router-link>-->
      <router-link to="/wishcar"><a href="#"><span>心愿单</span></a></router-link>
    </el-tabs>

  </el-badge>

  <el-badge
      :value="$store.state.cartCount"
      :max="80"
      class="item"
      style="width: 7%; background: rgb(18, 18, 18)">
    <el-tabs >
      <!--            <router-link to="/shopcart"><a href="#"><span>购物车</span></a></router-link>-->
      <router-link to="/shopcart"><a href="#"><span>订单</span></a></router-link>
    </el-tabs>

  </el-badge>
  <div class="search">
     
  <el-input
  placeholder="搜索"
  v-model="input"
  clearable
  prefix-icon="el-icon-search"
 >
 <!-- <img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%90%9C%E7%B4%A2.png" style="width:10%;z-index:999999" alt=""> -->
</el-input>
</div>
</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref,reactive,toRefs } from "vue";
import {useStore} from 'vuex'
export default defineComponent({
  name: "home",
  props:{
      title:{
           type:Array,
           default(){
               return [];
           }
      }
    },
  setup() {
      const activeIndex = ref("2");
    const activeIndex2 = ref("2");
    const store = useStore();
    onMounted(()=>{
        store.dispatch('updateCart');
      })
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {activeIndex,activeIndex2,handleSelect,input: ref('')};
  },
  components: {},
  methods: {},
});
</script>
<style scoped lang='scss'>
.top{
  position: fixed;
  top: 6.3%;
  width: 100%;
  height: 11%;
  background:rgb(18,18,18);
  /* background:rgb(18,18,18); */
  opacity: 0.9;
  
}
.top-item{
  position: relative;
  width: 74%;
  height: 45%;
  margin-top: 1.5% ;
  margin-left: 13%;
  background:rgb(18,18,18);
  display: flex;
}
.item {
  margin-top: 1%;
  margin-right: 3%;
  span {
    color: #606266;
    transition: all 0.3s;
  }
  span:hover {
    color: #fff;
  }
}
.explore{
float: left;
height: 100%;
background:rgb(18,18,18);

}
.browser{
float: left;
height: 100%;
}
.search{
    width: 17%;
}
.el-input{
    --el-input-background-color:#303133;
    --el-input-border:#303133;
    --el-input-focus-border:#fff;
    --el-input-icon-color:#fff ;
    --el-input-placeholder-color:#fff;
    --el-input-font-color:#fff
}
.search{
    height: 90%;
}
.search img{
    float: left;
}
</style>