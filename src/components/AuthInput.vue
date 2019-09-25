<template>
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
            const {value} = event.target;
            this.$emit('input',value)
            if(this.rule){
                if(this.rule.test(value)){
                    this.status = 'success'
                }else{
                    this.status = 'error'
                }
            }
        },
        handleChange(){
            if(this.err_message && this.status=='error'){
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
