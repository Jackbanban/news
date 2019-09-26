import Vue from "vue"
import VueRouter from 'vue-router'

import Vant from 'vant'
import { Toast } from 'vant';
import { Uploader } from 'vant';
import { Field } from 'vant';
import { Tab, Tabs } from 'vant';
import axios from "axios"
import app from "@/app.vue"
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Personal from '@/pages/Personal.vue'
import Edit from '@/pages/Edit.vue'
import Case from '@/pages/case.vue'
import UserFollow from '@/pages/UserFollow.vue'
import UserComment from '@/pages/UserComment.vue'
import UserSatr from '@/pages/UserSatr.vue'


import Index from '@/pages/Index.vue'

Vue.use(VueRouter)                                                                                                                                                                                                                                                                                                                                   
Vue.use(Vant)
Vue.use(Field);
Vue.use(Tab).use(Tabs);

Vue.prototype.$axios = axios
// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000"
const routes = [
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/personal',component:Personal},
    {path:'/edit',component:Edit},
    {path:'/case',component:Case},
    {path:'/userfollow', component:UserFollow},
    {path:'/usercomment',component:UserComment},
    {path:'/usersatr',component:UserSatr},



    {path:'/',component:Index}
]
const router = new VueRouter({
    routes
})

router.beforeEach( (to, from, next) => {
    const hasToken = localStorage.getItem('token')
    
    //判断是否需要权限验证的页面
    if(to.path == '/personal'){
        if(hasToken){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})

// axios统一拦截器
axios.interceptors.response.use( res=> {
    const {statusCode,message} = res.data
    if(statusCode === 401){
        Toast.fail(message);
    }
    if(message == "用户信息验证失败"){
        this.$router.push('/login')
    }
    return res;
})
new Vue({
    el:"#app",
    router,
    render(createElement){
        return createElement(app)
    }
})