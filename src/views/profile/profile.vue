<template>

  <div>
    <div class="profile">
      <div class="filter">
        <div class="userinfo">
<el-avatar :src="user.user_icon? user.user_icon : 'https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%88%91%E7%9A%84.png'" style="width:auto;height:100%"></el-avatar>
<div class="content">
  <h4>{{user.user_name}}</h4>
  <p>在线</p>

</div>
        </div>
    <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="color:#fff">
    <el-tab-pane label="账号管理" name="first">
       <el-descriptions title="" direction="vertical" :column="4" border style="width:60%;margin:3% 20% 0 20%">
  <el-descriptions-item label="用户名">{{user.user_name}} <el-button   type="text" @click="open"><el-image
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
  <el-descriptions-item label="等级（积分）">{{user.user_level}}({{user.user_credit}})</el-descriptions-item>

</el-descriptions>
  </el-tab-pane>
<!--    <el-tab-pane label="修改头像" name="second">-->
<!--      <el-avatar :src="user.user_icon? user.user_icon : 'https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E6%88%91%E7%9A%84.png'" style="width:200px;height:200px;margin-top:3%"></el-avatar>-->
<!--       <el-upload-->
<!--  class="avatar-uploader"-->
<!--  action="https://jsonplaceholder.typicode.com/posts/"-->
<!--  :show-file-list="false"-->
<!--  :on-success="handleAvatarSuccess"-->
<!--  :before-upload="beforeAvatarUpload"-->
<!--&gt;-->
<!--  <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--  <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--</el-upload>-->
<!--    </el-tab-pane>-->

    <el-tab-pane label="我的游戏" name="third">

      <div v-if= "gameList.length>0" class="category" v-for="item in gameList" :key="item.game_name" @click="gotodetail(item.game_name)">
        <img :src="'http://127.0.0.1:8000' + item.surface" alt=""><div class="content"><p>{{ item.game_name }}</p></div>
      </div>

      <el-empty v-if="gameList.length==0" style="margin-top:5%" description="您还没有购买游戏~">
      <router-link v-if="gameList.length==0" to="/home"><p style="color:#fff">请前往商店购买哦 →</p></router-link>
      </el-empty></el-tab-pane>
<!--    <el-tab-pane label="好友" name="fourth"><div style="margin-top:5%">-->
<!--    <h4>甜蜜的孤独</h4>-->
<!--    <el-divider content-position="center">SANE GAME</el-divider>-->
<!--    <span style="color:#C0C4CC;font-size:15px">你可以独享游戏时光。但和朋友们一起玩也是一种人生乐趣。掠过你那些朋友的头像和他们在玩的游戏, </span>-->
<!--    <br>-->
<!--    <span style="color:#C0C4CC;font-size:15px">添加好友，和他们一起聊天, 或分享美妙游戏时光。 </span>-->
<!--  </div><el-button style="background-color:white;-->
<!--   background-color:rgba(0, 0, 0, 0) ;color:#fff;font-weight: 600;margin-top:3%">添加新的朋友</el-button></el-tab-pane>-->
      <el-tab-pane label="好友" name="fourth">

<!--        <div  class=" " v-for="item in friendList" :key="item.id">-->
<!--          <div class="content"><p></p >{{item.nickname}}</div>-->
<!--        </div>-->

        <el-table :data="friendList"
            style="width:60%;margin:3% 20% 0 20%">
          <el-table-column
              prop="friend"
              label="好友id"
              width="180">
          </el-table-column>
          <el-table-column
              prop="nickname"
              label="昵称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="tag"
              label="分组">
          </el-table-column>
          <el-table-column
              prop="friend_intimacy"
              label="好友亲密度">
          </el-table-column>
        </el-table>


<!--        <el-table :data="friendList"-->
<!--                  style="width:60%;margin:3% 20% 0 20%">-->
<!--          <el-table-column-->
<!--              prop="friend"-->
<!--              label="好友id"-->
<!--              width="180">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--              prop="nickname"-->
<!--              label="昵称"-->
<!--              width="180">-->
<!--            <template v-slot:default="data">-->
<!--              <el-input placeholder="请输入内容" v-show="data.row.user" v-model="data.row.nickname"></el-input>-->
<!--              <span v-show="!data.row.user">{{data.row.nickname}}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->

<!--          <el-table-column-->
<!--              prop="tag"-->
<!--              label="分组">-->
<!--            <template v-slot:default="data">-->
<!--              <el-input placeholder="请输入内容" v-show="data.row.user" v-model="data.row.tag"></el-input>-->
<!--              <span v-show="!data.row.user">{{data.row.tag}}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->

<!--          <el-table-column-->
<!--              prop="friend_intimacy"-->
<!--              label="好友亲密度">-->
<!--          </el-table-column>-->

<!--          <el-table-column-->
<!--              prop="user"-->
<!--              label="编辑">-->
<!--            <template v-slot:default="data">-->
<!--            <el-button size="mini"-->
<!--                       type="primary"-->
<!--                       round-->
<!--                       plain-->
<!--                       @click=" onclick(data.$index)"> {{button_text[data.row.user]}} </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->

