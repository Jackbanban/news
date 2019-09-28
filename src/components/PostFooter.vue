<template>
    <div class="footer-wrap">
        <div class="footer" v-show="!isFocus" >
            <input type="text" placeholder="写跟帖" class="input" @focus="handleFocus">
            <span class="iconfont iconpinglun-">
                <i>{{post.comment_length}}</i>
            </span>
            <span class="iconfont icon-star"  :class="{ star_active: post.has_star }" @click="$emit('handleStar')"></span>
            <span class="iconfont iconfenxiang"></span>

        </div>
        <div class="footer-comment" v-show="isFocus">
            <textarea rows="3" :autofocus="isFocus" @blur="isFocus=false"></textarea>
            <!--<input type="text" @blur="uncomment">-->
            <span class="focus">发送</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isFocus:false
        }
    },
    props:['post'],
    methods:{
        handleFocus(){
            this.isFocus = true
        },
        // uncomment(){
        //     this.isFocus = false
        // }
    }
}
</script>

<style scoped lang="less">
.footer-wrap {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    padding: 10px 0;
    padding-right: 20 / 360 *100vw;
    box-sizing: border-box;
    .star_active{
        color: gold;
        font-weight: 1000;
    }
    .footer {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .input {
            border: none;
            background-color: #d7d7d7;
            color: #999;
            border-radius: 50px;
            padding-left: 15px;
            line-height: 24 / 360 * 100vw;
            font-size: 14px;
            width: 150 / 360 * 100vw;
        }
        span {
            font-size: 16 / 360 * 100vw;
            position: relative;
            i {
                position: absolute;
                top: -8px;
                left: 0px;
                font-size: 12px;
                display: block;
                border-radius: 50px;
                background-color: red;
                padding: 0 5px;
                color: #fff;
            }
        }
    }
    .footer-comment{
        textarea{
            resize: none;
            border: none;
            background-color: #d7d7d7;
            border-radius: 10px;
            padding-left: 15px;
            line-height: 24 / 360 * 100vw;
            font-size: 14px;
            width: 250 / 360 * 100vw;
        }
        span{
            font-size: 14px;
            margin-left: 10px;
            line-height: 26 / 360 * 100vw;
            text-align: center;
            border-radius: 50px;
            background-color: red;
            color: #fff;
            padding: 5px 15px;
        }
    }
}
</style>
