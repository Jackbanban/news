<template>
    <div>
        <router-link to="/edit">
            <div class="profile">
                <div>
                    <!--动态获取用户头像-->
                    <img :src="profile.head_img" alt="">
                </div>
                <div class="profile-center">
                    <div class="name">
                        <!--三目运算符的形式判断用户性别-->
                        <span :class="profile.gender === 1 ?  'iconfont iconxingbienan' :'iconfont iconxingbienv'"></span>
                        {{profile.nickname}}
                    </div>
                    <p>2019-10-10</p>
                </div>
                <span class="iconfont iconjiantou1"></span>
            </div>
        </router-link>

        <router-link to="/userfollow">
            <CellBar laber="我的关注" text="关注的用户"></CellBar>
        </router-link>

        <router-link to="/usercomment">
            <CellBar laber="我的跟帖" text="跟帖/回复"></CellBar>
        </router-link>

        <router-link to="/usersatr">
            <CellBar laber="我的收藏" text="文章/视频"></CellBar>
        </router-link>
        <div @click="handleLogout">
            <CellBar laber="退出登录"></CellBar>
        </div>
    </div>
</template>

<script>
// 引入功能组件
import CellBar from '@/components/CellBar.vue'
export default {
    data() {
        return {
            profile: {}
        }
    },
    components: {
        CellBar
    },
    methods: {
        handleLogout() {
            // 退出登录时清除本地存储的用户信息
            localStorage.removeItem("token")
            localStorage.removeItem('user_id')
            this.$router.replace('/login')
        }
    },
    mounted() {

        this.$axios({
            url: '/user/' + localStorage.getItem('user_id'),//根据本地存储的用户id从后台获取该用户的信息
            headers: {
                Authorization: localStorage.getItem("token") //头信息，用于用户验证
            }
        }).then(res => {
            const { data } = res.data
            this.profile = data
            
            if (data.head_img) {
                // 用户头像需要加上main.js配置的基准路径，能够获取服务器端口信息
                this.profile.head_img = this.$axios.defaults.baseURL + data.head_img
            } else {
                // 如果用户没有头像则配置默认头像
                this.profile.head_img = './static/touxiang.jpg'
            }
        })
    }
}
</script>

<style scoped lang="less">
.profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 5px solid #ddd;
    img {
        display: block;
        border-radius: 50%;
        width: 70 / 360 * 100vw;
    }
    .profile-center {
        flex: 1;
        padding: 0px 10px;
        .iconxingbienan {
            color: #a0c5e8
        }
        .iconxingbienv{
            color: pink;
        }
        p {
            padding: 10px 0px;
            color: #999;
            font-size: 14px;
        }
    }
}
</style>
