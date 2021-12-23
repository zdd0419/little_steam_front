<template>
  <div class="category" style="display: flex; width:60%;margin:3% 20% 0 20%">
    <img :src="'http://127.0.0.1:8000'+ list.surface" alt="" />
    <p style="width:800px">{{ list.game_name }}</p>
    <div class="content">

        <el-radio-group v-model="radio" type="vertical" @change="changePrivate(list.order_id)">
          <el-radio :label="1" style="font-size: 30px">私密</el-radio>
          <el-radio :label="0" style="font-size: 30px">公开</el-radio>
        </el-radio-group>

    </div>
  </div>
</template>

<script>
import {getCart, deleteCartItem, getWish} from "../../network/cart";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import {ElLoading, ElMessage} from 'element-plus';
import {setPrivateinfo} from "../../network/user";
export default {
  props: {
    gameinfoList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "",
  setup(props) {
    const fullscreenLoading = ref(false)
    const router = useRouter();
    const state = reactive({
      list: {},
      result: [], //id数组
      radio:0,
    });

    const init = () => {
      state.list = props.gameinfoList
      state.radio = props.gameinfoList.set_private ? 1 : 0
    }
    onMounted(()=>{
        init()
      console.log('---gamehoust----')
      console.log(state.list)
    })

    return {
      ...toRefs(state),
      fullscreenLoading,

    };
  },
  components: {},
  methods: {
    changePrivate:function(order_id){
      setPrivateinfo(order_id, {
        'private': this.radio
      }).then(res =>{
        ElMessage({
          showClose: true,
          message: "修改游戏状态成功",
          type: "success",
        });
      })
    }
  },
}
</script>

<style scoped lang='scss'>
.container {
  float: left;
  //position: relative;
  height: 12vh;
  width:80%;
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