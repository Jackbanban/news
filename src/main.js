import Vue from "vue"
import VueRouter from 'vue-router'

//导入第三方组件 vant ui组件
import Vant from 'vant'
import { Toast } from 'vant';
import { Uploader } from 'vant';
import { Field } from 'vant';
import { Tab, Tabs } from 'vant';

import axios from "axios"

//基础页面组件
import app from "@/app.vue"
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Personal from '@/pages/Personal.vue'
import Edit from '@/pages/Edit.vue'
import UserFollow from '@/pages/UserFollow.vue'
import UserComment from '@/pages/UserComment.vue'
import UserSatr from '@/pages/UserSatr.vue'


// 首页组件
import Index from '@/pages/Index.vue'
import Category from '@/pages/Category.vue'
// import Details from '@/pages/Details.vue'
import PostDetails from "@/pages/PostDetails.vue"
import Search from "@/pages/Search.vue"
import Comments from "@/pages/Comments.vue"



// 注册的中间件
Vue.use(VueRouter)                                                                                                                                                                                                                                                                                                                                   
Vue.use(Vant)
Vue.use(Field);
Vue.use(Tab).use(Tabs);

// 将导入的axios挂载在vue实例上
Vue.prototype.$axios = axios
// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000"
const routes = [
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/personal',component:Personal},
    {path:'/edit',component:Edit},
    {path:'/userfollow', component:UserFollow},
    {path:'/usercomment',component:UserComment},
    {path:'/usersatr',component:UserSatr},


    {path:'/',component:Index},
    {path:'/category',component:Category},
    // {path:'/details',component:Details},
    {path:'/post_details/:id',component:PostDetails},
    {path:'/search',component:Search},
    {path:'/post_comment/:id',component:Comments},
]

// 路由中间件
const router = new VueRouter({
    routes
})

//全局路由守卫
router.beforeEach( (to, from, next) => {
    // 后台传过来的身份验证信息
    const hasToken = localStorage.getItem('token')
    
    //判断是否需要权限验证的页面
    if(to.path == '/personal'){
        if(hasToken){
            // 继续后面执行
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