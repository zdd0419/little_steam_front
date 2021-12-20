<template>
  <div id="goodslist">
      <div class="container" v-for="item in goodslist" :key="item.id">
          <img :src="item.cover" @click="gotodetail(item.id)">
          <h4>{{item.title}}</h4>
          <p>xsanegame.oss-cn</p>
          <h4>￥{{item.price}}</h4>
      </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { getDetail } from "../../network/detail";
export default {
name:'goodslist',
 props:{
      goodslist:{
           type:Array,
           default(){
               return [];
           }
      }
    },
setup(){
    const router = useRouter();
    const gotodetail = (id) =>{
            router.push({path:'/detail',query:{id}})
     }
return{
gotodetail
}
},
components:{

},
methods:{

}
}

</script>
<style scoped lang='scss'>
#goodslist{
    width: 100%;
    display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    .container{
    position: relative;
    width: 19%;
    height: 44vh;
    overflow: hidden;
    margin-right: 1%;
    border-radius: 5px;
    margin-bottom: 2%;
    display: flex;
    flex-direction:column;
    text-align: left;
    transition: all 0.5s;
    img{
        height: 75%;
        width: auto;
        transition: all 0.4s;
    }
    img:hover{
       filter: invert(10%);
    }
    h4{
        color: #fff;
        margin-top: 6%;
    }
    p{
        color: #fff;
        font-size: 12px;
    }
}
}
</style>