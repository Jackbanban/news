<template>
  <div class="satr">
       <HeadNormal title="我的收藏"></HeadNormal>
       <div class="content" v-for="(item,index) in list" :key="index">
            <div class="content-title">
                <p>{{item.title}}</p>
                <p>火星时报 <span>{{item.comments.length}}跟帖</span></p>
            </div>
            <div class="content-img">
                <img :src="item.cover[0].url"/>
            </div>
       </div>
  </div>
</template>

<script>
import HeadNormal from '@/components/HeadNormal.vue'
export default {
    data(){
        return{
            list:[]
        }
    },
    components: {
        HeadNormal
    },
    mounted(){
        this.$axios({
            url:"/user_star",
            headers: {
                    Authorization: localStorage.getItem("token")
            }
        }).then(res=>{
            console.log(res.data)
            const {data} = res.data
            // console.log(data[2].cover[0].url)
            this.list = data
        })
    }
}
</script>

<style scoped lang="less">
    .satr{
        padding: 20px;
    }
    .content{
        display: flex;
        margin-right: 5px;
        border-bottom: 1px solid #ddd;
        .content-title{
            flex: 2;
            p{
                &:last-child{
                    margin-top: 20px;
                    font-size: 14px;
                    color: #999;
                }
            }
        }
        .content-img{
            flex: 1;
            img{
                width: 120 / 360 * 100vw;
                height: 75 / 360 * 100vw;
            }
        }
    }
</style>
