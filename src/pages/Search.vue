<template>
  <div class="container">
        <div class="head">
            <span class="iconfont iconjiantou2"></span>
            <div class="input-wrap">
                <span class="iconfont iconsearch"></span>
                <input class="input" placeholder="搜索关键字" v-model="keyword">
            </div>
            <span class="search-btn" @click="handleSearch">搜索</span>
        </div>
        <div class="list">
            <PostCard
            v-for="(item,index) in list"
            :key="index"
            :post="item"
            >
            </PostCard>
        </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard .vue'
export default {
    data(){
        return{
            list:[],
            keyword:''
        }
    },
    components:{
        PostCard
    },
    methods:{
        handleSearch(){
            this.$axios({
                url:`/post_search?keyword=${this.keyword}`
            }).then(res=>{
                const {data} = res.data
                this.list = data
            })
        }
    }
}
</script>

<style scoped lang="less">
    .container{
        padding: 10px;
        box-sizing: border-box;
        .head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .input-wrap{
                position: relative;
                width: 100%;
                padding: 0 20px;
                flex: 1;
                .iconsearch{
                    position: absolute;
                    top: 8px;
                    left: 25 / 360 *100vw;
                }
                .input{
                    border: 1px solid #ddd;
                    border-radius: 50px;
                    width: 100%;
                    box-sizing: border-box;
                    padding-left: 30 / 360 *100vw;
                    line-height: 30 / 360 *100vw;
                    font-size: 14px;
                }
            }
        }
    }
</style>
