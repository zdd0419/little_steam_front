<template>
  <div>
    <div class="container" v-for="item in cartlist" :key="item.id">
      <img :src="item.goods.data.cover_url" alt="" />
      <div class="content" @click="godetail(cartlist.id,cartlist.title)">

        <span
          ><h2>{{ item.goods.data.title }}</h2></span
        >
        <div class="price">
          <p>￥{{ item.goods.data.price }}</p>
        </div>
      </div>
      <el-button
        class="delete"
        type="primary"
        @click="
          deleteGood(item.id)
        "
      >
        <img
          src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E5%88%A0%20%E9%99%A4.png"
          alt=""
        />
      </el-button>
    </div>
  </div>
</template>

<script>
import { getCart, deleteCartItem } from "../../network/cart";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import { ElLoading } from 'element-plus';
export default {
  props: {
    cartlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "",
  setup() {
      const fullscreenLoading = ref(false)
    const router = useRouter();
    const godetail = (id, title) => {
      router.push({ path: "/detail", query: { id, title } });
    };
    const state = reactive({
      list: [],
      result: [], //id数组
      checked: true,
    });
    const init = () => {
      getCart("include=goods").then((res) => {
        state.list = res.data;
        state.result = res.data
          .filter((item) => item.is_checked == 1)
          .map((n) => n.id);
      });
    };
     
    const deleteGood = (id) => {
        
      deleteCartItem(id).then((res) => {
        init();
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        setTimeout(() => {
          loading.close();
        }, 300);
        setTimeout(() => {
          router.go(0)
        }, 200);
          
       
      });
      
    };
    return {
      deleteGood,
      godetail,
      ...toRefs(state),
      fullscreenLoading
    };
  },
  components: {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.container {
  position: relative;
  height: 12vh;
  display: flex;
  margin-bottom: 1%;
  background: #2a2a2a;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.4s;
  .container:hover {
    background: #585858;
  }
  img {
    width: auto;
    height: 100%;
  }
  .content {
    width: 90%;
    height: 30%;
    margin-top: 3%;

    display: flex;
    .price {
      margin-left: 2%;
      margin-top: 0.5%;
      p {
        color: #fff;
      }
    }
    span {
      width: 90%;
      color: #fff;
      line-height: 200%;

      text-align: left;
      margin-left: 2%;
      h2 {
        font-weight: 400;
      }
    }
  }
  .delete {
    height: 100%;
    width: 4.5%;
    background: #721e78;
    border: none;
    img {
      width: 80%;
      height: auto;
      margin-top: 50%;
    }
  }
}
</style>