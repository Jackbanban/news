<template>
  <div>
    <comment 
    v-if="data.parent"
    :data="data.parent"
    @handleReply="handleReply">

    </comment>

    <div class="comment-floor">
        <div class="floor-header">
            <span>{{data.user.nickname}}</span>
            <i>2小时</i>
            <em @click="handleReply">回复</em>
        </div>
        <div class="comment-content">
            <span>{{data.content}}</span>
        </div>
    </div>

    
  </div>
</template>

<script>
export default {
    name:'comment', //组件的名字，单纯的针对当前的组件名字，当前的组件可以通过该名字调用自己
    props:['data'],
    methods:{
        handleReply(){
            this.$emit('handleReply',this.data)
        }
    }

}
</script>

<style scoped lang="less">
    .comment-floor{
        border: 1px solid #ddd;
        padding: 10px;
        background-color:  #f6f6f6;
        .floor-header{
            i{
                font-size: 14px;
                 color: #999;
            }
            em{
                 float: right;
                 font-size: 14px;
                 color: #999;
            }
        }
        .comment-content{
           padding-top: 10px;
        }
    }
</style>
