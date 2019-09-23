import Vue from "vue"
import VueRouter from 'vue-router'

import app from "@/app.vue"
import Vant from 'vant'
import axios from "axios"
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Collect from '@/pages/Collect.vue'

Vue.use(VueRouter)
Vue.use(Vant)

Vue.prototype.$axios = axios
// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000"

const routes = [
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/collect',component:Collect}
]
const router = new VueRouter({
    routes
})

new Vue({
    el:"#app",
    router,
    render(createElement){
        return createElement(app)
    }
})