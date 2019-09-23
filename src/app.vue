<template>
  <div class="app" v-cloak>
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>


<style>
    @import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
    @import url('../node_modules/vant/lib/index.css');
    *{
        margin: 0;
        padding: 0;
    }
    ul,li,ol{
        list-style: none
    }
    i,em{
        font-style: normal
    }
    a{
        color: inherit
    }
    a:hover{
        text-decoration: none;
    }
    [v-cloak]{
        display: none
    }
</style>

