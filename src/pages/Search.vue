<template>
  <div class="container">
        <div class="head">
            <span class="iconfont iconjiantou2" @click="$router.back()"></span>
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
    name:'Search',
    // 组件内的路由守卫，判断如果是首页进入到搜索页的，清空页面的缓存数据
    // to：去哪里
    // from：从哪里来
    // next：函数，必须要调用，可以接受url的路径，函数，不传参数
    beforeRouteEnter(to,from,next){
        // '\'转意 如果from.path值等于斜杆
        if(from.path === '\/'){
            // 在渲染该组件的对应路由被confirm前调用
            // 不能获取组件实例this，需要在next的回调函数中获取
            // vm就是组件的实例，也就是this
            next( vm=>{
                vm.list = []
                vm.keyword = ''
                next()
            })
        }else{
            next()
        }
    },
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
