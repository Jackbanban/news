<template>
    <div class="Head">
            <span class="iconfont iconjiantou2" @click="$router.back()"></span>
            <h4>{{title}}</h4>
            <span class="iconfont iconjiantou2"></span>
      </div>
</template>

<script>
export default {
    props:[
        'title'
    ]
}
</script>

<style scoped lang="less">
    .Head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    span:last-child{
        opacity: 0;
    }
</style>
