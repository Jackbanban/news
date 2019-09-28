<template>
    <div class="comments">
        <div>
            <div class="head">
                <img src="../static/touxiang.jpg" alt="">
                <div class="content">
                    <p>火星网友</p>
                    <p class="gray">2小时前</p>
                </div>
                <p class="gray">回复</p>
            </div>
            <ul>
                <li>
                    <div class="parten">
                        <i>1</i>
                        <span>火星网友1
                            <span class="gray">2小时前</span>
                        </span>
                        <span class="gray">回复</span>
                    </div>
                    <p>文章说的很有道理</p>
                </li>
                <li>
                    <div class="parten">
                        <i>2</i>
                        <span class="t">火星网友1
                            <span class="gray">2小时前</span>
                        </span>
                        <span class="gray">回复</span>
                    </div>
                    <p>10086+</p>
                </li>
            </ul>
            <!--<p>我也这么认为咯!</p>-->
        </div>

    </div>
</template>

<script>
export default {
    props: ['post'],
    mounted() {
        this.$axios({
            url: '/post_comment/' + this.$route.query.id,
        }).then(res => {
            // console.log(res.data)
        })
        console.log(this.post)
    }
}
</script>

<style scoped lang="less">
.comments{
    padding: 10px;
}
    .gray{
        color: #999;
        font-size: 14px;
    }
    .head{
        display: flex;
        justify-content: space-between;
        .content{
            flex: 1;
            text-align: left;
            padding: 0 10px;
        }
        align-items: center;
        img{
            width: 35 / 360 * 100vw;
            height: 35 / 360 * 100vw;
            border-radius: 50px;
        }
    }
    ul{
        li{
            .parten{
                display: flex;
                justify-content: space-between;
            }
            p{
                text-align: left;
            }
        }
    }
</style>
