<template>
  <div class="collect">
    <div class="header">
        <p class="mycollect"><span class="iconfont iconjiantou2"></span>我的收藏</p>
    </div>

    <div class="content">
        <ul>
            <li>
                <a href="">
                    <div>
                        <p>{{info.title}}</p>
                        <p>火星时报{{info.type}}跟帖</p>
                    </div>
                    <div>
                        <img src=""/>
                    </div>
                </a>
            </li>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            info:{
                "id": 1,
                "title": "阿信分享《说好不哭》幕后故事：只听一次就配唱",
                "content": "",
                "type": 1
            }
        }
    },
    mounted(){
        this.$axios({
            url:'/user_star',
            method:'get',
        }).then( res =>{
            console.log(res)
        })
    }
}
</script>

<style scoped lang="less">
    .collect{
        padding: 20px;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
        .header{
            .mycollect{
                display: block;
                width: 100%;
                text-align:center;
                font-weight: 600;
                font-size: 16 / 360 * 100vw;
                .iconjiantou2{
                    float: left;
                    font-size: 15 / 360 * 100vw;
                }
            }
        }
        
    }
</style>
