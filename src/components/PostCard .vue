<template>
    <div>
        <div class="card" v-if="post.cover.length > 0 && post.cover.length <3 && post.type===1">
            <div class="card-left">
                <div class="post-title">
                    {{post.title}}
                </div>
                <p class="post-info">
                    <span>{{post.user.nickname}}</span> 
                    <span>{{post.comment_length}}跟帖</span>
                </p>
            </div>
            <div class="card-img">
                <img :src="post.cover[0].url" alt="">
            </div>
        </div>

        <div class="img-cart" v-if=" post.cover.length >=3 && post.type===2">
            <div class="post-title">
                    {{post.title}}
            </div> 
            <div class="card-img">
                <img  v-for="(item,index) in post.cover" :key="index" :src="item.url" v-if="index<3">
            </div> 
            <p class="post-info">
               <span>{{post.user.nickname}}</span> 
               <span>{{post.comment_length}}跟帖</span>
            </p>
        </div>
        
        <div class="video-cart" v-if="post.cover.length === 1 && post.type===2">
            <div class="post-title">
                    {{post.title}}
            </div> 
            <div class="video-img">
                <p><i class="iconfont iconshipin"></i></p>
                <img :src="post.cover[0].url" alt="">
            </div>
            <p class="post-info">
               <span>{{post.user.nickname}}</span> 
               <span>{{post.comment_length}}跟帖</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props:['post']
}
</script>

<style scoped lang="less">
    .card{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
        border-bottom: 1px solid #ddd;
        .card-left{
            height: 80 / 360 *100vw;
            .post-info{
               margin-top: 20 / 360 *100vw;
            }
        }
        .card-img{
            img{
                display: block;
                object-fit: convert;
                width: 120 / 360 * 100vw;
                height: 80 / 360 * 100vw;
            }
        }   
    }
    .img-cart{
        padding: 15px 10px;
        border-bottom: 1px solid #ddd;
        .card-img{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin:5px 0;
            img{
                object-fit: convert;
                width: 33%;
            }
        } 
    }
    .video-cart{
        padding: 15px 10px;
        border-bottom: 1px solid #ddd;
        .video-img{
            position: relative;
            p{
                width: 46 / 360 * 100vw;
                height: 46 / 360 * 100vw;
                background: rgba(0, 0, 0, .5);
                border-radius: 50%;
                position: absolute;
                margin-left: -24 / 360 * 100vw;
                margin-top: -24 / 360 * 100vw;
                top: 50%;
                left: 50%;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                    font-size: 40px;
                }
            }
            margin:5px 0;
            img{
                 width: 100%;
                height: 170 / 360 * 100vw;
                object-fit: convert;
            }
        } 
    }
</style>
