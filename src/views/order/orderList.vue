<template>
  <div>
    <div class="container" v-for="item in orderList" :key="item.game.game">
      <img :src="'http://127.0.0.1:8000' + item.game.surface" alt="" />
      <div class="content">
        <span><h2>{{ item.game.game_name }}</h2></span>
        <span><h6>买给用户：{{ item.beneficiary}}</h6></span>
        <span><h6>下单时间：{{ item.order_time}}</h6></span>
        <div class="price">
          <p>￥{{ item.actually_paid }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrder } from "../../network/cart";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import { ElLoading } from 'element-plus';
export default {
  props: {
    orderList: {
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

    return {
      godetail,
      ...toRefs(state),
      fullscreenLoading
    };
  },
  components: {},
  methods: {},
}
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
      margin-right: 5%;
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