<template>
<!--:class 动态创建class类名，通过对象的形式动态获取键值对中的值，如果值为true则创建对应键的类名-->
  <input class="input"
  :class="{'success':status === 'success',
    'error':status === 'error'
  }"
  :placeholder="placeholder"
  :value="value"
  @input="handleInput"
  @change="handleChange"
  />
</template>

<script>

export default {
    data(){
        return {
            status:''
        }
    },
    // 父组件传递过来的数据
    props:[
        'placeholder',
        'value',
        'name',
        'nickname',
        'rule',
        'err_message'
    ],
    methods:{
        handleInput(){
            // 当前input事件的事件对象的事件目标的value值
            const {value} = event.target;
            this.$emit('input',value)
            if(this.rule){
                // this.rule.test()判断正则表达式是否成立
                if(this.rule.test(value)){
                    this.status = 'success'
                }else{
                    this.status = 'error'
                }
            }
        },
        handleChange(){
            if(this.err_message && this.status=='error'){
                // vantUI组件的提示（注意使用该组件需要下载配置main.js文件同时需要在app.vue引入该组件的样式以便全局使用）
                this.$toast.fail(this.err_message)
            }
        }
    
    }
}
</script>

<style scoped lang="less">
    .input{
        border: none;
        border-bottom: 2px solid #666;
        width: 100%;
        line-height: 48px;
        font-size: 18px;
        outline: none;
        margin-bottom: 10px;
    }
    .success{
        border-bottom: 2px solid #007acc
    }
    .error{
        border-bottom: 2px solid red
    }
</style>
