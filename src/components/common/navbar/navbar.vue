<template>
  <div class="line">
    <el-menu
      style="border: none"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#303133"
      text-color="#C0C4CC"
      active-text-color="#D351E1"
    >
      <router-link to="/">
        <img
          src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/LOGO.png"
          style="
            width: 3%;
            height: auto;
            margin-top: 1%;
            margin: 1% 2% 0 1%;
            float: left;
          "
          alt=""
      /></router-link>
      <el-menu-item index="1" @click="gotohome">商城</el-menu-item>
      <el-menu-item index="4"><a href="#">新闻</a></el-menu-item>

      <el-menu-item index="3">虚幻引擎</el-menu-item>
      <el-submenu index="2">
        <template #title>关于 SANE GAME</template>
        <el-menu-item index="2-1">关于公司</el-menu-item>
        <el-menu-item index="2-2">SANE GAME</el-menu-item>
        <el-menu-item index="2-3">招纳贤士</el-menu-item>
      </el-submenu>
      <div class="right">
        <div class="login" v-show="noLogin">
          <el-submenu index="5">
            <template #title>
              <img
                src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/n7efKzPzaW.png"
                style="width: 15%; margin-right: 10%"
                alt=""
              />登录</template
            >
            <router-link to="/register"
              ><el-menu-item index="5-1">账号注册</el-menu-item></router-link
            >
            <router-link to="/login">
              <el-menu-item index="5-2">立即登录</el-menu-item></router-link
            >
          </el-submenu>
        </div>
        <div class="login" v-show="!noLogin">
          <el-submenu index="6">
            <template #title
              ><img
                src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%88%91%E7%9A%84.png"
                style="width: 15%; margin-right: 10%"
                alt=""
              />{{ user.name }}</template
            >

            <!-- <img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%88%91%E7%9A%84.png" style="width:15%;margin-right:10%" alt=""> -->


              <el-menu-item index="6-1" @click="gotoprofile">我的账号</el-menu-item>
            <el-menu-item @click="tologout" index="6-2">退出登录</el-menu-item>
          </el-submenu>
        </div>
        <el-button
          style="
            float: right;
            height: 60px;
            border-radius: 0%;
            background: #721e78;
            color: #fff;
            border: none;
          "
          >获取客户端</el-button
        >
      </div>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRefs } from "vue";
import { logout, getUser } from "../../../network/user";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const activeIndex = ref("1");
    const activeIndex2 = ref("1");
    const handleSelect = (key, keyPath) => {};
    let noLogin = ref(true);
    const isLogin = () => {
      if (window.localStorage.getItem("user_id")) {
        return (noLogin.value = false);
      }
    };
    const tologout = () => {
      var id = 1
      //router.push({path:'/detail'})
      router.push({ path: "/detail", query: { id } });
      logout().then((res) => {
        // if (res.status == "204") {
        if (1) {
          store.dispatch("updateCart");
          setTimeout(() => {
            router.go(0);
          }, 900);
          setTimeout(() => {
            router.push({ path: "/login" });
          }, 1000);
          setTimeout(() => {
            router.go(0);
          }, 1100);
          //清除token
          window.localStorage.setItem("token", "");
          store.commit("setIsLogin", false);

          ElMessage({
            showClose: true,
            message: "退出登录成功",
          });
        }
      });
    };
    const state = reactive({
      user: {},
    });
    const gotohome = () => {



            router.push({ path: "/home" });




    };
    const gotoprofile = () => {

        router.push({ path: "/profile" });


    };
    onMounted(() => {
      console.log(window.localStorage.getItem("token"));
      isLogin();
      console.log(noLogin);
      getUser().then((res) => {
        state.user = res.data;
      });
    });
    return {
      activeIndex,
      activeIndex2,
      handleSelect,
      isLogin,
      noLogin,
      tologout,
      ...toRefs(state),
      gotohome,
      gotoprofile
    };
  },
});
</script>
<style>
.right {
  display: flex;
  position: absolute;
  width: 15%;
  height: 100%;
  right: 0%;
}
.line {
  position: fixed;
  width: 100%;
  z-index: 2;
  top: 0;
}

.el-menu-item {
  text-align: center;
}
</style>
