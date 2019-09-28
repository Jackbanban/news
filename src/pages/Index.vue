<template>
    <div>
        <div class="header">
            <span class="iconfont iconnew"></span>
            <div class="header-search">
                <p>
                    <span class="iconfont iconsearch"></span>搜索新闻
                </p>
            </div>
            <router-link to="/personal">
                <span class="iconfont iconwode"></span>
            </router-link>
        </div>
        <div class="nav">
            <!--{path:'/details/',params: { id: item.posts.id }}-->
            <van-tabs v-model="active" sticky swipeable>
                <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
                    <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                        <router-link v-for="(item,index) in item.posts" :key="index" :to="{path:'/details/',query: { id:item.id }}"> 
                            <PostCard  :post="item"></PostCard>
                        </router-link>
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
        active() {
           this.cid = this.categories[this.active].id;
           this.onLoad()
        }
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                const category = this.categories[this.active]
                this.$axios({
                    url: `/post?pageIndex=${category.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`,
                }).then(res => {
                    const { data } = res.data
                    if(data.length < this.pageSize){
                        category.finished = true;
                    }
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

                // this.categories[this.active].posts.forEach(v=> {
                //     // console.log(v.id )
                //     // this.categories[this.active].postid  = v.id
                // });
                // console.log(this.categories)
                // console.log(this.categories[this.active].postid)
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
