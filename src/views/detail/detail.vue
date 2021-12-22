<template>
  <div>
    <detailtop :title="detail"></detailtop>
    <div id="detail">
      <div class="container">
        <div class="title">
          <h1 style="text-align: left; font-size: 40px; color: #fff">
            {{ detail.game_name }}
          </h1>
        </div>
        <div class="content">
          <el-carousel
              indicator-position="outside"
              height="590px"
              trigger="click"
          >
            <el-carousel-item v-for="item in detail.game_images" :key="item">
              <img :src="item.pic_url" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>

<!--          <h2>{{ detail.game_name }}</h2>-->
          <h3 style="color: #fff; margin-top: 5.5%;width:200px">{{ detail.game_name }}</h3>
          <br />
          <h2>{{ detail.game_description }}</h2>
          <p>{{ detail.OS }}</p>
<!--          <img-->
<!--              :src="pics[0]"-->
<!--              alt=""-->
<!--              style="width: 100%; height: auto; border-radius: 5px"-->
<!--          />-->
<!--          <img-->
<!--              :src="pics[1]"-->
<!--              alt=""-->
<!--              style="-->
<!--              width: 49%;-->
<!--              height: auto;-->
<!--              float: left;-->
<!--              border-radius: 5px;-->
<!--              margin: 2% 0 2% 0;-->
<!--            "-->
<!--          />-->
<!--          <img-->
<!--              :src="pics[2]"-->
<!--              alt=""-->
<!--              style="-->
<!--              width: 49%;-->
<!--              height: auto;-->
<!--              float: right;-->
<!--              border-radius: 5px;-->
<!--              margin: 2% 0 2% 0;-->
<!--            "-->
<!--          />-->
<!--          <img-->
<!--              :src="pics[3]"-->
<!--              alt=""-->
<!--              style="width: 100%; height: auto; border-radius: 5px"-->
<!--          />-->


<!--          <div class="likegoods">-->
<!--            <h2>相似游戏</h2>-->
<!--            <div class="item" v-for="item in like_goods" :key="item.id">-->
<!--              <div class="item-content">-->
<!--                <img-->
<!--                    :src="item.cover"-->
<!--                    style="height: 100%; float: left"-->
<!--                    alt=""-->
<!--                />-->
<!--                <div style="padding-top: 3%">-->
<!--                  <div-->
<!--                      style="-->
<!--                      float: left;-->
<!--                      color: #fff;-->
<!--                      background: #303133;-->
<!--                      font-size: 12px;-->
<!--                      width: 7%;-->
<!--                      border-radius: 5px;-->
<!--                      text-align: center;-->
<!--                      margin: 0% 3% 0 3%;-->
<!--                    "-->
<!--                  >-->
<!--                    <p style="margin: 5% 0 5% 0">lalaal</p>-->
<!--                  </div>-->
<!--                  <p>{{ item.title }}</p>-->
<!--                </div>-->
<!--                <div class="item-shop">-->
<!--                  <div class="shopping2">-->
<!--                    <h4>￥{{ item.price }}</h4>-->
<!--                    <div class="buynow2" @click="gotodetail(item.id)">-->
<!--                      {{ item.price != 0 ? "立即购买" : "免费游玩" }}-->
<!--                    </div>-->
<!--                    <div class="cart2" @click="handleAddCart(item.id)">-->
<!--                      <img-->
<!--                          src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%B7%BB%E5%8A%A0.png"-->
<!--                      />添至愿望清单-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <h2>游戏测评</h2>
          <div class="commentPosition">
            <commentList :commentList='list'></commentList>
          </div>
        </div>

        <el-affix :offset="160" class="shopping">
          <div style="
              width: 90%;
              float: right;
              display: flex;
              flex-direction: column;
            ">
            <img :src="pics[4] ? pics[4] : pics[0]" style="
                width: 60%;
                height: auto;
                border-radius: 10px;
                margin: 15% 20% 15% 20%;
              "/>
<!--            <div style="-->
<!--                float: left;-->
<!--                color: #fff;-->
<!--                background: #3c3c3c;-->
<!--                font-size: 12px;-->
<!--                width: 23%;-->
<!--                border-radius: 5px;" >-->
<!--              <div class="container" v-for="item in tags">-->
<!--                <p  >{{ item.category}}({{item.category_hot}})</p>-->
<!--              </div>-->
<!--            </div>-->
            <h1 style="color: #fff; text-align: left; margin: 5% 0 5% 0">￥{{ detail.price }}</h1>
            <div class="buynow" @click="gotoBuy(id)">
              {{ detail.price != 0 ? "立即购买" : "免费游玩" }}
            </div>
            <div class="cart" @click="handleAddWish(detail.game)">
              <img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%B7%BB%E5%8A%A0.png"/>添至愿望清单
            </div>
            <div class="container" style="margin-left: 0; margin-right: 0;width: 100%">
              <div v-for="item in tags">
                <span style="
                float: left;
                color: #fff;
                background: #3c3c3c;
                font-size: 16px;
                width: auto;
                border-radius: 5px;
                padding:5px;
                margin:5px">{{ item.category}}</span>
              </div>
            </div>
            <div class="container">

            </div>
        </div></el-affix>
        <div>
<!--          <commentList :commentList='list'></commentList>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDetail, getTags, getComments} from "../../network/detail";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";
import {addCart, addWish} from "../../network/cart";
import { useStore } from "vuex";
import detailtop from "./detailtop.vue";
import commentList from "./commentList.vue";
import { ElMessage } from "element-plus";

export default {
  name: "",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let id = ref();
    // const game = reactive({
    //   thegame: {}
    // });
    let game = reactive({
      detail: {},
      tags: [],
      pics: [],
    });
    const state = reactive({
      list: [],
      result:[], //id数组

    });
    const initComments = (id) => {
      getComments(id).then((res) => {
        state.list = res;
        console.log('--comments---');
        console.log(res);
        // state.result = res.data.filter(item => item.is_checked == 1).map(n=>n.id);
      });
    };

    const gotodetail = (id) => {
      router.push({ path: "/detail", query: { id } });
      setTimeout(() => {
        router.go(0);
      }, 200);
    };
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
    const gotoBuy = (id) => {
      router.push({ path: "/buy", query: { id } });
    };
    onMounted(() => {
      id.value = route.query.id;
      //id.value = 1;
      // alert(id.value);
      getDetail(id.value).then((res) => {
        game.detail = res
        // console.log("---game_name---")
      });

      getTags(id.value).then((res) => {
        game.tags = res
        // console.log("---game_name---")
        // alert(game.tags[0].category)
        // console.log(game.game_images[0].pic_url);
        // alert(game.game_name);
      });
      initComments(id.value)
    });
    return {
      ...toRefs(game),
      ...toRefs(state),
      id,
      gotodetail,
      handleAddCart,
      handleAddWish,
      gotoBuy
    };
  },
  components: {
    detailtop,
    commentList,
  },
  methods: {},
};
</script>
<style scoped  lang="scss">

#detail {
  position: absolute;
  top: 17%;
  width: 100%;
  // height: 200%;
  z-index: -1;
  .container {
    width: 80%;
    height: auto;
    margin: 0 13% 0 13%;

    display: flex;
    flex-wrap: wrap;

    .commentPosition{
      position: relative;
      //margin-left: 5px;
      //top: 25vh;
      width: 100%;
      margin: 0;

    }
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
