<template>
  <div class="pic" >
    <img :src="pics" alt="" />
<!--    <div class="logo">-->
<!--      <transition-->
<!--        name="logo"-->
<!--        enter-active-class="animate__animated animate__fadeInRight animate__delay-0.2s"-->
<!--      >-->
<!--&lt;!&ndash;        <img&ndash;&gt;-->
<!--&lt;!&ndash;          v-if="logo == false ? (logo = true) : (logo = false)"&ndash;&gt;-->
<!--&lt;!&ndash;          :src="pics[1]"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--        <img :src="pics[0]">-->
<!--      </transition>-->
<!--    </div>-->
    <div class="content" style="width: 850px">
      <span>{{ detail.game_name }}</span>
      <p>{{ detail.game_description }}</p>
      <h4>{{ detail.price != 0 ? "￥" + detail.price : "免费" }}</h4>
      <div class="shopping">
        <div class="buynow" @click="gotodetail(detail.game)" style="width: 100px">
          {{ detail.price != 0 ? "立即购买" : "免费游玩" }}
        </div>
        <div @click="handleAddWish(detail.game)" style="margin-left: 5px;line-height: 3em">
          <el-button type="success" icon="el-icon-shopping">加入心愿单</el-button>
        </div>
        <div @click="handleAddCart(detail.game)" style="margin-left: 5px;line-height: 3em">
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
import {addCart, addWish} from "../../../network/cart";
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
    // console.log(pics.value)
    onUpdated(() => {
      init();
    });
    const gotodetail = (id) =>{
      // var id = 2
      router.push({path:'/detail',query:{id}})

     }
     //原来的添加到购物车
     const handleAddCart = (id) => {
       addCart({ "user_id": window.localStorage.getItem("user_id"), "game_id":id }).then((res) => {
         if (res.status == "201" || res.status == "204") {
           //设置store中cartCount
           store.dispatch("updateCart");
         }
       });
      // ElMessage({
      //       showClose: true,
      //       message: "添加购物车成功！！",
      //       type: "success",
      //     })
    };
    //最新添加到心愿单
    const handleAddWish=(id)=>{
      ElMessage({
        showClose: true,
        message: "添加心愿单成功！！",
        type: "success",
      });
      addWish({ "user_id": window.localStorage.getItem("user_id"), "game_id":id }).then((res) => {
        if (res.status == "201" || res.status == "204") {
          //设置store中cartCount
          store.dispatch("updateWish");

        }
      });
    }
    return { logo, init ,gotodetail,handleAddCart,handleAddWish};
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
    width: 50%;
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
    top: 55%;
    width: 60%;
    span {
      font-size: 120%;
    }
    p {
      margin-top: 3%;
      margin-bottom: 3%;
      font-size: 100%;
      line-height: 160%;
    }
  }
}
</style>
