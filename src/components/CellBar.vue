<template>
    <div class="cellbar" @click="$emit('click', $event)" >
        <p>{{laber}}</p>
        <span>{{ type === 'password'? '******' : text}}</span>
        <i class="iconfont iconjiantou1"></i>
    </div>
</template>

<script>
export default {
    props:[
        "laber",
        "text",
        'type'
    ]
}
</script>

<style scoped lang="less">
    .cellbar{
        padding: 20px;
        padding-left: 0;
        margin-left: 20px;
        display: flex;
        justify-content:space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        span{
            flex: 1;
            text-align: right;
            padding-right: 10px;
            color: #999
        }
    }
</style>
