<template>
    <div>
        <router-link to="/edit"> 
        <div class="profile">
            <div>
                <img :src="profile.head_img" alt="">
            </div>
            <div class="profile-center">
                <div class="name">
                    <span class="iconfont iconxingbienan"></span>
                    {{profile.nickname}}
                </div>
                <p>2019-10-10</p>
            </div>
            <span class="iconfont iconjiantou1"></span>
        </div>      
        </router-link>

        <router-link to="/userfollow"> 
            <CellBar laber="我的关注" text="关注的用户"></CellBar>
        </router-link>

        <router-link to="/usercomment">
            <CellBar laber="我的跟帖" text="跟帖/回复"></CellBar>
        </router-link>
        <CellBar laber="我的收藏" text="文章/视频"></CellBar>
        <div @click="handleLogout">
            <CellBar laber="退出登录" ></CellBar>
        </div>
    </div>   
</template>

<script>
    import CellBar from '@/components/CellBar.vue'
    export default {
    data(){
        return{
            profile:{}
        }
    },
    components:{
        CellBar
    },
    methods:{
        handleLogout(){
            localStorage.removeItem("token")
            localStorage.removeItem('user_id')
            this.$router.replace('/login')
        }
    },
    mounted(){
        
        this.$axios({
            url:'/user/'+localStorage.getItem('user_id'),
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
    .profile{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 5px solid #ddd;
        img{
            display:block;
            border-radius: 50%;
            width: 70 / 360 * 100vw;
        }
        .profile-center{
            flex: 1;
            padding: 0px 10px;
            span{
                color: #a0c5e8
            }
            p{  
                padding:10px 0px;
                color: #999;
                font-size: 14px;
            }
        }
    }
</style>
