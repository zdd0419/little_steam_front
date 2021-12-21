
<template>
  <div class="container">
      
      

        <div class="box">

            <div class="content">
                <p style="text-align: center;position: relative;top: -20px;"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/LOGO.png" style="width: 67px;height: 33px;"></p>
                <p>
                    选择如何登录您的 SANEGAME账户
                </p>
                <div class="option" @click="toSane">
                    <div class="logo"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/LOGO.png" style="width: 40px;height: auto;position: relative;left: 0px;top: 12px;opacity: 1;"></div>
                    <p style="color:#fff;text-align: center;margin: auto;margin-left: 10px;">登录 SANE GAMES</p>
                </div>
                <div class="option">
                    <div class="logo" style="background-color: #FFF;border-radius: 5px 0 0 5px;"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/fb_logo.png" style="width: 29px;height: 29px;position: relative;left: 0px;top: 12px;opacity: 1;"></div>
                    <p style="color:#fff;text-align: center;margin: auto;margin-left: 10px;">使用 FACEBOOK 登录</p>
                </div>
                <div class="option">
                    <div class="logo" style="background-color: #FFF;border-radius: 5px 0 0 5px;"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/xbox.png" style="width: 29px;height: 29px;position: relative;left: 0px;top: 12px;opacity: 1;"></div>
                    <p style="color:#fff;text-align: center;margin: auto;margin-left: 10px;">使用 XBOX LIVE 登录</p>
                </div>
                <div class="option">
                    <div class="logo" style="background-color: #FFF;border-radius: 5px 0 0 5px;"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/playstation.png" style="width: 29px;height: 29px;position: relative;left: 0px;top: 12px;opacity: 1;"></div>
                    <p style="color:#fff;text-align: center;margin: auto;margin-left: 10px;">使用 PLAYSTATION NETWORK 登录</p>
                </div>
                <div class="option">
                    <div class="logo" style="background-color: #FFF;border-radius: 5px 0 0 5px;"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/nintendo.png" style="width: 61px;height: 15px;position: relative;left: 0px;top: 16px;opacity: 1;"></div>
                    <p style="color:#fff;text-align: center;margin: auto;margin-left: 10px;">使用 NINTENDO 登录</p>
                </div>
                <div class="option">
                    <div class="logo" style="background-color: #FFF;border-radius: 5px 0 0 5px;"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/steam.png" style="width: 29px;height: 29px;position: relative;left: 0px;top: 12px;opacity: 1;"></div>
                    <p style="color:#fff;text-align: center;margin: auto;margin-left: 10px;">使用 STEAM 登录</p>
                </div>
                <div class="option">
                    <div class="logo" style="background-color: #FFF;border-radius: 5px 0 0 5px;"><img src="https://sanegame.oss-cn-hangzhou.aliyuncs.com/apple.png" style="width: 20px;height: 20px;position: relative;left: 2px;top: 15px;opacity: 1;"></div>
                    <p style="color:#fff;text-align: center;margin: auto;margin-left: 10px;">使用 APPLE 登录</p>
                </div>
            </div>
        </div></div>
</template>

<script>
import {ref,toRefs} from 'vue'
import { useRouter } from "vue-router";
export default {
name:'',
setup(){
    const router = useRouter();
    const toSane=()=>{
        router.push({path:'/login/sane'})
    }
return{
    toSane
}
},
components:{

},
methods:{

}
}

</script>
<style type="text/css">

        .container{
            
            
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
            background: rgb(18,18,18);;
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
            background: linear-gradient(235deg, #D351E1, #060c21, #3D1963);
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
        
        .option {
            position: relative;
            width: 300px;
            height: 50px;
            border-radius: 5px;
            margin-top: 10px;
            margin-bottom: 8px;
            background-color: #D351E1;
            opacity: 0.3;
            z-index: 3;
            display: flex;
        }
        
        .option::before {
            content: "";
            position: absolute;
            border-radius: 5px;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: #fff;
            z-index: -1;
        }
        
        .option::after {
            content: "";
            position: absolute;
            border-radius: 5px;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: #fff;
            z-index: -2;
            filter: blur(40px);
        }
        
        .option:before,
        .option:after {
            background: linear-gradient(210deg, #D351E1, #060c21, #3D1963);
        }
        
        .option:hover {
            box-shadow: 0 10px 20px rgba(0, 0, 0, .1);
            opacity: 1;
        }
        
        .logo {
            position: relative;
            width: 85px;
            height: 50px;
        }
    </style>