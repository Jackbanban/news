import Vue from "vue"
import VueRouter from 'vue-router'

import app from "@/app.vue"
import Login from '@/pages/Login.vue'

Vue.use(VueRouter)

const routes = [
    {path:'/login',component:Login}
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