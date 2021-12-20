<template>
  <div>
    <div class="profile">
      <div class="filter">
        <div class="userinfo">
<el-avatar :src="user.avatar? user.avatar : 'https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%88%91%E7%9A%84.png'" style="width:auto;height:100%"></el-avatar>
<div class="content">
  <h4>{{user.name}}</h4>
  <p>在线</p>
</div>
        </div>
    <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="color:#fff">
    <el-tab-pane label="账号管理" name="first">
       <el-descriptions title="" direction="vertical" :column="4" border style="width:60%;margin:3% 20% 0 20%">
  <el-descriptions-item label="用户名">{{user.name}} <el-button   type="text" @click="open"><el-image
      style="width: 10%; height: 10%;float:left"
      src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E4%BF%AE%E6%94%B9.png"
      :fit="fit"></el-image>
      </el-button>
      </el-descriptions-item>
  <el-descriptions-item label="手机号">{{user.phone? user.phone : '未绑定手机号'}}<el-button   type="text" @click="phone"><el-image
      style="width: 10%; height: 10%;float:left"
      src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E4%BF%AE%E6%94%B9.png"
      :fit="fit"></el-image>
      </el-button></el-descriptions-item>
  <el-descriptions-item label="邮箱号" :span="2">{{user.email? user.email : '未绑定邮箱号'}}<el-button   type="text" @click="email"><el-image
      style="width: 10%; height: 10%;float:left"
      src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E4%BF%AE%E6%94%B9.png"
      :fit="fit"></el-image>
      </el-button></el-descriptions-item>
  
  <el-descriptions-item label="账号状态">
    <el-tag size="small" style="background:#67C23A;color:#fff;border:none">正常</el-tag>
  </el-descriptions-item>
  <el-descriptions-item label="生日">{{user.created_at}}</el-descriptions-item>
</el-descriptions>
  </el-tab-pane>
    <el-tab-pane label="修改头像" name="second">
      <el-avatar :src="user.avatar? user.avatar : 'https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%88%91%E7%9A%84.png'" style="width:200px;height:200px;margin-top:3%"></el-avatar>
       <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
>
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-tab-pane>
    
    <el-tab-pane label="我的游戏" name="third"><el-empty style="margin-top:5%" description="您还没有购买游戏~">
      <router-link to="/home"><p style="color:#fff">请前往商店购买哦 →</p></router-link>
      </el-empty></el-tab-pane>
    <el-tab-pane label="好友" name="fourth"><div style="margin-top:5%">
    <h4>甜蜜的孤独</h4>
    <el-divider content-position="center">SANE GAME</el-divider>
    <span style="color:#C0C4CC;font-size:15px">你可以独享游戏时光。但和朋友们一起玩也是一种人生乐趣。掠过你那些朋友的头像和他们在玩的游戏, </span>
    <br>
    <span style="color:#C0C4CC;font-size:15px">添加好友，和他们一起聊天, 或分享美妙游戏时光。 </span>
    
  </div><el-button style="background-color:white;
   background-color:rgba(0, 0, 0, 0) ;color:#fff;font-weight: 600;margin-top:3%">添加新的朋友</el-button></el-tab-pane>
  </el-tabs>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import { logout ,getUser,putUserinfo} from "../../network/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted,ref,reactive,toRefs,} from "vue";
 import { ElMessageBox } from 'element-plus';
  import { ElMessage } from 'element-plus';
export default {
name:'',
setup(){
  const activeName = ref('first');
  const router = useRouter();
    const store = useStore();
    
    
    const state = reactive({
      user:{}
    })
    onMounted(()=>{
      getUser().then(res=>{
        console.log(res.data);
        state.user = res.data;
      })
      
    })
    const open = () => {
      
        ElMessageBox.prompt('请输入要修改的昵称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\u4e00-\u9fa5]{3,13}$|^[\dA-Za-z_]{6,26}$/,
          inputErrorMessage: '昵称不能少于6位或大于26位'
        })
          .then(({ value }) => {
            ElMessage({
              type: 'success',
              message: `修改成功`,
            });
            putUserinfo(value).then(res=>{
              router.go(0)
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消输入',
            });
          });
      };
return{
activeName,...toRefs(state),
open
}
},
components:{

},
methods:{

}
}

</script>
<style>

.userinfo{
  position: absolute;
  left: 20%;
  top: 10%;
  width: 20%;
  height: 10%;
  display: flex;
  color: #fff;
  
  
}
.userinfo .content{
  text-align: left;
 margin-top: 8%;
  margin-left: 5%;
}
.userinfo .content h4{
  margin-bottom: 5%;
 
}

.filter{
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('https://sanegame.oss-cn-hangzhou.aliyuncs.com/bg-footer-1440-82722f12.jpg');
  /* background: #303133; */
  z-index: 0;
}
.container{
  z-index: 1;
  position: absolute;
  top:25%;
  width: 100%;
  margin: 0 auto;
 /* background: #303133; */
  height:auto;
  color: #C0C4CC;
}

.el-tabs__nav-wrap::after{
  height: 0.5px;
}
.el-tabs__active-bar{
  background-color:#fff;
}
.el-tabs__item{
  color: #C0C4CC;
}
.el-tabs__item.is-active{
  color: #fff;
}
.el-tabs__item.is-hover{
  color: #fff;
}
.el-tabs__nav-scroll{
  margin-left:20% ;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
     margin-top: 3%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #D351E1;

  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
   
  }
  .avatar {
    width: 28px;
    height: 28px;
    display: block;
  }
</style>