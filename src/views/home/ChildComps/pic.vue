<template>
  <div class="pic" >
    <img :src="pics[0]" alt="" />
    <div class="logo">
      <transition
        name="logo"
        enter-active-class="animate__animated animate__fadeInRight animate__delay-0.2s"
      >
        <img
          v-if="logo == false ? (logo = true) : (logo = false)"
          :src="pics[4]"
        />
      </transition>
    </div>
    <div class="content" style="width: 500px">
      <span>{{ detail.title }}</span>
      <p>{{ detail.description }}</p>
      <h4>{{ detail.price != 0 ? "￥" + detail.price : "免费" }}</h4>
      <div class="shopping">
        <div class="buynow" @click="gotodetail(detail.id)" style="width: 100px">
          {{ detail.price != 0 ? "立即购买" : "免费游玩" }}
        </div>
        <div class="cart" @click="handleAddCart(detail.id)" style="width: 150px">
          <img
            src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%B7%BB%E5%8A%A0.png"
          /><p  style="width: 100px" >加入心愿单</p>
        </div>
        <div class="cart" @click="handleAddCart(detail.id)">
          <el-button type="primary" icon="el-icon-shopping">加入购物车</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUpdated, onBeforeUpdate } from "vue";
import {useRouter} from 'vue-router'
import { ElMessage } from "element-plus";
import { addCart } from "../../../network/cart";
import { useStore } from "vuex";
export default {
  name: "",
  props: {
    pics: {
      type: Array,
      default() {
        return [];
      },
    },
    detail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const router = useRouter()
    const logo = ref(false);
     const store = useStore();
    const init = () => {
      logo.value = !logo.value;
    };
    onUpdated(() => {
      init();
    });
    const gotodetail = (id) =>{
            router.push({path:'/detail',query:{id}})
            
     }
     //原来的添加到购物车
     const handleAddCart = (id) => {
      ElMessage({
            showClose: true,
            message: "添加购物车成功！！",
            type: "success",
          });
      addCart({ goods_id: id, num: 1 }).then((res) => {
        if (res.status == "200" || res.status == "204") {
          //设置store中cartCount
          store.dispatch("updateCart");
          
        }
      });
    };
    //最新添加到心愿单
    const handleAddWish=(id)=>{
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
    }
    return { logo, init ,gotodetail,handleAddCart};
  },
  components: {},
  methods: {},
};
</script>
<style scoped lang="scss">
.pic {
  position: absolute;
  top: 0%;
  left: 20%;
  float: right;
  width: 80%;
  height: 16.5%;
  background: #303133;
  color: #fff;
  border-radius: 1em;
  overflow: hidden;
  text-align: left;
  .logo {
    position: absolute;
    overflow: hidden;
    top: 30%;
    left: 5%;
    img {
      width: 60%;
      filter: brightness(1);
    }
  }
  .shopping {
    position: absolute;
    width: 80%;
    top: 170px;
    display: flex;
    .buynow {
      background: #fff;
      color: #000;
      width: 50%;
      height: 4em;
      border-radius: 5px;
      text-align: center;
      line-height: 4em;
      font-size: 12px;
    }
    .cart {
      width: 50%;
      height: 4em;
      display: flex;
      font-size: 12px;
      text-align: center;
      line-height: 4em;
      background-color: white;
      background-color: rgba(0, 0, 0, 0);
      transition: all 0.5s;
      border-radius: 3px;
      img {
        position: relative;
        top: 25%;
        width: 20px;
        height: 20px;
        margin-left: 10%;
        margin-right: 5%;
      }
    }
    .cart:hover {
      background-color: white;
      background-color: rgba(150, 150, 150, 0.5);
    }
  }

  img {
    width: 105%;
    filter: brightness(0.75);
    transition: all 0.5s;
  }
  .content {
    margin-left: 5%;
    position: absolute;
    top: 60%;
    width: 30%;
    span {
      font-size: 60%;
    }
    p {
      margin-top: 6%;
      margin-bottom: 6%;
      font-size: 120%;
      line-height: 160%;
    }
  }
}
</style>