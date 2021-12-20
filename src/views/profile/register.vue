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
<el-form
    ref="registerForm"
    :model="registerUser"
    :rules="registerRules"
    label-width="100px"
    class="registerForm sign-up-form"
  >
    <el-form-item label="用户名" prop="name">
      <el-input
        v-model="registerUser.name"
        placeholder="Enter UserName..."
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="registerUser.email"
        placeholder="Enter Email..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="registerUser.password"
        type="password"
        placeholder="Enter Password..."
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password_confirmation">
      <el-input
        v-model="registerUser.password_confirmation"
        type="password"
        placeholder="Enter Password..."
      ></el-input>
    </el-form-item>


    <el-form-item>
      <el-button
        @click="handleRegister('registerForm')"
        type="primary"
        class="submit-btn"
        style="background:#721e78;border:none;width: 250px"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
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
import { register } from "../../network/user";
import { ElMessage } from 'element-plus';
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    
    
    const registerUser = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const validatePass2 = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请再次输入密码"));
    } else if (value !== registerUser.value.password) {
        callback(new Error("两次输入密码不一致!"));
    } else {
        callback();
    }
};

    const registerRules = ref({
    name: [{
            message: "用户名不能为空...",
            required: true,
            trigger: "blur",
        },
        {
            min: 2,
            max: 30,
            message: "长度在2到30个字符",
            trigger: "blur",
        },
    ],
    email: [{
        type: "email",
        message: "Email is incorrect...",
        required: true,
        trigger: "blur",
    }, ],
    password: [{
            required: true,
            message: "Password could not be empty...",
            trigger: "blur",
        },
        {
            min: 6,
            max: 30,
            message: "Password's length has to be 6 to 30 characters...",
            trigger: "blur",
        },
    ],
    password_confirmation: [{
            required: true,
            message: "password_confirmation could not be empty...",
            trigger: "blur",
        },
        {
            min: 6,
            max: 30,
            message: "Password's length has to be 6 to 30 characters...",
            trigger: "blur",
        },
        { validator: validatePass2, trigger: "blur" },
    ]

});
    //触发登录方法
    const handleRegister = () => {
      //先验证 在提交
      register(registerUser.value).then((res) => {
          
        console.log(res);
        registerUser.name="";
        registerUser.email = "";
        registerUser.password = "";
        registerUser.password_confirmation = "";
        setTimeout(() => {
          router.push({path:'/login'})
        }, 500);
       setTimeout(() => {
          router.go(0)
        }, 600);
        
      });
      
          ElMessage({
            showClose: true,
            message: '注册成功！！',
            type: 'success'
          })

    };
    return { handleRegister, registerUser, registerRules };
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