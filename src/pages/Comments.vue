<template>
    <div class="container">
        <HeadNormal title="精彩跟帖"></HeadNormal>
        <!---->
        <van-list v-model="loading" 
        :finished="finished" 
        finished-text="没有更多了" 
        :immediate-check="false" 
        @load="onLoad">
            <div class="comment" v-for="(item,index) in comments" :key="index">
                <div class="comment-info">
                    <div class="comment-user">
                        <img v-if="item.user.head_img" :src="$axios.defaults.baseURL + item.user.head_img" alt="">
                        <img src="../static/touxiang.jpg" alt="">
                        <div class="user-info">
                            <p>{{item.user.nickname}}</p>
                            <p>2小时</p>
                        </div>
                    </div>
                    <span class="reply" @click="handleReply(item)">回复</span>

                </div>

                <CommentFloor v-if="item.parent" :data="item.parent" @handleReply="handleReply">
                </CommentFloor>
                <div class="comment-content">
                    {{item.content}}
                </div>
            </div>

            <!--渲染楼层组件-->
            <PostFooter :post="detail" 
            :replyComment="replyComment" 
            @handleReply="handleReply" 
            @getComments="getComments"></PostFooter>
        </van-list>
    </div>

    <!--页脚组件-->
</template>

<script>
import HeadNormal from '@/components/HeadNormal.vue'
import PostFooter from '@/components/PostFooter.vue'
import CommentFloor from '@/components/CommentFloor.vue'
export default {
    data() {
        return {
            comments: [],
            detail: {},
            replyComment: null,
            loading:false,
            finished:false,
            pageIndex:1,
            pageSize:10
        }
    },
    components: {
        HeadNormal,
        CommentFloor,
        PostFooter
    },
    methods: {
        handleReply(item) {
            this.replyComment = item
        },
        getComments(id, isReply) {
            if (isReply === 'isReply') {
                this.pageIndex = 1
                this.comments = []
            }

            this.$axios({
                url: `/post_comment/${id}?pageIndex=${this.pageIndex}`
            }).then(res => {
                const { data } = res.data
                this.comments = [...this.comments, ...data]
                this.loading = false

                if(data.length<this.pageSize){
                    this.finished = true
                    return
                }

                this.pageIndex++
            })
        },
        onLoad(){
            setTimeout(()=>{
                const {id} = this.$route.params
                this.getComments(id)
            }, 2000);
        }
    },
    mounted() {
        const { id } = this.$route.params

        this.getComments(id)
        const config = { url: '/post/' + id }
        const token = localStorage.getItem('token')
        if (token) {
            config.headers = {
                Authorization: token
            }
        }
        this.$axios(config).then(res => {
            const { data } = res.data
            this.detail = data
        })
    }
}
</script>

<style scoped lang="less">
.container {
    padding: 10px;
    padding-bottom: 100 / 360 * 100vw;
    .comment {
        .comment-info {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            .comment-user {
                display: flex;
                align-items: center;
                img {
                    width: 30 / 360 *100vw;
                    height: 30 / 360 *100vw;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
            .user-info {
                p {
                    &:last-child {
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
        }
        .reply {

            font-size: 14px;
            color: #999;
        }
    }
    .comment-content {
        margin-top: 10px;
    }
}
</style>
