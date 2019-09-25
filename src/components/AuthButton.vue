<template>
  <div class="btn"  @click="handleClick">
      {{text}}
  </div>
</template>

<script>
export default {
    props:['text'],
    methods:{
        handleClick(){

        }
    }
}
</script>

<style scoped lang="less">
    .btn{
        width: 100%;
        height: 48px;
        margin-top: 20px;
        border-radius: 50px;
        background: #cc3300;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
