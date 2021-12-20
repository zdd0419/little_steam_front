<template>
  <div id="home">
    <top></top>
    <div class="container">
      <div class="item" style="background:#000"></div>
<slides :slides='slides'></slides>
<cheap></cheap>
<recommend></recommend>
<div class="free"><free :freegoods='freegoods'></free></div>
<div class="goods"><p>当下最新流行</p><goods :category1='goods.category1' :category2='goods.category2' :category3='goods.category3'></goods></div>
    </div>
  </div>
</template>

<script>
import top from './ChildComps/top.vue'
import cheap from './ChildComps/cheap.vue'
import recommend from './ChildComps/recommend.vue'
import free from './ChildComps/free.vue'
import goods from './ChildComps/goods.vue'
import { ref, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import slides from "./ChildComps/slides.vue"
import { getCategory, getCategoryGoods } from "../../network/category";
import {getHomeAllData,getHomeGoods} from '../../network/home'
export default {
  name: "home",
  setup() {
    
    const slides = ref([]);
    const freegoods = ref([])
     const goods = reactive({
   category1:[],
   category2:[],
   category3:[]
 });
    onMounted(()=>{
      getCategoryGoods("sales", 6).then((res) => {
        slides.value = res.goods.data;
      });
      getCategoryGoods("sales", 7).then((res) => {
        freegoods.value = res.goods.data;
      });
      getHomeGoods(4).then(res=>{
        goods.category1 = res.goods.data
        console.log(res.goods.data);
      })
      getHomeGoods(2).then(res=>{
        goods.category2 = res.goods.data
      })
      getHomeGoods(3).then(res=>{
        goods.category3 = res.goods.data
      })
    })

    return {slides,freegoods,goods};
  },
  components: {
    top,slides,cheap,recommend,free,goods},
  methods: {},
};
</script>
<style scoped>
.container{
  position: absolute;
 top: 14%;
  width: 74%;
  height: 420%;
  margin-top: 1.5% ;
  margin-left: 13%;
  
  z-index: -1;
  transition: all 0.5s;
  
}
.free{
  position: absolute;
  width: 100%;
  height: 12%;
  top: 48.5%;
  background: #303133;
  border-radius: 4px;
}
.goods{
  position: absolute;
  width: 100%;
  margin-top: 2%;
  top: 62%;
  border-radius: 4px;
}
.goods p{
  color: #fff;
  font-size: 18px;
  float: left;
}
</style>