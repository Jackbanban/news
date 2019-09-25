<template>
  <div class="comment">
      <HeadNormal title="我的跟帖"></HeadNormal>
      <div class="comment-item" v-for="(item,index) in data " :key='index'>
        <p class="time">2019-10-10 10:25</p>
        <div class="parent" v-if="item.parent">
            <div class="parent-title">
                @:{{item.parent.user.nickname}}
            </div>
            <div class="parent-content">
                {{item.parent.content}}
            </div>
        </div>
        <div class="content">
            <strong>{{item.content}}</strong>
        </div>
        <router-link to="#" class="article-link">
            <p>原文：{{item.post.title}}</p>
            <span class="iconfont iconjiantou1"></span>
        </router-link>
      </div>
  </div>
</template>

<script>
import HeadNormal from '@/components/HeadNormal.vue'
export default {
    data(){
        return{
            data:[]
        }
    },
    components: {
        HeadNormal
    },
    mounted(){
        this.$axios({
            url:"/user_comments",
            headers: {
                    Authorization: localStorage.getItem("token")
            }
        }).then(res=>{
            const {data} = res.data
            this.data = data
        })
    }
}
</script>

<style scoped lang="less">
    .comment{
        padding: 20px;
    }
    .comment-item{
        line-height: 2;
        border-bottom: 1px solid #ddd;
        padding: 20px;
        .time{
            font-size: 14px;
            color: #999;
        }
    }
    .parent{
        background-color: #e4e4e4;
        padding: 10px;
        margin: 10px 0;
        color: #999;
    }
    .article-link{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        p{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
</style>
