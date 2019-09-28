<template>
    <div class="details">
        <div class="headerTop">
            <div class="header">
                <span class="iconfont iconjiantou2" @click="$router.back()"></span>
                <span class="iconfont iconnew"></span>
                <div class="follow" ref="hasfollow">
                    <span @click="hasFollow">{{post.has_follow ? '已关注' : '关注'}}</span>
                </div>
            </div>
        </div>
        <div class="content">
            <h3>{{post.title}}</h3>
            <span class="author">
                <span>{{user.nickname}}</span>
                <span>2019-10-10</span>
            </span>
            <p ref="contentPage"></p>

            <div class="content-footer">
                <div class="start">
                    <span class="iconfont icondianzan"></span>
                    <span>112 </span>
                </div>
                <div class="share">
                    <span class="iconfont iconweixin"></span>
                    <span>微信</span>
                </div>
            </div>
        </div>

        <div class="comment">
            <p>精彩跟帖</p>
            <Comment></Comment>
        </div>
    </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
export default {
    data() {
        return {
            post: {},
            user: {}
        }
    },
    components: {
        Comment
    },
    methods: {
        hasFollow() {
            if (this.post.has_follow) {
                this.$refs.hasfollow.style.backgroundColor = 'red'
                this.$refs.hasfollow.innerHTML = '关注'
                this.$refs.hasfollow.style.color = '#fff'
                this.$axios({
                    url: '/post_star/' + this.$route.query.id,
                    headers: {
                        Authorization: localStorage.getItem("token")
                    },
                    data: { has_follow: true }
                }).then(res => {
                    const { message } = res.data
                    this.$toast('取消收藏')
                })
            } else {
                this.$refs.hasfollow.style.backgroundColor = '#fff'
                this.$refs.hasfollow.style.border = '1px solid #ddd'
                this.$refs.hasfollow.style.color = '#000'
                this.$axios({
                    url: '/post_star/' + this.$route.query.id,
                    headers: {
                        Authorization: localStorage.getItem("token")
                    },
                    data: { has_follow: true }
                }).then(res => {
                    const { message } = res.data
                    this.$toast(message)
                })
                this.post.has_follow = true
            }
        }
    },
    mounted() {
        this.$axios({
            url: "/post/" + this.$route.query.id
        }).then(res => {
            const { data } = res.data
            this.post = data
            console.log(this.post)
            this.user = this.post.user
            this.$refs.contentPage.innerHTML = this.post.content
        })
    }
}
</script>

<style scoped lang="less">
.details {
    padding: 10px;
    .headerTop {
        position: fixed;
        top: 0;
        height: 40 / 360 *100vw;
        background-color: #fff;
        line-height:40 / 360 *100vw;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .iconnew {
                flex: 1;
                font-size: 50 / 360 * 100vw;
                margin-left: 10px;
            }
            .follow {
                font-size: 14px;
                width: 62 / 360 * 100vw;
                line-height: 26 / 360 * 100vw;
                text-align: center;
                border-radius: 50px;
                background-color: red;
                color: #fff;
                margin-left: 200 / 360 * 100vw;
                margin-right: 20 / 360 * 100vw;
            }
        }
    }
    .content {
        margin-top: 40px;
        .author {
            display: block;
            color: #999;
            margin: 5px 0 20px;
        }
    }
    p {
        color: #555;
        line-height: 1.8;
        font-size: 14px;
    }
    .content-footer {
        display: flex;
        justify-content: space-around;
        margin: 30px 0 15px;
        padding-bottom: 15px;
        border-bottom: 3px solid #ddd;
        .start,
        .share {
            width: 79 / 360 * 100vw;
            line-height: 26 / 360 * 100vw;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 50px;
            font-size: 14px;
        }
        .iconweixin {
            color: #00c800;
        }
    }
    .comment {
        text-align: center;
        p {
            font-size: 16 / 360 * 100vw;
        }
    }
    /deep/.photo {
        img {
            width: 100%;
            object-fit: cover;
        }
    }
}
</style>
