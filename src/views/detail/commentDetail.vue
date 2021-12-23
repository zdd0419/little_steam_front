<template>
  <div>
<!--    <div class="container" >-->
<!--      这里放头像图片-->
      <div class="content">
<!--        <div class="left">-->
<!--          <img :src="'http://127.0.0.1:8000'+ user.user_icon" alt="" />-->
<!--        </div>-->
        <div class="top">
          <el-row>
            <el-radio-group v-model="radio">
              <el-radio label="1" style="color: white">推荐</el-radio>
              <el-radio label="0" style="color: white">不推荐</el-radio>
            </el-radio-group>
          </el-row>
        </div>
        <div style="margin: 20px 0;"></div>
        <div class="text_field">
          <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="120"
              show-word-limit>
          </el-input>
        </div>
        <div style="margin-top: 5px">
          <el-checkbox-group  v-model="hotTags">
            <el-checkbox style="vertical-align:middle;align-content: center" v-for="item in Gametags" :label=item.category>
              <span style="
                float: left;
                color: #fff;
                background: #3c3c3c;
                font-size: 16px;
                width: auto;
                border-radius: 5px;
                padding:5px;">{{ item.category}}</span>
            </el-checkbox>
            <span><el-input v-model="mytag" style="width: 20%;margin-left: 10px" placeholder="请输入自定义标签"></el-input></span>
          </el-checkbox-group >


<!--          <span><el-button type="primary">提交</el-button></span>-->
        </div>

        <div class="confirm" style="float: right">
          <el-button type="success" @click="saveComment()">确认</el-button>
        </div>
      </div>

<!--    </div>-->
  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {getTags, gameComment, gameTag} from "../../network/detail";
import {getUser} from "../../network/user";
import {ElMessage} from "element-plus";
export default {
  props: {
    Gametags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
setup(props){
  const state = reactive({
    tagList: [],
    result:[], //id数组
    user: {}, //user详细信息
    radio: -1,
    textarea:'',
    mytag:'',
    hotTags:[]
  });
  const sendEachTag = (item) => {
    gameTag({
      "user_id": window.localStorage.getItem("user_id"),
      "game_id": props.Gametags[0].game,
      "category": item,
    })
  }
  const saveComment = () => {
    if(state.radio === -1){
      alert("请选择评论类型：推荐或是不推荐")
    }else{
      if(state.textarea.replace(/\s*/g,"") === ''){
        alert("请输入评论内容")
      }else{
        gameComment(props.Gametags[0].game, {
          "user_id":window.localStorage.getItem("user_id"),
          "comment_type":state.radio,
          'comment_content': state.textarea}).then((res)=>{
            ElMessage({
            showClose: true,
            message: "评论成功",
            type: "success",
            })
        }).catch(error => {
          ElMessage({
            showClose: true,
            message: "未拥有该游戏",
            type: "error",
          })
        });
        init()
        location.reload()
        state.hotTags.forEach(sendEachTag)
        gameTag({
          "user_id":window.localStorage.getItem("user_id"),
          "game_id": props.Gametags[0].game,
          "category": state.mytag
        })
      }
    }

  }
  const init = () => {
    getTags(game_id).then((res) => {
      state.tagList = res;
      console.log(state.list);
      // state.result = res.data.filter(item => item.is_checked == 1).map(n=>n.id);
    });
    getUser(window.localStorage.getItem("user_id")).then((res) => {
      state.user = res;
      console.log(state.user)
    })
  };
  onMounted(() => {
        // init();
  });
  return {
    ...toRefs(state),
    saveComment,
  }
},
  name: "commentDetail",
  data() {
    return {
      text: '',
      input:'',
    }
  },
  components: {},
  methods: {

  },
}
</script>

<style scoped lang='scss'>
.container {
  position: relative;
  height: 300vh;
  display: flex;
  margin-bottom: 1%;
  background: #2a2a2a;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.4s;

  img {
    width: auto;
    height: 30%;
  }
  .content {
    width: 100%;
    height: 100%;
    margin-top: 3%;
    //display: flex;
    .left{
      height: 50px;
      width: 30%;
    }

    .top{
      height: 30px;
      width: 70%;
    }

  .text_field{
    width: 100%;
    height: 80%;
  }
  .tag{
    width: 70%;
    height: 20px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .confirm{
    margin-right: 45px;
    margin-top: 5px;
    height: 30px;
    width: 30px;
  }
}

}
</style>