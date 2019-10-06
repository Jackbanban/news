<template>
    <div>
        <div class="header">
            <span class="iconfont iconnew"></span>
            <router-link to="/search" class="header-search">
                <div>
                    <p>
                        <span class="iconfont iconsearch"></span>搜索新闻
                    </p>
                </div>
            </router-link>
            <router-link to="/personal">
                <span class="iconfont iconwode"></span>
            </router-link>
        </div>
        <div class="nav">
            <!--{path:'/details/',params: { id: item.posts.id }}-->
            <!--vantUi组件的-->
            <van-tabs v-model="active" sticky swipeable>
                <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
                    <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                        <!--<router-link v-for="(item,index) in item.posts" :key="index" :to="{path:'/details/',query: { id:item.id }}"> 
                            <PostCard  :post="item"></PostCard>
                        </router-link>-->

                        <PostCard v-for="(item,index) in item.posts" :key="index"  :post="item"></PostCard>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import PostCard from '@/components/PostCard .vue'
export default {
    data() {
        return {
            active: localStorage.getItem('token') ? 1 : 0,
            categories: [],
            cid: 999,
            pageSize: 4,
        }
    },
    components: {
        PostCard
    },
    watch: {
        // this.active监听改数值的变化，数值对应导航栏的信息变动，可通过监听改数值变化请求每页不同的数据
        active() {
           this.cid = this.categories[this.active].id;
        //  调用vant组件的事件
           this.onLoad()
        }
    },
    methods: {
        onLoad() {
            // 模拟网速加载数据
            setTimeout(() => {
                const category = this.categories[this.active]
                this.$axios({
                    url: `/post?pageIndex=${category.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`,
                }).then(res => {
                    const { data } = res.data
                    if(data.length < this.pageSize){
                        category.finished = true;
                    }
                    // 解构数组，对数据进行叠加避免数据覆盖
                    category.posts = [...category.posts, ...data]
                    category.pageIndex++
                    category.loading = false
                })
            }, 2000)
        }
    },
    mounted() {
        const config = { url: '/category' }
        if (localStorage.getItem("token")) {
            config.headers = { Authorization: localStorage.getItem("token") }
        }
        this.$axios(config).then(res => {
            const { data } = res.data
            const newData = []
            // 将需要的信息挂载在categories上
            data.map((v) => {
                v.posts = []
                v.pageIndex = 1
                v.loading = false
                v.finished = false
                // v.postid = 0
                newData.push(v)
            })
            this.categories = newData
            this.$axios({
                url: `/post?pageIndex=${this.categories[this.active].pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`,
            }).then(res => {
                const { data } = res.data
                this.categories[this.active].posts = data
                this.categories[this.active].pageIndex++
            })
        })
        
    }
}
</script>

<style scoped lang="less">
.header {
    color: #Fff;
    background-color: #f00;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48 / 360 *100vw;
    .iconnew {
        font-size: 50 / 360 *100vw;
        color: #Fff;
    }
    .iconwode {
        font-size: 20 / 360 *100vw;
        color: #Fff;
    }
    .header-search {
        flex: 1;
        display: flex;
        margin: 0 20px;
        justify-content: center;
        align-items: center;
        width: 100 / 360 *100vw;
        height: 34 / 360 * 100vw;
        background-color: rgba(255, 255, 255, .5);
        border-radius: 50px;
        p {
            font-size: 14px;
        }
    }
}

/deep/ .van-tabs__nav {
    background: #f6f6f6;
}
</style>
