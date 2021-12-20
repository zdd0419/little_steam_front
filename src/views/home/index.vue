<template>
  <div class="container">
    
    <div class="slides" :style="{'left':calleft + '%','width':callwidth + '%'}" >
      <div v-for="(item,index) in imgsrc.img" :key="index"  class="slides-item" @click="open(index)">
       <img  :src="item.url" alt="">
       <transition name='small'
       enter-active-class="animate__animated animate__backInUp"
         >
         <div class="content1" 
         v-show="small"><h2 style="margin-left:18%;text-align:left">{{item.msg}}</h2>
         </div> 
          </transition>
          <transition name='huge'
          enter-active-class="animate__animated animate__bounceInUp"
          
          >
          <div class="content2" v-show='huge'><h2 style="margin-left:18%;text-align:left">{{item.msg}}</h2>
          </div> 
           </transition>
           <div class="stand" v-show="stand"><h4 style="font-size:50%">了解</h4></div>
      </div>
    </div>
    <div class="left" @click="handleleft"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E5%90%91%E5%B7%A6.png" alt=""></div>
    <div class="right" @click="handleright"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/%E5%90%91%E5%8F%B3.png" alt=""></div>
  </div>
</template>

<script>
import {  onMounted, ref,reactive,toRefs ,nextTick} from "vue";
import "animate.css"
export default {
  name: "",
  setup() {
    const small = ref(true);
    const huge = ref(false)
    const stand = ref(false)
    const calleft = ref(0)
    const callwidth = ref(233.33333333333333)
    const imgsrc = reactive({
      img:[{url:'https://sanegame.oss-cn-hangzhou.aliyuncs.com/Epic%20Games%20Node_bb-1920x1080-b9fc27cbe8c45c5682facc0d5f0626741e8e1dc5.jpg',msg:'BATTLE BREAKERS'},
      {url:'https://sanegame.oss-cn-hangzhou.aliyuncs.com/Epic%20Games%20Node_fn-1920x1080-05e434e24b3170bc6cc6003c102270ee4cde3a75.jpg',msg:'FORTNITE'},
      {url:'https://sanegame.oss-cn-hangzhou.aliyuncs.com/Epic%20Games%20Node_rr-1920x1080-5a3f8bce26f45d078c2738cf5140ad18be39041c.jpg',msg:'ROBO RECALL'},
      {url:'https://sanegame.oss-cn-hangzhou.aliyuncs.com/Epic%20Games%20Node_ue-alt-1920x1080-e653a4a4dae65307fd2420076abe44bb71b22f06.jpg',msg:'UNREAL ENGINE'},
      {url:'https://sanegame.oss-cn-hangzhou.aliyuncs.com/Epic%20Games%20Node_ut-1920x1080-416b0b679e572854df52c39154aff5945328c04d.jpg',msg:'UNREAL TOURNAMENT'},
      {url:'https://sanegame.oss-cn-hangzhou.aliyuncs.com/epichomepage-artboard-1-1920x1080-329693365.jpg',msg:'STORE'},
      {url:'https://sanegame.oss-cn-hangzhou.aliyuncs.com/rl-f2p-hero-epic-adjust-gradient-1920x1080-982990639.jpg',msg:'ROCKET LEAGUE'}],
    })
    
    const handleright = ()=>{
      if( callwidth.value == 233.33333333333333){
      if(calleft.value>=-133){
        calleft.value = calleft.value - 33.333333333333333
      }
      else{
        calleft.value = 0
      }
      }
      else{if(calleft.value>=-599){
        calleft.value = calleft.value - 100
      }
      else{
        calleft.value = 0
      }}
    }

    const handleleft = ()=>{
      if( callwidth.value==233.33333333333333){
      if(calleft.value<0){
        calleft.value = calleft.value + 33.333333333333333
      }
      else{
        calleft.value = -133.2
      }
      }else{if(calleft.value <0){
        calleft.value = calleft.value + 100
      }
      else{
        calleft.value = -600
      }}
    }
    
    const open = (index)=>{
      if(callwidth.value == 233.33333333333333 ){
      callwidth.value = 700;
      small.value = false
      huge.value = true
      stand.value = true
      console.log(index);
      if(index == 0 ){
        calleft.value = 0
      }if(index == 1){
        calleft.value = -100
      }
      if(index == 2){
        calleft.value = -200
      }
      if(index == 3){
        calleft.value = -300
      }
      if(index == 4){
        calleft.value = -400
      }
      if(index == 5){
        calleft.value = -500
      }
      if(index == 6){
        calleft.value = -600
      }
      }else{
        callwidth.value = 233.33333333333333;
        small.value = true
        huge.value = false
        stand.value = false
        if(index == 0 ){
        calleft.value = 0
      }if(index == 1){
        calleft.value = 0
      }
      if(index == 2){
        calleft.value = -33.333333333333333 
      }
      if(index == 3){
        calleft.value = -33.333333333333333*2
      }
      if(index == 4){
        calleft.value = -33.333333333333333*3
      }
      if(index == 5){
        calleft.value = -33.333333333333333*4
      }
      if(index == 6){
        calleft.value = -33.333333333333333*4
      }
      }
    }
    
    return {handleright,calleft,handleleft,open,callwidth,imgsrc,small,huge,stand};
  },
  components: {},
  methods: {},
};
</script>
<style scoped>
.container
{
 position: absolute;
 top: 0;
 left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index:1 ;

}
.slides{
  position: relative;
  height: 100%;
  display: flex;
  left: 0%;
  transition: all 0.5s;
}

.slides-item{
 flex: 1;
  overflow: hidden;
 
}
.slides-item img{
  filter: brightness(0.7);
  transition: all 0.5s;
 
}

.slides-item:hover img{
  transform:scale(1.05);
  filter: brightness(1);
}
.left{
  position: absolute;
  top: 50%;
  left: 0%;
  
  width: 5%;
  height: 5%;
  
}
.right{
  position: absolute;
  top: 50%;
  left: 95%;
 
  width: 5%;
  height: 5%;
  
}
.left img{
  width: 49%;
  height: auto;
  float: right;
  filter: brightness(0.5);
  transition: all 0.5s;
}
.right img{
  width: 49%;
  height: auto;
  filter: brightness(0.5);
  transition: all 0.5s;
}
.left:hover img{
  transform:scale(1.05);
  filter: brightness(1);
}
.right:hover img{
  transform:scale(1.05);
  filter: brightness(1);
}
.content1{
  position: absolute;
  top: 75%;
  color: white;
  width: 13%;
  height: auto;
  Font-Family: Brutal_Bold, sans-serif;
  font-size: 2rem;
  
}
.content2{
  width: 5%;
  height: auto;
  position: absolute;
 
  top: 47%;
  margin-left: 7%;
  font-size: 6rem;
  color: white;
}
.stand{
   position: absolute;
  width:0.7%;
  height: 6%;
   background-color:white;
   background-color:rgba(0, 0, 0, 0) ;
   border: 1px white solid;
  top: 82%;
  margin-left: 8%;
  transition: all 0.5s;
}
.stand h4{
  position: relative;
  color: #fff;
  line-height: 350%;
  transition: all 0.5s;
}
.stand:hover{
  background-color:white;
  opacity: 0.9;
}
.stand:hover h4{
  color: black;
}
</style>