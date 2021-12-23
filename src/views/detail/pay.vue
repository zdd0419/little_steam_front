<template>
  <div>
    <detailtop :title="detail"></detailtop>
    <div id="detail">
      <div class="container"  >
        <div class="title">
          <h1 style="text-align: left; font-size: 40px; color: #fff">
            <!--            {{ detail.title }}-->
            请选择支付方式
          </h1>
        </div>
        <div class="content">
          <!--          {{detail.description}}-->

          <el-radio-group v-model="radio">
            <el-radio :label="3" style="font-size: 30px">微信支付</el-radio>
            <el-radio :label="6" style="font-size: 30px">支付宝支付</el-radio>
            <el-radio :label="9" style="font-size: 30px">我的钱包支付</el-radio>
          </el-radio-group>


          <br>

          <div>
            <br>
            <h2 style="text-align: left; font-size: 20px; color: #fff">
              <!--            {{ detail.title }}-->
              请选择使用的积分数值
            </h2>
          </div>

          <br>

          <div>
            <el-input-number v-model="usecredit"  :min="0" :max="credit_balance" label="积分余额"></el-input-number>
          </div>

          <br>


          <div>
            <el-tooltip class="item" effect="dark"  placement="right-end">
              <el-button type="confirm" round @click="confirmPay()">确认支付</el-button>
            </el-tooltip>

          </div>
        </div>


      </div>
    </div>
  </div>
</template>


<script>
import {buyGame, getDetail} from "../../network/detail";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";
import { addCart } from "../../network/cart";
import { useStore } from "vuex";
import detailtop from "./detailtop.vue";
import { ElMessage } from "element-plus";

export default {

  name: "",
  setup(){
    const data=reactive( {
        radio: 3,
        usecredit:'',
        credit_balance:''
    })
    // let id = ref();
    let bene_id = ref();
    //var radio = 3;
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      buydata:{
        user_id: window.localStorage.getItem("user_id"),
        beneficiary_id: "",
        credit: 0,
        method: "无",
        remark: ""
      },
      id: ''
    });

    let game = reactive({
      detail: {},

    });

    onMounted(() => {
      state.id = route.query.id;
      bene_id.value = route.query.bene_id;
      data.credit_balance = window.localStorage.getItem("credit_balance")
    });
    const confirmPay = () => {
      state.buydata.beneficiary_id = bene_id.value;
      state.buydata.credit = data.usecredit;
      if(data.radio == 3 )
        state.buydata.method = "微信"
      if(data.radio == 6 )
        state.buydata.method = "支付宝"
      if(data.radio == 9 )
        state.buydata.method = "钱包"
      // alert(state.buydata.beneficiary_id)
      buyGame(state.id, state.buydata ).then((res) => {

        if(res.error !="购买成功") {
          alert(res.error);
        } else{
          ElMessage({
            showClose: true,
            message: "支付成功！！",
            type: "success",
          });
          router.push({ path: "/home"});
        }
      });
      setTimeout(() => {
        router.go(0);
      }, 3000);
    };
    return{
      confirmPay,
      ...toRefs(state),
      ...toRefs(data)
    }
  },

  components: {
    detailtop,
  },
  methods: {},

}
</script>

<style scoped  lang="scss">
#detail {
  position: absolute;
  top: 17%;
  width: 100%;
  // height: 200%;
  z-index: -1;
  .container {
    width: 74%;
    height: auto;
    margin: 0 13% 0 13%;

    display: flex;
    flex-wrap: wrap;
    .title {
      width: 100%;
      height: auto;
      //flex: wrap;
      border-top: #babbbe 1px solid;
    }
    .shopping {
      width: 25%;
      height: auto;
      .buynow {
        background: #721e78;
        color: #fff;
        width: 100%;
        height: 4em;
        border-radius: 5px;
        text-align: center;
        line-height: 4em;
        font-size: 12px;
        margin-bottom: 3.5%;
      }
      .cart {
        border: 1px #909399 solid;
        color: #fff;
        width: 100%;
        height: 3em;
        display: flex;
        font-size: 12px;
        text-align: center;
        line-height: 3em;
        background-color: white;
        background-color: rgba(0, 0, 0, 0);
        transition: all 0.5s;
        border-radius: 3px;
        img {
          position: relative;
          top: 25%;
          width: 20px;
          height: 20px;
          margin-left: 30%;
          margin-right: 5%;
        }
      }
      .cart:hover {
        background-color: white;
        background-color: rgba(150, 150, 150, 0.5);
      }
    }
    .content {
      width: 75%;
      height: auto;

      // flex: wrap;
      text-align: left;
      .likegoods {
        width: 100%;
        margin-top: 8%;
        .item {
          width: 100%;
          height: 25vh;
          background: #262626;
          border-radius: 5px;
          margin-bottom: 2%;
          .item-content {
            width: 100%;
            height: 100%;

            .item-shop {
              float: left;
              width: 50%;
              height: 28%;
              // background: red;
              margin-top: 2%;

              .shopping2 {
                margin-left: 8%;
                margin-top: 2%;
                display: flex;
                h4 {
                  color: #fff;
                  font-size: 20px;
                  text-align: left;
                  line-height: 210%;
                  margin-right: 3%;
                  margin-left: -3%;
                }
                .buynow2 {
                  background: #fff;
                  color: #000;
                  width: 30%;
                  height: 4em;
                  border-radius: 5px;
                  text-align: center;
                  line-height: 4em;
                  font-size: 12px;
                }
                .cart2 {
                  width: 30%;
                  height: 4em;
                  display: flex;
                  font-size: 12px;
                  text-align: center;
                  line-height: 4em;
                  background-color: white;
                  background-color: rgba(0, 0, 0, 0);
                  transition: all 0.5s;
                  border-radius: 3px;
                  color: #fff;
                  img {
                    position: relative;
                    top: 25%;
                    width: 20px;
                    height: 20px;
                    margin-left: 10%;
                    margin-right: 5%;
                  }
                }
                .cart2:hover {
                  background-color: white;
                  background-color: rgba(150, 150, 150, 0.5);
                }
              }
            }
          }
        }
      }
      h2 {
        color: #fff;
        margin-bottom: 3%;
      }
      p {
        color: #c0c4cc;
        line-height: 200%;
        margin-bottom: 2%;
      }
      .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
}
</style>
