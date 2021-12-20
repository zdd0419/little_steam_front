<template>
  <div class="container">
    <div class="box">
      <div class="content">
        <p style="text-align: center; position: relative; top: -20px">
          <img
            src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/LOGO.png"
            style="position:relative;width: 67px; height: 33px;top:-50px"
          />
        </p>
        <p>使用SANEGAME账户</p>

        <el-form
          ref="loginForm"
          :model="loginUser"
          :rules="rules"
          label-width="100px"
        >
        <div class="input">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginUser.email"
              placeholder="Enter Email..."
              
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginUser.password"
              type="password"
              placeholder="Enter Password..."
              show-password="true"

            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              @click="handleLogin('loginForm')"
              type="primary"
              class="submit-btn"
              style="background:#721e78;border:none;width: 250px"
              size="medium"
              >登录</el-button
            >
          </el-form-item>
          </div>
          <div class="tiparea">
            <p>忘记密码？ <a>立即找回</a></p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { login } from "../../network/user";
import { ElMessage } from 'element-plus';
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    
    
    const loginUser = ref({
      email: "",
      password: "",
    });
    const rules = ref({
      email: [
        {
          type: "email",
          message: "邮箱格式不正确",
          required: true,
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        {
          min: 6,
          max: 30,
          message: "密码不能小于6位或者大于30位",
          trigger: "blur",
        },
      ],
    });
    //触发登录方法
    const handleLogin = () => {
      //先验证 在提交
      login(loginUser.value).then((res) => {
          console.log(res.access_token);
          
        //将token保存本地
        window.localStorage.setItem("token", res.access_token);
        //在vuex islogin
store.commit("setIsLogin", true);
           store.dispatch("updateCart");
        loginUser.email = "";
        loginUser.password = "";
       
        setTimeout(() => {
          router.push({path:'/'})
        }, 100);
       setTimeout(() => {
          router.go(0)
        }, 1100);
         ElMessage({
            showClose: true,
            message: '登录成功！！',
            type: 'success'
          })
        
      });
      
         

    };
    return { handleLogin, loginUser, rules };
  },
};
</script>
<style type="text/css">
.input{
    position: relative;
    /* background: red; */
    left: -13%;
    width: 100%;
}
.container {
  height: 100%;
}

.box {
  position: relative;
  width: 430px;
  height: 660px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 8%;
  margin-bottom: 6.45%;
  background: rgb(18, 18, 18);
}

.box::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -1;
}

.box::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -2;
  filter: blur(40px);
}

.box:before,
.box:after {
  background: linear-gradient(235deg, #d351e1, #060c21, #3d1963);
}

.content {
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}

.content p {
  font-size: 10px;
  margin-bottom: 20px;
}

.logo {
  position: relative;
  width: 85px;
  height: 50px;
}
</style>