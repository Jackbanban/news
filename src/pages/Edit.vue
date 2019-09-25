<template>
  <div class="account">
      <div class="editHead">
            <span class="iconfont iconjiantou2"></span>
            <h4>编辑资料</h4>
      </div>
      <div class="head_img">
        <img :src="profile.head_img" alt=""> 
        <img :src="avatar" alt="" ref="img" style="opacity: 0"> 
        <form ref="form">
            <input type="file" name="avatar" accept="image/*" @change="changeImage($event)" ref="avatarInput"/>
        </form>
      </div>

     <div @click="editNickname">
         <CellBar laber="昵称" :text="profile.nickname" ></CellBar>
     </div>
     <CellBar laber="密码" text="******"></CellBar>
     <CellBar laber="性别" text="男"></CellBar>
  </div>
</template>

<script>

import CellBar from '@/components/CellBar.vue'
export default {
    data(){
        return{
            profile:{},
            avatar: require('../../static/touxiang.jpg')
        }
    },
    components:{
        CellBar
    },
    methods:{
        changeImage(e) {
            this.$refs.img.style.opacity= 1
            var file = e.target.files[0]
            var reader = new FileReader()
            var that = this
            reader.readAsDataURL(file)
            reader.onload = function(e) {
                that.avatar = this.result
            }
        },
        editNickname(){
            console.log(123)
            // e.html = `<input value="文字" />`
            
        }
    },
    mounted(){
        this.$axios({
            url:'/user_update/'+localStorage.getItem('user_id'),
            method:'post',
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res=>{
            const {data} = res.data
            this.profile = data
            if(data.head_img){
                this.profile.head_img = this.$axios.defaults.baseURL + data.head_img
            }else{
                this.profile.head_img = './static/touxiang.jpg'
            }
        })
    }
}
</script>

<style scoped lang="less">
    .account{
        padding: 20px;
        .editHead{
            display: flex;
            align-items: center;
            h4{
                flex: 1;
                text-align: center;
                font-size: 19px;
                font-weight: 600;
            }
        }
        .head_img{
            display: flex;
            position: relative;
            text-align: center;
            justify-content: center;
            align-items: center;
            height: 130 / 360 * 100vw;
            img{
                position: absolute;
                left: 135 / 360 * 100vw;
                top: 40px;
                width: 70 / 360 * 100vw;
                border-radius: 50%;
            }
            input{
                display: block;
                width: 70 / 360 * 100vw;
                height: 70 / 360 * 100vw;
                opacity: 0;
            }
        }
    }
</style>
