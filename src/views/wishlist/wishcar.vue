<template>
  <div>
    <top></top>
    <div class="container">
      <wishlist :wishlist='list'></wishlist>
    </div>
  </div>
</template>

<script>
import top from "../home/ChildComps/top.vue";
import wishlist from './wishlist.vue'
import {
  getCart,
  modifyCart,
  checkedCart,
  deleteCartItem,
} from "../../network/cart";
import { ref, onMounted, reactive, toRefs,computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "wishcar",
  setup(){
    const router = useRouter();
    const godetail = (id,title) =>{
      router.push({path:'/detail',query:{id,title}});
    }
    const state = reactive({
      list: [],
      result:[], //id数组
      checked: true
    });
    const allCheck = ()=>{
      if(state.checked) {
        state.result = state.list.map(item=>item.id)
        state.checked = true
      }else{
        state.result=[];
        state.checked = false
      }
    }
    //初始化购物车数据
    const init = () => {
      getCart("include=goods").then((res) => {
        state.list = res.data;
        console.log(state.list);
        state.result = res.data.filter(item => item.is_checked == 1).map(n=>n.id);
      });
    };
    const groupChange = (result) =>{
      if(result.length == state.list.length){
        state.checked = true;
      }else{
        state.checked = false
      }


      state.result = result
      //改变数据表中选中的状态
      // checkedCart({cart_ids:result})
    }

    onMounted(() => {
      init();

    });
    //通过计算属性 计算总价
    const total = computed(()=>{
      let sum = 0;

      state.list.filter(item=>state.result.includes(item.id))
          .forEach(item=>{
            sum += item.goods.data.price*100;
          })

      return sum;
    })


    const goTo = () => {
      router.push({ path: "/home" });
    };
    const deleteGood = (id)=>{
      deleteCartItem(id).then(res=>{
        init()
      })
    }
    //创建订单
    const onSubmit=()=>{
      if(state.result.length == 0){
        Toast.fail('请选择商品进行结算')
      }else{
        router.push({path:'/createorder'})
      }
    }
    return{
      ...toRefs(state),
      goTo,
      groupChange,
      allCheck,
      deleteGood,
      total,
      onSubmit,
      godetail
    }
  },
  components:{
    top,wishlist
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