<template>
  <div class="container" v-for="item in commentList" :key="item.user_id">
    <img :src="'http://127.0.0.1:8000'+ item.user_icon" alt="" />
    <div class="content">
      <span class="username"><h2>{{ item.user_name }}</h2></span>
      <span class="coment_content"><h4>{{ item.comment_content }}</h4></span>
      <div class="price">
        <p>游戏时长:{{ item.playtime }} h</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getCart, deleteCartItem, getWish} from "../../network/cart";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import { ElLoading } from 'element-plus';
export default {
  props: {
    commentList: {
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
    const state = reactive({
      list: [],
      result: [], //id数组
    });


    return {

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
  float: left;
  //position: relative;
  height: 12vh;
  width:100%;
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
      margin-right: 0;
      margin-top: 0;
      p {
        color: #fff;
      }
    }
    .username{
      width: 10%;
      color: #fff;
      line-height: 200%;
      text-align: left;
      margin-left: 2%;
      h2 {
        font-weight: 400;
      }
    }
    .coment_content{
      width: 40%;
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