<!--        </el-table>-->


        <div v-if="friendList.length==0" style="margin-top:5%">
          <h4>甜蜜的孤独</h4>
          <el-divider content-position="center">SANE GAME</el-divider>
          <span style="color:#C0C4CC;font-size:15px">你可以独享游戏时光。但和朋友们一起玩也是一种人生乐趣。掠过你那些朋友的头像和他们在玩的游戏, </span>
          <br>
          <span style="color:#C0C4CC;font-size:15px">添加好友，和他们一起聊天, 或分享美妙游戏时光。 </span>
        </div>
        <br>
        <el-input v-model="input" placeholder="请输入想要添加的好友名" style="width: 40%; margin-right: 10px "/>
        <el-button @click="addFriend()" style="background-color:white;
 background-color:rgba(0, 0, 0, 0) ;color:#fff;font-weight: 600;margin-top:3%">添加新的朋友</el-button>

        <br>
        <br>
        <div>
          <el-form ref="form" :model="sizeForm" label-width="30%" size="medium">

            <el-form-item label="修改好友" size="medium">
              <br>
              <el-select v-model="sizeForm.friend2" placeholder="请选择好友" style="margin-right: 800px;">
                <el-option v-for="item in friendList" :label="item.nickname" :value="item.friend"></el-option>
                <!--                <el-option label="区域二" value="beijing"></el-option>-->
              </el-select>
            </el-form-item>

            <el-form-item label="昵称" style="width: 30%; margin-left: 300px">
              <el-input v-model="sizeForm.nickname2"></el-input>
            </el-form-item>

            <el-form-item label="分组" style="width: 30%; margin-left: 300px">
              <el-input v-model="sizeForm.tag2"></el-input>
            </el-form-item>

            <el-form-item size="large">
              <el-button type="primary" @click="change()" style="margin-right: 800px">确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="钱包" name="fifth"><div style="margin-top:5%">
        <img src="@/assets/images/balance.png" style="width:150px; height:150px; border-radius:50%; ">
        <br>
        <br>
        <span style="color:#C0C4CC;font-size:15px" >钱包余额：{{user.user_balance}}</span>
        <br>

      </div>

        <el-button style="background-color:white;
   background-color:rgba(0, 0, 0, 0) ;color:#fff;font-weight: 600;margin-top:3%" @click="showbalance=true">查看余额日志</el-button>

          <el-table
              v-if = "showbalance"
              :data="BalanceLogData"
              style="width:60%;margin:3% 20% 0 20%">
            <el-table-column
                prop="balancelog_id"
                label="日志id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="source"
                label="记录"
                width="180">
            </el-table-column>
            <el-table-column
                prop="change_time"
                label="时间">
            </el-table-column>
            <el-table-column
                prop="change_money"
                label="余额变动数量">
            </el-table-column>
          </el-table>

        <br>
        <br>
        <br>
      </el-tab-pane>



  </el-tabs>
  </div>
  </div>
  </div>
  </div>



</template>

<script>
import {logout, getUser, putUserinfo, getWarehouse, getBalanceLog, friendID, addfriend, changeFriendinfo} from "../../network/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted,ref,reactive,toRefs,} from "vue";
 import { ElMessageBox } from 'element-plus';
  import { ElMessage } from 'element-plus';
import gettets from "@/store/gettets";
export default {
  name:'',
  data() {
    return {
      showbalance: false


    };
  },
setup(){
  const activeName = ref('first');
  const router = useRouter();
    const store = useStore();


    const state = reactive({
      user:{},
      button_text:['编辑','保存'],
      gameList: [],
      BalanceLogData: [],
      input: '',
      data: {
        fname: ''
      },
      data2: {
        fid:'',
        nickname:'',
        tag:''
      },
      sizeForm:{
        friend2:"",
        nickname2: '',
        tag2: ''
      }
    })
  const state2 = reactive({
    friendList :[],
  })
    onMounted(()=>{
      getUser(window.localStorage.getItem("user_id")).then(res=>{
        //console.log(res.data);
        state.user = res;
        for (var i = 0; i < res.length; i++) {
          state2.friendList[i].user = 1;
          console.log(state2.friendList[i].user)
        }
        window.localStorage.setItem("credit_balance", res.user_credit_balance);
      })

      getWarehouse(window.localStorage.getItem("user_id")).then(res=>{
        // alert(res.warehouse)
        // alert(JSON.parse(JSON.stringify(res.warehouse)))
        // console.log(JSON.parse(JSON.stringify(res.warehouse)))
        // alert(res.warehouse[1].game_name)
        state.gameList = res.warehouse;
        // alert(state.gameList[1].game_name)
        // alert(state.user.game_cnt)
        // alert(state.gameList.length)
        console.log(state)

      })

      friendID(window.localStorage.getItem("user_id")).then(res => {
        state2.friendList=res
      })

      getBalanceLog(window.localStorage.getItem("user_id")).then(res=> {
        state.BalanceLogData = res;
        alert(res[0].source)
      })

    })

    const addFriend = () => {
      state.data.fname = state.input
      addfriend(window.localStorage.getItem("user_id"), state.data).then(res => {
          if(res.error != "添加成功"){
              alert(res.error);
          }else{
            location.reload();
          }
      })
    }

    const change = () =>  {
        state.data2.fid = state.sizeForm.friend2;
        state.data2.nickname = state.sizeForm.nickname2;
        state.data2.tag = state.sizeForm.tag2;
        changeFriendinfo(window.localStorage.getItem("user_id"), state.data2).then(res =>{
          if(res.error != "修改成功"){
            alert(res.error);
          }else{
            location.reload();
          }
        })
    }
  const onclick = (index) => {
      alert(index)
    if(state2.friendList[index].user == 0)
      state2.friendList[index].user =1
    else
      state2.friendList[index].user =0
  }

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
  activeName,
  ...toRefs(state),
  open,
  ...toRefs(state2),
  addFriend,
  onclick,
  change
}
},
components:{

},
methods:{

}
}

</script>
<style>

/*.content{*/
/*  width:40%;*/
/*  height: 40px;*/
/*  !*display:table;*!*/
/*  border-style: solid;*/
/*  border-color: gray;*/
/*  margin:3% 20% 0 20%;*/
/*}*/

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
