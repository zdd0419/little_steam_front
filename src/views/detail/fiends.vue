<template>
  <div>
    <div class="goods2">
      <div class="container">
        <h4>我的好友</h4>
        <div  class="category" v-for="item in friendList" :key="item.id">
         <div class="content"><p>{{ item}}</div>
        </div>

        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  setup(){
    const state = reactive({
      firends:{},
      friendList: []
    })
    const  getFriends=()=>{
      friendID(window.localStorage.getItem("user_id"))((res) => {
       state.friendList=res
      })
    }
  },
  name: "fiends"
}
</script>

<style scoped>

</style>