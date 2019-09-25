<template>
    <div class="follow">
         <HeadNormal title="我的关注"></HeadNormal>
         <div class="content" v-for="(item,index) in followList" :key="index">
            <img :src="$axios.defaults.baseURL + item.head_img" alt="">
            <div class="center">
                <p>{{item.nickname}}</p>
                <p>2019-10-10</p>
            </div>
            <span class="cancel" @click="handelCancel(index)">取消关注</span>
         </div>
    </div>

</template>

<script>
import HeadNormal from '@/components/HeadNormal.vue'
export default {
    data(){
        return{
            followList:[]
        }
    },
    components: {
        HeadNormal
    },
    methods:{
        handelCancel(index){
            
            const id = this.followList[index].id
            this.$axios({
                url:'/user_unfollow/' + id,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res=>{
                console.log(res)
                const {message} = res.data
                if(message === '取消关注成功'){
                    this.followList.splice(index,1)
                    this.$toast(message)
                }
            })
        }
    },
    mounted(){
        this.$axios({
            url:"/user_follows" ,
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res=>{
            const {data} = res.data
            this.followList = data
        })
    }
}
</script>

<style scoped lang="less">
    .follow{
        padding: 20px;
    }
    .content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
        img{
            width: 40 / 360 *100vw;
            border-radius: 50%
        }
        .center{
            flex: 1;
            p{
                padding: 0px 10px;
                &:last-child{
                    font-size: 12px;
                    line-height: 20px;
                    color: #999;
                }
            }
        }
        span{
           display: block;
           background-color: #b3b3b3;
           font-size: 14px;
           width: 73 / 360 * 100vw;
           height: 18/ 360 * 100vw;
           line-height: 18 / 360 * 100vw;
           text-align: center;
           border-radius: 50px;
        }

    }
</style>
