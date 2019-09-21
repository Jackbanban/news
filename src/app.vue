<template>
  <div class="app">
      <div class="red">第一个单文件组件</div>
      <router-link to="/login">登录</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .red{
        color: red;
        font-size: 50px;
    }
    .green{
        font-size: 60px;
        color: pink
    }
</style>

