<template>
  <div>
    <div class="free">
        <div class="top"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E7%A4%BC%E7%89%A9.png" style="height:80%;float:left"><p>免费游戏</p> <el-button style="float:right;background: #303133;" type="info">查看更多</el-button></div>
    <div class="container">
        <div class="item" v-for="item in freegoods" :key="item.id">
      <img :src="item.cover" alt="" @click="gotodetail(item.id)" />
      
      <p @click="gotodetail(item.id)">{{ item.title }}</p>
      <div class="price">
        <div class="cheapper"><p>-100%</p></div>
        <p style="color: grey; text-decoration: line-through">
          {{ "￥" + item.price }}
        </p>
        <p>免费</p>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
    props:{
      freegoods:{
           type:Array,
           default(){
               return [];
           }
      }
    },
  name: "",
  setup() {
    const router = useRouter()
    const gotodetail = (id) =>{
            router.push({path:'/detail',query:{id}})
            
     }
    return {gotodetail};
  },
  components: {},
  methods: {},
};
</script>
<style scoped lang="scss">
.free {
  position: absolute;
  left: 3%;
  width: 94%;
  height: 100%;
  
 .container{
display: flex;
     .item {
    width: 32%;
    height: auto;
    margin: 0 1% 0 1%;
    border-radius: 10px;
    

    p {
      color: #fff;
      line-height: 200%;
      text-align: left;
      margin: 0% 0 1% 0;
    }
    img {
      width: 100%;
      border-radius: 5px;
      transition: all 0.2s;
    }
    img:hover {
      filter: invert(15%);
      
    }
    .price {
      display: flex;
      p {
        margin: 5% 1.5% 0 1.5%;
        font-family: sans-serif;
        font-weight: 700;
      }
      .cheapper {
        position: relative;
        top: 23px;
        width: 15%;
        height: 30%;
        background: #721e78;
        border-radius: 5px;
        margin-right: 1.5%;
        p {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
 }
  .top{
    width: 100%;
    height: 10%;
    
    margin: 2.5% 0 1% 0;
    p{
        float: left;
        color: #fff;
        font-size: 18px;
        line-height: 2em;
        margin-left: 1%;
    }
}
}

</style>