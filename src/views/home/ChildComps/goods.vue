<template>
  <div>
    <div class="goods2">
      <div class="container">
          <h4>即将推出</h4>
        <div class="category" v-for="item in category1" :key="item.id" @click="gotodetail(item.id)">
          <img :src="item.cover" alt=""><div class="content"><p>{{ item.title }}</p><span>￥{{item.price}}</span></div>
        </div>
      </div>
      <div class="container">
          <h4>全新发行</h4>
        <div class="category" v-for="item in category2" :key="item.id" @click="gotodetail(item.id)">
         <img :src="item.cover" alt=""> <div class="content"><p>{{ item.title }}</p><span>￥{{item.price}}</span></div>
        </div>
      </div>
      <div class="container">
          <h4>最畅销</h4>
        <div class="category" v-for="item in category3" :key="item.id" @click="gotodetail(item.id)">
          <img :src="item.cover" alt=""><div class="content"><p>{{ item.title }}</p><span>￥{{item.price}}</span></div>
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