<template>
  <div>
    <top></top>
    <div class="container">
      <orderList :orderList='list'></orderList>
    </div>
  </div>
</template>

<script>
import top from "../home/ChildComps/top.vue";
import orderList from './orderList.vue'
import {onMounted, reactive, toRefs} from "vue";
import {getCart} from "../../network/cart";
import {useRouter} from "vue-router";
import {
  getOrder,

} from "../../network/cart";
export default {
  name:"myorder",
  setup(){
    const router = useRouter();
    const state = reactive({
      list: [],
      result:[], //id数组
    });
    const init = () => {
      getOrder(window.localStorage.getItem("user_id")).then((res) => {
        state.list = res;
        console.log(state.list);
        // state.result = res.data.filter(item => item.is_checked == 1).map(n=>n.id);//筛掉下架游戏
      });
    };
    onMounted(() => {
      init();

    });

    return{
      ...toRefs(state),
    }

  },

  components:{
    top,orderList
  },

}
</script>

<style scoped lang='scss'>
.container{
  position: relative;
  top: 25vh;
  width: 74%;
  margin: 0 13% 0 13%;
}
</style>