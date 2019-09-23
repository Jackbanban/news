<template>
  <div class="login">
      <div class="close">
          <span class="iconfont iconicon-test"></span>
      </div>


      <div class="logo">
          <span class="iconfont iconnew"></span>
      </div>

      <div class="input">

          <AuthInput 
            placeholder = "用户名/手机号码"
            :value = "form.username"
            @input = "handleUsername"

            :rule = "/^1[0-9]{4,10}$/"
            err_message = "手机号格式不正确"
          ></AuthInput> 

      </div> 


      <div class="input">

          <AuthInput 
            placeholder = "昵称"
            v-model="form.nickname"

            :rule = "/^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/"
            err_message = "昵称格式不正确"
          ></AuthInput> 

      </div> 

      <div class="input">

          <AuthInput 
            placeholder = "密码"
            type="password"
            v-model="form.password"
            :rule = "/^[0-9a-zA-Z]{3,12}$/"
            err_message = "密码格式不正确"
          ></AuthInput> 

      </div> 


      <div @click="handleSubmit">
          <AuthButton text="注册" />
      </div>
  </div>
</template>

<script>

import AuthInput from "@/components/AuthInput.vue"
import AuthButton from "@/components/AuthButton.vue"
export default {
    data(){
        return{
            form:{
                username:'',
                password:'',
                nickname:''
            }
        }
    },
    components:{
        AuthInput,
        AuthButton
    },
    methods:{
        handleUsername(value){
            this.form.username = value
        },
        handleSubmit(){
            this.$axios({
                url:'/register',
                method:"POST",
                data:this.form
            }).then( res=>{
                console.log(res.data)
                const {message} = res.data
                console.log(res.data.message)
                if(message == "注册成功"){
                    this.$router.push('/login')
                }
                this.$toast(message)
                
            } )
        }
    }

}
</script>



<style scoped lang="less">
    .login{
        padding: 20px;
    }
    .close{
            .iconicon-test{
                font-size: 27 / 360 * 100vw
            }
        }
    .logo{
        display: flex;
        justify-content: center;
        span{
            display:block;
            font-size:  126 / 360 * 100vw;
            color: #cc3300;
        }
    }
    .register{
        margin-top: 10px;
        text-align: right;
        a{
            color: #007acc
        }
    }
</style>
