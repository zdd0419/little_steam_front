<template>
<!--  <meta name="referrer" content="no-referrer">-->
  <div>
    <div class="item" v-for="item in slides.slice(0,7)" :key="item.game" @click="getid(item.game)">
      <img :src="'http://127.0.0.1:8000' + item.surface" alt="" >
      <p>{{item.game_name}}</p>
    </div>
    <pic :pics='pics' :detail='detail'></pic>
  </div>
</template>
<script>
import {ref,reactive,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {getDetail} from '../../../network/detail'
import pic from './pic.vue'
export default {
    props:{
      slides:{
           type:Array,
           default(){
               return [];
           }
      }
    },
name:'',
components:{
pic
},
setup(props){
     const router = useRouter();
     const godetail = (id,title) =>{
            router.push({path:'/detail',query:{id,title}})
     }
     const detail = ref();
     const pics = ref()
    const  getid=(cid)=>{ getDetail(cid).then((res)=>{
      detail.value = res;
      pics.value = res.game_images[1].pic_url;
      // alert(pics.value);
     })}
  // const getid=(cid)=>{
  //      detail.value =
  // }
     onMounted(()=>{
        getid(1)
    })
     return {godetail,getid,detail,pics}
}
}

</script>
<style scoped lang="scss">

.item{
  background: rgb(18, 18, 18);
  color: #fff;
  margin-bottom: 3px;
  display: flex;
  width: 19%;
  text-align:left;
  border-radius: 1em;
}
.item:hover{
  background:#303133;
  img{
width: 5em;
}
}
.item img{
width: 4em;
border-radius: 0.4em;
margin-bottom: 14px;
margin-top: 14px;
margin-left: 14px;
transition: all 0.5s;
}
.item p{
  padding: 0 10px 0 10px;
  margin-top:17% ;
  
}

</style>