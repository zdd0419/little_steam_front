<template>
  <!-- 引入样式 -->

  <div>
    <div class="top">
      <div class="top-item">
        <el-menu
          style="border: none; width: 80%; height: auto"
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="rgb(18,18,18)"
          text-color="#fff"
          active-text-color="#D351E1"
        >
          <el-menu-item index="1" @click="tohome">探索</el-menu-item>
<!--          <el-menu-item index="2" @click="toabout">浏览</el-menu-item>-->
        </el-menu>

          <el-tabs class="item" style="width: 7%; background: rgb(18, 18, 18)">
            <router-link to="/shopcart"><a href="#"><span>购物车</span></a></router-link>
<!--           <router-link to="/shopcart"><a href="#"><span>愿望清单</span></a></router-link>-->
          </el-tabs>



          <el-tabs class="item" style="width: 7%; background: rgb(18, 18, 18)" >
<!--            <router-link to="/shopcart"><a href="#"><span>购物车</span></a></router-link>-->
            <router-link to="/wishcar"><a href="#"><span>心愿单</span></a></router-link>
          </el-tabs>



          <el-tabs class="item" style="width: 7%; background: rgb(18, 18, 18)">
            <!--            <router-link to="/shopcart"><a href="#"><span>购物车</span></a></router-link>-->
            <router-link to="/orderlist"><a href="#"><span>订单</span></a></router-link>
          </el-tabs>


        <div class="search">
          <el-input
            placeholder="搜索"
            v-model="input"
            clearable
            prefix-icon="el-icon-search"
            :change="change(input)"
            @keyup.enter.native="tosearch(search)"
          >
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { searchGoods } from "../../../network/category";
import {useStore} from 'vuex'
export default defineComponent({
  name: "home",
  setup() {
    const activeIndex = ref("1");
    const activeIndex2 = ref("1");
    const router = useRouter();
    const store = useStore();
    onMounted(()=>{
        store.dispatch('updateCart');
      })
    const search = ref([]);
    const change = (input) => {
      searchGoods(input).then((res) => {
        search.value = res;
      });
    };
    const tosearch = (id) => {
      // alert(search.value)
      router.push({ path: "/category", query: { id: JSON.stringify(id) } });
      setTimeout(() => {
        router.go(0);
      }, 200);
    };
    const tohome = () => {
      router.push({ path: "/home" });
    };
    const toabout = () => {
      router.push({ path: "/about" });
    };
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      activeIndex,
      activeIndex2,
      handleSelect,
      input: ref(""),
      tohome,
      toabout,
      change,
      tosearch,
      search,
    };
  },
  components: {},
  methods: {},
});
</script>
<style scoped lang='scss'>
.el-tabs__item:hover {
  color: orange;
  background-color: orange ;
}
.el-tabs__item.is-active {
  color: orange;
  background-color: orange;
}

.top {
  position: fixed;
  top: 6.3%;
  width: 100%;
  height: 11%;
  background: rgb(18, 18, 18);
  /* background:rgb(18,18,18); */
  opacity: 0.95;
  z-index: 10;
}
.top-item {
  position: relative;
  width: 74%;
  height: 45%;
  margin-top: 1.5%;
  margin-left: 13%;
  background: rgb(18, 18, 18);
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

.search {
  width: 17%;
}
.explore {
  float: left;
  height: 100%;
  background: rgb(18, 18, 18);
}
.browser {
  float: left;
  height: 100%;
}

.el-input {
  --el-input-background-color: #303133;
  --el-input-border: #303133;
  --el-input-focus-border: #fff;
  --el-input-icon-color: #fff;
  --el-input-placeholder-color: #fff;
  --el-input-font-color: #fff;
}
.search {
  height: 90%;
}
.search img {
  float: left;
}
</style>