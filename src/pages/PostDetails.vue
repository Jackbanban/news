<template>
    <div class="container">
        <div class="article" v-if="detail.type === 1">
            <div class="header">
                <span class="iconfont iconjiantou2" @click="$router.back()">
                    <span class="iconfont iconnew"></span>
                </span>
                <div class="follow">
                    <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
                    <span class="focus focus_active" v-else @click="handleUnfollow">已关注</span>
                </div>
            </div>
            <h3> {{detail.title}}</h3>
            <p class="post-info"> {{detail.user.nickname}} 2019-10-10</p>
            <!--v-html="detail.content" v-html能够渲染有标签文本-->
            <div class="post-content" v-html="detail.content">
            </div>

        </div>

        <div class="video" v-if="detail.type === 2">
            <!--https://video.pearvideo.com/mp4/adshort/20190927/cont-1607455-14434060_adpkg-ad_hd.mp4-->
            <!--poster="../static/touxiang.jpg" 视频播放初始图片-->
            <video controls :src="detail.content" ></video>
            <div class="video-info">
                <img :src="$axios.defaults.baseURL + detail.user.head_img" alt="">
                <span>{{detail.user.nickname}}</span>
                <div class="follow">
                    <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
                    <span class="focus focus_active" v-else @click="handleUnfollow">已关注</span>
                </div>
                
            </div>
            <p>{{detail.title}}</p>
        </div>

        <div class="post-btns">
            <div class="start">
                <span class="iconfont icon-dianzan" 
                @click="handleLike" :class="{like_active:detail.has_like}"
                
                ></span>
                <span>{{detail.like_length}}</span>
            </div>
            <div class="share">
                <span class="iconfont iconweixin"></span>
                <span>微信</span>
            </div>
        </div>

        <PostFooter :post="detail" @handleStar="handleStar"></PostFooter>
    </div>
</template>

<script>
import PostFooter from '@/components/PostFooter'
export default {
    data() {
        return {
            detail: {
                user: {

                }
            }
        }
    },
    components: {
        PostFooter
    },
    methods: {
        handleFollow() {
            this.$axios({
                url: "/user_follows/" + this.detail.user.id,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const { message } = res.data
                if (message === '关注成功') {
                    this.detail.has_follow = true
                }
                this.$toast(message)
            })
        },
        handleUnfollow() {
            this.$axios({
                url: "/user_unfollow/" + this.detail.user.id,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const { message } = res.data
                if (message === '取消关注成功') {
                    this.detail.has_follow = false
                }
                this.$toast(message)
            })
        },
        handleLike() {
            this.$axios({
                url: "/post_like/" + this.detail.id,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const { message } = res.data
                if (message === '点赞成功') {
                    this.detail.has_like = true
                    this.detail.like_length++
                }
                if (message === "取消成功") {
                    this.detail.has_like = false;
                    this.detail.like_length--;
                }
                this.$toast(message)
            })
        },
        handleStar() {
            this.$axios({
                url: "/post_star/" + this.detail.id,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const { message } = res.data
                if (message === '收藏成功') {
                    this.detail.has_star = true
                }
                if (message === "取消成功") {
                    this.detail.has_star = false;
                }
                this.$toast(message)
            })
        }
    },
    mounted() {
        const { id } = this.$route.params;
        const config = {
            url: "/post/" + id
        }
        if (localStorage.getItem("token")) {
            config.headers = { Authorization: localStorage.getItem("token") }
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
    padding-bottom: 100 / 360 * 100vw;
}

.like_active {
    color: red;
}

.article {
        padding: 0 10px;
    h3 {
        padding-top: 50 / 360 * 100vw;
    }
    .header {
        position: fixed;
        width: 100%;
        height: 40 / 360 * 100vw;
        background-color: #fff;
        display: flex;
        padding-top: 10px;
        padding-right: 20px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        * {
            vertical-align: middle;
        }
        .iconnew {
            font-size: 50 / 360 * 100vw;
        }
    }
    .post-info {
        color: #999;
        font-size: 14px;
        padding: 5px 0 20px;
    }

    .post-content {
        line-height: 1.5;
        /deep/ img {
            max-width: 100%;
        }
    }
}
.video{
    video{
        width: 100%;
    }
    p{
        margin-left: 10px;
    }
    .video-info{
        padding: 20 / 360 * 100vw;
        img{
            border-radius: 50%;
            width: 20 / 360 * 100vw;
            height: 20 / 360 * 100vw;
        }
        span{
            flex: 1;
            text-align: left;
            margin-left: 10px;
        }
        display: flex;
        justify-content: space-between;
    }
}
.focus {
    font-size: 14px;
    width: 62 / 360 * 100vw;
    line-height: 26 / 360 * 100vw;
    text-align: center;
    border-radius: 50px;
    background-color: red;
    color: #fff;
    padding: 5px 20px;
}

.focus_active {
    border: 1px solid #ddd;
    font-size: 14px;
    width: 62 / 360 * 100vw;
    line-height: 26 / 360 * 100vw;
    text-align: center;
    border-radius: 50px;
    color: #000;
    background-color: #fff;
    padding: 5px 20px
}

.post-btns {
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
</style>
