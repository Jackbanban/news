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
            placeholder="密码"
            type="password"
            v-model="form.password"
            
            :rule="/^[0-9a-zA-Z]{3,12}$/"
            err_message="密码不正确"
          ></AuthInput> 
      </div>


    <div class="register">
         <p>没有账号？<router-link to="/register">去注册</router-link></p>
     </div> 

    <div class="register" @click="handleSubmit">
        <AuthButton text="登录">

        </AuthButton>
    </div>
  </div>
  </div>
</template>

<script>
    // 导入自己创建的功能组件
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
    // 注册组件
    components:{
        AuthInput,
        AuthButton
    },
    methods:{
        handleUsername(value){
            this.form.username = value
        },
        handleSubmit(){
            // 通过axios对服务器发起异步请求，请求数据（和ajax一样）
            this.$axios({
                url:"/login",
                method:"post",
                data:this.form
            }).then(res=>{
                const {message,data} = res.data
                if(message == "登录成功"){
                    // 登录成功从后台获取token验证信息和用户id存至本地，以便后续页面的验证
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user.id);
                    this.$router.push('/')
                }
            })
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
