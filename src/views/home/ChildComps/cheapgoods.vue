<template>
  <div class="container">
    <div class="item" v-for="item in cheapgoods" :key="item.id">
      <img :src="item.cover" alt=""  @click="gotodetail(item.id)" />
      <div class="gocart">
          <el-tooltip content="添加至心愿单" placement="top">
        <img
          src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%B7%BB%E5%8A%A0.png"
          alt="添加至心愿单"
          @click="handleAddCart(item.id)"
        />
        </el-tooltip>
      </div>
      <p>{{ item.title }}</p>
      <div class="price">
        <div class="cheapper"><p>-33%</p></div>
        <p style="color: grey; text-decoration: line-through">
          {{ "￥" + item.price * 1.5 }}
        </p>
        <p>{{ "￥" + item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import { ElMessage } from "element-plus";
import { addCart } from "../../../network/cart";
import { useStore } from "vuex";
export default {
  props: {
    cheapgoods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const router = useRouter()
     const store = useStore();
    const gotodetail = (id) =>{
            router.push({path:'/detail',query:{id}})
            
     }
     const handleAddCart = (id) => {
      ElMessage({
            showClose: true,
            message: "添加心愿单成功！！",
            type: "success",
          });
      addCart({ goods_id: id, num: 1 }).then((res) => {
        if (res.status == "200" || res.status == "204") {
          //设置store中cartCount
          store.dispatch("updateCart");
          
        }
      });
    };
    return {gotodetail,handleAddCart};
  },
  components: {},
  methods: {},
};
</script>
<style scoped lang="scss">
.container {
  display: flex;

  .item {
    width: 32%;
    height: auto;
    margin: 0 1% 0 1%;
    border-radius: 10px;
    .gocart {
      img {
        position: relative;
        width: 5%;
        top: -242px;
        left: 200px;
      }
      img:hover{
          filter:contrast(0%);
          
      }
    }

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
      filter: invert(10%);
      
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
</style>