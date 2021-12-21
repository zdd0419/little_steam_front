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
          <div class="search">
            <el-input
                placeholder="按好友名称搜索"
                v-model="input"
                clearable
                prefix-icon="el-icon-search"
                :change="change(input)"
                @keyup.enter.native="tosearch(search)"
            >
            </el-input>
          </div>
<!--          <h1>您的好友<h1>-->
          您的好友
<!--          <div class="firend">-->
<!--            <el-radio v-model="radio1" label="1" border>好友1</el-radio>-->
<!--            <el-radio v-model="radio1" label="2" border>好友2</el-radio>-->
<!--            <el-radio disabled v-model="radio" label="禁用">好友已有游戏</el-radio>-->
<!--          </div>-->
          <div class="goods">
            <p>选择好友</p>
            <goods :category1='goods.category1' :category2='goods.category2' :category3='goods.category3'></goods>
          </div>
        </div>

        </div>


      </div>
    </div>

</template>

<script>
import { getDetail } from "../../network/detail";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";

import { useStore } from "vuex";
import detailtop from "./detailtop.vue";
import { ElMessage } from "element-plus";
import {searchGoods} from "@/network/category";

export default {
  data () {
    return {
      radio1: '1',
      radio: '选中且禁用',

    };
    return {
      count: 10,//这里从数据库读取好友数量
      loading: false
    };

  },
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
    let id = ref();

    //ID为好友ID
    const tosearch = (id) => {
      router.push({ path: "/category", query: { id: JSON.stringify(id) } });
      setTimeout(() => {
        router.go(0);
      }, 200);
    };
    const change = (input) => {
      searchGoods(input).then((res) => {
        search.value = res.goods.data;
      });
    };
    return{
      tosearch,
      change,
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