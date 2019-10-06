<template>
  <div>
      <div class="login">
      <div class="close">
          <span class="iconfont iconicon-test"></span>
      </div>


      <div class="logo">
          <span class="iconfont iconnew"></span>
      </div>

      <div>
           <!--注意使用的是等号的值-->
          <AuthInput
            placeholder="用户名/手机号码"
            :value="form.username"
            @input="handleUsername"

            :rule="/^1[0-9]{4,10}$/"
            err_message="手机号码格式不正确"
          ></AuthInput> 
      </div>

      <div>
          <AuthInput
            placeholder="昵称"
            v-model="form.nickname"
            
            :rule="/^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/"
            err_message="昵称格式不正确"
          ></AuthInput> 
      </div>

      <div>
          <AuthInput
            placeholder="密码"
            type="password"
            v-model="form.password"
            
            :rule="/^[0-9a-zA-Z]{3,12}$/"
            err_message="密码格式不正确"
          ></AuthInput> 
      </div>
      <div class="register">
         <p>有账号？<router-link to="/login">去登录</router-link></p>
     </div> 
      
   

    <div class="register" @click="handleSubmit">
        <AuthButton text="注册">

        </AuthButton>
    </div>
  </div>
  </div>
</template>

<script>
    import AuthInput from '@/components/AuthInput.vue'
    import AuthButton from '@/components/AuthButton.vue'
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
            if(this.form.username.trim() == ''||this.form.password.trim() == ''|| this.form.nickname.trim() == ''){
                this.$toast('请输入完整内容，不要留空')
            }else{
                this.$axios({
                    url:"/register",
                    method:"post",
                    data:this.form
                }).then(res=>{
                    const {message} = res.data
                    if(message == "注册成功"){
                        this.$router.push('/login')
                    }
                    this.$toast(message)
                })
            }
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
