<template>
  <div>
    <div class="goods2">
      <div class="container">
          <h4>冒险</h4>
        <div class="category" v-for="item in category1" :key="item.game" @click="gotodetail(item.game)">
          <img :src="'http://127.0.0.1:8000' + item.surface" alt="">
          <div class="content"><p>{{ item.game_name }}</p>
            <span style="background: green">{{item.discount != 100 ? "-" + (100-item.discount) + "%": ""}}</span>
            <span>￥{{item.price*item.discount*0.01}}</span>
          </div>
        </div>
      </div>
      <div class="container">
          <h4>动作</h4>
        <div class="category" v-for="item in category2" :key="item.game" @click="gotodetail(item.game)">
         <img :src="'http://127.0.0.1:8000' + item.surface" alt=""> <div class="content"><p>{{ item.game_name }}</p><span>￥{{item.price}}</span></div>
        </div>
      </div>
      <div class="container">
          <h4>休闲</h4>
        <div class="category" v-for="item in category3" :key="item.game" @click="gotodetail(item.game)">
          <img :src="'http://127.0.0.1:8000' + item.surface" alt=""><div class="content"><p>{{ item.game_name }}</p><span>￥{{item.price}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, toRefs } from "vue";
import {useRouter} from 'vue-router'
export default {
  props: {
    category1: {
      type: Array,
      default() {
        return [];
      },
    },
    category2: {
      type: Array,
      default() {
        return [];
      },
    },
    category3: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "",
  setup() {
   const router = useRouter()
   const gotodetail = (id) =>{
            router.push({path:'/detail',query:{id}})
            
     }
    return {
     gotodetail
    };
  },
  components: {},
  methods: {},
};
</script>
<style scoped  lang="scss">
.goods2 {
  position: absolute;
  top: 7%;
  width: 100%;
  display: flex;
  margin-top: 4%;
  .container {
    position: relative;
    background: #2a2a2a;
    margin: 0 0.5% 0 0.5%;
    width: 32.3333%;
  
    text-align: left;
    border-radius: 3px;
    h4 {
      color: #fff;
      font-size: 22px;
      margin: 4% 0 2% 3%;
    }
    .category {
      width: 100%;
      display: flex;
      transition: all 0.2s;
      
      img{
        width: 15%;
        height: auto;

        margin: 2% 0 2% 4%;
        border-radius: 6px ;

      }

      .content{
        height: 50%;
       
        margin: 7% 0 0 2%;
        p {
        color: #fff;
        margin-bottom: 5%;
      }
      span{
        color: #fff;
      }
      
      }
      
    }
    .category:hover{
        background: #585858;
      }
  }
}
</style>