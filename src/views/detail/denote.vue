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

          <div>
        <br>

            <div>
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
          <el-form ref="form" :model="sizeForm" label-width="100px" size="medium">

            <el-form-item label="选择好友" size="medium">
              <el-select v-model="sizeForm.denote" placeholder="请选择好友">
                <el-option v-for="item in friendList" :label="item.nickname" :value="item.friend"></el-option>
<!--                <el-option label="区域二" value="beijing"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="定时赠送">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="赠语">
              <el-input v-model="sizeForm.remark"></el-input>
            </el-form-item>

            <el-form-item size="large">
              <el-button type="primary" @click="confirmPay()">立即赠送</el-button>
              <el-button>返回</el-button>
            </el-form-item>
          </el-form>
        </div>




          <el-dialog
              title="提示"
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
            <span>确认赠送吗</span>
            <span slot="footer" class="dialog-footer">
                      <el-button @click="centerDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="centerDialogVisible = false;">确 定</el-button>
                    </span>
          </el-dialog>
<!--        <div class="content">-->
<!--          &lt;!&ndash;          {{detail.description}}&ndash;&gt;-->
<!--          <div class="search">-->
<!--            <el-input-->
<!--                placeholder="按好友名称搜索"-->
<!--                v-model="input"-->
<!--                clearable-->
<!--                prefix-icon="el-icon-search"-->
<!--                :change="change(input)"-->
<!--                @keyup.enter.native="tosearch(search)"-->
<!--            >-->
<!--            </el-input>-->
<!--          </div>-->
<!--&lt;!&ndash;          <h1>您的好友<h1>&ndash;&gt;-->
<!--          您的好友-->
<!--&lt;!&ndash;          <div class="firend">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-radio v-model="radio1" label="1" border>好友1</el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-radio v-model="radio1" label="2" border>好友2</el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-radio disabled v-model="radio" label="禁用">好友已有游戏</el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--          <div class="goods">-->
<!--            <p>选择好友</p>-->
<!--&lt;!&ndash;            <goods :category1='goods.category1' :category2='goods.category2' :category3='goods.category3'></goods>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->

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

import { useStore } from "vuex";
import detailtop from "./detailtop.vue";
import { ElMessage } from "element-plus";
import {searchGoods} from "@/network/category";
import {friendID} from "@/network/user";

export default {

  computed: {
    noMore () {
      return this.count >= 20//这里从数据库读取好友数量
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  },
  name: "denote",
  setup(){
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    // let id = ref();
    const data = reactive({
      radio1: '1',
      radio: 3,
      count: 10,//这里从数据库读取好友数量
      loading: false,
      name:"",
      game:1,
      id:'',
      usecredit: '',
      credit_balance:'',

      sizeForm:{
        denote:"",
        date1: '',
        date2: '',
        remark:"大傻子zdd",
      }
    });

    const state = reactive({
      buydata:{
        user_id: window.localStorage.getItem("user_id"),
        beneficiary_id: "",
        credit: 0,
        method: "无",
        remark: ""
      }
    });

    const state2 = reactive({
      friendList :[],
    })

    // const gotoPay2 = (id2, bene_id) => {
    //   alert("gotopay2"+id2.value)
    //   router.push({ path: "/pay",query: {id2, bene_id} });
    //
    //   setTimeout(() => {
    //     router.go(0);
    //   }, 200);
    // };

    // function gotoPay2(id2, bene_id){
    //   alert("gotopay2"+id2.value)
    //   router.push({ path: "/pay",query: {id2, bene_id} });
    //
    //   setTimeout(() => {
    //     router.go(0);
    //   }, 1000);
    // };

    onMounted(() => {
      data.id = route.query.id
      data.credit_balance = window.localStorage.getItem("credit_balance")
      // alert("赠送页面" + route.query.id)
      friendID(window.localStorage.getItem("user_id")).then(res => {
        state2.friendList = res
      })
    });

    const confirmPay = () => {
      state.buydata.beneficiary_id = data.sizeForm.denote;
      state.buydata.remark = data.sizeForm.remark;
      state.buydata.credit = data.usecredit;
      if(data.radio == 3 )
        state.buydata.method = "微信"
      if(data.radio == 6 )
        state.buydata.method = "支付宝"
      if(data.radio == 9 )
        state.buydata.method = "钱包"

      buyGame(data.id, state.buydata ).then((res) => {

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
    //ID为好友ID
    // const tosearch = (id) => {
    //   router.push({ path: "/category", query: { id: JSON.stringify(id) } });
    //   setTimeout(() => {
    //     router.go(0);
    //   }, 200);
    // };
    // const change = (input) => {
    //   searchGoods(input).then((res) => {
    //     search.value = res.goods.data;
    //   });
    // };
    return{
      // tosearch,
      // change,
      ...toRefs(data),
      ...toRefs(state2),
      confirmPay
    }
  },
  components: {
    detailtop,
  },

}
</script>

<!--<style scoped>-->
<!--.content {-->
<!--  width: 75%;-->
<!--  height: auto;-->
<!--  text-align: left;-->
<!--}-->
<!--.firend{-->
<!--  width: 55%;-->
<!--  height: auto;-->
<!--  background: #262626;-->
<!--  border-radius: 5px;-->
<!--}-->
<!--.container {-->
<!--  width: 74%;-->
<!--  height: auto;-->
<!--  margin: 0 13% 0 13%;-->

<!--  display: flex;-->
<!--  flex-wrap: wrap;}-->
<!--.title {-->
<!--  width: 100%;-->
<!--  height: auto;-->
<!--//flex: wrap;-->
<!--  border-top: #babbbe 1px solid;-->
<!--}-->
<!--#detail {-->
<!--  position: absolute;-->
<!--  top: 17%;-->
<!--  width: 100%;-->
<!-- height: 200%;-->
<!--  z-index: -1;}-->
<!--</style>-->
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
  .goods{
    position: absolute;
    width: 100%;
    margin-top: 2%;
    top: 62%;
    border-radius: 4px;
  }
  .goods p{
    color: #fff;
    font-size: 18px;
    float: left;
  }
}
</style>
